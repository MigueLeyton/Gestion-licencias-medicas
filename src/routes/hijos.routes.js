import { crearHijosController, obtenerHijosPorTrabajadorController, actualizarHijoController, eliminarHijoController } from "../controllers/hijos.controller.js";
import { Router } from "express";

const router = Router();

router.post("/hijos", crearHijosController);
router.get("/hijos/id", obtenerHijosPorTrabajadorController);
router.put("/hijos/:id", actualizarHijoController);
router.delete("/hijos/:id", eliminarHijoController);

export default router;