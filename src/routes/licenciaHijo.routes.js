import { crearLicenciaHijoController, obtenerLicenciaHijosController, obtenerLicenciaHijoPorIdController, actualizarLicenciaHijoController, eliminarLicenciaHijoController } from "../controllers/licenciaHijo.controller.js";
import { Router } from "express";

const router = Router();

router.post("/licencia-hijo", crearLicenciaHijoController);
router.get("/licencia-hijo", obtenerLicenciaHijosController);
router.get("/licencia-hijo/:id", obtenerLicenciaHijoPorIdController);
router.put("/licencia-hijo/:id", actualizarLicenciaHijoController);
router.delete("/licencia-hijo/:id", eliminarLicenciaHijoController);

export default router;