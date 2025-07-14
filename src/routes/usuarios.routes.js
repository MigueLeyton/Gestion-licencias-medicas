import { Router } from "express"; 
import { crearUsuarioController, eliminarUsuarioController, obtenerUsuariosController, actualizarUsuarioController, obtenerUsuarioPorIdController} from "../controllers/usuarios.controller.js"; 
import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";
import { verificarModificacionUsuarios } from "../middlewares/verificarPermisos.js";
import { verificarAdmin } from "../middlewares/verificarAdmin.js";

const router = Router(); 

// Rutas para manejar las operaciones relacionadas con los usuarios.
router.post("/usuarios", verificarTokenMiddleware, verificarAdmin, crearUsuarioController);  
router.get("/usuarios", verificarTokenMiddleware, verificarAdmin, obtenerUsuariosController); 
router.get("/usuarios/:id", verificarTokenMiddleware, verificarAdmin, obtenerUsuarioPorIdController); 
router.put("/usuarios/:id", verificarTokenMiddleware, verificarModificacionUsuarios, actualizarUsuarioController); 
router.delete("/usuarios/:id", verificarTokenMiddleware, verificarAdmin, eliminarUsuarioController); 

export default router; 