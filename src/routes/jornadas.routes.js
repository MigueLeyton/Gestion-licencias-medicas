import { crearJornadaController, obtenerJornadasController, obtenerJornadasPorIdController, actualizarJornadasController, eliminarJornadaController } from "../controllers/jornadas.controller.js"; 
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/jornadas", verificarTokenMiddleware, crearJornadaController);
router.get("/jornadas", verificarTokenMiddleware, obtenerJornadasController);
router.get("/jornadas/:id", verificarTokenMiddleware, obtenerJornadasPorIdController);
router.put("/jornadas/:id", verificarTokenMiddleware, actualizarJornadasController);
router.delete("/jornadas/:id", verificarTokenMiddleware, eliminarJornadaController);

export default router; 
