import { Router } from "express"; 
import { crearUsuarioController, eliminarUsuarioController, obtenerUsuariosController, actualizarUsuarioController, obtenerUsuarioPorIdController} from "../controllers/usuarios.controller.js"; 
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { puedeAccederDatos } from "../middlewares/verificarPermisos.js";

const router = Router(); 

router.post("/usuarios", verificarTokenMiddleware, crearUsuarioController);  
router.get("/usuarios", verificarTokenMiddleware, obtenerUsuariosController); 
router.get("/usuarios/:id", verificarTokenMiddleware, obtenerUsuarioPorIdController); 
router.put("/usuarios/:id", verificarTokenMiddleware, puedeAccederDatos, actualizarUsuarioController); 
router.delete("/usuarios/:id", verificarTokenMiddleware, eliminarUsuarioController); 

export default router; 