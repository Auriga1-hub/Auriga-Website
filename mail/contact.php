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
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

// ── VALIDATION ────────────────────────────────
if (!$name || !$email || !$phone || !$message) {
  http_response_code(400);
  echo json_encode(['message' => 'All fields are required']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['message' => 'Invalid email address']);
  exit;
}

if (!preg_match('/^[0-9+\-\s()\.]{8,20}$/', $phone)) {
  http_response_code(400);
  echo json_encode(['message' => 'Please enter a valid phone number']);
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
  $mail->addReplyTo($email, $name);
  $mail->addAddress($config['to_email']);

  $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

  $mail->isHTML(true);
  $mail->Subject = "Website Enquiry — {$name}";
  $mail->Body = "
    <h2>Website Contact Enquiry</h2>
    <hr>
    <b>Name:</b> {$name}<br>
    <b>Email:</b> {$email}<br>
    <b>Phone:</b> {$phone}<br><br>
    <b>Message:</b><br>
    {$safeMessage}
  ";

  $mail->send();
  echo json_encode(['success' => true]);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['message' => 'Failed to send email. Please try again later.']);
}