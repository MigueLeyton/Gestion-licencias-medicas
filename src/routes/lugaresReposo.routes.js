import { crearLugaresReposoController, obtenerLugaresReposoController, obtenerLugaresReposoPorIdController, actualizarLugaresReposoController, eliminarLugaresReposoController} from "../controllers/lugaresReposo.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/lugares-reposo", verificarTokenMiddleware, crearLugaresReposoController);
router.get("/lugares-reposo", verificarTokenMiddleware, obtenerLugaresReposoController);
router.get("/lugares-reposo/:id", verificarTokenMiddleware, obtenerLugaresReposoPorIdController);
router.put("/lugares-reposo/:id", verificarTokenMiddleware, actualizarLugaresReposoController);
router.delete("/lugares-reposo/:id", verificarTokenMiddleware, eliminarLugaresReposoController);

export default router;