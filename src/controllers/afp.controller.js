import { crearAfp, obtenerAfp, obtenerAfpPorId, actualizarAfp, eliminarAfp } from "../models/afp.models.js";

export const crearAfpController = async (req, res) => {
    try {
        const { nombre, tasa, fecha_vigencia } = req.body;

        if (!nombre || !tasa || !fecha_vigencia) {
            return res.status(400).json({
                status: 400,
                message: "Todos los campos son obligatorios"
            });
        }
        const afp = {
            nombre,
            tasa,
            fecha_vigencia
        };
        const resultado = await crearAfp(afp);

        if (!resultado.success){
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
        console.log("error al crear AFP: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear AFP"
        });
    } 
}

export const obtenerAfpController = async (req, res) => {
    try {
        const { fecha } = req.query;
        const resultado = await obtenerAfp(fecha);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }

        return res.status(200).json({
            status: 200,
            message: "AFP obtenida correctamente",
            data: resultado.afp
        });
    } catch (error) {
        console.log("Error al obtener AFP:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener AFP"
        });
    }
}

export const obtenerAfpPorIdController = async (req, res) => {
    try {
        const { id } = req.params;     
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID es obligatorio"
            });
        }

        const resultado = await obtenerAfpPorId(id);
        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "AFP obtenida correctamente",
            data: resultado.afp
        });

    } catch (error) {
        console.log("Error al obtener AFP por ID:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener AFP por ID"
        });
    }
}

export const actualizarAfpController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tasa, fecha_vigencia } = req.body;

        const afp = {
            nombre,
            tasa,
            fecha_vigencia
        };

        const resultado = await actualizarAfp(id, afp);
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
        console.log("Error al actualizar AFP:", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar AFP"
        });
    }
}

export const eliminarAfpController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID es obligatorio"
            });
        }
        
        const resultado = await eliminarAfp(id);
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
        console.log("Error al eliminar AFP:", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar AFP"
        });
    }
}