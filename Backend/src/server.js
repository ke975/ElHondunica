import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import registerRoutes from '../src/Routes/RegisterRoutes.js';
import authRoutes from '../src/Routes/login.js';
import FarmerRoutes from '../src/Routes/FincaRoutes.js';
import CropRoutes from '../src/Routes/CropRoutes.js';
import AgriculturalRoutes from '../src/Routes/Agriculturalroutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Prefijo de rutas
app.use('/api/usuarios', registerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/fincas', FarmerRoutes);
app.use('/api/cultivos', CropRoutes);
app.use('/api/labor-agricola', AgriculturalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
