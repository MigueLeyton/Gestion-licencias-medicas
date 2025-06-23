import { crearLicenciaHijoController, obtenerLicenciaHijosController, obtenerLicenciaHijoPorIdController, obtenerLicenciaHijoPorFechaController, actualizarLicenciaHijoController, eliminarLicenciaHijoController } from "../controllers/licenciaHijo.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/licencia-hijo", verificarTokenMiddleware, crearLicenciaHijoController);
router.get("/licencia-hijo", verificarTokenMiddleware, obtenerLicenciaHijosController);
router.get("/licencia-hijo/:id", verificarTokenMiddleware, obtenerLicenciaHijoPorIdController);
router.get("/licencia-hijo/fecha", verificarTokenMiddleware, obtenerLicenciaHijoPorFechaController); 
router.put("/licencia-hijo/:id", verificarTokenMiddleware, actualizarLicenciaHijoController);
router.delete("/licencia-hijo/:id", verificarTokenMiddleware, eliminarLicenciaHijoController);

export default router;