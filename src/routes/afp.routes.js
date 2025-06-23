import { crearAfpController, obtenerAfpController, obtenerAfpPorIdController, actualizarAfpController, eliminarAfpController } from "../controllers/afp.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/afp", verificarTokenMiddleware, crearAfpController);
router.get("/afp", verificarTokenMiddleware, obtenerAfpController);
router.get("/afp/:id", verificarTokenMiddleware, obtenerAfpPorIdController);
router.get("/afp/fecha", verificarTokenMiddleware, obtenerAfpController);
router.put("/afp/:id", verificarTokenMiddleware, actualizarAfpController);
router.delete("/afp/:id", verificarTokenMiddleware, eliminarAfpController);

export default router;
