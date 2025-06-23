import { loginUsuarioController, logoutUsuarioController } from "../controllers/sesions.controller.js";
import { Router } from "express";

const router = Router();

router.post('/login', loginUsuarioController);

export default router;
