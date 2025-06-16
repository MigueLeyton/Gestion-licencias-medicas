import { crearJornadaController, obtenerJornadasController, obtenerJornadasPorIdController, actualizarJornadasController, eliminarJornadaController } from "../controllers/jornadas.controller.js"; 
import { Router } from "express";

const router = Router();

router.post("/jornadas", crearJornadaController);
router.get("/jornadas", obtenerJornadasController);
router.get("/jornadas/:id", obtenerJornadasPorIdController);
router.put("/jornadas/:id", actualizarJornadasController);
router.delete("/jornadas/:id", eliminarJornadaController);

export default router; 
