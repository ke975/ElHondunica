import express from "express";
import {
  crearCultivo,
  obtenerCultivos,
  obtenerCultivoPorId,
  actualizarCultivo,
  eliminarCultivo
} from "../controller/CropController.js";

const router = express.Router();

router.post("/", crearCultivo);
router.get("/", obtenerCultivos);
router.get("/:id", obtenerCultivoPorId);
router.put("/:id", actualizarCultivo);
router.delete("/:id", eliminarCultivo);

export default router;
