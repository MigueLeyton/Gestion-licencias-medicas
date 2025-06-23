import { crearUsuario, obtenerUsuarioPorId, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from "../models/usuarios.models.js";

export const crearUsuarioController = async (req, res) => {
    try {
        const { nombre, email, password_hash, fecha_nacimiento, rol } = req.body;

        if (!nombre || !email || !password_hash || !fecha_nacimiento || !rol) {
            return res.status(400).json({ 
                status: 400, 
                message: "Los datos no son válidos", }
            );
        }
        const usuario = {
            nombre,
            email,
            password_hash,
            fecha_nacimiento,
            rol
        }

        const nuevoUsuario = await crearUsuario(usuario);

        return res.status(nuevoUsuario.status).json({ 
            status: nuevoUsuario.status, 
            message: nuevoUsuario.message }
        );
    } catch (error) {
        console.log("Error al crear el usuario", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al crear el usuario",}
        );   
    }
}

export const obtenerUsuariosController = async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();

        return res.status(usuarios.status).json({ 
            status: usuarios.status, 
            message: usuarios.message, 
            data: usuarios.data });
    } catch (error) {
        console.log("Error al obtener usuarios", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al obtener usuarios",}
        );
    }
}

export const obtenerUsuarioPorIdController = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id) || !id) {
            return res.status(400).json({ 
                status: 400, 
                message: "El ID del usuario no es válido", }
            );
        }

        const usuario = await obtenerUsuarioPorId(id);

        return res.status(usuario.status).json({ 
            status: usuario.status, 
            message: usuario.message, 
            data: usuario.data }
        );
    } catch (error) {
        console.log("Error al obtener el usuario por ID", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al obtener el usuario por ID",}
        );   
    }
}

export const actualizarUsuarioController = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, correo, password_hash, fecha_nacimiento, rol } = req.body;

        const usuario = {
            nombre,
            email: correo,
            password_hash,
            fecha_nacimiento,
            rol
        }

        const usuarioActualizado = await actualizarUsuario(id, usuario);

        return res.status(usuarioActualizado.status).json({ 
            status: usuarioActualizado.status, 
            message: usuarioActualizado.message, 
            data: usuarioActualizado.data }
        );
    } catch (error) {
        console.log("Error al actualiar datos del usuario", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error al actualiar datos del usuario",}
        );
    }
}

export const eliminarUsuarioController = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id) || !id) {
            return res.status(400).json({ 
                status: 400, 
                message: "El ID no es válido", }
            );
        }

        const usuarioEliminado = await eliminarUsuario(id);
        return res.status(usuarioEliminado.status).json({ 
            status: usuarioEliminado.status, 
            message: usuarioEliminado.message, 
            data: usuarioEliminado.data }
        );
    } catch (error) {
        console.log("Error en el controlador", error);
        return res.status(500).json({ 
            status: 500, 
            message: "Error en el servidor",}
        );
    }
}

