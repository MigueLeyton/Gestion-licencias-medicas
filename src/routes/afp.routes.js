import { crearAfpController, obtenerAfpController, obtenerAfpPorIdController, actualizarAfpController, eliminarAfpController } from "../controllers/afp.controller.js";
import { Router } from "express";

const router = Router();

router.post("/afp", crearAfpController);
router.get("/afp", obtenerAfpController);
router.get("/afp/:id", obtenerAfpPorIdController);
router.put("/afp/:id", actualizarAfpController);
router.delete("/afp/:id", eliminarAfpController);

export default router;
