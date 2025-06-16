import { crearLicenciaMutualController, obtenerLicenciaMutualController, obtenerLicenciaMutualPorIdController, actualizadarLicenciaMutualController, eliminadarLicenciaMutualController } from "../controllers/licenciaMutual.controller.js";
import { Router } from "express";

const router = Router();

router.post("/licencias-mutuales", crearLicenciaMutualController);
router.get("/licencias-mutuales", obtenerLicenciaMutualController);
router.get("/licencias-mutuales/:id", obtenerLicenciaMutualPorIdController);
router.put("/licencias-mutuales/:id", actualizadarLicenciaMutualController);
router.delete("/licencias-mutuales/:id", eliminadarLicenciaMutualController);   

export default router;