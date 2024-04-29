<?php

function cors()
{

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
}

cors();

// var_dump($_SERVER);

$path_info = $_SERVER['PATH_INFO'] ?? '/';

header("Content-Type: application/json");
if ($path_info == '/configs') {

    echo json_encode([
        'configs' => [
            '1688' => [
                'btn_wrapper_order' => '.order-button-wrapper',
                'btn_order' => 'div.detail-affix-sku-wrapper > .order-button-wrapper',
            ]
        ]
    ]);
} else {
    echo json_encode([
        'status' => 200
    ]);
}
