import { crearHistorialRemuneracion, obtenerHistorialRemuneracion, obtenerHistorialRemuneracionPorId, actualizarHistorialRemuneracion, eliminarHistorialRemuneracion } from "../models/historialRemuneracion.js";

export const crearHistorialRemuneracionController = async (req, res) => {
    try {
        const { trabajador_id, imponible, liquido, fecha_actualizacion } = req.body;

        if (!trabajador_id || !imponible || !liquido || ! fecha_actualizacion) {
            return res.status(400).json({
                status: 400, 
                message: "Todos los campos son obligatorios"
            });
        }

        const historialRemuneracion = {
            trabajador_id,
            imponible,
            liquido,
            fecha_actualizacion
        };

        const resultado = await crearHistorialRemuneracion(historialRemuneracion);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(201).json({
            status: 201,
            message: resultado.message
        });
    } catch (error) {
        console.log("Error sl crear historial de remuneración: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear historial de remuneración"
        });
    }
}

export const obtenerHistorialRemuneracionController = async (req, res) => {
    try {
        const resultado = await obtenerHistorialRemuneracion();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Historial de remuneración obtenido correctamente",
            data: resultado.historialRemuneracion
        });
    } catch (error) {
        console.log("Error al obtener historial de remuneración: ", error );
        res.status(500).json({
            status: 500, 
            message: "Error al obtener historial de remuneración"
        });
    }
}

export const obtenerHistorialRemuneracionPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del historial de remuneración es obligatorio"
            });
        }

        const resultado = await obtenerHistorialRemuneracionPorId(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Historial de remuneración obtenido correctamente",
            data: resultado.historialRemuneracion
        });
    } catch (error) {
        console.log("Error al obtener historial de remuneración por ID: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener historial de remuneración por ID"
        });
    }
}

export const actualizarHistorialRemuneracionController = async (req, res) => {
    try {
        const { id } = req.params;
        const { trabajador_id, imponible, liquido, fecha_actualizacion } = req.body;

        const historialRemuneracion = {
            trabajador_id,
            imponible,
            liquido,
            fecha_actualizacion
        };

        const resultado = await actualizarHistorialRemuneracion(id, historialRemuneracion);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: resultado.message
        });
    } catch (error) {
        console.log("Error al actualizar historial de remuneración: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar historial de remuneración"
        });
    }
}

export const eliminarHistorialRemuneracionController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del historial de remuneración es obligatorio"
            });
        }

        const resultado = await eliminarHistorialRemuneracion(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: resultado.message
        });
    } catch (error) {
        console.log("Error al eliminar historial de remuneración: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar historial de remuneración"
        });
    }
}