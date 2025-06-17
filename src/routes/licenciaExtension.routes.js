import { crearLicenciaExtensionController, obtenerLicenciaExtensionController, obtenerLicenciaExtensionPorIdController, actualizarLicenciaExtensionController, eliminarLicenciaExtensionController } from "../controllers/licenciaExtension.controller.js"; 
import { Router } from "express";

const router = Router();

router.post("/licencia-extension", crearLicenciaExtensionController);
router.get("/licencia-extension", obtenerLicenciaExtensionController);
router.get("/licencia-extension/:id", obtenerLicenciaExtensionPorIdController);
router.put("/licencia-extension/:id", actualizarLicenciaExtensionController);
router.delete("/licencia-extension/:id", eliminarLicenciaExtensionController);

export default router;