<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get unique code from query parameter
$unique_code = $_GET['code'] ?? '';

if (empty($unique_code)) {
    http_response_code(400);
    echo json_encode(['error' => 'Unique code is required']);
    exit();
}

try {
    $submission = getSubmissionByCode($unique_code);
    
    if (!$submission) {
        http_response_code(404);
        echo json_encode(['error' => 'Submission not found']);
        exit();
    }
    
    echo json_encode([
        'success' => true,
        'data' => $submission
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}

function getSubmissionByCode($unique_code) {
    // Database configuration
    $host = $_ENV['DB_HOST'] ?? 'localhost';
    $dbname = $_ENV['DB_NAME'] ?? 'shoe_recycling';
    $username = $_ENV['DB_USER'] ?? 'root';
    $password = $_ENV['DB_PASS'] ?? '';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "SELECT * FROM submissions WHERE unique_code = :code";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':code' => $unique_code]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
        
    } catch (PDOException $e) {
        throw new Exception("Database error: " . $e->getMessage());
    }
}
?>