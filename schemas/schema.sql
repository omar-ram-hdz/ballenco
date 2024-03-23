-- Crear Base de datos
DROP DATABASE IF EXISTS ballenco;
CREATE DATABASE IF NOT EXISTS ballenco;

-- Usar base de datos
USE ballenco;

-- 
CREATE TABLE users(
	id BINARY PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    mail VARCHAR(80) UNIQUE NOT NULL,
    pass BLOB NOT NULL,
    nip INT
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE cards(
	id BINARY PRIMARY KEY,
	numero BLOB NOT NULL,
    cvv BLOB NOT NULL,
    activa BOOL DEFAULT TRUE,
    vencimiento DATE NOT NULL,
    saldo DOUBLE DEFAULT 0.0,
    usuario BINARY NOT NULL,
    FOREIGN KEY(usuario) REFERENCES users(id)
);
CREATE TABLE movimientos(
	id BINARY PRIMARY KEY,
	origen BINARY NOT NULL,
    destino BINARY NOT NULL,
    fecha DATETIME NOT NULL,
    monto DOUBLE NOT NULL,
    FOREIGN KEY(origen) REFERENCES cards(id), 
    FOREIGN KEY(destino) REFERENCES cards(id) 
);