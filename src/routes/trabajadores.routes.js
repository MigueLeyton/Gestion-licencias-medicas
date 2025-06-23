import { crearTrabajadorController, obtenerTrabajadoresController, obtenerTrabajadorPorIdController, actualizarTrabajadorController, eliminarTrabajadorController } from "../controllers/trabajadores.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js"; 

const router = Router();

router.post("/trabajadores", verificarTokenMiddleware, crearTrabajadorController);
router.get("/trabajadores", verificarTokenMiddleware, obtenerTrabajadoresController);
router.get("/trabajadores/:id", verificarTokenMiddleware, obtenerTrabajadorPorIdController);
router.put("/trabajadores/:id", verificarTokenMiddleware, actualizarTrabajadorController);
router.delete("/trabajadores/:id", verificarTokenMiddleware, eliminarTrabajadorController);

export default router;
