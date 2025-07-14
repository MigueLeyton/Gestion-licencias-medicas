import { crearTiposReposoController, obtenerTiposReposoController, obtenerTiposReposoPorIdController, actualizarTiposReposoController, eliminarTiposReposoController } from "../controllers/tiposReposo.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con los tipos de reposo.
router.post("/tipos-reposo", verificarTokenMiddleware, crearTiposReposoController);
router.get("/tipos-reposo", verificarTokenMiddleware, obtenerTiposReposoController);
router.get("/tipos-reposo/:id", verificarTokenMiddleware, obtenerTiposReposoPorIdController);
router.put("/tipos-reposo/:id", verificarTokenMiddleware, actualizarTiposReposoController);
router.delete("/tipos-reposo/:id", verificarTokenMiddleware, verificarAdmin, eliminarTiposReposoController);  

export default router;