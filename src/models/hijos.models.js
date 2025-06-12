import { pool as db } from "../database/database.js";

export const crearHijos = async (hijos) => {
    try {
        const { trabajador_id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento } = hijos;

        if(!trabajador_id || !rut || !nombres || !apellido_paterno || !apellido_materno || !fecha_nacimiento) {
            return {
                success: false,
                message: "Todos los campos son obligatorios"
            };
        }

        const validacionTrabajador = await validarTrabajador(trabajador_id);

        if (!validacionTrabajador.success) {
            return {
                success: false,
                message: validacionTrabajador.message
            };
        }

        const query = `INSERT INTO hijos (trabajador_id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [trabajador_id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento];

        const [result] = await db.query(query, values);

        if (result.affectedRows < 0) {
            return {
                success: false,
                message: "Error al crear hijo"
            };
        }

        const estadoHijo = await cambiarEstadoHijoTrabajador(trabajador_id);
        if (!estadoHijo.success) {
            return {
                success: false,
                message: estadoHijo.message
            };
        }
        return {
            success: true,
            message: "Hijo creado exitosamente",
        };
    } catch (error) {
        console.error("Error al crear hijo:", error);
        return {
            success: false,
            message: "Error al crear hijo"
        };
    }
}

export const obtenerHijosPorTrabajador = async (trabajador_id) => {
    try {
        const validacionTrabajador = await validarTrabajador(trabajador_id);

        if(!validacionTrabajador.success) {
            return {
                success: false,
                message: validacionTrabajador.message
            };
        }

        const query = "SELECT rut, nombres, apellido_paterno, apellido_materno, apellido_paterno, apellido_materno, fecha_nacimiento FROM hijos WHERE trabajador_id = ?";
        const values = [trabajador_id];

        const [result] = await db.query(query, values);

        if (result.length === 0) {
            return {
                success: false,
                message: "No se encontraron hijos para el trabajador especificado"
            };
        }
        return {
            success: true,
            message: "Hijos obtenidos exitosamente",
            hijos: result
        };
    } catch (error) {
        console.error("Error al obtener hijos por trabajador:", error);
        return {
            success: false,
            message: "Error al obtener hijos"
        };
    }
}

export const actualizarHijo = async (id, hijo) => {
    try {
        const { trabajador_id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento } = hijo;

        const validacionHijo = await validarHijo(id);

        if (!validacionHijo.success) {
            return {
                success: false,
                message: validacionHijo.message
            };
        }

        let query = `UPDATE hijos`;

        if(trabajador_id){
            query += (query.includes("SET") ? ", " : " SET ") + "trabajador_id = ?";
        }

        if(rut) {
            query += (query.includes("SET") ? ", " : " SET ") + "rut = ?";
        }
        if(nombres) {
            query += (query.includes("SET") ? ", " : " SET ") + "nombres = ?";
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
        query += " WHERE id = ?";

        const values = [trabajador_id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, id].filter(value => value !== undefined);

        const [result] = await db.query(query, values);

        if (result.affectedRows < 0) {
            return {
                success: false,
                message: "Error al actualizar hijo"
            };
        }

        return {
            success: true,
            message: "Hijo actualizado exitosamente"
        };

    } catch (error) {
        console.error("Error al actualizar hijo:", error);
        return {
            success: false,
            message: "Error al actualizar hijo"
        };
    }
}

export const eliminarHijo = async (hijo_id) => {
    try {
        const validacionHijo = await validarHijo(hijo_id);
        if (!validacionHijo.success) {
            return {
                success: false,
                message: validacionHijo.message
            };
        }
        const trabajador_id = validacionHijo.trabajador_id;

        const query = "UPDATE hijos SET eliminado = 1 WHERE id = ?";
        const values = [hijo_id];

        const [result] = await db.query(query, values);

        if (result.affectedRows < 0) {
            return {
                success: false,
                message: "Error al eliminar hijo"
            };
        }

        await validarEliminarHijo(trabajador_id);

        return {
            success: true,
            message: "Hijo eliminado exitosamente"
        }
    } catch (error) {
        console.error("Error al eliminar hijo:", error);
        return {
            success: false,
            message: "Error al eliminar hijo"
        };
    }
}

const validarTrabajador = async (trabajador_id) => {
    try {
        const query = `SELECT id FROM trabajadores WHERE id = ?`;
        const values = [trabajador_id];

        const [result] = await db.query(query, values);

        if (result.length < 0) {
            return {
                success: false,
                message: "Trabajador no encontrado"
            };
        } 
        return {
            success: true,
            message: "Trabajador encontrado"
        };

    } catch (error) {
        console.error("Error al validar trabajador:", error);
        return {
            success: false,
            message: "Error al validar trabajador"
        }
    }
}

const cambiarEstadoHijoTrabajador = async (trabajador_id) => {
    const query = `UPDATE trabajadores SET tiene_hijos = 1 WHERE id = ?`;
    const values = [trabajador_id];

    const [result] = await db.query(query, values);

    if (result.affectedRows < 0) {
        return {
            success: false,
            message: "Error al actualizar estado de hijos en trabajador"
        };
    }
    return {
        success: true,
        message: "Estado de hijos actualizado exitosamente en trabajador"
    };
}

const validarEliminarHijo = async (trabajador_id) => {
    try {
        const query = "SELECT COUNT(id) as cantidad_hijos FROM hijos WHERE trabajador_id = ?";
        const values = [trabajador_id];
        const [result] = await db.query(query, values);

        if(result[0].cantidad_hijos != 1) return

        const queryTrabajador = "UPDATE trabajadores SET tiene_hijos = 0 WHERE id = ?";
        const valuesTrabajador = [trabajador_id];
        const [resultTrabajador] = await db.query(queryTrabajador, valuesTrabajador);

    } catch (error) {
        console.error("Error al validar eliminar hijo:", error);
        return {
            success: false,
            message: "Error al validar eliminar hijo"
        };
    }
}

const validarHijo = async (id_hijo) => {
    const query = `SELECT trabajador_id FROM hijos WHERE id = ?`;
    const values = [id_hijo];

    const [result] = await db.query(query, values);

    if (result.length < 0) {
        return {
            success: false,
            message: "Hijo no encontrado"
        };
    }
    return {
        success: true,
        message: "Hijo encontrado",
        trabajador_id: result[0].trabajador_id
    };
}
