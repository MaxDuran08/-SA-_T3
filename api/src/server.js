const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const frontendurl = process.env.FRONTEND_URL;


// CORS
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            `http://${frontendurl}`,
            `http://${frontendurl}:80`,
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Remove Permissions-Policy header if set
app.use((req, res, next) => {
    res.removeHeader('Permissions-Policy');
    next();
})


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`IP: ${req.ip} - ${req.method} ${req.url}`);
  next();
});

// Ruta base
app.get('/', (req, res) => {
    res.send('Servidor backend activo');
});

// Rutas
app.use('/api/user', userRoutes);

// Escuchar en todas las interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
}).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err.message);
});