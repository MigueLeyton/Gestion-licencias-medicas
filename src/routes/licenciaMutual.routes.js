import { crearLicenciaMutualController, obtenerLicenciaMutualController, obtenerLicenciaMutualPorIdController, obtenerLicenciaMutualPorFechaController, actualizadarLicenciaMutualController, eliminadarLicenciaMutualController } from "../controllers/licenciaMutual.controller.js";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { Router } from "express";

const router = Router();

router.post("/licencia-mutual", verificarTokenMiddleware, crearLicenciaMutualController);
router.get("/licencia-mutual", verificarTokenMiddleware, obtenerLicenciaMutualController);
router.get("/licencia-mutual/:id", verificarTokenMiddleware, obtenerLicenciaMutualPorIdController);
router.get("/licencia-mutual/fecha", verificarTokenMiddleware, obtenerLicenciaMutualPorFechaController); 
router.put("/licencia-mutual/:id", verificarTokenMiddleware, actualizadarLicenciaMutualController);
router.delete("/licencia-mutual/:id", verificarTokenMiddleware, eliminadarLicenciaMutualController);   

export default router;