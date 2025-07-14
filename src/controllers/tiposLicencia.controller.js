import { crearTiposLicencia, obtenerTiposLicencia, obtenerTiposLicenciaPorId, actualizarTiposLicencia, eliminarTiposLicencia } from "../models/tiposLicencia.models.js";

// Controladores para la gestión de tipos de licencia
// Crear un nuevo tipo de licencia
export const crearTiposLicenciaController = async (req, res) => {
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            return res.status(400).json({
                status: 400,
                message: "EL nombre del tipo de licencia es obligatorio"
            });
        }

        const tiposLicencia = {
            nombre
        };

        const resultado = await crearTiposLicencia(tiposLicencia);

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
        console.log("Error al crear tipo de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear el tipo de licencia"
        });
    }
}

// Obtener todos los tipos de licencia
export const obtenerTiposLicenciaController = async (req, res) => {
    try {
        const resultado = await obtenerTiposLicencia();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400, 
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200, 
            message: "Tipos de licencia obtenidos correctamente",
            data: resultado.tiposLicencia
        });
    } catch (error) {
        console.log("Error al obtener tipos de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener tipos de licencia"
        });
    }
}

// Obtener un tipo de licencia por ID
export const obtenerTiposLicenciaPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del tipo de licencia es obligatorio"
            });
        }

        const resultado = await obtenerTiposLicenciaPorId(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Tipo de licencia obtenido correctamente",
            data: resultado.tiposLicencia
        });
    } catch (error) {
        console.log("Error al obtener tipo de licencia por ID: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener tipo de licencia por ID"
        });
    }
}

// Actualizar un tipo de licencia
export const actualizarTiposLicenciaController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body

        const tiposLicencia = {
            nombre
        };

        const resultado = await actualizarTiposLicencia(id, tiposLicencia);

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
        console.log("Error al actualizar tipo de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar el tipo de licencia"
        });
    }
}

// Eliminar un tipo de licencia
export const eliminarTiposLicenciaController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del tipo de licencia es obligatorio"
            });
        }

        const resultado = await eliminarTiposLicencia(id);

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
        console.log("Error al eliminar tipo de licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar el tipo de licencia"
        });
    }
}