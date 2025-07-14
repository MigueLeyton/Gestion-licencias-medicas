import { crearProfesionalController, obtenerProfesionalesController, obtenerProfesionalesPorIdController, actualizarProfesionalController, eliminarProfesionalContoller } from "../controllers/profesional.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con los profesionales.
router.post("/profesionales", verificarTokenMiddleware, crearProfesionalController);
router.get("/profesionales", verificarTokenMiddleware, obtenerProfesionalesController);
router.get("/profesionales/:id", verificarTokenMiddleware, obtenerProfesionalesPorIdController);
router.put("/profesionales/:id", verificarTokenMiddleware, actualizarProfesionalController);
router.delete("/profesionales/:id", verificarTokenMiddleware, verificarAdmin, eliminarProfesionalContoller); 

export default router; 