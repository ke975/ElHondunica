import express from "express";
import {
  crearLaborAgricola,
  obtenerLaboresAgricolas,
  obtenerLaborAgricolaPorId,
  actualizarLaborAgricola,
  eliminarLaborAgricola
} from "../controller/AgriculturalLabor.js";

const router = express.Router();

router.post("/", crearLaborAgricola);
router.get("/", obtenerLaboresAgricolas);
router.get("/:id", obtenerLaborAgricolaPorId);
router.put("/:id", actualizarLaborAgricola);
router.delete("/:id", eliminarLaborAgricola);

export default router;
