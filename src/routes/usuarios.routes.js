import { Router } from "express"; 
import { crearUsuarioController, eliminarUsuarioController, obtenerUsuariosController, actualizarUsuarioController, obtenerUsuarioPorIdController} from "../controllers/usuarios.controller.js"; 


import { verificarTokenMiddleware } from "../middlewares/verificarToken.js";

const router = Router(); 

router.post("/users", verificarTokenMiddleware, crearUsuarioController);  
router.get("/users", verificarTokenMiddleware, obtenerUsuariosController); 
router.get("/users/:id", verificarTokenMiddleware, obtenerUsuarioPorIdController); 
router.put("/users/:id", verificarTokenMiddleware, actualizarUsuarioController); 
router.delete("/users/:id", verificarTokenMiddleware, eliminarUsuarioController); 

export default router; 