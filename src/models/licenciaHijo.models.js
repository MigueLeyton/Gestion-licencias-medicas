import { pool as db } from '../database/database.js';

export const crearLicenciaHijo = async (licenciaHijo) => {
    try {
        const { licencia_id, hijo_id, fecha_concepcion } = licenciaHijo;
        const query = "INSERT INTO licencia_hijo (licencia_id, hijo_id, fecha_concepcion) VALUES (?, ?, ?)";
        const values = [licencia_id, hijo_id, fecha_concepcion];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0 ){
            return {
                success: true,
                message: "Licencia de hijo creada exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo crear la licencia de hijo"
        };
    } catch (error) {
        console.log("Error al crear licencia de hijo: ", error);
        return {
            success: false,
            message: "Error al crear licencia de hijo"
        };
    }
}

export const obtenerLicenciaHijos = async () => {
    try {
        const query = "SELECT id, licencia_id, hijo_id, fecha_concepcion FROM licencia_hijo WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0) {
            return {
                success: true,
                licenciasHijos: result
            };
        }
        return {
            success: false,
            message: "No se encontraron licencias de hijos registradas"
        }
    } catch (error) {
        console.log("Error al obtener licencias de hijos: ", error);
        return {
            success: false,
            message: "Error al obtener licencias de hijos"
        };
    }
}

export const obtenerLicenciaHijoPorId = async (id) => {
    try {
        const query = "SELECT id, licencia_id, hijo_id, fecha_concepcion FROM licencia_hijo WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                licenciaHijo: result[0]
            };
        }
        return {
            success: false,
            message: "No se encontró la licencia de hijo con el ID proporcionado"
        };
    } catch (error) {
        console.log("Error al obtener licencia de hijo por ID: ", error);
        return {
            success: false,
            message: "Error al obtener licencia de hijo por ID"
        };
    }
}

export const obtenerLicenciaHijoPorFecha = async (fecha) => {
    try {
        const query = "SELECT id, licencia_id, hijo_id, fecha_concepcion FROM licencia_hijo WHERE fecha_concepcion = ? AND eliminado != 1";
        const values = [fecha];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                licenciaHijo: result[0]
            }
        }
        return {
            success: false,
            message: "No se encontró la licencia de hijo con la fecha proporcionada"
        };
    } catch (error) {
        console.log("Error al obtener licencia de hijo por fecha: ", error);
        return {
            success: false,
            message: "Error al obtener licencia de hijo por fecha"
        };
    }
}

export const actualizarLicenciaHijo = async (id, licenciaHijo) => {
    try {
        const { licencia_id, hijo_id, fecha_concepcion } = licenciaHijo;

        let query = "UPDATE licencia_hijo";

        if (licencia_id) {
            query += (query.includes("SET") ? ", " : " SET ") + "licencia_id = ?";
        }
        if (hijo_id) {
            query += (query.includes("SET") ? ", " : " SET ") + "hijo_id = ?";
        }
        if (fecha_concepcion) {
            query += (query.includes("SET") ? ", " : " SET ") + "fecha_concepcion = ?";
        }
        query += " WHERE id = ? AND eliminado != 1";

        const values = [
            licencia_id, 
            hijo_id, 
            fecha_concepcion, 
            id
        ].filter(value => value !== "" && value != undefined);

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia de hijo actualizada exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo actualizar la licencia de hijo"
        };
    } catch (error) {
        console.log("Error al actualizar licencia de hijos: ", error);
        return {
            success: false,
            message: "Error al actualizar licencia de hijo"
        };
    }
}

export const eliminarLicenciaHijo = async (id) => {
    try {
        const query = "UPDATE licencia_hijo SET eliminado = 1 WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia de hijo eliminada exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo eliminar la licencia de hijo o no se encontró"
        };
    } catch (error) {
        console.log("Error al eliminar licencia de hijo: ", error);
        return {
            success: false,
            message: "Error al eliminar licencia de hijo"         
        };
    }
}