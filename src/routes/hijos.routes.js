import { crearHijosController, obtenerHijosPorTrabajadorController, actualizarHijoController, eliminarHijoController } from "../controllers/hijos.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/hijos", verificarTokenMiddleware, crearHijosController);
router.get("/hijos/:trabajador_id", verificarTokenMiddleware, obtenerHijosPorTrabajadorController);
router.get("/hijos/:id", verificarTokenMiddleware, obtenerHijosPorTrabajadorController);
router.put("/hijos/:id", verificarTokenMiddleware, actualizarHijoController);
router.delete("/hijos/:id", verificarTokenMiddleware, eliminarHijoController);

export default router;