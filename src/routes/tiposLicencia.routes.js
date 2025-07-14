import { crearTiposLicenciaController, obtenerTiposLicenciaController, obtenerTiposLicenciaPorIdController, actualizarTiposLicenciaController, eliminarTiposLicenciaController } from "../controllers/tiposLicencia.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con los tipos de licencia.
router.post("/tipos-licencia", verificarTokenMiddleware, crearTiposLicenciaController);
router.get("/tipos-licencia", verificarTokenMiddleware, obtenerTiposLicenciaController);
router.get("/tipos-licencia/:id", verificarTokenMiddleware, obtenerTiposLicenciaPorIdController);
router.put("/tipos-licencia/:id", verificarTokenMiddleware, actualizarTiposLicenciaController);
router.delete("/tipos-licencia/:id", verificarTokenMiddleware, verificarAdmin, eliminarTiposLicenciaController);
  
export default router;