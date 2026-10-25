<?php
/**
 * Čistý Domov — quote request handler for plain PHP hosting.
 *
 * The same contract as the Vercel route (src/app/api/contact/route.ts): a JSON
 * POST from the form, validated again here, delivered by email with Reply-To
 * set to the visitor. Answers 200 when sent, 422 on invalid input, 502 when
 * the server could not send — the form then offers a ready-made email instead
 * of pretending it worked.
 *
 * __TO_EMAIL__ and __SITE_HOST__ are filled in by scripts/build-hosting.sh.
 */

const TO_EMAIL = '__TO_EMAIL__';
const SITE_HOST = '__SITE_HOST__';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, ['error' => 'method_not_allowed']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    reply(400, ['error' => 'invalid_json']);
}

/** Trimmed, length-capped, and stripped of anything that could break a header. */
function field(array $data, string $key, int $max): string {
    $value = isset($data[$key]) && is_string($data[$key]) ? trim($data[$key]) : '';
    $value = str_replace(["\r", "\0"], '', $value);
    return mb_substr($value, 0, $max);
}

// Honeypot: accept silently so bots do not learn they were caught.
if (field($data, 'company', 200) !== '') {
    reply(200, ['ok' => true]);
}

$s = [
    'name'    => str_replace("\n", ' ', field($data, 'name', 120)),
    'email'   => str_replace("\n", '', field($data, 'email', 200)),
    'phone'   => str_replace("\n", ' ', field($data, 'phone', 60)),
    'service' => str_replace("\n", ' ', field($data, 'service', 120)),
    'size'    => str_replace("\n", ' ', field($data, 'size', 60)),
    'city'    => str_replace("\n", ' ', field($data, 'city', 120)),
    'message' => field($data, 'message', 4000),
    'locale'  => preg_replace('/[^a-z]/', '', field($data, 'locale', 5)),
    'consent' => isset($data['consent']) && $data['consent'] === true,
];

$invalid = [];
if ($s['name'] === '') $invalid[] = 'name';
if (!filter_var($s['email'], FILTER_VALIDATE_EMAIL)) $invalid[] = 'email';
if ($s['service'] === '') $invalid[] = 'service';
if ($s['message'] === '') $invalid[] = 'message';
if (!$s['consent']) $invalid[] = 'consent';
if ($invalid) {
    reply(422, ['error' => 'validation', 'fields' => $invalid]);
}

$received = gmdate('Y-m-d\TH:i:s\Z');
$body = implode("\n", [
    'Név:           ' . $s['name'],
    'E-mail:        ' . $s['email'],
    'Telefon:       ' . ($s['phone'] ?: '—'),
    'Szolgáltatás:  ' . $s['service'],
    'Alapterület:   ' . ($s['size'] ?: '—'),
    'Település:     ' . ($s['city'] ?: '—'),
    'Nyelv:         ' . ($s['locale'] ?: '—'),
    'Érkezett:      ' . $received,
    'Adatkezelés:   elfogadva',
    '',
    'Üzenet:',
    '───────',
    $s['message'],
]);

$subject = '=?UTF-8?B?' . base64_encode('Ajánlatkérés: ' . $s['service'] . ' — ' . $s['name']) . '?=';
$headers = implode("\r\n", [
    'From: Čistý Domov web <noreply@' . SITE_HOST . '>',
    'Reply-To: ' . $s['email'],
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail(TO_EMAIL, $subject, $body, $headers)) {
    reply(502, ['error' => 'delivery_failed']);
}

reply(200, ['ok' => true, 'delivered' => true]);
