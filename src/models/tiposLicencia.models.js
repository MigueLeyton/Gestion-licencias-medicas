import { pool as db } from "../database/database.js";

// Función para crear un tipo de licencia.
export const crearTiposLicencia = async (tiposLicencia) => {
    try {
        const { nombre } = tiposLicencia;
        const query = "INSERT INTO tipos_licencia (nombre) VALUES (?)";
        const values = [nombre];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0){
            return {
                success: true,
                message: "Tipo de licencia creada exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo crear el tipo de licencia",
        };
    } catch (error) {
        console.log("Error al crear el tipo de licencia: ", error);
        return {
            success: false,
            message: "Error al crear el tipo de licencia",
        };
    }
}

// Función para obtener todos los tipos de licencia.
export const obtenerTiposLicencia = async () => {
    try {
        const query = "SELECT id, nombre FROM tipos_licencia WHERE eliminado != 1";
        const [result] = await db.query(query); 

        if (result.length > 0) {
            return {
                success: true,
                tiposLicencia: result
            };
        }
        return {
            success: false,
            message: "No se encontraron tipos de licencia",
        };
    } catch (error) {
        console.log("Error al obtener tipos de licencia: ", error);
        return {
            success: false,
            message: "Error al obtener tipos de licencia",
        };
    }
}

// Función para obtener un tipo de licencia por ID.
export const obtenerTiposLicenciaPorId = async (id) => {
    try {
        const query = "SELECT id, nombre FROM tipos_licencia WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                tiposLicencia: result[0]
            }
        };
        return {
            success: false,
            message: "No se encontró el tipo de licencia por ID",
        };
    } catch (error) {
        console.log("Error al obtener el tipo de licencia por ID: ", error);
        return {
            success: false,
            message: "Error al obtener el tipo de licencia por ID",
        };
    }
}

// Función para actualizar un tipo de licencia.
export const actualizarTiposLicencia = async (id, tiposLicencia) => {
    try {
        const { nombre } = tiposLicencia;
        const query = "UPDATE tipos_licencia SET nombre = ? WHERE id = ? AND eliminado != 1";
        const values = [nombre, id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Tipo de licencia actualizado exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo actualizar el tipo de licencia o no se encontró",
        };
    } catch (error) {
        console.log("Error al actualizar el tipo de licencia: ", error);
        return {
            succes: false,
            message: "Error al actualizar el tipo de licencia",
        };
    }
}

// Función para eliminar un tipo de licencia (marcar como eliminado).
export const eliminarTiposLicencia = async (id) => {
    try {
        const query = "UPDATE tipos_licencia SET eliminado = 1 WHERE id = ? and eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Tipo de licencia eliminado exitosamente",
            };
        }
        return {
            success: false,
            message: "No se puedo eliminar el tipo de licencia o no se encontró"
        };
    } catch (error) {
        console.log("Error al eliminar el tipo de licencia: ", error);
        return {
            success: false, 
            message: "Error al eliminar el tipo de licencia",
        };
    }
}