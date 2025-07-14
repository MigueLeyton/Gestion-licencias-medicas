import { loginUsuarioController, logoutUsuarioController } from "../controllers/sesions.controller.js";
import { Router } from "express";

const router = Router();

// Rutas para manejar las sesiones de usuario.
router.post('/login', loginUsuarioController);

export default router;
