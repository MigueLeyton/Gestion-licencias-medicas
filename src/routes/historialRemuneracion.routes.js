import { crearHistorialRemuneracionController, obtenerHistorialRemuneracionController, obtenerHistorialRemuneracionPorIdController, obtenerHistorialRemuneracionPorFechaController,  actualizarHistorialRemuneracionController, eliminarHistorialRemuneracionController } from "../controllers/historialRemuneracion.js";
import { Router } from "express";
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router();

router.post("/historial-remuneracion", verificarTokenMiddleware, crearHistorialRemuneracionController);
router.get("/historial-remuneracion", verificarTokenMiddleware, obtenerHistorialRemuneracionController);
router.get("/historial-remuneracion/:id", verificarTokenMiddleware, obtenerHistorialRemuneracionPorIdController);
router.get("/historial-remuneracion/fecha/:id", verificarTokenMiddleware, obtenerHistorialRemuneracionPorFechaController);
router.put("/historial-remuneracion/:id", verificarTokenMiddleware, actualizarHistorialRemuneracionController);
router.delete("/historial-remuneracion/:id", verificarTokenMiddleware, verificarAdmin, eliminarHistorialRemuneracionController);    

export default router;