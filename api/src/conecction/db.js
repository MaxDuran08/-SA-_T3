const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

async function connectWithRetry(maxRetries = 5, delay = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      pool = mysql.createPool(dbConfig);
      const connection = await pool.getConnection();
      console.log('Conexión a la base de datos MySQL exitosa');
      connection.release();
      break;
    } catch (err) {
      console.error(`Intento ${i + 1} fallido:`, err.stack);
      if (i < maxRetries - 1) {
        console.log(`Reintentando en ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('No se pudo conectar a la base de datos después de varios intentos');
      }
    }
  }
}

connectWithRetry();

module.exports = {
  getConnection: () => pool.getConnection(),
  pool
};
