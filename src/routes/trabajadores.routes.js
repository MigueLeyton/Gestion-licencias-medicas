import { crearTrabajadorController, obtenerTrabajadoresController, obtenerTrabajadorPorIdController, actualizarTrabajadorController, eliminarTrabajadorController } from "../controllers/trabajadores.controller.js";
import { Router } from "express";

const router = Router();

router.post("/trabajadores", crearTrabajadorController);
router.get("/trabajadores", obtenerTrabajadoresController);
router.get("/trabajadores/:id", obtenerTrabajadorPorIdController);
router.put("/trabajadores/:id", actualizarTrabajadorController);
router.delete("/trabajadores/:id", eliminarTrabajadorController);

export default router;
