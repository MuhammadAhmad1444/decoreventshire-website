<?php
/**
 * Decor Events Hire — form endpoint for the static site.
 * Handles quote requests, contact messages and welcome-offer sign-ups.
 * Saves every submission to /private/*.csv (web access blocked by .htaccess)
 * and emails the owner.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const NOTIFY_TO   = 'Decoreventshire@gmail.com';
const MAIL_FROM   = 'Decor Events Hire <no-reply@decoreventshire.com.au>';
const MAX_BODY    = 20000;

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

function clean($v, int $max = 500): string {
    $s = trim(is_scalar($v) ? (string)$v : '');
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $s) ?? '';
    return mb_substr($s, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY + 1) ?: '';
if (strlen($raw) > MAX_BODY) {
    respond(413, ['ok' => false, 'error' => 'Request too large']);
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    $in = $_POST;
}

// Honeypot — bots fill it, humans never see it.
if (!empty($in['website'])) {
    respond(200, ['ok' => true]);
}

$type  = clean($in['type'] ?? '', 20);
$email = clean($in['email'] ?? '', 254);
if (!in_array($type, ['quote', 'contact', 'welcome'], true)) {
    respond(422, ['ok' => false, 'error' => 'Unknown form']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Invalid email']);
}

$dir = dirname(__DIR__) . '/private';
if (!is_dir($dir) && !mkdir($dir, 0750, true)) {
    respond(500, ['ok' => false, 'error' => 'Storage unavailable']);
}

// Per-IP rate limit: 8 submissions per 10 minutes.
$ip     = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlFile = $dir . '/rate_' . md5($ip) . '.json';
$now    = time();
$hits   = is_file($rlFile) ? (json_decode((string)file_get_contents($rlFile), true) ?: []) : [];
$hits   = array_values(array_filter($hits, fn($t) => $t > $now - 600));
if (count($hits) >= 8) {
    respond(429, ['ok' => false, 'error' => 'Too many requests, please call us instead']);
}
$hits[] = $now;
file_put_contents($rlFile, json_encode($hits), LOCK_EX);

$name  = clean($in['name'] ?? '', 120);
$phone = clean($in['phone'] ?? '', 40);

if ($type === 'quote') {
    $required = ['eventDate' => 'event date', 'venue' => 'venue', 'name' => 'name', 'phone' => 'phone'];
    foreach ($required as $k => $label) {
        if (clean($in[$k] ?? '') === '') {
            respond(422, ['ok' => false, 'error' => "Missing $label"]);
        }
    }
    $items = [];
    foreach (array_slice(is_array($in['items'] ?? null) ? $in['items'] : [], 0, 60) as $it) {
        $price = is_numeric($it['price'] ?? null) ? '$' . number_format((float)$it['price'], 2) : 'On quote';
        $items[] = (int)($it['qty'] ?? 0) . ' x ' . clean($it['name'] ?? '', 120) . " ($price " . clean($it['unit'] ?? '', 40) . ')';
    }
    $services = array_map(fn($s) => clean($s, 40), array_slice(is_array($in['services'] ?? null) ? $in['services'] : [], 0, 5));
    $row = [
        date('c'), $name, $email, $phone,
        clean($in['eventType'] ?? '', 40), clean($in['eventDate'] ?? '', 20), clean($in['startTime'] ?? '', 10),
        clean($in['guests'] ?? '', 10), clean($in['venue'] ?? '', 300), implode('; ', $services),
        implode('; ', $items), '$' . number_format((float)($in['subtotal'] ?? 0), 2), clean($in['notes'] ?? '', 2000), $ip,
    ];
    $file    = 'quotes.csv';
    $subject = "New quote request — {$row[4]} on {$row[5]} ({$name})";
    $body    = "New quote request from the website\n\n"
        . "Name:      {$name}\nEmail:     {$email}\nPhone:     {$phone}\n\n"
        . "Event:     {$row[4]}\nDate:      {$row[5]} {$row[6]}\nGuests:    {$row[7]}\nVenue:     {$row[8]}\nServices:  {$row[9]}\n\n"
        . "Items:\n  " . (implode("\n  ", $items) ?: '(none — wants recommendations)') . "\n\n"
        . "Estimated item hire: {$row[11]}\n\nNotes:\n{$row[12]}\n";
} elseif ($type === 'contact') {
    $message = clean($in['message'] ?? '', 3000);
    if ($name === '' || $message === '') {
        respond(422, ['ok' => false, 'error' => 'Missing name or message']);
    }
    $row     = [date('c'), $name, $email, $phone, clean($in['eventDate'] ?? '', 20), $message, $ip];
    $file    = 'messages.csv';
    $subject = "New website message from {$name}";
    $body    = "Name:  {$name}\nEmail: {$email}\nPhone: {$phone}\nEvent date: {$row[4]}\n\n{$message}\n";
} else {
    $row     = [date('c'), $email, $ip];
    $file    = 'subscribers.csv';
    $subject = 'New welcome-offer sign-up';
    $body    = "New sign-up for the welcome offer:\n\n{$email}\n";
}

$fh = fopen($dir . '/' . $file, 'a');
if (!$fh) {
    respond(500, ['ok' => false, 'error' => 'Storage unavailable']);
}
flock($fh, LOCK_EX);
fputcsv($fh, $row);
flock($fh, LOCK_UN);
fclose($fh);

$safeReply = str_replace(["\r", "\n"], '', $email);
@mail(
    NOTIFY_TO,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body . "\n— Sent " . date('r'),
    "From: " . MAIL_FROM . "\r\nReply-To: {$safeReply}\r\nContent-Type: text/plain; charset=utf-8"
);

respond(200, ['ok' => true]);
