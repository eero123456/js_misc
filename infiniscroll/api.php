<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit();
}

if (!isset($_GET["startID"]) || !is_numeric($_GET["startID"])) {
    http_response_code(400);
    exit("no startID specified");
}

$startID = (int) ($_GET["startID"]);

if ($startID > 100) {
    http_response_code(400);
    exit("startID must be less than 100");
}

$amount = 10;

if (isset($_GET["amount"]) && is_numeric($_GET["amount"])) {
    $amount = (int) ($_GET["amount"]);
    $amount = min($amount, 10);
}


$data = [];

for ($i = 0; $i < $amount; $i++) {

    if ($startID + $i > 100)
        break;

    $data[$i] = [
        'id' => $startID + $i,
        'text' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        'likes' => rand(1, 100)
    ];
}

$json = json_encode(
    array(
        "id" => $startID,
        "amount" => $amount,
        "cards" => $data
    )
);


if (json_last_error() != JSON_ERROR_NONE) {
    http_response_code(400);
    exit();
}

sleep(1);

header('Content-Type: application/json; charset=utf-8');
echo $json;
