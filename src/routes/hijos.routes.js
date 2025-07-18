import { crearHijosController, obtenerHijosPorTrabajadorController, actualizarHijoController, eliminarHijoController } from "../controllers/hijos.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con los hijos de los trabajadores.
router.post("/hijos", verificarTokenMiddleware, crearHijosController);
router.get("/hijos/:trabajador_id", verificarTokenMiddleware, obtenerHijosPorTrabajadorController);
router.get("/hijos/:id", verificarTokenMiddleware, obtenerHijosPorTrabajadorController);
router.put("/hijos/:id", verificarTokenMiddleware, actualizarHijoController);
router.delete("/hijos/:id", verificarTokenMiddleware, verificarAdmin, eliminarHijoController);

export default router;