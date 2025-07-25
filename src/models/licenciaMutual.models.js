import { pool as db } from "../database/database.js";

// Función para crear una licencia mutual.
export const crearLicenciaMutual = async (licenciaMutual) => {
    try {
        const { licencia_id, mutual, institucion_mutual, fecha_compin } = licenciaMutual;
        const query = "INSERT INTO licencia_mutual (licencia_id, mutual, institucion_mutual, fecha_compin) VALUES (?, ?, ?, ?)";
        const values = [licencia_id, mutual, institucion_mutual, fecha_compin];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0 ) {
            return {
                success: true,
                message: "Licencia mutual creada exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo crear la licencia mutual",
        }
    } catch (error) {
        console.log("Error al crear la licencia mutual: ", error);
        return {
            success: false,
            message: "Error al crear la licencia mutual",
        };
    }
}

// Función para obtener todas las licencias mutuales.
export const obtenerLicenciaMutual = async () => {
    try {
        const query = "SELECT id, licencia_id, mutual, institucion_mutual, fecha_compin FROM licencia_mutual WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0 ) {
            return {
                success: true,
                licenciaMutual: result
            };
        }
        return {
            success: false,
            message: "No se encontraron licencias mutuales resgistradas",
        };
    } catch (error) {
        console.log("Error al obtener las licencias mutuales: ", error);
        return {
            success: false, 
            message: "Error al obtener las licencias mutuales",
        };
    }
}

// Función para obtener una licencia mutual por ID.
export const obtenerLicenciaMutualPorId = async (id) => {
    try {
        const query = "SELECT id, licencia_id, mutual, institucion_mutual, fecha_compin FROM licencia_mutual WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                licenciaMutual: result[0]
            };
        }
        return {
            success: false,
            message: "No se encontró la licencia mutual",
        };
    } catch (error) {
        conaole.log("Error al obtener la licencia mutual por ID: ", error);
        return {
            success: false,
            message: "Error al obtener la licencia mutual por ID",
        };
    }
}

// Función para obtener una licencia mutual por fecha.
export const obtenerLicenciaMutualPorFecha = async (fecha) => {
    try {
        const query = "SELECT id, licencia_id, mutual, institucion_mutual, fecha_compin FROM licencia_mutual WHERE fecha_compin = ? AND eliminado != 1";
        const values = [fecha];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                licenciaMutual: result
            };
        }
        return {
            success: false,
            message: "No se encontraron licencias mutuales para la fecha especificada",
        };
    } catch (error) {
        console.log("Error al obtener la licencia mutual por fecha: ", error);
        return {
            success: false,
            message: "Error al obtener la licencia mutual por fecha"
        }
    }
}

// Función para actualizar una licencia mutual.
export const actualizarLicenciaMutual = async (id, licenciaMutual) => {
    try {
        const { licencia_id, mutual, institucion_mutual, fecha_compin } = licenciaMutual;

        let query = "UPDATE licencia_mutual";

        if (licencia_id) {
            query += "SET licencia_id = ?";
        }
        if (mutual) {
            query += (query.includes("SET") ? ", " : " SET ") + "mutual = ?";
        }
        if (institucion_mutual) {
            query += (query.includes("SET") ? ", " : " SET ") + "institucion_mutual = ?";
        }
        if (fecha_compin) {
            query += (query.includes("SET") ? ", " : " SET ") + "fecha_compin = ?";
        }
        query += " WHERE id = ? AND eliminado != 1";

        const values = [
            licencia_id, 
            mutual, 
            institucion_mutual, 
            fecha_compin, 
            id
        ].filter(value => value !== "" && value != undefined);

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia mutual actualizada exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo actualizar la licencia mutual o hubo cambios",
        };
    } catch (error) {
        console.log("Error al actualizar la licencia mutual: ", error);
        return {
            success: false,
            message: "Error al actualizar la licencia mutual",
        };
    }
}

// Función para eliminar una licencia mutual (marcar como eliminada).
export const eliminarLicenciaMutual = async (id) => {
    try {
        const query = "UPDATE licencia_mutual SET eliminado = 1 WHERE id = ?";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0 ) {
            return {
                success: true,
                message: "Licencia mutual eliminada exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo eliminar la licencia mutual o ya estaba eliminada",
        };
    } catch (error) {
        console.log("Error al eliminar la licencia mutual: ", error);
        return {
            success: false,
            message: "Error al eliminar la licencia mutual",
        };
    }
}