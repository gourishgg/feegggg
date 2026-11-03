-- MySQL Setup Script for Desh Dekho Weather Portal
-- Run this script as MySQL root user to set up the database and user

-- Option 1: If you know the root password, just update .env with it
-- DB_PASSWORD=your_actual_root_password

-- Option 2: Create a dedicated user for the application (recommended for production)
-- Run these commands in MySQL:

-- CREATE DATABASE IF NOT EXISTS desh_dekho CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CREATE USER IF NOT EXISTS 'desh_dekho_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- GRANT ALL PRIVILEGES ON desh_dekho.* TO 'desh_dekho_user'@'localhost';

-- FLUSH PRIVILEGES;

-- Then update .env with:
-- DB_USER=desh_dekho_user
-- DB_PASSWORD=your_secure_password

-- Option 3: Reset root password if forgotten (requires MySQL restart with --skip-grant-tables)
-- See: https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html