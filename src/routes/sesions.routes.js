import { Router } from "express";
import { loginUsuarioController } from "../controllers/sesions.controller.js";

const router = Router();

router.post('/login', loginUsuarioController);

export default router;
