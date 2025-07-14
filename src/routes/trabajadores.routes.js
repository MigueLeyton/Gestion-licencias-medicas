import { crearTrabajadorController, obtenerTrabajadoresController, obtenerTrabajadorPorIdController, actualizarTrabajadorController, eliminarTrabajadorController } from "../controllers/trabajadores.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js"; 
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con los trabajadores.
router.post("/trabajadores", verificarTokenMiddleware, crearTrabajadorController);
router.get("/trabajadores", verificarTokenMiddleware, obtenerTrabajadoresController);
router.get("/trabajadores/:id", verificarTokenMiddleware, obtenerTrabajadorPorIdController);
router.put("/trabajadores/:id", verificarTokenMiddleware, actualizarTrabajadorController);
router.delete("/trabajadores/:id", verificarTokenMiddleware, verificarAdmin, eliminarTrabajadorController);

export default router;
