import { crearLicenciaHijo, obtenerLicenciaHijos, obtenerLicenciaHijoPorId, actualizarLicenciaHijo, eliminarLicenciaHijo } from "../models/licenciaHijo.models.js";

export const crearLicenciaHijoController = async (req, res) => {
    try {
        const { licencia_id, hijo_id, fecha_concepcion } = req.body;
         if (!licencia_id || !hijo_id || !fecha_concepcion) {
            return res.status(400).json({
                status: 400,
                message: "Todos los campos son obligatorios"
            });
        }

        const nuevaLicenciaHijo = {
            licencia_id,
            hijo_id,
            fecha_concepcion
        };

        const resultado = await crearLicenciaHijo(nuevaLicenciaHijo);

        if (!resultado.success){
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Licencia de hijo creada exitosamente"
        });
    } catch (error) {
        console.log("Error al crear licencia de hijo:", error);
        return res.status(500).json({
            status: 500,
            message: "Error al crear licencia de hijo"
        });
    }
}

export const obtenerLicenciaHijosController = async (req, res) => {
    try {
        const resultado = await obtenerLicenciaHijos();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Datos obtenidos correctamente",
            data: resultado.licenciasHijos
        });
    } catch (error) {
        console.log("Error al obtener licencia de hijos: ", error);
        return res.status(500).json({
            status: 500,
            message: "Error al obtener licencia de hijos"
        });
    }
}

export const obtenerLicenciaHijoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID es obligatorio"
            });
        }
        const resultado = await obtenerLicenciaHijoPorId(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Datos obtenidos correctamente",
            data: resultado.licenciaHijo
        });        
    } catch (error) {
        console.log("Error al obtener licecnia de hijo por ID: ", error);
        return res.status(500).json({
            status:500,
            message: "Error al obtener licencia de hijo por ID"
        });
    }
}

export const actualizarLicenciaHijoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { licencia_id, hijo_id, fecha_concepcion } = req.body;

        const licenciaHijoActualizada = {
            licencia_id,
            hijo_id,
            fecha_concepcion
        };

        const resultado = await actualizarLicenciaHijo(id, licenciaHijoActualizada);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Licencia de hijo actualizada exitosamente"
        });
    } catch (error) {
        console.log("Error al actualizar licencia de hijo: ", error);
        return res.status(500).json({
            status: 500,
            message: "Error al actualizar licencia de hijo"
        });
    }
}

export const eliminarLicenciaHijoController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la licencia de hijo es obligatorio"
            });
        }

        const resultado = await eliminarLicenciaHijo(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Licencia de hijo eliminada exitosamente"
        });
    } catch (error) {
        console.log("Error al eliminar licencia de hijo: ", error);
        return res.status(500).json({
            status: 500,
            message: "Error al eliminar licencia de hijo"
        });
    }
}