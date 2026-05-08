CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  author VARCHAR(100) NOT NULL,
  genre VARCHAR(80) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, genre, price, stock) VALUES
('Cien anos de soledad', 'Gabriel Garcia Marquez', 'Realismo magico', 289.00, 8),
('El principito', 'Antoine de Saint-Exupery', 'Fabula', 145.50, 15),
('Clean Code', 'Robert C. Martin', 'Programacion', 650.00, 5);
