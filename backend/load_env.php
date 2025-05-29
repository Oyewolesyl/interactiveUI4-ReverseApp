<?php
function loadEnv($path) {
    if(!file_exists($path)) {
        throw new Exception(".env file not found at: $path");
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Parse the line
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        // Set as environment variable
        if (!empty($name)) {
            $_ENV[$name] = $value;
            putenv("$name=$value");
        }
    }
}

// Load the .env file from the current directory
$envPath = __DIR__ . '/.env';
loadEnv($envPath);
?>