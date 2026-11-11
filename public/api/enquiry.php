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
date_default_timezone_set('Australia/Sydney');

const NOTIFY_TO   = 'info@decoreventshire.com.au';
// Hostinger only sends mail() from an existing mailbox on the domain.
const MAIL_FROM   = 'Decor Events Hire <info@decoreventshire.com.au>';
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

// Everything in the email reads as one card: details as label/value rows, then optional
// item table and free-text note. The plain-text part is generated from the same data.
$mail = ['details' => [], 'items' => [], 'total' => '', 'note' => '', 'noteTitle' => ''];

if ($type === 'quote') {
    $required = ['eventDate' => 'event date', 'venue' => 'venue', 'name' => 'name', 'phone' => 'phone'];
    foreach ($required as $k => $label) {
        if (clean($in[$k] ?? '') === '') {
            respond(422, ['ok' => false, 'error' => "Missing $label"]);
        }
    }
    $items = [];
    foreach (array_slice(is_array($in['items'] ?? null) ? $in['items'] : [], 0, 60) as $it) {
        $qty      = (int)($it['qty'] ?? 0);
        $itemName = clean($it['name'] ?? '', 120);
        $unit     = clean($it['unit'] ?? '', 40);
        $priced   = is_numeric($it['price'] ?? null);
        $price    = $priced ? money((float)$it['price']) : 'On quote';
        $items[]  = "$qty x $itemName ($price $unit)";
        $mail['items'][] = [$qty, $itemName, $priced ? trim("$price $unit") : ($unit ?: 'Price on quote'), $priced ? money($qty * (float)$it['price']) : 'On quote'];
    }
    $services = array_map(fn($s) => clean($s, 40), array_slice(is_array($in['services'] ?? null) ? $in['services'] : [], 0, 5));
    $row = [
        date('c'), $name, $email, $phone,
        clean($in['eventType'] ?? '', 40), clean($in['eventDate'] ?? '', 20), clean($in['startTime'] ?? '', 10),
        clean($in['guests'] ?? '', 10), clean($in['venue'] ?? '', 300), implode('; ', $services),
        implode('; ', $items), money((float)($in['subtotal'] ?? 0)), clean($in['notes'] ?? '', 2000), $ip,
        // Added later, so kept after the original columns.
        clean($in['venueType'] ?? '', 80), clean($in['deliveryTime'] ?? '', 10), clean($in['pickupTime'] ?? '', 10),
    ];
    $file    = 'quotes.csv';
    $heading = 'New quote request';
    $subject = "Quote request: {$row[4]}, " . nice_date($row[5], true) . " ({$name})";
    $mail['details'] = [
        ['Customer', $name], ['Phone', $phone], ['Email', $email],
        ['Event', $row[4]], ['Date', nice_date($row[5]) . ($row[6] !== '' ? ', ' . nice_time($row[6]) : '')],
        ['Guests', $row[7]], ['Venue', $row[8] . ($row[14] !== '' ? " ($row[14])" : '')], ['Services', implode(', ', $services) ?: 'None'],
        ['Delivery', $row[15] !== '' ? nice_time($row[15]) : 'Any time'], ['Pick-up', $row[16] !== '' ? nice_time($row[16]) : 'Any time'],
    ];
    $mail['total']     = $row[11];
    $mail['note']      = $row[12];
    $mail['noteTitle'] = 'Customer notes';
} elseif ($type === 'contact') {
    $message = clean($in['message'] ?? '', 3000);
    if ($name === '' || $message === '') {
        respond(422, ['ok' => false, 'error' => 'Missing name or message']);
    }
    $row     = [date('c'), $name, $email, $phone, clean($in['eventDate'] ?? '', 20), $message, $ip];
    $file    = 'messages.csv';
    $heading = 'New enquiry';
    $subject = "Website enquiry from {$name}";
    $mail['details'] = [['Customer', $name], ['Phone', $phone], ['Email', $email], ['Event date', nice_date($row[4])]];
    $mail['note']      = $message;
    $mail['noteTitle'] = 'Message';
} else {
    $row     = [date('c'), $email, $ip];
    $file    = 'subscribers.csv';
    $heading = 'New welcome-offer sign-up';
    $subject = "Welcome-offer sign-up: {$email}";
    $mail['details'] = [['Email', $email], ['Offer', 'Welcome discount from the website pop-up']];
}

