import { crearEstadosLicencia, obtenerEstadosLicencia, obtenerEstadosLicenciaPorId, actualizarEstadosLicencia, eliminarEstadosLicencia } from "../models/estadosLicencia.models.js";

export const crearEstadoLicenciaController = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                status: 400,
                message: "El estado de licencia es obligatorio"
            });
        }

        const nuevoEstadoLicencia = {
            nombre
        };

        const resultado = await crearEstadosLicencia(nuevoEstadoLicencia);
        
        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        res.status(201).json({
            status: 201,
            message: "Estado de licencia creado exitosamente",
            data: resultado.estadoLicencia
        });
    } catch (error) {
        console.log("Error al crear estado de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear estado de licencia"
        });
    }
}

export const obtenerEstadosLicenciaController = async (req, res) => {
    try {
        const resultado = await obtenerEstadosLicencia();
        
        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            data: resultado.estadoLicencia
        });
    } catch (error) {
        console.log("Error al obtener los estados de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener los estados de liencia"
        });
    }
}

export const obtenerEstadoLicenciaPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del estado de licencia es obligatorio"
            });
        }

        const resultado = await obtenerEstadosLicenciaPorId(id);

        if (!resultado.success){
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            data: resultado.estadoLicencia
        });
    } catch (error) {
        console.log("Error al obtener el estado de licencias: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener el estado de licencia"
        });
    }
}

export const actualizarEstadoLicenciaController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const estadoLicenciaActualizado = {
            nombre
        };
        const resultado = await actualizarEstadosLicencia(id, estadoLicenciaActualizado);

        if (!resultado.success){
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
        console.log("Error al actualizar el estado de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar el estado de licencia"
        })
    }
}

export const eliminarEstadoLicenciaController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del estado de licencia es obligatorio"
            });
        }

        const resultado = await eliminarEstadosLicencia(id);

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
        console.log("Error al eliminar el estado de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar el estado de licncia"
        })
    }
}