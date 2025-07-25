import { crearLicenciaExtensionController, obtenerLicenciaExtensionController, obtenerLicenciaExtensionPorIdController, actualizarLicenciaExtensionController, eliminarLicenciaExtensionController } from "../controllers/licenciaExtension.controller.js"; 
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con las extensiones de licencias médicas.
router.post("/licencia-extension", verificarTokenMiddleware, crearLicenciaExtensionController);
router.get("/licencia-extension", verificarTokenMiddleware, obtenerLicenciaExtensionController);
router.get("/licencia-extension/:id", verificarTokenMiddleware, obtenerLicenciaExtensionPorIdController);
router.put("/licencia-extension/:id", verificarTokenMiddleware, actualizarLicenciaExtensionController);
router.delete("/licencia-extension/:id", verificarTokenMiddleware, verificarAdmin, eliminarLicenciaExtensionController);

export default router;