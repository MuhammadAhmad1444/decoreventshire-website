<?php
/**
 * Decor Events Hire — launch notification sign-up.
 * Stores emails in /private/subscribers.csv (web access blocked by .htaccess)
 * and optionally emails the owner.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Owner notification address (change when the mailbox is set up; leave '' to disable)
const NOTIFY_TO = 'hello@decoreventshire.com.au';

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Honeypot field — bots fill it, humans don't see it
if (!empty($_POST['website'])) {
    respond(200, ['ok' => true]);
}

$email = trim((string)($_POST['email'] ?? ''));
if ($email === '' || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Invalid email']);
}

$dir  = __DIR__ . '/private';
$file = $dir . '/subscribers.csv';

if (!is_dir($dir) && !mkdir($dir, 0750, true)) {
    respond(500, ['ok' => false, 'error' => 'Storage unavailable']);
}

// Simple per-IP rate limit (5 per 10 minutes)
$ip      = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile  = $dir . '/rate_' . md5($ip) . '.json';
$now     = time();
$hits    = is_file($rlFile) ? (json_decode((string)file_get_contents($rlFile), true) ?: []) : [];
$hits    = array_values(array_filter($hits, fn($t) => $t > $now - 600));
if (count($hits) >= 5) {
    respond(429, ['ok' => false, 'error' => 'Too many requests']);
}
$hits[] = $now;
file_put_contents($rlFile, json_encode($hits), LOCK_EX);

// Skip duplicates
$emailLc = strtolower($email);
if (is_file($file)) {
    $fh = fopen($file, 'r');
    while (($row = fgetcsv($fh)) !== false) {
        if (isset($row[1]) && strtolower($row[1]) === $emailLc) {
            fclose($fh);
            respond(200, ['ok' => true, 'duplicate' => true]);
        }
    }
    fclose($fh);
}

$fh = fopen($file, 'a');
if (!$fh) {
    respond(500, ['ok' => false, 'error' => 'Storage unavailable']);
}
flock($fh, LOCK_EX);
fputcsv($fh, [date('c'), $email, $ip]);
flock($fh, LOCK_UN);
fclose($fh);

if (NOTIFY_TO !== '') {
    @mail(
        NOTIFY_TO,
        'New launch sign-up — Decor Events Hire',
        "New sign-up for launch updates:\n\n{$email}\n\n" . date('r'),
        "From: Decor Events Hire <no-reply@decoreventshire.com.au>\r\nContent-Type: text/plain; charset=utf-8"
    );
}

respond(200, ['ok' => true]);
