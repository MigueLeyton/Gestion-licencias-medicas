/* Este es el archivo de rutas, aquí definiremos los endpoints o puntos a los que tendremos que hacer las peticiones */

import { Router } from "express"; // Importamos el paquete express y el método Router para crear las rutas
import { crearUsuarioController, 
        eliminarUsuarioController, 
        obtenerUsuariosController, 
        actualizarUsuarioController, 
        obtenerUsuarioPorIdController,
        loginUsuarioController
        } from "../controllers/usuarios.js"; // Importamos los controladores que están en el archivo usuarios.js

// Acá importaremos el middleware que creamos para verificar el token, esto lo haremos en cada una de las rutas, para que se ejecute antes de llegar al controlador
// Se hace en cada una de las rutas para que se ejecute antes de llegar al controlador correspondiente
import { verificarToken } from "../middlewares/verificarToken.js"; // Importamos el middleware que creamos para verificar el token
// La función verificarToken irá entremedio de la ruta y el controlador, esto es para que se ejecute antes de llegar al controlador, si el token no es válido, no se ejecutará el controlador y se devolverá un error 401

const router = Router(); // Creamos una instancia de Router para definir las rutas

// Definimos las rutas y los métodos que se van a utilizar para cada una de ellas
router.get("/usuarios", verificarToken, obtenerUsuariosController); // Ruta para obtener todos los usuarios, el método que se va a utilizar es GET y el controlador que se va a utilizar es obtenerUsuariosController
router.get("/usuarios/:id", verificarToken, obtenerUsuarioPorIdController); // Ruta para obtener un usuario por id, el método que se va a utilizar es GET y el controlador que se va a utilizar es obtenerUsuarioPorIdController
router.post("/usuarios", verificarToken, crearUsuarioController); // Ruta para crear un usuario, el método que se va a utilizar es POST y el controlador que se va a utilizar es crearUsuarioController

//Para agregar el id que se obtiene a traves del req.params en el controlador, se debe agregar :id a la ruta como se muestra a continuación
router.put("/usuarios/:id", verificarToken, actualizarUsuarioController); // Ruta para actualizar un usuario, el método que se va a utilizar es PUT y el controlador que se va a utilizar es actualizarUsuarioController
router.delete("/usuarios/:id", verificarToken, eliminarUsuarioController); // Ruta para eliminar un usuario, el método que se va a utilizar es DELETE y el controlador que se va a utilizar es eliminarUsuarioController
router.post('/login', loginUsuarioController); //Ruta para logear un usuario

export default router; // Exportamos el router para poder usarlo en el archivo principal de la aplicación