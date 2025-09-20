import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear labor agrícola
export const crearLaborAgricola = async (req, res) => {
  try {
    const { id_cultivo, tipoLabor, descripcion, fecha, costo, duracionHoras, realizadoPor } = req.body;

    const labor = await prisma.laborAgricola.create({
      data: {
        id_cultivo,
        tipoLabor,
        descripcion,
        fecha: new Date(fecha),
        costo,
        duracionHoras,
        realizadoPor
      }
    });

    res.status(201).json(labor);
  } catch (error) {
    console.error("Error al crear la labor agrícola:", error);
    res.status(500).json({ error: "Error al crear la labor agrícola" });
  }
};

// Obtener todas las labores agrícolas
export const obtenerLaboresAgricolas = async (req, res) => {
  try {
    const labores = await prisma.laborAgricola.findMany({
      include: {
        cultivo: true,
        usuario: true
      }
    });

    res.json(labores);
  } catch (error) {
    console.error("Error al obtener las labores agrícolas:", error);
    res.status(500).json({ error: "Error al obtener las labores agrícolas" });
  }
};

// Obtener labor agrícola por ID
export const obtenerLaborAgricolaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const labor = await prisma.laborAgricola.findUnique({
      where: { id_labor: Number(id) },
      include: {
        cultivo: true,
        usuario: true
      }
    });

    if (!labor) {
      return res.status(404).json({ error: "Labor agrícola no encontrada" });
    }

    res.json(labor);
  } catch (error) {
    console.error("Error al obtener la labor agrícola:", error);
    res.status(500).json({ error: "Error al obtener la labor agrícola" });
  }
};

// Actualizar labor agrícola
export const actualizarLaborAgricola = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipoLabor, descripcion, fecha, costo, duracionHoras, realizadoPor } = req.body;

    const labor = await prisma.laborAgricola.update({
      where: { id_labor: Number(id) },
      data: {
        tipoLabor,
        descripcion,
        fecha: fecha ? new Date(fecha) : undefined,
        costo,
        duracionHoras,
        realizadoPor
      }
    });

    res.json(labor);
  } catch (error) {
    console.error("Error al actualizar la labor agrícola:", error);
    res.status(500).json({ error: "Error al actualizar la labor agrícola" });
  }
};

// Eliminar labor agrícola
export const eliminarLaborAgricola = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.laborAgricola.delete({
      where: { id_labor: Number(id) }
    });

    res.json({ message: "Labor agrícola eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la labor agrícola:", error);
    res.status(500).json({ error: "Error al eliminar la labor agrícola" });
  }
};
