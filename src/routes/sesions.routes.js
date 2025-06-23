import { loginUsuarioController, logoutUsuarioController } from "../controllers/sesions.controller.js";
import { Router } from "express";

const router = Router();

router.post('/login', loginUsuarioController);
router. get('/login', logoutUsuarioController);

export default router;
