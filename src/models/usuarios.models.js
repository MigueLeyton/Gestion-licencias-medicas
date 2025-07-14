import { pool as db } from "../database/database.js";
import bcrypt from "bcryptjs"; 

export const crearUsuario = async (users) => {
    try {  
        const { nombre, email, password_hash, fecha_nacimiento, rol } = users; 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password_hash, salt);
        const query = "INSERT INTO users (nombre, email, password_hash, fecha_nacimiento, rol) VALUES (?, ?, ?, ?, ?)";
        const values = [nombre, email, hashedPassword, fecha_nacimiento, rol];
        const [result] = await db.query(query, values);
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                insertedId: result.insertId,
                message: "Usuario creado correctamente"
            };
        }
        return {
            success: false,
            message: "No se pudo crear el usuario"
        }     
    }
    catch (error) {
        console.log("Error al crear el usuario ", error); 
        return {
            success: false, 
            message: "error al crear el usuario"
        };
    }
}

export const obtenerUsuarios = async () => {
    try {
        const query = "SELECT id, nombre, email, fecha_nacimiento, rol FROM users WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0) {
            return {
                success: true,
                usuarios: result
            };
        }
        return {
            success: false,
            message: "No se encontraron usuarios"
        };

    } catch (error) {
        console.log("Error al obtener usuarios: ", error); 
        return {
            success: false, 
            message: "Error al obtener usuarios"
        };
    }
}

export const obtenerUsuarioPorId = async (id) => {
    try {
        const query = "SELECT id, nombre, email, fecha_nacimiento, rol FROM users WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                usuario: result[0]
            };
        }
        return {
            success: false,
            message: "Usuario no encontrado o ya ha sido eliminado"
        };

    } catch (error) {
        console.log("Error al obtener el usuario por ID: ", error); 
        return {
            success: false, 
            message: error
        };
    }
}

// Función para actualizar un usuario.
export const actualizarUsuario = async (id, users, idPersonaLogueada) => {
    try {
        const { nombre, email, password_hash, fecha_nacimiento, rol } = users; 
        const salt = await bcrypt.genSalt(10); 
        //const hashedPassword = await bcrypt.hash(password_hash, salt);
        const hashedPassword = password_hash ? await bcrypt.hash(password_hash, salt) : null;


        let query = "UPDATE users"

        if (nombre) {
            query += " SET nombre = ?";
        }
        if (email) {
            query += (query.includes("SET") ? ", " : " SET ") + "email = ?";
        }
        if (password_hash) {
            query += (query.includes("SET") ? ", " : " SET ") + "password_hash = ?";
        }
        if (fecha_nacimiento) {
            query += (query.includes("SET") ? ", " : " SET ") + "fecha_nacimiento = ?";
        }
        if (rol) {
            query += (query.includes("SET") ? ", " : " SET ") + "rol = ?";
        }   
        query += " WHERE id = ?";

        const values = [
            nombre, 
            email, 
            hashedPassword, 
            fecha_nacimiento, 
            rol, 
            id
        ].filter(value => value !== "" && value != undefined); // Filtrar valores nulos o vacíos
           
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Usuario actualizado correctamente"
            };
        }
        return {
            success: false, 
            message: "Usuario no encontrado o ya ha sido eliminado"
        };
    }
    catch (error) {
        console.log("Error al actualizar datos del usuario: ", error); 
        return {
            success: false, 
            message: "Error al actualizar datos del usuario"
        };
    }
}

// Función para eliminar un usuario (marcar como eliminado).
export const eliminarUsuario = async (id) => {
    try {
        const query = "UPDATE users SET eliminado = 1 WHERE id = ?";
        const values = [id];
        const [result] = await db.query(query, values);
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Usuario eliminado correctamente"
            };
        }
        return {
            success: false,
            message: "Usuario no encontrado o ya ha sido eliminado"
        };
    } catch (error) {
        console.log("Error al eliminar el usuario: ", error); 
        return {
            success: false, 
            message: "Error al eliminar el usuario"
        };       
    }
}

  