import { crearLicenciaController, obtenerLicenciaController, obtenerLicenciaPorIdController, actualizarLicenciaController, eliminarLicenciaController } from "../controllers/licencias.controller.js"; 
import { Router } from "express"; 
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

router.post("/licencias", verificarTokenMiddleware, crearLicenciaController);
router.get("/licencias", verificarTokenMiddleware, obtenerLicenciaController);
router.get("/licencias/:id", verificarTokenMiddleware, obtenerLicenciaPorIdController);
router.put("/licencias/:id", verificarTokenMiddleware, actualizarLicenciaController);
router.delete("/licencias/:id", verificarTokenMiddleware, verificarAdmin, eliminarLicenciaController);

export default router;