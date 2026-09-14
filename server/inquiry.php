<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false]);
}

$host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    $requestHost = preg_replace('/:\d+$/', '', $host);
    if ($originHost === '' || $originHost !== $requestHost) {
        respond(403, ['ok' => false]);
    }
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (str_contains($contentType, 'application/json')) {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw === false ? '' : $raw, true);
} else {
    $data = $_POST;
}

if (!is_array($data)) {
    respond(400, ['ok' => false, 'message' => 'Некорректные данные']);
}

// Hidden field: real visitors leave it empty, simple spam bots often fill it.
if (trim((string) ($data['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

$name = trim((string) ($data['name'] ?? $data['Имя'] ?? ''));
$phone = trim((string) ($data['phone'] ?? $data['Телефон'] ?? ''));
$email = trim((string) ($data['email'] ?? $data['Почта'] ?? ''));
$city = trim((string) ($data['city'] ?? $data['Город'] ?? ''));
$consent = filter_var(
    $data['consent'] ?? isset($data['Согласие на обработку персональных данных']),
    FILTER_VALIDATE_BOOLEAN
);

$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if (
    $name === '' || text_length($name) > 100 ||
    strlen($phoneDigits) !== 11 || $phoneDigits[0] !== '7' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || text_length($email) > 160 ||
    $city === '' || text_length($city) > 120 ||
    !$consent
) {
    respond(422, ['ok' => false, 'message' => 'Проверьте заполнение формы']);
}

$configPath = getenv('TELEGRAM_CONFIG_FILE');
if (!$configPath) {
    $documentRoot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), DIRECTORY_SEPARATOR);
    $configPath = dirname($documentRoot) . DIRECTORY_SEPARATOR . 'telegram-config.php';
}

$config = is_file($configPath) ? require $configPath : [];
$botToken = (string) (getenv('TELEGRAM_BOT_TOKEN') ?: ($config['bot_token'] ?? ''));
$chatId = (string) (getenv('TELEGRAM_CHAT_ID') ?: ($config['chat_id'] ?? ''));

if ($botToken === '' || $chatId === '') {
    error_log('Telegram inquiry handler is not configured');
    respond(503, ['ok' => false, 'message' => 'Сервис временно недоступен']);
}

if (!preg_match('/^\d+:[A-Za-z0-9_-]+$/', $botToken)) {
    error_log('Telegram inquiry handler has an invalid bot token');
    respond(503, ['ok' => false, 'message' => 'Сервис временно недоступен']);
}

$message = implode("\n", [
    'Новая заявка с bpla-zok.ru',
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'Почта: ' . $email,
    'Город: ' . $city,
    '',
    'Дата: ' . date('d.m.Y H:i'),
]);

$telegramUrl = 'https://api.telegram.org/bot' . $botToken . '/sendMessage';
$payload = json_encode([
    'chat_id' => $chatId,
    'text' => $message,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($payload === false || !function_exists('curl_init')) {
    error_log('Telegram inquiry handler requires PHP cURL');
    respond(503, ['ok' => false, 'message' => 'Сервис временно недоступен']);
}

$curl = curl_init($telegramUrl);
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
]);

$telegramResponse = curl_exec($curl);
$telegramStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($curl);
curl_close($curl);

$telegramResult = is_string($telegramResponse) ? json_decode($telegramResponse, true) : null;
if ($curlError !== '' || $telegramStatus !== 200 || !is_array($telegramResult) || !($telegramResult['ok'] ?? false)) {
    error_log('Telegram inquiry delivery failed: HTTP ' . $telegramStatus . ' ' . $curlError);
    respond(502, ['ok' => false, 'message' => 'Не удалось отправить заявку']);
}

respond(200, ['ok' => true]);
