import { pool as db } from "../database/database.js";

export const crearAfp = async (afp) => {
    try {
        const { nombre, tasa, fecha_vigencia } = afp;

        const [anio, mes] = fecha_vigencia.split("-");

        const existeQuery = "SELECT * FROM afp WHERE MONTH(fecha_vigencia) = ? AND YEAR(fecha_vigencia) = ? AND eliminado != 1";
        const [existe] = await db.query(existeQuery, [mes, anio]);

        if (existe.length > 0) {
            return {
                success: false,
                message: "Ya existe una AFP registrada para este mes y año"
            };
        }

        const query = "INSERT INTO afp (nombre, tasa, fecha_vigencia) VALUES (?, ?, ?)";
        const values = [nombre, tasa, fecha_vigencia]; 
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Afp agregada exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo agregar la AFP"
        };
    } catch (error) {
        console.log("Error al crear la AFP: ", error);
        return {
            success: false,
            message: "Error al crear la AFP"
        };
    }
}

export const obtenerAfp = async (fecha = null) => {
    try {
        let query = "SELECT id, nombre, tasa, fecha_vigencia FROM afp WHERE eliminado != 1 AND MONTH(fecha_vigencia) = ? AND YEAR(fecha_vigencia) = ?";

        let mes, anio;

        if (fecha) {
            [anio, mes] = fecha.split("-");
        } else {
            const hoy = new Date();
            mes = hoy.getMonth() + 1;
            anio = hoy.getFullYear();
        }

        const [result] = await db.query(query, [mes, anio]);

        if (result.length > 0) {
            return {
                success: true,
                afp: result
            };
        }

        return {
            success: false,
            message: "No se encontraron AFP en el periodo indicado"
        };

    } catch (error) {
        console.log("Error al obtener AFP:", error);
        return {
            success: false,
            message: "Error al obtener AFP"
        };
    }
}

export const obtenerAfpPorId = async (id) => {
    try {
        const query = "SELECT id, nombre, tasa, fecha_vigencia FROM afp WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                afp: result[0]
            };
        }
        return {
            success: false,
            message: "No se encontró la AFP"
        };
    } catch (error) {
        console.log("Error al obtener AFP por ID: ", error);
        return {
            success: false, 
            message: "Error al obtener AFP por ID"
        };
    }
}

export const actualizarAfp = async (id, afp) => {
    try {
        const { nombre, tasa, fecha_vigencia } = afp;
        const query = "UPDATE afp SET nombre = ?, tasa = ?, fecha_vigencia = ? WHERE id = ? AND eliminado != 1";
        const values = [nombre, tasa, fecha_vigencia, id];
        
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "AFP actualizada exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo actualizar la AFP o no se encontró"
        };
        
    } catch (error) {
        console.log("Error al actualizar la AFP: ", error);
        return {
            success: false,
            message: "Error al actualizar la AFP"
        };
    }
}

export const eliminarAfp = async (id) => {
    try {
        const query = "UPDATE afp SET eliminado = 1 WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "AFP eliminada exitosamente"
            };
        }
        return {
            success: false,
            message: "No se pudo eliminar la AFP o no se encontró"
        };
    } catch (error) {
        console.log("Error al eliminar APF: ", error);
        return {
            success: false,
            message: "Error al eliminar AFP"
        };
    }
}