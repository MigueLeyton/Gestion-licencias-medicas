import { pool as db } from "../database/database.js";

export const crearTrabajador = async (trabajador) => {
    try {
        const {rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible, tiene_hijos} = trabajador;

        const query = "INSERT INTO trabajadores (rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible, tiene_hijos) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible, tiene_hijos];

        const [result] = await db.query(query, values);

        if(result.affectedRows > 0) {
            return {
                success: true,
                message: "Trabajador creado exitosamente",
            };
        }
        return {
            success: false,
            message: "No se pudo crear el trabajador",
        };
    } catch (error) {
        console.error("Error al crear trabajador:", error);
        return {
            success: false,
            message: "Error al crear trabajador"
        };
    }
}

export const obtenerTrabajadores = async () => {
    try {
        const query = "SELECT id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible, tiene_hijos FROM trabajadores WHERE eliminado != 1";
        const [result] = await db.query(query);

        if (result.length > 0) {
            return {
                success: true,
                trabajadores: result
            };
        } 
        return {
            success: false,
            message: "No se encontraron trabajadores"
        };
    } catch (error) {
        console.error("Error al obtener trabajadores:", error);
        return {
            success: false,
            message: "Error al obtener trabajadores"
        };
    }
}

export const obtenerTrabajadorPorId = async (id) => {
    try {
        const query = "SELECT id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible, tiene_hijos FROM trabajadores WHERE id = ? AND eliminado != 1";
        const values = [id];
        const [result] = await db.query(query, values);

        if (result.length > 0) {
            return {
                success: true,
                trabajador: result[0]
            };
        } 
        return {
            success: false,
            message: "Trabajador no encontrado o ya eliminado"
        };
    } catch (error) {
        console.error("Error al obtener trabajador por ID:", error);
        return {
            success: false,
            message: "Error al obtener trabajador por ID"
        };
        
    }
}

export const actualizarTrabajador = async (id, trabajador) => {
    try {
        const {rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible, tiene_hijos} = trabajador;

        let query = "UPDATE trabajadores";

        if(rut) {
            query += " SET rut = ?";
        }
        if(nombres) {
            query += (query.includes("SET") ? ", " : " SET ") + "nombre = ?";
        }
        if(apellido_paterno) {
            query += (query.includes("SET") ? ", " : " SET ") + "apellido_paterno = ?";
        }
        if(apellido_materno) {
            query += (query.includes("SET") ? ", " : " SET ") + "apellido_materno = ?";
        }
        if(fecha_nacimiento) {
            query += (query.includes("SET") ? ", " : " SET ") + "fecha_nacimiento = ?";
        }
        if(remuneracion_imponible) {
            query += (query.includes("SET") ? ", " : " SET ") + "remuneracion_imponible = ?";
        }
        if(tiene_hijos !== undefined) {
            query += (query.includes("SET") ? ", " : " SET ") + "tiene_hijos = ?";
        }
        query += " WHERE id = ?";

        const values = [
            rut,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            remuneracion_imponible,
            tiene_hijos,
            id
        ].filter(value => value !== undefined);

        const [result] = await db.query(query, values);

        if(result.affectedRows > 0) {
            return {
                success: true,
                message: "Trabajador actualizado exitosamente"
            };
        } else {
            return {
                success: false,
                message: "No se pudo actualizar el trabajador o no hubo cambios"
            };
        }
    } catch (error) {
        console.error("Error al actualizar trabajador:", error);
        return {
            success: false,
            message: "Error al actualizar trabajador"
        };
    }
}

export const eliminarTrabajador = async (id) => {
    try {
        const query = "UPDATE trabajadores SET eliminado = 1 WHERE id = ?";
        const values = [id];
        const [result] = await db.query(query, values);

        if(result.affectedRows > 0) {
            return {
                success: true,
                message: "Trabajador eliminado exitosamente"
            };
        } else {
            return {
                success: false,
                message: "No se pudo eliminar el trabajador o ya estaba eliminado"
            };
        }
    } catch (error) {
        console.error("Error al eliminar trabajador:", error);
        return {
            success: false,
            message: "Error al eliminar trabajador"
        };
        
    }
}