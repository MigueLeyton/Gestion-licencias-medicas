import { pool as db } from '../database/database.js';

// Función para crear una licencia.
export const crearLicencia = async (licencia) => {
    try {
        const { trabajador_id, profesional_id, tipo_licencia_id, afp_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones } = licencia;
        const query = "INSERT INTO licencias (trabajador_id, profesional_id, tipo_licencia_id, afp_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [trabajador_id, profesional_id, tipo_licencia_id, afp_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia creada exitosamente",
            };
        }; 
        return {
            success: false,
            message: "No se pudo crear la licencia",
        };      
    } catch (error) {
        console.log("Error al crear la licencia: ", error);
        return {
            success: false,
            message: "Error al crear la licencia"
        }; 
    }
}

// Función para obtener todas las licencias.
export const obtenerLicencia = async () => {
    try {
        const query = "SELECT id, trabajador_id, profesional_id, tipo_licencia_id, afp_id, estado_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones FROM licencias WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0) {
            return {
                success: true,
                licencia: result
            };
        } 
        return {
            success: false,
            message: "No se encontraron licencias"
        };
    } catch (error) {
        console.log("Error al obtener licencias: ", error);
        return {
            success: false,
            message: "Error al obtener licencias"
        };
    }
}

// Función para obtener una licencia por ID.
export const obtenerLicecniaPorId = async (id) => {
    try {
        const query = "SELECT id, trabajador_id, profesional_id, tipo_licencia_id, afp_id, estado_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones FROM licencias WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                licencia: result[0]
            };
        } 
        return {
            success: false,
            message: "No se encontró la licencia con el ID proporcionado"
        };
    } catch (error) {
        console.log("Error al obtener licencia por ID: ", error);
        return {
            success: false,
            message: "Error al obtener licencia por ID"
        };
    }
}

// Función para actualizar una licencia.
export const actualizarLicencia = async (id, licencia) => {
    try {
        const { trabajador_id, profesional_id, tipo_licencia_id, afp_id, estado_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones } = licencia;
        let query = "UPDATE licencias";

        if (trabajador_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "trabajador_id = ?";

        if (profesional_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "profesional_id = ?";

        if (tipo_licencia_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "tipo_licencia_id = ?";

        if (afp_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "afp_id = ?";

        if (estado_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "estado_id = ?";

        if (fecha_emision) 
            query += (query.includes("SET") ? ", " : " SET ") + "fecha_emision = ?";

        if (dias) 
            query += (query.includes("SET") ? ", " : " SET ") + "dias = ?";

        if (inicio_reposo) 
            query += (query.includes("SET") ? ", " : " SET ") + "inicio_reposo = ?";

        if (termino_reposo) 
            query += (query.includes("SET") ? ", " : " SET ") + "termino_reposo = ?";

        if (tipo_reposo_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "tipo_reposo_id = ?";

        if (jornada_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "jornada_id = ?";

        if (lugar_reposo_id) 
            query += (query.includes("SET") ? ", " : " SET ") + "lugar_reposo_id = ?";

        if (direccion_reposo) 
            query += (query.includes("SET") ? ", " : " SET ") + "direccion_reposo = ?";

        if (observaciones) 
            query += (query.includes("SET") ? ", " : " SET ") + "observaciones = ?";

        query += " WHERE id = ?";

        const values = [
            trabajador_id, 
            profesional_id, 
            tipo_licencia_id, 
            afp_id, estado_id, 
            fecha_emision, dias, 
            inicio_reposo, 
            termino_reposo, 
            tipo_reposo_id, 
            jornada_id, 
            lugar_reposo_id, 
            direccion_reposo, 
            observaciones, 
            id].filter(value => value !== "" && value != undefined);

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia actualizada exitosamente",
            };
        } 
        return {
            success: false,
            message: "No se pudo actualizar la licencia",
        };
    } catch (error) {
        console.log("Error al actualizar licencia: ", error);
        return {
            success: false,
            message: "Error al actualizar licencia"
        };
    }
}

// Función para eliminar una licencia (marcar como eliminada).
export const eliminarLicecnia = async (id) => {
    try {
        const query = "UPDATE licencias SET eliminado = 1 WHERE id = ?";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Licencia eliminada exitosamente",
            };
        } 
        return {
            success: false,
            message: "No se pudo eliminar la licencia",
        };
    } catch (error) {
        console.log("Error al eliminarlicencia: ", error);
        return {
            success: false,
            message: "Error al aliminar licecnia"
        };
    }
}