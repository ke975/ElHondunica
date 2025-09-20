import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

// Login
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, usuario.passwordHash);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({ token, usuario: { id: usuario.id_usuario, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: req.usuario.id },
      select: { id_usuario: true, nombre: true, email: true, rol: true, telefono: true }
    }); 
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }     
};