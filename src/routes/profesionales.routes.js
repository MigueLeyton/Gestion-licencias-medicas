import { crearProfesionalController, obtenerProfesionalesController, obtenerProfesionalesPorIdController, actualizarProfesionalController, eliminarProfesionalContoller } from "../controllers/profesional.controller.js";
import { Router } from "express";

const router = Router();

router.post("/profesionales", crearProfesionalController);
router.get("/profesionales", obtenerProfesionalesController);
router.get("/profesionales/:id", obtenerProfesionalesPorIdController);
router.put("/profesionales/:id", actualizarProfesionalController);
router.delete("/profesionales/:id", eliminarProfesionalContoller); 

export default router; 