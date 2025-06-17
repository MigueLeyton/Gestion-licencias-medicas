import { crearHistorialRemuneracionController, obtenerHistorialRemuneracionController, obtenerHistorialRemuneracionPorIdController, actualizarHistorialRemuneracionController, eliminarHistorialRemuneracionController } from "../controllers/historialRemuneracion.js";
import { Router } from "express";

const router = Router();

router.post("/historial-remuneracion", crearHistorialRemuneracionController);
router.get("/historial-remuneracion", obtenerHistorialRemuneracionController);
router.get("/historial-remuneracion/:id", obtenerHistorialRemuneracionPorIdController);
router.put("/historial-remuneracion/:id", actualizarHistorialRemuneracionController);
router.delete("/historial-remuneracion/:id", eliminarHistorialRemuneracionController);    

export default router;