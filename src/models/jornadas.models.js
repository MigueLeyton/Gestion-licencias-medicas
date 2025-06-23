import { pool as db } from "../database/database.js";

export const crearJornada = async (jornada) => {
    try {
        const { nombre } = jornada;
        const query = "INSERT INTO jornadas (nombre) VALUES (?)";
        const values = [nombre];

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                succes: true,
                message: "Jornada creada exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo crear la jornada",
        };
        
    } catch (error) {
        console.log("Error al crear la jornada:", error);
        return {
            success: false,
            message: "Error al crear la jornada",
        };
    }
}

export const obtenerJornadas = async () => {
    try {
        const query = "SELECT id, nombre FROM jornadas WHERE eliminado != 1";
        const [result] = await db.query(query); 

        if (result.length > 0) {
            return {
                success: true,
                jornadas: result
            };
        }
        return {
            success: false,
            message: "No se encontraron jornadas",
        };
        
    } catch (error) {
        console.log("Error al obtener jornadas:", error);
        return {
            success: false,
            message: "Error al obtener jornadas",
        };
    }
}

export const obtenerJornadasPorId = async (id) => {
    try {
        const query = "SELECT id, nombre FROM jornadas WHERE id = ? AND eliminado != 1";
        const values = [id];

        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                jornada: result[0]
            }
        }
        return {
            success: false, 
            message: "No se encontró la jornada",
        };
        
    } catch (error) {
        console.log("Error al obtener jornada:", error);
        return {
            success: false,
            message: "Error al obtener jornada",
        };
    }
}

export const actualizarJornada = async (id, jornada) => {
    try {
        const { nombre } = jornada;
        const query = "UPDATE jornadas SET nombre = ? WHERE id = ? AND eliminado != 1";
        const values = [nombre, id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Jornada actualizada correctamente",
            };
        } 
        return { 
            success: false,
            messagee: "No se pudo actualizar la jornada o no se encontró",
        };
        
    } catch (error) {
        console.log("Error al actualizar jornada:", error);
        return {
            success: false,
            message: "Error al actualizar la jornada",
        };
    }
}

export const eliminarJornada = async (id) => {
    try {
        const query = "UPDATE jornadas SET eliminado = 1 WHERE id = ? and ELIMINADO != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Jornada eliminada correctamente",
            };
        }
        return {
            success: false,
            message: "No se pudo eliminar la jornada o no se encontró",
        };
        
    } catch (error) {
        console.log("Error al eliminar la jornada:", error);
            return {
                success: false,
                message: "Error al eliminar la jornada",
        };
    }
}