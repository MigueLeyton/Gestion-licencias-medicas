import { crearUsuario, obtenerUsuarioPorId, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from "../models/usuarios.models.js";
import { decodificarToken } from "../utils/jwt.js";

// Controladores para la gestión de usuarios
// Crear un nuevo usuario
export const crearUsuarioController = async (req, res) => {
    try {
        const { nombre, email, password_hash, fecha_nacimiento, rol } = req.body;

        if (!nombre || !email || !password_hash || !fecha_nacimiento || !rol) {
            return res.status(400).json({ 
                status: 400, 
                message: "Los datos no son válidos"
            });
        }

        if (rol !== "Administrador" && rol !== "Usuario") {
            return res.status(400).json({ 
                status: 400, 
                message: "El rol debe ser 'Administrador' o 'Trabajador'" 
            });
        }
        
        const usuario = {
            nombre,
            email,
            password_hash,
            fecha_nacimiento,
            rol
        }

        const resultado = await crearUsuario(usuario);
        if (!resultado.success) {
            return res.status(400).json({ 
                status: 400, 
                message: resultado.message 
            });
        }
        return res.status(201).json({ 
            status: 201, 
            message: resultado.message,
            insertedId: resultado.insertedId
        });
    } catch (error) {
        console.log("Error al crear el usuario", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al crear el usuario"}
        );   
    }
}

// Obtener todos los usuarios
export const obtenerUsuariosController = async (req, res) => {
    try {
        const resultado = await obtenerUsuarios();

        if (!resultado.success) {
            return res.status(400).json({ 
                status: 400, 
                message: resultado.message 
            });
        }
        return res.status(200).json({ 
            status: 200, 
            message: "Usuarios obtenidos correctamente", 
            data: resultado.usuarios 
        });
    } catch (error) {
        console.log("Error al obtener usuarios", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al obtener usuarios"
        });
    }
}

// Obtener un usuario por ID 
export const obtenerUsuarioPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ 
                status: 400, 
                message: "El ID no es válido" 
            });
        }

        const resultado = await obtenerUsuarioPorId(id);

        if (!resultado.success) {
            return res.status(404).json({ 
                status: 404, 
                message: resultado.message 
            });
        }
        return res.status(200).json({ 
            status: 200, 
            message: "Usuario obtenido correctamente", 
            data: resultado.usuario 
        });
    } catch (error) {
        console.log("Error al obtener el usuario por ID", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al obtener el usuario por ID"
        });   
    }
}

// Actualizar un usuario
// Permite actualizar los datos de un usuario, incluyendo su rol si el token es de un administrador
export const actualizarUsuarioController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password_hash, fecha_nacimiento, rol} = req.body;
        
        const token = req.headers["authorization"]?.split(" ")[1]
        
        const { rol: tokenrol } = decodificarToken(token); 

        if (tokenrol !== "Administrador" && rol) {
            return res.status(403).json({ 
                status: 403, 
                message: "No tienes permisos para modificar tu rol de usuario" 
            });
        }
      
        if (!nombre && !email && !password_hash && !fecha_nacimiento && !rol) {
            return res.status(400).json({ 
            status: 400, 
            message: "Los datos no son válidos"
            });
        }

        if (rol !== "Administrador" && rol !== "Usuario") {
            return res.status(400).json({ 
                status: 400, 
                message: "El rol debe ser 'Administrador' o 'Trabajador'" 
            });
        }

        const usuario = {
            nombre,
            email,
            password_hash,
            fecha_nacimiento,
            rol
        }

        const resultado = await actualizarUsuario(id, usuario);

        if (!resultado.success) {
            return res.status(400).json({ 
                status: 400, 
                message: resultado.message 
            });
        }
        return res.status(200).json({ 
            status: 200, 
            message: resultado.message
        });
    } catch (error) {
        console.log("Error al actualizar datos del usuario", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al actualiar datos del usuario",}
        );
    }
}

// Eliminar un usuario
// Permite eliminar un usuario por su ID
// Solo un administrador puede eliminar usuarios
export const eliminarUsuarioController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ 
                status: 400, 
                message: "El ID no es válido" 
            });
        }

        const resultado = await eliminarUsuario(id);

        if (!resultado.success) {
            return res.status(404).json({ 
                status: 404, 
                message: resultado.message 
            });
        }
        return res.status(200).json({ 
            status: 200, 
            message: "Usuario eliminado correctamente" 
        });
    } catch (error) {
        console.log("Error en el controlador", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error en el servidor",}
        );
    }
}

