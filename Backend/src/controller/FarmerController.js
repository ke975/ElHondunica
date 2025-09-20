import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear una finca
export const crearFinca = async (req, res) => {
  try {
    const { id_usuario, nombre, descripcion, latitud, longitud, area_total, direccion } = req.body;

    const finca = await prisma.finca.create({
      data: {
        id_usuario,
        nombre,
        descripcion,
        latitud,
        longitud,
        area_total,
        direccion
      }
    });

    res.status(201).json(finca);
  } catch (error) {
    console.error("Error al crear la finca:", error);
    res.status(500).json({ error: "Error al crear la finca" });
  }
};

// Obtener todas las fincas
export const obtenerFincas = async (req, res) => {
  try {
    const fincas = await prisma.finca.findMany({
      include: {
        usuario: true,
        cultivos: true,
        costos: true
      }
    });

    res.json(fincas);
  } catch (error) {
    console.error("Error al obtener las fincas:", error);
    res.status(500).json({ error: "Error al obtener las fincas" });
  }
};

// Obtener una finca por ID
export const obtenerFincaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const finca = await prisma.finca.findUnique({
      where: { id_finca: Number(id) },
      include: {
        usuario: true,
        cultivos: true,
        costos: true
      }
    });

    if (!finca) {
      return res.status(404).json({ error: "Finca no encontrada" });
    }

    res.json(finca);
  } catch (error) {
    console.error("Error al obtener la finca:", error);
    res.status(500).json({ error: "Error al obtener la finca" });
  }
};

// Actualizar finca
export const actualizarFinca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, latitud, longitud, area_total, direccion } = req.body;

    const finca = await prisma.finca.update({
      where: { id_finca: Number(id) },
      data: { nombre, descripcion, latitud, longitud, area_total, direccion }
    });

    res.json(finca);
  } catch (error) {
    console.error("Error al actualizar la finca:", error);
    res.status(500).json({ error: "Error al actualizar la finca" });
  }
};

// Eliminar finca
export const eliminarFinca = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.finca.delete({
      where: { id_finca: Number(id) }
    });

    res.json({ message: "Finca eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la finca:", error);
    res.status(500).json({ error: "Error al eliminar la finca" });
  }
};
