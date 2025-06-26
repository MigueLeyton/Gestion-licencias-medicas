import { pool as db } from "../database/database.js";   

export const crearLicenciaExtension = async (licenciaExtension) => {
    try {
        const { licencia_id, es_exteinsion, licencia_relacionada } = licenciaExtension;
        const query = "INSERT INTO licencia_extension (licencia_id, es_extension, licencia_relacionada) VALUES (?, ?, ?)";
        const values = [licencia_id, es_exteinsion, licencia_relacionada];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia de extensión creada exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo crear la licencia de extensión",
        };
    } catch (error) {
        console.log("Error al crear la licencia de extensión: ", error);
        return {
            success: false,
            message: "Error al crear la licencia de extensión",
        };
    }
}

export const obtenerLicenciaExtension = async () => {
    try {
        const query = "SELECT id, licencia_id, es_extension, licencia_relacionada FROM licencia_extension WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0) {
            return {
                success: true,
                licenciaExtension: result
            };
        }
        return {
            success: false, 
            message: "No se encontraron licencias de extensión registradas en la base de datos",
        };
    } catch (error) {
        console.log("Error al obtener las licecnias de extensión: ", error);
        return {
            success: false, 
            message: "Error al obtener las licecnas de extensión"
        };
    }
}

export const obtenerLicenciaExtensionPorId = async (id) => {
    try {
        const query = "SELECT id, licencia_id, es_extension, licencia_relacionada FROM licencia_extension WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                licenciaExtension: result[0]
            };
        }
        return {
            success: false, 
            message: "No se encontró la licencia de extensión con el ID proporcionado o la licencia ha sido eliminada",
        };
    } catch (error) {
        console.log("Error al obtener la licencia de extensión por ID: ", error);
        return {
            success: false, 
            message: "Error al obtener la licencia de extensión por ID"
        };
    }
}

export const actualizarLicenciaExtension = async (id, licenciaExtension) => {
    try {
        const { licencia_id, es_extension, licencia_relacionada } = licenciaExtension;

        let query = "UPDATE licencia_extension";

        if (licencia_id) {
            query += " SET licencia_id = ?";
        }
        if (es_extension) {
            query += (query.includes("SET") ? ", " : " SET ") + "es_extension = ?";
        }
        if (licencia_relacionada) {
            query += (query.includes("SET") ? ", " : " SET ") + "licencia_relacionada = ?";
        }
        query += " WHERE id = ? AND eliminado != 1";

        const values = [
            licencia_id, 
            es_extension, 
            licencia_relacionada, 
            id
        ].filter(value => value !== "" && value != undefined);

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia de extensión actualizada correctamente"
            };
        }
        return {
            succes: false,
            message: "No se pudo actualizar la licencia de extensión o no se encontraron cambios"
        };
    } catch (error) {
        console.log("Error al actualizar la licencia de extensión: ", error);
        return {
            success: false,
            message: "Error al actualizar la licencia de extensión"
        };
    }
}

export const eliminarLicenciaExtension = async (id) => {
    try {
        const query = "UPDATE licencia_extension SET eliminado = 1 WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia de extensión eliminada correctamente"
            };
        }
        return {
            success: false,
            message: "No se pudo eliminar la licencia de extensión o no se encontraron cambios"
        };
    } catch (error) {
        console.log("Error al eliminar la licencia de extensión: ", error);
        return {
            success: false,
            message: "Error al eliminar la licencia de extensión"
        };
    }
}