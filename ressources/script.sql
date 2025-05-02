CREATE DATABASE chat_poc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE chat_poc;

CREATE TABLE `User` (
 id INT AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(100) NOT NULL,
 last_name  VARCHAR(100) NOT NULL,
 email      VARCHAR(255) NOT NULL UNIQUE,
 password   VARCHAR(255) NOT NULL,
 role ENUM('CLIENT','SUPPORT') NOT NULL DEFAULT 'CLIENT'
) ENGINE=InnoDB;

CREATE TABLE Agency (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name    VARCHAR(100) NOT NULL,
 address TEXT,
 country VARCHAR(100),
 phone   VARCHAR(20),
 latitude  DECIMAL(10,6),
 longitude DECIMAL(10,6)
) ENGINE=InnoDB;

CREATE TABLE Vehicle (
 id INT AUTO_INCREMENT PRIMARY KEY,
 category      VARCHAR(50) NOT NULL,
 brand         VARCHAR(100),
 model         VARCHAR(100),
 acriss_code   CHAR(4),
 price_per_day DECIMAL(5,2) NOT NULL
 agency_id INT NOT NULL,
 FOREIGN KEY (agency_id) REFERENCES Agency(id)
) ENGINE=InnoDB;

CREATE TABLE Reservation (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id    INT NOT NULL,
 vehicle_id INT NOT NULL,
 start_datetime DATETIME NOT NULL,
 end_datetime   DATETIME NOT NULL,
 pickup_location  VARCHAR(255) NOT NULL,
 dropoff_location VARCHAR(255) NOT NULL,
 status VARCHAR(50) NOT NULL DEFAULT 'confirmed',
 total_price DECIMAL(10,2),
 FOREIGN KEY (user_id)    REFERENCES `User`(id)    ON DELETE CASCADE,
 FOREIGN KEY (vehicle_id) REFERENCES Vehicle(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE chat_thread (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL,
 status  ENUM('OPEN','CLOSED') NOT NULL DEFAULT 'OPEN',
 created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Message (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 sender_id   INT NOT NULL,
 receiver_id INT NOT NULL,
 thread_id   BIGINT NOT NULL,
 content     TEXT NOT NULL,
 timestamp   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 type ENUM('CHAT','FORMULAIRE') NOT NULL DEFAULT 'CHAT',
 FOREIGN KEY (sender_id)   REFERENCES `User`(id)       ON DELETE CASCADE,
 FOREIGN KEY (receiver_id) REFERENCES `User`(id)       ON DELETE CASCADE,
 FOREIGN KEY (thread_id)   REFERENCES ChatThread(id)   ON DELETE CASCADE,
 INDEX idx_thread_timestamp (thread_id, timestamp),
) ENGINE=InnoDB;
