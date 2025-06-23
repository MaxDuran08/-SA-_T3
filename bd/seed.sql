INSERT INTO ci_types (id, nombre) VALUES
  (1, 'Servidor'),
  (2, 'Base de Datos'),
  (3, 'Aplicación'),
  (4, 'Servicio'),
  (5, 'Dispositivo de Red');
INSERT INTO environments (id, nombre) VALUES
  (1, 'DEV'),
  (2, 'QA'),
  (3, 'PROD');
INSERT INTO configuration_items (
  nombre, tipo_id, descripcion, numero_serie, version,
  fecha_adquisicion, estado_actual, propietario, fecha_cambio,
  descripcion_cambio, documentacion, enlaces_incidentes, seguridad,
  cumplimiento, estado_configuracion, numero_licencia, fecha_vencimiento,
  ambiente_id
) VALUES
  ('Servidor Web 01', 1, 'Servidor Apache para frontend', 'SN123456', '2.4.57',
   '2022-01-15', 'Activo', 'admin01', '2024-06-01',
   'Actualización de SO', 'http://wiki/doc1', 'http://jira/inc123', 'Alto',
   'ISO27001', 'Configurado', 'LIC-001', '2026-01-01', 1),

  ('Base de Datos Clientes', 2, 'Base de datos PostgreSQL para clientes', 'DB998877', '14.5',
   '2021-10-10', 'Activo', 'dba01', '2024-05-10',
   'Migración a nueva versión', 'http://wiki/doc2', 'http://jira/inc456', 'Medio',
   'PCI DSS', 'Configurado', 'LIC-002', '2025-12-31', 3),

  ('Aplicación CRM', 3, 'Aplicación de gestión de relaciones con clientes', 'APP-01', 'v3.2.1',
   '2023-03-20', 'Mantenimiento', 'devteam', '2024-04-05',
   'Patch de seguridad aplicado', 'http://wiki/doc3', 'http://jira/inc789', 'Alto',
   'SOX', 'Configurado', 'LIC-003', '2026-03-31', 2);