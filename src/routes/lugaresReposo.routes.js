import { crearLugaresReposoController, obtenerLugaresReposoController, obtenerLugaresReposoPorIdController, actualizarLugaresReposoController, eliminarLugaresReposoController} from "../controllers/lugaresReposo.controller.js";
import { Router } from "express";

const router = Router();

router.post("/lugares-reposo", crearLugaresReposoController);
router.get("/lugares-reposo", obtenerLugaresReposoController);
router.get("/lugares-reposo/:id", obtenerLugaresReposoPorIdController);
router.put("/lugares-reposo/:id", actualizarLugaresReposoController);
router.delete("/lugares-reposo/:id", eliminarLugaresReposoController);

export default router;