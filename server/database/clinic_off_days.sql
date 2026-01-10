-- Create clinic_off_days table
CREATE TABLE IF NOT EXISTS `clinic_off_days` (
  `id` int NOT NULL AUTO_INCREMENT,
  `off_date` date NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_off_date` (`off_date`),
  KEY `idx_off_date` (`off_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
