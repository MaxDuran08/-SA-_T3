const db = require('../conecction/db');

// Obtener todos los CIs
exports.getAllCIs = async (req, res) => {
  try {
    const [rows] = await db.pool.query(`
      SELECT ci.*, t.nombre AS tipo, e.nombre AS ambiente
      FROM configuration_items ci
      LEFT JOIN ci_types t ON ci.tipo_id = t.id
      LEFT JOIN environments e ON ci.ambiente_id = e.id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener CIs:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener CI por ID
exports.getCIById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await db.pool.query(`
      SELECT * FROM configuration_items WHERE id = ?
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ message: 'CI no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener CI:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Crear nuevo CI
exports.createCI = async (req, res) => {
  const {
    nombre, tipo_id, descripcion, numero_serie, version,
    fecha_adquisicion, estado_actual, propietario, fecha_cambio,
    descripcion_cambio, documentacion, enlaces_incidentes, seguridad,
    cumplimiento, estado_configuracion, numero_licencia, fecha_vencimiento,
    ambiente_id
  } = req.body;

  try {
    const [result] = await db.pool.query(`
      INSERT INTO configuration_items (
        nombre, tipo_id, descripcion, numero_serie, version,
        fecha_adquisicion, estado_actual, propietario, fecha_cambio,
        descripcion_cambio, documentacion, enlaces_incidentes, seguridad,
        cumplimiento, estado_configuracion, numero_licencia, fecha_vencimiento,
        ambiente_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      nombre, tipo_id, descripcion, numero_serie, version,
      fecha_adquisicion, estado_actual, propietario, fecha_cambio,
      descripcion_cambio, documentacion, enlaces_incidentes, seguridad,
      cumplimiento, estado_configuracion, numero_licencia, fecha_vencimiento,
      ambiente_id
    ]);

    res.status(201).json({ message: 'CI creado exitosamente', id: result.insertId });
  } catch (err) {
    console.error('Error al crear CI:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar CI
exports.updateCI = async (req, res) => {
  const id = parseInt(req.params.id);
  const fields = req.body;

  const updates = Object.keys(fields).map((key, i) => `${key} = ?`).join(', ');
  const values = [...Object.values(fields), id];

  try {
    const [result] = await db.pool.query(
      `UPDATE configuration_items SET ${updates} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'CI no encontrado' });
    }

    res.json({ message: 'CI actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar CI:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Eliminar CI
exports.deleteCI = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [result] = await db.pool.query(
      'DELETE FROM configuration_items WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'CI no encontrado' });
    res.json({ message: 'CI eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar CI:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
