import { crearLugaresReposo, obtenerLugaresReposo, obtenerLugaresReposoPorId, actualizarLugaresReposo, eliminarLugaresReposo } from "../models/lugaresReposo.models.js";

export const crearLugaresReposoController = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.satus(400).json({
                status: 400,
                message: "El nombre del lugar de reposo es obligatorio"
            });
        }

        const lugarReposo = {
            nombre
        };

        const resultado = await crearLugaresReposo(lugarReposo);

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
        console.log("Error al crear lugares de reposo:", error);
        res.status(500).json({
            status: 500, 
            message: "Error al crear lugar de reposo"
        });
    }
}

export const obtenerLugaresReposoController = async (req, res) => {
    try {
        const resultado = await obtenerLugaresReposo();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Lugares de reposo obtenidos correctamente",
            data: resultado.lugarReposo
        });
    } catch (error) {
        console.log("Error al obtener lugares de reposo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener lugares de reposo"
        });
    }
}

export const obtenerLugaresReposoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del lugar de reposo es obligatorio"
            });
        }

        const resultado = await obtenerLugaresReposoPorId(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Lugar de reposo obtenido correctamente",
            data: resultado.lugarReposo
        });
    } catch (error) {
        console.log("Error al obtener lugar de reposo por ID:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener lugares de reposo por ID"
        });
    }
}

export const actualizarLugaresReposoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const lugarReposoActualizado = {
            nombre
        };

        const resultado = await actualizarLugaresReposo(id, lugarReposoActualizado);

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
        console.log("Error al actualizar el lugar de trabajo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar el lugar de reposo"
        });
    }
}

export const eliminarLugaresReposoController = async (req, res) => {
    try {
        const { id } = req.params;  
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del lugar de reposo es obligatorio"
            });
        }

        const resultado = await eliminarLugaresReposo(id)
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
        console.log("Error al eliminar lugar de reposo:", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar lugar de reposo"
        });
    }
}