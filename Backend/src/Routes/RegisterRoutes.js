import express from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} from '../controller/RegisterController.js'; // <- agrega .js

const router = express.Router();

// Rutas CRUD de Usuario
router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;
