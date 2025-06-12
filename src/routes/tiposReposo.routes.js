import { crearTiposReposoController, obtenerTiposReposoController, obtenerTiposReposoPorIdController, actualizarTiposReposoController, eliminarTiposReposoController } from "../controllers/tiposReposo.controller.js";
import { Router } from "express";

const router = Router();

router.post("/tipos-reposo", crearTiposReposoController);
router.get("/tipos-reposo", obtenerTiposReposoController);
router.get("/tipos-reposo/:id", obtenerTiposReposoPorIdController);
router.put("/tipos-reposo/:id", actualizarTiposReposoController);
router.delete("/tipos-reposo/:id", eliminarTiposReposoController);  

export default router;