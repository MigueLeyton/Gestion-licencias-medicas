import { pool as db } from '../database/database.js';

export const crearHistorialRemuneracion = async (historialRemuneracion) => {
    try {
        const { trabajador_id, imponible, liquido, fecha_actualizacion } = historialRemuneracion;
        const query = "INSERT INTO historial_remuneracion (trabajador_id, imponible, liquido, fecha_actualizacion) VALUES (?, ?, ?, ?)";
        const values = [ trabajador_id, imponible, liquido, fecha_actualizacion ];
        const [result] = await db.query(query, values);
        
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Historial de remuneración creado exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo crear el historial de remuneración"
        };
    } catch (error) {
        console.log("Error al crear el historial de remuneración: ", error);
        return {
            success: false,
            message: "Error al crear el historial de remuneración"
        };
    }
}

export const obtenerHistorialRemuneracion = async () => {
    try {
        const query = "SELECT id, trabajador_id, imponible, liquido, fecha_actualizacion FROM historial_remuneracion WHERE eliminado != 1";
        const [result] = await db.query(query);
        
        if (result.length > 0) {
            return {
                success: true,
                historialRemuneracion: result
            };
        }
        return {
            success: false,
            message: "No se encontraron historiales de remuneración"
        };
    } catch (error) {
        console.log("Error al obtener historial de remuneración: ", error);
        return {
            success: false,
            message: "Error al obtener historial de remuneración "
        };
    }
}

export const obtenerHistorialRemuneracionPorId = async (id) => {
    try {
        const query = "SELECT id, trabajador_id, imponible, liquido, fecha_actualizacion FROM historial_remuneracion WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                historialRemuneracion: result[0]
            };
        }
        return {
            success: false,
            message: "No se encontró el historial de remuneración"
        };
    } catch (error) {
        console.log("Error al obtener historial de remuneravción: ", error);
        return {
            success: false,
            message: "Error al obtener historial de remuneración"
        };
    }
}

export const obtenerHistorialRemuneracionPorFecha = async (trabajador_id, fecha) => {
    try {
        const query = "SELECT id, trabajador_id, imponible, liquido, fecha_actualizacion FROM historial_remuneracion WHERE trabajador_id = ? AND fecha_actualizacion = ? AND eliminado != 1";
        const values = [trabajador_id, fecha];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                historialRemuneracion: result[0]
            };
        }
        return {
            success: false,
            message: "No se encontró el historial de remuneración para el trabajador en la fecha especificada"
        };
    } catch (error) {
        console.log("Error al obtener historial de remuneración por trabajador y fecha: ", error);
        return {
            success: false,
            message: "Error al obtener historial de remuneración por trabajador y fecha"
        };
    }
}

export const actualizarHistorialRemuneracion = async (id, historialRemuneracion) => {
    try {
        const { trabajador_id, imponible, liquido, fecha_actualizacion } = historialRemuneracion;
        const query = "UPDATE historial_remuneracion SET trabajador_id = ?, imponible = ?, liquido = ?, fecha_actualizacion = ? WHERE id = ? AND eliminado != 1";
        const values = [trabajador_id, imponible, liquido, fecha_actualizacion, id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Historial de remuneración actualizado exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo actualizar el historial de remuneración"
        };
    } catch (error) {
        console.log("Error al actualizar el historial de remuneración: ", error);
        return {
            success: false,
            message: "Error al actualizar el historial de remuneración"
        };
    }
}

export const eliminarHistorialRemuneracion = async (id) => {
    try {
        const query = "UPDATE historial_remuneracion SET eliminado = 1 WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Historial de remuneración eliminado exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo eliminar el historial de remuneración"
        };
    } catch (error) {
        console.log("Error al eliminar el historial de remuneración: ", error);
        return {
            success: false,
            message: "Error al eliminar el historial de remuneración"
        };
    }
}