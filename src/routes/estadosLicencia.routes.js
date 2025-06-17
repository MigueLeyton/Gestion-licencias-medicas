import { crearEstadoLicenciaController, obtenerEstadoLicenciaPorIdController, obtenerEstadosLicenciaController, actualizarEstadoLicenciaController, eliminarEstadoLicenciaController } from "../controllers/estadosLicencia.controller.js";
import { Router } from "express";

const router = Router();

router.post("/estados-licencia", crearEstadoLicenciaController);
router.get("/estados-licencia", obtenerEstadosLicenciaController);
router.get("/estados-licencia/:id", obtenerEstadoLicenciaPorIdController);
router.put("/estados-licencia/:id", actualizarEstadoLicenciaController);
router.delete("/estados-licencia/:id", eliminarEstadoLicenciaController);    

export default router;