import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol, telefono } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: { nombre, email, passwordHash, rol, telefono },
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: parseInt(id) },
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol, telefono } = req.body;

    const dataToUpdate = { nombre, email, rol, telefono };
    if (password) {
      dataToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id_usuario: parseInt(id) },
      data: dataToUpdate,
    });

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({
      where: { id_usuario: parseInt(id) },
    });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
