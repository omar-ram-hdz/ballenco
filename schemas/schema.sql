-- Crear Base de datos
DROP DATABASE IF EXISTS ballenco;
CREATE DATABASE IF NOT EXISTS ballenco;

-- Usar base de datos
USE ballenco;

-- 
CREATE TABLE users(
	id BINARY(16) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
    year_birthday VARCHAR(4) NOT NULL,
    mail VARCHAR(80) UNIQUE NOT NULL,
    pass BLOB NOT NULL,
    nip INT
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE cards(
	id BINARY(16) PRIMARY KEY,
	numero BLOB NOT NULL,
    cvv BLOB NOT NULL,
    activa BOOL DEFAULT TRUE,
    year_expiration INT NOT NULL,
    month_expiration INT NOT NULL,
    saldo DOUBLE DEFAULT 0.0,
    usuario BINARY(16) NOT NULL,
    FOREIGN KEY(usuario) REFERENCES users(id)
);
CREATE TABLE movimientos(
	id BINARY(16) PRIMARY KEY,
	origen BINARY(16) NOT NULL,
    destino BLOB NOT NULL,
    fecha DATETIME NOT NULL,
    monto DOUBLE NOT NULL,
    FOREIGN KEY(origen) REFERENCES cards(id), 
);