import { crearLicenciaHijoController, obtenerLicenciaHijosController, obtenerLicenciaHijoPorIdController, obtenerLicenciaHijoPorFechaController, actualizarLicenciaHijoController, eliminarLicenciaHijoController } from "../controllers/licenciaHijo.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

// Rutas para manejar las operaciones relacionadas con las licencias de hijos de trabajadores.
router.post("/licencia-hijo", verificarTokenMiddleware, crearLicenciaHijoController);
router.get("/licencia-hijo", verificarTokenMiddleware, obtenerLicenciaHijosController);
router.get("/licencia-hijo/:id", verificarTokenMiddleware, obtenerLicenciaHijoPorIdController);
router.get("/licencia-hijo/fecha", verificarTokenMiddleware, obtenerLicenciaHijoPorFechaController); 
router.put("/licencia-hijo/:id", verificarTokenMiddleware, actualizarLicenciaHijoController);
router.delete("/licencia-hijo/:id", verificarTokenMiddleware, verificarAdmin, eliminarLicenciaHijoController);

export default router;