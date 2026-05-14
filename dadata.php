<?php

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

$query = trim($_GET['query'] ?? '');

if (!$query) {
    echo json_encode([]);
    exit;
}

$url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

$data = [
    'query' => $query,
    'count' => 5,

    // ограничение по радиусу
    'locations_geo' => [
        [
            'lat' => 55.7558,
            'lon' => 37.6176,
            'radius_meters' => 100000
        ]
    ]
];

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Token ' . DADATA_TOKEN,
        'X-Secret: ' . DADATA_SECRET
    ],
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);

curl_close($ch);

echo $response;