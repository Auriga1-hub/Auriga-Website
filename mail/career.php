<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';

$config = require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit;
}

$name  = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$area  = trim($_POST['area'] ?? '');

if (!$name || !$email || empty($_FILES['resume']['tmp_name'])) {
  http_response_code(400);
  echo json_encode(['message' => 'Missing required fields']);
  exit;
}

$mail = new PHPMailer(true);

try {
  // SMTP CONFIG
  $mail->isSMTP();
  $mail->Host       = $config['host'];
  $mail->SMTPAuth   = true;
  $mail->Username   = $config['username'];
  $mail->Password   = $config['password'];
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = $config['port'];

  // FROM (your official mailbox)
  $mail->setFrom($config['from_email'], $config['from_name']);

  // REPLY goes to applicant
  $mail->addReplyTo($email, $name);

  // TO (main inbox)
  $mail->addAddress($config['to_email']);

  // 🔒 BCC (hidden from applicant)
  $mail->addBCC('dr.habib@environindia.in', 'Dr. Habib');

  // ATTACH RESUME
  $mail->addAttachment(
    $_FILES['resume']['tmp_name'],
    $_FILES['resume']['name']
  );

  // EMAIL CONTENT
  $mail->isHTML(true);
  $mail->Subject = "Career Application — {$name}";
  $mail->Body = "
    <b>Name:</b> {$name}<br>
    <b>Email:</b> {$email}<br>
    <b>Area of Interest:</b> {$area}
  ";

  $mail->send();
  echo json_encode(['success' => true]);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['message' => $mail->ErrorInfo]);
}
