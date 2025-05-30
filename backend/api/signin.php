<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Adjust this for your domain in production
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email'], $input['nickname'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing email or nickname']);
    exit;
}

$email = trim($input['email']);
$nickname = trim($input['nickname']);

// Dummy list of accepted users (replace with DB or real auth)
$validUsers = [
    ['email' => 'r0899055@student.thomasmore.be', 'nickname' => 'Sylvia'],
    ['email' => 'user2@example.com', 'nickname' => 'Alice'],
    ['email' => 'user3@example.com', 'nickname' => 'Bob'],
];

// Check if user exists with matching email and nickname
$authenticated = false;
foreach ($validUsers as $user) {
    if (strcasecmp($user['email'], $email) === 0 && strcasecmp($user['nickname'], $nickname) === 0) {
        $authenticated = true;
        break;
    }
}

if ($authenticated) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Incorrect email or nickname']);
}
