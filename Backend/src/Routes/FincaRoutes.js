import express from "express";
import {
  crearFinca,
  obtenerFincas,
  obtenerFincaPorId,
  actualizarFinca,
  eliminarFinca
} from "../controller/FarmerController.js";

const router = express.Router();

router.post("/", crearFinca);
router.get("/", obtenerFincas);
router.get("/:id", obtenerFincaPorId);
router.put("/:id", actualizarFinca);
router.delete("/:id", eliminarFinca);

export default router;
