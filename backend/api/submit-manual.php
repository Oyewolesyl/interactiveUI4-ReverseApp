<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['brand', 'condition', 'pairs'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = "Field '$field' is required";
    }
}

// Validate pairs is a positive number
if (!empty($input['pairs']) && (!is_numeric($input['pairs']) || $input['pairs'] <= 0)) {
    $errors[] = "Pairs must be a positive number";
}

// Return validation errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Validation failed', 'details' => $errors]);
    exit();
}

// Sanitize input data
$data = [
    'brand' => htmlspecialchars(trim($input['brand'])),
    'condition' => htmlspecialchars(trim($input['condition'])),
    'pairs' => (int)$input['pairs'],
    'reward' => htmlspecialchars(trim($input['reward'] ?? 'voucher')),
    'created_at' => date('Y-m-d H:i:s'),
    'unique_code' => generateUniqueCode()
];

// Calculate estimated reward based on condition and pairs
$estimated_reward = calculateReward($data['condition'], $data['pairs']);

try {
    // Save to database
    $submission_id = saveSubmission($data);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Submission successful',
        'data' => [
            'id' => $submission_id,
            'unique_code' => $data['unique_code'],
            'estimated_reward' => $estimated_reward,
            'currency' => 'GBP'
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}

function generateUniqueCode() {
    return 'SRC-' . strtoupper(substr(uniqid(), -8));
}

function calculateReward($condition, $pairs) {
    $base_reward = 10; // £10 per pair base
    
    $condition_multipliers = [
        'new' => 1.5,
        'like-new' => 1.3,
        'good' => 1.0,
        'fair' => 0.7,
        'poor' => 0.4
    ];
    
    $multiplier = $condition_multipliers[$condition] ?? 1.0;
    return round($base_reward * $pairs * $multiplier, 2);
}

function saveSubmission($data) {
    // Database configuration
    $host = $_ENV['DB_HOST'] ?? 'localhost';
    $dbname = $_ENV['DB_NAME'] ?? 'shoe_recycling';
    $username = $_ENV['DB_USER'] ?? 'root';
    $password = $_ENV['DB_PASS'] ?? '';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "INSERT INTO submissions (brand, condition_type, pairs, reward_type, unique_code, created_at) 
                VALUES (:brand, :condition, :pairs, :reward, :unique_code, :created_at)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':brand' => $data['brand'],
            ':condition' => $data['condition'],
            ':pairs' => $data['pairs'],
            ':reward' => $data['reward'],
            ':unique_code' => $data['unique_code'],
            ':created_at' => $data['created_at']
        ]);
        
        return $pdo->lastInsertId();
        
    } catch (PDOException $e) {
        throw new Exception("Database error: " . $e->getMessage());
    }
}
?>