import { crearLicenciaController, obtenerLicenciaController, obtenerLicenciaPorIdController, actualizarLicenciaController, eliminarLicenciaController } from "../controllers/licencias.controller.js"; 
import { Router } from "express"; 
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con las licencias médicas.
router.post("/licencias", verificarTokenMiddleware, crearLicenciaController);
router.get("/licencias", verificarTokenMiddleware, obtenerLicenciaController);
router.get("/licencias/:id", verificarTokenMiddleware, obtenerLicenciaPorIdController);
router.put("/licencias/:id", verificarTokenMiddleware, actualizarLicenciaController);
router.delete("/licencias/:id", verificarTokenMiddleware, verificarAdmin, eliminarLicenciaController);

export default router;