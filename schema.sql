CREATE DATABASE IF NOT EXISTS support_ticket_db;
USE support_ticket_db;

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'low',

    status ENUM(
        'open',
        'in_progress',
        'resolved',
        'closed'
    ) DEFAULT 'open',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);