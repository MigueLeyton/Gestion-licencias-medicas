import { pool as db } from "../database/database.js";

export const crearProfesional = async (profesionales) => {
    try {
        const {rut, nombres, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono} = profesionales;

        const query = "INSERT INTO profesionales (rut, nombres, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [rut, nombres, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono];

        const [result] = await db.query(query, values);
        if(result.affectedRows > 0) {
            return {
                success: true,
                message: "Profesional creado exitosamente",
            };
        } 
        return {
            success: false,
            message: "No se pudo crear el profesional",
        };
        
    } catch (error) {
        console.log("Error al crear profesional:", error);
        return {
            success: false,
            message: "Error al crear profesional"
        };    
    }
}

export const obtenerProfesionales = async () => {
    try {
        const query = "SELECT id, rut, nombres, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono FROM profesionales WHERE eliminado != 1";
        const [result] = await db.query(query);

        if(result.length > 0) {
            return {
                success: true,
                profesionales: result
            };
        } 
        return {
            success: false, 
            message: "No se encontraron profesionales"
        };       
    }
    
    catch (error) {
        console.error("Error al obtener profesionales:", error);
        return {
            success: false, 
            message: "Error al obtener profesionales"
        };
    }
}

export const obtenerProfesionalesPorId = async (id) => {
    try {
        const query = "SELECT id, rut, nombres, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono FROM profesionales WHERE id = ? AND eliminado != 1";
        const values = [id];

        const [result] = await db.query(query, values);

        if(result.length > 0) {
            return {
                success: true,
                profesionales: result[0]
            };
        } else {
            return {
                success: false,
                message: "No se encontró el profesional"
            };
        }
    } catch (error) {
        console.error("Error al obtener al profesional por ID:", error);
        return {
            success: false,
            message: "Error al obtener el profesional por ID"
        };
    }
}

export const actualizarProfesional = async (id, profesionales) => {
    try {
        const {rut, nombres, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono} = profesionales;

        let query = "UPDATE profesionales";

        if(rut) {
            query += " SET rut = ?";
        }
        if(nombres) {
            query += (query.includes("SET") ? ", " : " SET ") + "nombres = ?";
        }
        if(apellido_paterno) {
            query += (query.includes("SET") ? ", " : " SET ") + "apellido_paterno = ?";
        }
        if(apellido_materno) {
            query += (query.includes("SET") ? ", " : " SET ") + "apellido_materno = ?";
        }
        if(especialidad) {
            query += (query.includes("SET") ? ", " : " SET ") + "especialidad = ?";
        }
        if(otra_especialidad) {
            query += (query.includes("SET") ? ", " : " SET ") + "otra_especialidad = ?";
        }
        if(direccion) {
            query += (query.includes("SET") ? ", " : " SET ") + "direccion = ?";
        }
        if(telefono) {
            query += (query.includes("SET") ? ", " : " SET ") + "telefono = ?";
        }
        query += " WHERE id = ?";

        const values = [
            rut, 
            nombres, 
            apellido_paterno, 
            apellido_materno, 
            especialidad, 
            otra_especialidad, 
            direccion, 
            telefono, 
            id
        ].filter(value => value !== undefined);

        const [result] = await db.query(query, values);

        if(result.affectedRows > 0) {
            return {
                success: true,
                message: "Profesional actualizado exitosamente"
            };
        } else {
            return {
                success: false,
                message: "No se pudo actualizar el profesional o hubo cambios"
            };
        }
    } catch (error) {
        console.error("Error al actualizar profesional:", error);
        return {
            success: false,
            message: "Error al actualizar profesional"
        };
    }
}

export const eliminarProfesinal = async (id) => {
    try {
        const query = "UPDATE profesionales SET eliminado = 1 WHERE id = ?";
        const values = [id];

        const [result] = await db.query(query, values);
        if(result.affectedRows > 0) {
            return {
                success: true,
                message: "Profesional eliminado exitosamente"
            };
        } else {
            return {
                success: false,
                message: "No se pudo eliminar al profesional o no se encontró"
            };
        }
    } catch (error) {
        console.error("Error al eliminar profesional:", error);
        return {
            success: false,
            message: "Error al eliminar profesional"
        };
    }
}