-- Демонстрационные данные для SQL тренажера
-- Этот файл используется для инициализации H2 базы данных

-- Создание таблицы citizens для демонстрации
CREATE TABLE IF NOT EXISTS citizens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_seen TIMESTAMP,
    is_alien BOOLEAN DEFAULT FALSE
);

-- Вставка демонстрационных данных
INSERT INTO citizens (name, last_seen, is_alien) VALUES
('John Doe', '2024-01-15 10:30:00', FALSE),
('Jane Smith', '2024-01-15 09:15:00', FALSE),
('Bob Johnson', '2024-01-14 22:45:00', TRUE),
('Alice Brown', '2024-01-15 08:20:00', FALSE),
('Charlie Wilson', '2024-01-14 23:30:00', TRUE);

-- Создание таблицы access_logs для демонстрации
CREATE TABLE IF NOT EXISTS access_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(15) NOT NULL,
    time TIMESTAMP NOT NULL,
    action VARCHAR(100) NOT NULL
);

-- Вставка демонстрационных данных для access_logs
INSERT INTO access_logs (ip, time, action) VALUES
('192.168.1.100', '2024-01-15 02:15:00', 'data_download'),
('192.168.1.101', '2024-01-15 03:30:00', 'data_download'),
('192.168.1.100', '2024-01-15 02:45:00', 'data_download'),
('192.168.1.102', '2024-01-15 14:20:00', 'login'),
('192.168.1.103', '2024-01-15 15:10:00', 'logout');
