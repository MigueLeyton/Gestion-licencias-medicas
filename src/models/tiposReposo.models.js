import { pool as db } from "../database/database.js";

export const crearTiposReposo = async (tipoReposo) => {
    try {
        const { nombre } = tipoReposo;
        const query = "INSERT INTO tipos_reposo (nombre) VALUES (?)";
        const values = [nombre];

        const [result] = await db.query(query, values);
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Tipos de reposo creado exitosamente",
            };
        } else {
            return {
                seccess: false,
                message: "No se pudo crear el tipo de reposo",
            }
        }
    } catch (error) {
        console.error("Error al crear tipo de reposo:", error);
        return {
            success: false,
            message: "Error al crear tipo de reposo"
        };
    }
}

export const obtenerTiposReposo = async () => {
    try {
        const query = "SELECT id, nombre FROM tipos_reposo WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0) {
            return {
                success: true,
                tipoReposo: result
            };
        } else {
            return {
                success: false,
                message: "No se encontraron tipos de reposo"
            };
        }
    } catch (error) {
        console.error("Error al obtener tipos de reposo:", error);
        return{
            success: false,
            message: "Error al obtener tipos de reposo"
        };
    }
}

export const obtenerTiposReposoPorId = async (id) => {
    try {
        const query = "SELECT id, nombre FROM tipos_reposo WHERE id = ? AND eliminado != 1";
        const values = [id];

        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                tipoReposo: result[0]
            };
        } else {
            return {
                success: false,
                message: "No se encontró el tipo de reposo"
            };
        }
    } catch (error) {
        console.error("Error al obtener tipo de reposo por ID:", error);
        return {
            success: false,
            message: "Error al obtener tipo de reposo por ID"
        };
    }
}

export const actualizarTiposReposo = async (id, tipoReposo) => {
    try {
        const { nombre} = tipoReposo;
        const query = "UPDATE tipos_reposo SET nombre = ? WHERE id = ? AND eliminado != 1";
        const values = [nombre, id];

        const [result] = await db.query(query, values);
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Tipo de reposo actualizado exitosamente"
            };
        } else {
            return {
                success: false,
                message: "No se pudo actualizar el tipo de reposo"
            };
        }
    } catch (error) {
        console.error("Error al actualizar tipo de reposo:", error);
        return {
            success: false,
            message: "Error al actualizar tipo de reposo"
        };
    }
}

export const eliminarTiposReposo = async (id) => {
    try {
        const query = "UPDATE tipos_reposo SET eliminado = 1 WHERE id = ? AND eliminado != 1";
        const values = [id];

        const [result] = await db.query(query, values);
        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Tipo de reposo eliminado exitosamente"
            };
        } else {
            return {
                success: false,
                message: "No se pudo eliminar el tipo de reposo"
            };
        }
    }catch (error) {console.error("Error al eliminar tipo de reposo:", error);
        return {
            success: false,
            message: "Error al eliminar tipo de reposo"
        };
    }
}