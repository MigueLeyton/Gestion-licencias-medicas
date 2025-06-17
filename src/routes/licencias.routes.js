import { crearLicenciaController, obtenerLicenciaController, obtenerLicenciaPorIdController, actualizarLicenciaController, eliminarLicenciaController } from "../controllers/licencias.controller.js"; 
import { Router } from "express"; 

const router = Router();

router.post("/licencias", crearLicenciaController);
router.get("/licencias", obtenerLicenciaController);
router.get("/licencias/:id", obtenerLicenciaPorIdController);
router.put("/licencias/:id", actualizarLicenciaController);
router.delete("/licencias/:id", eliminarLicenciaController);

export default router;