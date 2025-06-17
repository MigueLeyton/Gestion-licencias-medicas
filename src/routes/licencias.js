import { Router } from "express";
import { CrearLicenciaController, ObtenerLicenciasPendientesController, ActualizarEstadoLicenciaController } from "../controllers/licenciaController.js";
import { validarLicenciaMiddleware } from "../middlewares/validacionLicenciaMiddlewar.js";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

// Crear licencia
router.post("/licencias",  CrearLicenciaController);

// Obtener licencias pendientes
router.get("/licencias/pendientes", verificarTokenMiddleware, ObtenerLicenciasPendientesController);

// Actualizar estado de licencia (aprobar o rechazar)
router.patch("/licencias/:id/estado", verificarTokenMiddleware, ActualizarEstadoLicenciaController);

export default router;
