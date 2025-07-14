import { crearEstadoLicenciaController, obtenerEstadoLicenciaPorIdController, obtenerEstadosLicenciaController, actualizarEstadoLicenciaController, eliminarEstadoLicenciaController } from "../controllers/estadosLicencia.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con los estados de licencia médica.
router.post("/estados-licencia", verificarTokenMiddleware, crearEstadoLicenciaController);
router.get("/estados-licencia", verificarTokenMiddleware, obtenerEstadosLicenciaController);
router.get("/estados-licencia/:id", verificarTokenMiddleware, obtenerEstadoLicenciaPorIdController);
router.put("/estados-licencia/:id", verificarTokenMiddleware, actualizarEstadoLicenciaController);
router.delete("/estados-licencia/:id", verificarTokenMiddleware, verificarAdmin, eliminarEstadoLicenciaController);    

export default router;