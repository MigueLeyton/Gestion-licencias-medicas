import { crearLicenciaMutualController, obtenerLicenciaMutualController, obtenerLicenciaMutualPorIdController, actualizadarLicenciaMutualController, eliminadarLicenciaMutualController } from "../controllers/licenciaMutual.controller.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router();

router.post("/licencia-mutual", verificarTokenMiddleware, crearLicenciaMutualController);
router.get("/licencia-mutual", verificarTokenMiddleware, obtenerLicenciaMutualController);
router.get("/licencia-mutual/:id", verificarTokenMiddleware, obtenerLicenciaMutualPorIdController);
router.put("/licencia-mutual/:id", verificarTokenMiddleware, actualizadarLicenciaMutualController);
router.delete("/licencia-mutual/:id", verificarTokenMiddleware, eliminadarLicenciaMutualController);   

export default router;