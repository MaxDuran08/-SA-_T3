CREATE DATABASE IF NOT EXISTS cmdb;
USE cmdb;

CREATE TABLE ci_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE environments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE configuration_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo_id INT,
    descripcion TEXT,
    numero_serie VARCHAR(100),
    version VARCHAR(50),
    fecha_adquisicion DATE,
    estado_actual VARCHAR(50),
    propietario VARCHAR(100),
    fecha_cambio DATE,
    descripcion_cambio TEXT,
    documentacion TEXT,
    enlaces_incidentes TEXT,
    seguridad VARCHAR(50),
    cumplimiento VARCHAR(50),
    estado_configuracion VARCHAR(50),
    numero_licencia VARCHAR(100),
    fecha_vencimiento DATE,
    ambiente_id INT,
    FOREIGN KEY (tipo_id) REFERENCES ci_types(id),
    FOREIGN KEY (ambiente_id) REFERENCES environments(id)
);

CREATE TABLE ci_relationships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_padre_id INT,
    ci_hijo_id INT,
    tipo_relacion VARCHAR(100),
    FOREIGN KEY (ci_padre_id) REFERENCES configuration_items(id),
    FOREIGN KEY (ci_hijo_id) REFERENCES configuration_items(id)
);

CREATE TABLE ci_audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_id INT,
    accion VARCHAR(50),
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ci_id) REFERENCES configuration_items(id)
);
