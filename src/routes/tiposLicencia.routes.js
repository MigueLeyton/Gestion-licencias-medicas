import { crearTiposLicenciaController, obtenerTiposLicenciaController, obtenerTiposLicenciaPorIdController, actualizarTiposLicenciaController, eliminarTiposLicenciaController } from "../controllers/tiposLicencia.controller.js";
import { Router } from "express";

const router = Router();

router.post("/tipos-licencia", crearTiposLicenciaController);
router.get("/tipos-licencia", obtenerTiposLicenciaController);
router.get("/tipos-licencia/:id", obtenerTiposLicenciaPorIdController);
router.put("/tipos-licencia/:id", actualizarTiposLicenciaController);
router.delete("/tipos-licencia/:id", eliminarTiposLicenciaController);
  
export default router;