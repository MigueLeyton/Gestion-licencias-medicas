import bcrypt from "bcryptjs"; 
import { pool } from "../database/database.js"; 

export const crearUsuario = async (users) => {
    try {  
        const { nombre, email, password_hash, fecha_nacimiento, rol } = users; 

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password_hash, salt);

        const [rows] = await pool.query("INSERT INTO users (nombre, email, password_hash, fecha_nacimiento, rol) VALUES (?, ?, ?, ?, ?)", [nombre, email, hashedPassword, fecha_nacimiento, rol]
        );
        return {
            status: 201, 
            message: "Usuario creado correctamente"
        }; 
    }
    catch (error) {
        console.log("Error en el model: ", error); 
        return {
            status: 500, 
            message: error
        };
    }
}

export const obtenerUsuarios = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE eliminado != 1"); 
    
        if(rows.length === 0) {
            return {
                status: 404, 
                message: "No se encontraron usuarios"
            }; 
        }
        return {
            status: 200, 
            message: "Usuarios obtenidos correctamente", 
            data: rows
        }; 

    } catch (error) {
        console.log("Error en el model: ", error); 
        return {
            status: 500, 
            message: error
        };
    }
}

export const obtenerUsuarioPorId = async (id) => {
    try {
        const idUsuario = id; 

        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [idUsuario]); 
  
        if(rows.length === 0) {
            return {
                status: 404, 
                message: "Usuario no encontrado"
            };
        }
        return {
            status: 200, 
            message: "Usuario obtenido correctamente", 
            data: rows[0]
        }; 

    } catch (error) {
        console.log("Error en el model: ", error); 
        return {
            status: 500, 
            message: error
        };
    }
}

export const actualizarUsuario = async (id, users) => {
    try {
        const { nombre, email, password_hash, fecha_nacimiento, rol } = users; 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password_hash, salt);
        const [rows] = await pool.query("UPDATE users SET nombre = ?, email = ?, password_hash = ?, fecha_nacimiento = ?, rol = ? WHERE id = ?", [nombre, email, hashedPassword, fecha_nacimiento, rol, id]
        );
        return {
            status: 200, 
            message: "Usuario actualizado correctamente"
        };
    }
    catch (error) {
        console.log("Error en el model: ", error); 
        return {
            status: 500, 
            message: error
        };
    }
}

export const eliminarUsuario = async (id) => {
    try {
        const idUsuario = id;      
        const [rows] = await pool.query("UPDATE users SET eliminado = 0 WHERE id = ?", [idUsuario]
        );

        if(rows.affectedRows === 0) {
            return {
                status: 404, 
                message: "Usuario no encontrado"
            }; 
        } 
        return {
            status: 200, 
            message: "Usuario eliminado correctamente"
        }; 
    } catch (error) {
        console.log("Error en el model: ", error); 
        return {
            status: 500, 
            message: error
        };       
    }
}

  