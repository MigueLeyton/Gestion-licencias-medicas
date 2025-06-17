import e from 'cors';
import { pool as db } from '../database/database.js';

export const crearEstadosLicencia = async (estadoLicencia) => {
    try {
        const { nombre } = estadoLicencia;
        const query = "INSERT INTO estados_licencia (nombre) VALUES (?)";
        const values = [nombre];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Estado de licencia creado exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo crear el estado de licencia",
        };
    } catch (error) {
        console.log("Error al crear el estado de licencia: ", error);
        return {
            success: false,
            message: "Error al crear el estado de licenca",
        };
    }
}

export const obtenerEstadosLicencia = async () => {
    try {
        const query = "SELECT id, nombre FROM estados_licencia WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0 ) {
            return {
                success: true,
                estadoLicencia: result
            };
        }
        return {
            success: false,
            message: "No se econtraron estados de licencia",
        };
    } catch (error) {
        console.log("Error al obtener estados de licencia: ", error);
        return {
            success: false,
            message: "Error al obtener estados de licencia",
        };
    }
}

export const obtenerEstadosLicenciaPorId = async (id) => {
    try {
        const query = "SELECT id, nombre FROM estados_licencia WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                estadoLicencia: result[0]
            };
        }
        return {
            success: false,
            message: "No se encontró el estado de licencia solicitado",
        }
    } catch (error) {
        console.log("Error al obtener estado de licencia: ", error);
        return {
            success: false,
            message: "Error al obtener estado de licencia",
        };
    }
}

export const actualizarEstadosLicencia = async (id, estadoLicencia) => {
    try {
        const { nombre } = estadoLicencia;
        const query = "UPDATE estados_licencia SET nombre = ? WHERE id = ?";
        const values = [nombre, id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true, 
                message: "Estados de licencia actuaiados exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudp actualizar el estado de licencia",
        };
    } catch (error) {
        console.log("Error al actualizar estado de licencia: ", error);
        return {
            success: false,
            message: "Error al actualizar estado de licencia",
        };
    }
}

export const eliminarEstadosLicencia = async (id) => {
    try {
        const query = "UPDATE estados_licencia SET eliminado = 1 WHERE id = ?";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Estado de licencia eliminado exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo eliminar el estado de licencia",
        };
    } catch (error) {
        console.log("Error al eliminar estado de licencia: ", error);
        return {
            success: false, 
            message: "Error al eliminar estado de licencia",
        };
    }
}