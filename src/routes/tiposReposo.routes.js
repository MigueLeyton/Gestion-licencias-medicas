import { crearTiposReposoController, obtenerTiposReposoController, obtenerTiposReposoPorIdController, actualizarTiposReposoController, eliminarTiposReposoController } from "../controllers/tiposReposo.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/tipos-reposo", verificarTokenMiddleware, crearTiposReposoController);
router.get("/tipos-reposo", verificarTokenMiddleware, obtenerTiposReposoController);
router.get("/tipos-reposo/:id", verificarTokenMiddleware, obtenerTiposReposoPorIdController);
router.put("/tipos-reposo/:id", verificarTokenMiddleware, actualizarTiposReposoController);
router.delete("/tipos-reposo/:id", verificarTokenMiddleware, eliminarTiposReposoController);  

export default router;