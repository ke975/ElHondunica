import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear cultivo
export const crearCultivo = async (req, res) => {
  try {
    const {
      id_finca,
      nombreCultivo,
      tipoCultivo,
      variedad,
      areaAsignada,
      fechaInicio,
      fechaFin,
      estado
    } = req.body;

    const cultivo = await prisma.cultivo.create({
      data: {
        id_finca,
        nombreCultivo,
        tipoCultivo,
        variedad,
        areaAsignada,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
        fechaFin: fechaFin ? new Date(fechaFin) : undefined,
        estado
      }
    });

    res.status(201).json(cultivo);
  } catch (error) {
    console.error("Error al crear el cultivo:", error);
    res.status(500).json({ error: "Error al crear el cultivo" });
  }
};

// Obtener todos los cultivos
export const obtenerCultivos = async (req, res) => {
  try {
    const cultivos = await prisma.cultivo.findMany({
      include: {
        finca: true,
        labores: true,
        manejos: true,
        aplicaciones: true,
        cosechas: true,
        costosAdicional: true,
        analisis: true
      }
    });

    res.json(cultivos);
  } catch (error) {
    console.error("Error al obtener cultivos:", error);
    res.status(500).json({ error: "Error al obtener cultivos" });
  }
};

// Obtener cultivo por ID
export const obtenerCultivoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cultivo = await prisma.cultivo.findUnique({
      where: { id_cultivo: Number(id) },
      include: {
        finca: true,
        labores: true,
        manejos: true,
        aplicaciones: true,
        cosechas: true,
        costosAdicional: true,
        analisis: true
      }
    });

    if (!cultivo) {
      return res.status(404).json({ error: "Cultivo no encontrado" });
    }

    res.json(cultivo);
  } catch (error) {
    console.error("Error al obtener el cultivo:", error);
    res.status(500).json({ error: "Error al obtener el cultivo" });
  }
};

// Actualizar cultivo
export const actualizarCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombreCultivo,
      tipoCultivo,
      variedad,
      areaAsignada,
      fechaInicio,
      fechaFin,
      estado
    } = req.body;

    const cultivo = await prisma.cultivo.update({
      where: { id_cultivo: Number(id) },
      data: {
        nombreCultivo,
        tipoCultivo,
        variedad,
        areaAsignada,
        fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined,
        fechaFin: fechaFin ? new Date(fechaFin) : undefined,
        estado
      }
    });

    res.json(cultivo);
  } catch (error) {
    console.error("Error al actualizar el cultivo:", error);
    res.status(500).json({ error: "Error al actualizar el cultivo" });
  }
};

// Eliminar cultivo
export const eliminarCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cultivo.delete({
      where: { id_cultivo: Number(id) }
    });

    res.json({ message: "Cultivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el cultivo:", error);
    res.status(500).json({ error: "Error al eliminar el cultivo" });
  }
};
