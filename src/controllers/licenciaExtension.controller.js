import { crearLicenciaExtension, obtenerLicenciaExtension, obtenerLicenciaExtensionPorId, actualizarLicenciaExtension, eliminarLicenciaExtension } from "../models/licenciaExtension.models.js";

// Controladores para la gestión de licencias de extensión
// Crear una nueva licencia de extensión
export const crearLicenciaExtensionController = async (req, res) => {
    try {
        const { licencia_id, es_extension, licencia_relacionada } = req.body;

        if (!licencia_id || !es_extension || !licencia_relacionada) {
            return res.status(400).json({
                status: 400,
                message: "Todos los campos son obligatorios"
            });
        }

        const licenciaExtension = {
            licencia_id,
            es_extension,
            licencia_relacionada
        };

        const resultado = await crearLicenciaExtension(licenciaExtension);

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
        console.log("Error al crear la licencia de extendión: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear la licencia de extensión"
        });
    }
}

// Obtener todas las licencias de extensión
export const obtenerLicenciaExtensionController = async (req, res) => {
    try {
        const resultado = await obtenerLicenciaExtension();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Licencias de extensión obtenidas exitosamente",
            data: resultado.licenciaExtension
        });
    } catch (error) {
        console.log("Error al obtener las licencias de extensión: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener las licencias de extensión"
        });
    }
}

// Obtener una licencia de extensión por ID
export const obtenerLicenciaExtensionPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la licencia de extensión es obligatorio"
            });
        }
        
        const resultado = await obtenerLicenciaExtensionPorId(id);

        if (!resultado.success > 0) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Licencia de extensión obtenida exitosamente",
            data: resultado.licenciaExtension
        });
    } catch (error) {
        console.log("Error al obtener la licencia de extensión por ID: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener la licencia de extensión por ID"
        });
    }
}

// Actualizar una licencia de extensión
export const actualizarLicenciaExtensionController = async (req, res) => {
    try {
        const { id } = req.params;
        const { licencia_id, es_extension, licencia_relacionada } = req.body;
        
        const licenciaExtension = {
            licencia_id,
            es_extension,
            licencia_relacionada
        };

        const resultado = await actualizarLicenciaExtension(id, licenciaExtension);

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
        console.log("Error al actualizar la licencia de extensión: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar la licencia de extensión"
        });
    }
}

// Eliminar una licencia de extensión
export const eliminarLicenciaExtensionController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la licencia de extensión es obligatorio"
            });
        }

        const resultado = await eliminarLicenciaExtension(id);

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
        console.log("Error al eliminar la licencia de extensión: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar la licencia de extensión"
        });
    }
}