CREATE DATABASE IF NOT EXISTS shoe_recycling;
USE shoe_recycling;

CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    condition_type VARCHAR(20) NOT NULL,
    pairs INT NOT NULL,
    reward_type VARCHAR(20) NOT NULL DEFAULT 'voucher',
    unique_code VARCHAR(20) UNIQUE NOT NULL,
    estimated_reward DECIMAL(10,2) NULL,
    status ENUM('pending', 'processed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_unique_code (unique_code),
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS reward_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    condition_type VARCHAR(20) NOT NULL,
    base_rate DECIMAL(5,2) NOT NULL,
    multiplier DECIMAL(3,2) NOT NULL DEFAULT 1.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_condition (condition_type)
);

INSERT INTO reward_rates (condition_type, base_rate, multiplier) VALUES
('new', 10.00, 1.50),
('like-new', 10.00, 1.30),
('good', 10.00, 1.00),
('fair', 10.00, 0.70),
('poor', 10.00, 0.40)
ON DUPLICATE KEY UPDATE 
    base_rate = VALUES(base_rate),
    multiplier = VALUES(multiplier);