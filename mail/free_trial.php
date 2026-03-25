<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';

// ── CORS ──────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['message' => 'Method not allowed']);
  exit;
}

$config = require __DIR__ . '/config.php';

// ── TURNSTILE VERIFICATION ────────────────────
$turnstileToken = trim($_POST['cf-turnstile-response'] ?? '');

if (!$turnstileToken) {
  http_response_code(400);
  echo json_encode(['message' => 'Please complete the captcha verification']);
  exit;
}

$verifyData = [
  'secret'   => $config['turnstile_secret'],
  'response' => $turnstileToken,
  'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
];

$ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($verifyData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$verifyResponse = curl_exec($ch);
curl_close($ch);

$verifyResult = json_decode($verifyResponse, true);

if (!$verifyResult || !$verifyResult['success']) {
  http_response_code(403);
  echo json_encode(['message' => 'Captcha verification failed. Please try again.']);
  exit;
}

// ── INPUTS ────────────────────────────────────
$location       = trim($_POST['location'] ?? '');
$parentName     = trim($_POST['parent_name'] ?? '');
$phone          = trim($_POST['phone'] ?? '');
$email          = trim($_POST['email'] ?? '');
$playerName     = trim($_POST['player_name'] ?? '');
$dob            = trim($_POST['dob'] ?? '');
$yearsPlayed    = trim($_POST['years_played'] ?? '');
$preferredDate  = trim($_POST['preferred_date'] ?? '');
$preferredTime  = trim($_POST['preferred_time'] ?? '');
$heardAbout     = trim($_POST['heard_about'] ?? '');
$message        = trim($_POST['message'] ?? '');

// ── VALIDATION ────────────────────────────────
if (!$parentName || !$phone || !$email || !$playerName || !$dob || !$preferredDate || !$preferredTime) {
  http_response_code(400);
  echo json_encode(['message' => 'Please fill in all required fields']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['message' => 'Invalid email address']);
  exit;
}

// ── SEND EMAIL ────────────────────────────────
$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host       = $config['host'];
  $mail->SMTPAuth   = true;
  $mail->Username   = $config['username'];
  $mail->Password   = $config['password'];
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = $config['port'];

  $mail->setFrom($config['from_email'], $config['from_name']);
  $mail->addReplyTo($email, $parentName);
  $mail->addAddress($config['to_email']);

  $safeMessage = $message ? nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) : '<em>None</em>';
  $locationLabel = $location ?: 'Unknown';

  $mail->isHTML(true);
  $mail->Subject = "Free Trial Registration — {$locationLabel} — {$parentName}";
  $mail->Body = "
    <h2>Free Trial Registration — {$locationLabel}</h2>
    <hr>
    <h3>Parent / Guardian</h3>
    <b>Name:</b> {$parentName}<br>
    <b>Phone:</b> {$phone}<br>
    <b>Email:</b> {$email}<br>
    <hr>
    <h3>Player Information</h3>
    <b>Player Name:</b> {$playerName}<br>
    <b>Date of Birth:</b> {$dob}<br>
    <b>Years Played in a Club:</b> " . ($yearsPlayed ?: '<em>Not specified</em>') . "<br>
    <hr>
    <h3>Booking Details</h3>
    <b>Preferred Date:</b> {$preferredDate}<br>
    <b>Preferred Time:</b> {$preferredTime}<br>
    <b>How did you hear about us:</b> " . ($heardAbout ?: '<em>Not specified</em>') . "<br><br>
    <b>Message:</b><br>
    {$safeMessage}
  ";

  $mail->send();
  echo json_encode(['success' => true]);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['message' => 'Failed to send email. Please try again later.']);
}
