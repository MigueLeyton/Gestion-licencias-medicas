import { crearLugaresReposoController, obtenerLugaresReposoController, obtenerLugaresReposoPorIdController, actualizarLugaresReposoController, eliminarLugaresReposoController} from "../controllers/lugaresReposo.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con los lugares de reposo.
router.post("/lugares-reposo", verificarTokenMiddleware, crearLugaresReposoController);
router.get("/lugares-reposo", verificarTokenMiddleware, obtenerLugaresReposoController);
router.get("/lugares-reposo/:id", verificarTokenMiddleware, obtenerLugaresReposoPorIdController);
router.put("/lugares-reposo/:id", verificarTokenMiddleware, actualizarLugaresReposoController);
router.delete("/lugares-reposo/:id", verificarTokenMiddleware, verificarAdmin, eliminarLugaresReposoController);

export default router;