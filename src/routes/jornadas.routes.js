import { crearJornadaController, obtenerJornadasController, obtenerJornadasPorIdController, actualizarJornadasController, eliminarJornadaController } from "../controllers/jornadas.controller.js"; 
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con las jornadas laborales.
router.post("/jornadas", verificarTokenMiddleware, crearJornadaController);
router.get("/jornadas", verificarTokenMiddleware, obtenerJornadasController);
router.get("/jornadas/:id", verificarTokenMiddleware, obtenerJornadasPorIdController);
router.put("/jornadas/:id", verificarTokenMiddleware, actualizarJornadasController);
router.delete("/jornadas/:id", verificarTokenMiddleware, verificarAdmin, eliminarJornadaController);

export default router; 