$fh = fopen($dir . '/' . $file, 'a');
if (!$fh) {
    respond(500, ['ok' => false, 'error' => 'Storage unavailable']);
}
flock($fh, LOCK_EX);
fputcsv($fh, $row);
flock($fh, LOCK_UN);
fclose($fh);

$safeReply  = str_replace(["\r", "\n"], '', $email);
$subjectEnc = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$received   = date('l j F Y, g:i a');
[$contentType, $mimeBody] = mime_message(
    email_text($heading, $received, $mail),
    email_html($heading, $received, $mail, $name, $email, $phone, $file)
);

// Send through the info@ mailbox over SMTP (the password lives in /private/smtp.php,
// which the web cannot read); fall back to PHP mail() if that file is missing or SMTP fails.
// The "mail" field reports how the email went (no secrets), to diagnose delivery from outside.
$mailStatus = smtp_send($dir . '/smtp.php', $subjectEnc, $contentType, $mimeBody, $safeReply);
if ($mailStatus !== 'smtp') {
    $mailStatus .= @mail(
        NOTIFY_TO,
        $subjectEnc,
        $mimeBody,
        "From: " . MAIL_FROM . "\r\nReply-To: {$safeReply}\r\nMIME-Version: 1.0\r\nContent-Type: {$contentType}",
        '-f' . NOTIFY_TO
    ) ? ', mail() accepted' : ', mail() refused';
}

respond(200, ['ok' => true, 'mail' => $mailStatus]);

function money(float $n): string {
    return '$' . number_format($n, 2);
}

// "2027-03-14" → "Sunday 14 March 2027" (or "Sun 14 Mar 2027" when short); other text is left as typed.
function nice_date(string $d, bool $short = false): string {
    $t = DateTime::createFromFormat('!Y-m-d', $d);
    return $t ? $t->format($short ? 'D j M Y' : 'l j F Y') : ($d !== '' ? $d : 'Not given');
}

function nice_time(string $t): string {
    $x = DateTime::createFromFormat('H:i', $t);
    return $x ? $x->format('g:i a') : $t;
}

