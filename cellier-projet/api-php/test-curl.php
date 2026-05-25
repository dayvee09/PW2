<?php
header('Content-Type: application/json');
echo json_encode([
    'curl_init' => function_exists('curl_init'),
    'sapi' => php_sapi_name(),
    'php_version' => PHP_VERSION,
]);
