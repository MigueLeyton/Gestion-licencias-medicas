import { crearTiposReposo, obtenerTiposReposo, obtenerTiposReposoPorId, actualizarTiposReposo, eliminarTiposReposo } from "../models/tiposReposo.models.js";

export const crearTiposReposoController = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                status: 400,
                message: "El nombre del tipo de resposo es obligatorio"
            });
        }

        const nuevoTipoReposo = {
            nombre
        };

        const resultado = await crearTiposReposo(nuevoTipoReposo);
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
    }catch (error) {
        console.log("Error al crear tipo de reposo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear tipo de resposo"
        });
    }
}

export const obtenerTiposReposoController = async (req, res) => {
    try {
        const resultado = await obtenerTiposReposo();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            data: resultado.tipoReposo
        });
    } catch (error) {
        console.log("Error al obtener tipos de resposo:", error);
        res.status(500).json({
            status: 500,
            message: "Error la obtener tipos de resposo"
        });
    }
}

export const obtenerTiposReposoPorIdController = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del tipo de reposo es obligatorio"
            });
        }

        const resultado = await obtenerTiposReposoPorId(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            data: resultado.tipoReposo
        });
    }catch (error) {
        console.log("Error al obtener tipo de reposo por ID:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener tipo de reposo por ID"
        });
    }
}

export const actualizarTiposReposoController = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre } = req.body;

        const tipoReposoActualizado = {
            nombre
        }

        const resultado = await actualizarTiposReposo(id, tipoReposoActualizado);
        
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
        console.log("Error al actualizar tipo de reposo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar tipo de resposo"
        });
    }
}

export const eliminarTiposReposoController = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({
                status : 400, 
                message: "El ID del tipo de reposo es obligatorio"
            });
        }
        
        const resultado = await eliminarTiposReposo(id);
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
        console.log("Error al eliminar tipo de reposo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar tipo de reposo"
        });
    }
}