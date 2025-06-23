import { pool as db } from "../database/database.js";

export const crearLugaresReposo = async (lugarReposo) => {
    try {
        const { nombre } = lugarReposo;
        const query = "INSERT INTO lugares_reposo (nombre) VALUES (?)";
        const values = [nombre];

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Lugar de reposo creado exitosamente",
            };
        } 
        return {
            success: false,
            message: "No se pudo crear el lugar de reposo",
        };
        
    } catch (error) {
        console.log ("Error al crear el lugar de reposo"), error;
        return {
            success: false,
            message: "Error al crear el lugar de reposo"
        };
    }
}

export const obtenerLugaresReposo = async () => {
    try {
        const query = "SELECT id, nombre FROM lugares_reposo WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0) {
            return {
                success: true, 
                lugarReposo: result
            };
        } 
        return {
            success: false,
            message: "No se encotraron lugares de reposo"
        };
           
    } catch (error) {
        console.log ("Error al obtener lugares de reposo:", error);
        return {
            success: false,
            message: "Error al obtener lugares de reposo"
        };
    }
}

export const obtenerLugaresReposoPorId = async (id) => {
    try {
        const query = "SELECT id, nombre FROM lugares_reposo WHERE id = ? AND eliminado != 1";
        const values = [id];

        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                lugarReposo: result [0]
            };
        } 
        return {
            success: false,
            message: "No se encontró el lugar de reposo"
        };
        
    } catch (error) {
        console.log("Error al obtener lugar de reposo:", error);
        return {
            success: false,
            message: "Error al obteber lugare de resposo"
        };
    }
}

export const actualizarLugaresReposo = async (id, lugarReposo) => {
    try {
        const { nombre } = lugarReposo;
        const query = "UPDATE lugares_reposo SET nombre = ? WHERE id = ? AND eliminado != 1";
        const values = [nombre, id];

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Lugar de reposo actualizado exitosamente"
            };
        } 
        return {
            success: false,
            message: "No se pudo actualizar el lugar de reposo"
        };
        
    } catch (error) {
        console.log ("Error al actualizar lugares de reposo:", error);
        return {
            success: false,
            message: "Error al actualizar lugares de reposo"
        };
    }
}

export const eliminarLugaresReposo = async (id) => {
    try {
        const query = "UPDATE lugares_reposo SET eliminado = 1 WHERE id = ?";
        const values = [id];

        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Lugar de reposo eliminado exitosamente"
            };
        } 
        return {
            success: false,
            message: "No se pudo eliminar el lugar de reposo"
        };
        
    } catch (error) {
        console.log("Error al eliminar el lugar de reposo:", error);
        return {
            success: false,
            massage: "Error al eliminar el lugar de reposo"
        };
    }
}