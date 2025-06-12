import { crearHijos, obtenerHijosPorTrabajador, actualizarHijo, eliminarHijo } from "../models/hijos.models.js";

export const crearHijosController = async (req, res) => {
    try {
        const { trabajador_id, rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento } = req.body;

        if (!trabajador_id || !rut || !nombres || !apellido_paterno || !apellido_materno || !fecha_nacimiento) {
            return res.status(400).json({
                status: 400,
                message: "Todos los campos son obligatorios"
            });
        }

        const nuevoHijo = {
            trabajador_id,
            rut,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento
        }

        const resultado = await crearHijos(nuevoHijo);

        if(!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        res.status(201).json({
            status: 201,
            message: "Hijo creado exitosamente",
        });
    } catch (error) {
        console.log("Error al crear hijos:", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear hijos"
        });
    }
}

export const obtenerHijosPorTrabajadorController = async (req, res) => {
    try {
        const { trabajador_id } = req.params;

        if (!trabajador_id) {
            return res.status(400).json({
                status : 400,
                message: "El ID del trabajador es obligatorio"
            });
        }

        const resultado = await obtenerHijosPorTrabajador(trabajador_id);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        res.status(200).json({
            status: 200,
            data: resultado.hijos
        });

    } catch (error) {
        console.log("Error al obtener hijos:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener hijos"
        });
    }
}

export const actualizarHijoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento } = req.body;

        const datosActualizados = {
            rut,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento
        }

        const resultado = await actualizarHijo(id, datosActualizados);
        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }

        res.status(200).json({
            status: 200,
            message: "Hijo actualizado exitosamente"
        });

    } catch (error) {
        console.log("Error al actualizar hijo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar hijo"
        });
        
    }
}

export const eliminarHijoController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del hijo es obligatorio"
            });
        }

        const resultado = await eliminarHijo(id);
        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        res.status(200).json({
            status: 200,
            message: "Hijo eliminado exitosamente"
        });
    } catch (error) {
        console.log("Error al eliminar hijo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar hijo"
        });
    }
}