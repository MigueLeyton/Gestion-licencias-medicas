import { crearEstadoLicenciaController, obtenerEstadoLicenciaPorIdController, obtenerEstadosLicenciaController, actualizarEstadoLicenciaController, eliminarEstadoLicenciaController } from "../controllers/estadosLicencia.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/estados-licencia", verificarTokenMiddleware, crearEstadoLicenciaController);
router.get("/estados-licencia", verificarTokenMiddleware, obtenerEstadosLicenciaController);
router.get("/estados-licencia/:id", verificarTokenMiddleware, obtenerEstadoLicenciaPorIdController);
router.put("/estados-licencia/:id", verificarTokenMiddleware, actualizarEstadoLicenciaController);
router.delete("/estados-licencia/:id", verificarTokenMiddleware, eliminarEstadoLicenciaController);    

export default router;