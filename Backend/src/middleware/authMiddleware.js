import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para verificar token
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware para verificar rol
export const verificarRol = (rolesPermitidos = []) => (req, res, next) => {
  if (!req.usuario) return res.status(401).json({ error: 'Usuario no autenticado' });
  if (!rolesPermitidos.includes(req.usuario.rol))
    return res.status(403).json({ error: 'No tienes permiso para acceder a este recurso' });
  next();
};
