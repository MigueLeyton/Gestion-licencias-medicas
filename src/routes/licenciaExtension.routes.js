import { crearLicenciaExtensionController, obtenerLicenciaExtensionController, obtenerLicenciaExtensionPorIdController, actualizarLicenciaExtensionController, eliminarLicenciaExtensionController } from "../controllers/licenciaExtension.controller.js"; 
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/licencia-extension", verificarTokenMiddleware, crearLicenciaExtensionController);
router.get("/licencia-extension", verificarTokenMiddleware, obtenerLicenciaExtensionController);
router.get("/licencia-extension/:id", verificarTokenMiddleware, obtenerLicenciaExtensionPorIdController);
router.put("/licencia-extension/:id", verificarTokenMiddleware, actualizarLicenciaExtensionController);
router.delete("/licencia-extension/:id", verificarTokenMiddleware, eliminarLicenciaExtensionController);

export default router;