function e(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function email_text(string $heading, string $received, array $m): string {
    $out = "$heading\nReceived $received\n\n";
    foreach ($m['details'] as [$label, $value]) {
        $out .= str_pad($label . ':', 12) . ($value !== '' ? $value : '-') . "\n";
    }
    if ($m['items']) {
        $out .= "\nItems\n";
        foreach ($m['items'] as [$qty, $item, $price, $line]) {
            $out .= "  $qty x $item ($price) = $line\n";
        }
        $out .= "Estimated item hire: {$m['total']}\n";
    }
    if ($m['note'] !== '') {
        $out .= "\n{$m['noteTitle']}:\n{$m['note']}\n";
    }
    return $out . "\nSent from decoreventshire.com.au\n";
}

// Table-based layout with inline styles, as email apps (Gmail, Outlook, Hostinger Mail) ignore most CSS.
function email_html(string $heading, string $received, array $m, string $name, string $email, string $phone, string $file): string {
    $forest = '#1e2a22'; $gold = '#bb8c4f'; $goldLight = '#dfbe88'; $cream = '#f4f7f2'; $line = '#e3e8e1'; $muted = '#5e7a66';
    $font = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;";

    $first   = $name !== '' ? explode(' ', $name)[0] : 'there';
    $buttons = [['Reply by email', 'mailto:' . $email . '?subject=' . rawurlencode('Your enquiry with Decor Events Hire') . '&body=' . rawurlencode("Hi $first,\n\n")]];
    $digits  = preg_replace('/\D/', '', $phone);
    if (strlen($digits) >= 8) {
        $buttons[] = ['Call ' . $phone, 'tel:' . ($phone[0] === '+' ? '+' : '') . $digits];
        $wa = str_starts_with($digits, '0') ? '61' . substr($digits, 1) : $digits;
        $buttons[] = ['WhatsApp', 'https://wa.me/' . $wa . '?text=' . rawurlencode("Hi $first, it's Decor Events Hire about your enquiry.")];
    }
    $btnHtml = '';
    foreach ($buttons as $i => [$label, $href]) {
        $style = $i === 0
            ? "background:$forest;color:#ffffff;border:1px solid $forest;"
            : "background:#ffffff;color:$forest;border:1px solid $gold;";
        $btnHtml .= '<a href="' . e($href) . '" style="' . $style . $font . 'display:inline-block;margin:0 8px 8px 0;padding:11px 18px;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;">' . e($label) . '</a>';
    }

    $rows = '';
    foreach ($m['details'] as [$label, $value]) {
        if ($label === 'Email' && $value !== '') {
            $value = '<a href="mailto:' . e($value) . '" style="color:' . $forest . ';">' . e($value) . '</a>';
        } elseif ($label === 'Phone' && $value !== '') {
            $value = '<a href="tel:' . e(preg_replace('/[^\d+]/', '', $value)) . '" style="color:' . $forest . ';">' . e($value) . '</a>';
        } else {
            $value = $value !== '' ? nl2br(e($value)) : '<span style="color:#9aa79e;">Not given</span>';
        }
        $rows .= '<tr><td style="' . $font . 'padding:10px 0;border-bottom:1px solid ' . $line . ';width:120px;vertical-align:top;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:' . $muted . ';">' . e($label) . '</td>'
            . '<td style="' . $font . 'padding:10px 0;border-bottom:1px solid ' . $line . ';vertical-align:top;font-size:15px;color:' . $forest . ';">' . $value . '</td></tr>';
    }

    $items = '';
    if ($m['items']) {
        $items .= '<p style="' . $font . 'margin:28px 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:' . $gold . ';font-weight:700;">Items requested</p>'
            . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">';
        foreach ($m['items'] as [$qty, $item, $price, $lineTotal]) {
            $items .= '<tr><td style="' . $font . 'padding:10px 0;border-bottom:1px solid ' . $line . ';font-size:15px;color:' . $forest . ';"><strong>' . e((string)$qty) . ' &times;</strong> ' . e($item)
                . '<br><span style="font-size:13px;color:' . $muted . ';">' . e($price) . '</span></td>'
                . '<td align="right" style="' . $font . 'padding:10px 0;border-bottom:1px solid ' . $line . ';font-size:15px;color:' . $forest . ';white-space:nowrap;vertical-align:top;">' . e($lineTotal) . '</td></tr>';
        }
        $items .= '<tr><td style="' . $font . 'padding:14px 0 0;font-size:14px;font-weight:700;color:' . $forest . ';">Estimated item hire</td>'
            . '<td align="right" style="' . $font . 'padding:14px 0 0;font-size:18px;font-weight:700;color:' . $gold . ';white-space:nowrap;">' . e($m['total']) . '</td></tr></table>'
            . '<p style="' . $font . 'margin:6px 0 0;font-size:12px;color:' . $muted . ';">Before delivery, setup and any discounts.</p>';
    } elseif ($file === 'quotes.csv') {
        $items .= '<p style="' . $font . 'margin:24px 0 0;font-size:15px;color:' . $forest . ';">No items picked: the customer would like recommendations.</p>';
    }

    $note = '';
    if ($m['note'] !== '') {
        $note = '<p style="' . $font . 'margin:28px 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:' . $gold . ';font-weight:700;">' . e($m['noteTitle']) . '</p>'
            . '<div style="' . $font . 'background:' . $cream . ';border-left:3px solid ' . $gold . ';border-radius:6px;padding:14px 16px;font-size:15px;line-height:1.55;color:' . $forest . ';">' . nl2br(e($m['note'])) . '</div>';
    }

    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . e($heading) . '</title></head>'
        . '<body style="margin:0;padding:0;background:' . $cream . ';">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' . $cream . ';"><tr><td align="center" style="padding:24px 12px;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ' . $line . ';">'
        // Header: the site's wordmark in type, so no image needs to load.
        . '<tr><td align="center" style="background:' . $forest . ';padding:26px 24px 22px;">'
        . '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:24px;letter-spacing:.12em;color:' . $goldLight . ';font-weight:700;">DECOR EVENTS</div>'
        . '<div style="' . $font . 'font-size:11px;letter-spacing:.6em;color:' . $gold . ';margin-top:6px;">&#9670; HIRE &#9670;</div></td></tr>'
        . '<tr><td style="padding:28px 28px 8px;">'
        . '<p style="' . $font . 'margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:' . $gold . ';font-weight:700;">From the website</p>'
        . '<h1 style="font-family:Georgia,\'Times New Roman\',serif;margin:6px 0 4px;font-size:26px;font-weight:400;color:' . $forest . ';">' . e($heading) . '</h1>'
        . '<p style="' . $font . 'margin:0 0 20px;font-size:13px;color:' . $muted . ';">Received ' . e($received) . ' (Sydney time)</p>'
        . $btnHtml
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:16px;">' . $rows . '</table>'
        . $items . $note
        . '</td></tr>'
        . '<tr><td style="' . $font . 'padding:24px 28px 26px;font-size:12px;line-height:1.6;color:' . $muted . ';">'
        . 'Replying to this email goes straight to the customer. A copy is saved on the website server in <em>' . e($file) . '</em>.'
        . '</td></tr></table>'
        . '<p style="' . $font . 'margin:16px 0 0;font-size:12px;color:' . $muted . ';">Decor Events Hire &middot; Campbelltown NSW &middot; <a href="https://decoreventshire.com.au" style="color:' . $muted . ';">decoreventshire.com.au</a></p>'
        . '</td></tr></table></body></html>';
}

// Builds a multipart/alternative body (plain text + HTML), quoted-printable so long lines stay valid.
function mime_message(string $text, string $html): array {
    $b = 'deh-' . bin2hex(random_bytes(8));
    $part = fn(string $type, string $s) => "--$b\r\nContent-Type: $type; charset=utf-8\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n"
        . quoted_printable_encode(str_replace(["\r\n", "\r", "\n"], "\r\n", $s)) . "\r\n";
    return ["multipart/alternative; boundary=\"$b\"", $part('text/plain', $text) . $part('text/html', $html) . "--$b--\r\n"];
}

// Returns "smtp" when sent, otherwise a short reason for the failure.
function smtp_send(string $configFile, string $subject, string $contentType, string $body, string $replyTo): string {
    if (!is_file($configFile)) {
        return 'no smtp.php';
    }
    $password = (string)(include $configFile);
    if ($password === '') {
        return 'empty password';
    }
    $sock = @stream_socket_client('ssl://smtp.hostinger.com:465', $errno, $errstr, 15);
    if (!$sock) {
        return 'connect failed: ' . $errstr;
    }
    stream_set_timeout($sock, 15);
    // Reads a (possibly multi-line) reply and checks its status code.
    $expect = function (string $code) use ($sock): bool {
        while (($line = fgets($sock, 1024)) !== false) {
            if (strlen($line) < 4 || $line[3] !== '-') {
                return strncmp($line, $code, 3) === 0;
            }
        }
        return false;
    };
    $cmd = function (string $line, string $code) use ($sock, $expect): bool {
        fwrite($sock, $line . "\r\n");
        return $expect($code);
    };
    $user = NOTIFY_TO;
    $data = "Date: " . date('r') . "\r\n"
        . "From: " . MAIL_FROM . "\r\n"
        . "To: <{$user}>\r\n"
        . "Reply-To: {$replyTo}\r\n"
        . "Subject: {$subject}\r\n"
        . "Message-ID: <" . bin2hex(random_bytes(12)) . "@decoreventshire.com.au>\r\n"
        . "MIME-Version: 1.0\r\nContent-Type: {$contentType}\r\n\r\n"
        // Escape lines starting with a dot.
        . preg_replace('/^\./m', '..', $body);
    $steps = [
        'greeting' => fn() => $expect('220'),
        'ehlo'     => fn() => $cmd('EHLO decoreventshire.com.au', '250'),
        'auth'     => fn() => $cmd('AUTH LOGIN', '334') && $cmd(base64_encode($user), '334'),
        'password' => fn() => $cmd(base64_encode($password), '235'),
        'sender'   => fn() => $cmd("MAIL FROM:<{$user}>", '250'),
        'recipient'=> fn() => $cmd("RCPT TO:<{$user}>", '250'),
        'data'     => fn() => $cmd('DATA', '354') && $cmd($data . "\r\n.", '250'),
    ];
    $status = 'smtp';
    foreach ($steps as $name => $step) {
        if (!$step()) {
            $status = "smtp failed at {$name}";
            break;
        }
    }
    @fwrite($sock, "QUIT\r\n");
    fclose($sock);
    return $status;
}
