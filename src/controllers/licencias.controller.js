import { crearLicencia, obtenerLicencia, obtenerLicecniaPorId, actualizarLicencia, eliminarLicecnia } from "../models/licencias.models.js";

export const crearLicenciaController = async (req, res) => {
    try {
        const { trabajador_id, profesional_id, tipo_licencia_id, afp_id, estado_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones} = req.body;
        
        if (!trabajador_id || !profesional_id || !tipo_licencia_id || !afp_id || !estado_id || !fecha_emision || !dias || !inicio_reposo || !termino_reposo || !tipo_reposo_id || !jornada_id || !lugar_reposo_id) {
            return res.status(400).json({
                status: 400,
                message: "Todos los datos son obligatorios"
            });
        }

        const licencia = {
            trabajador_id,
            profesional_id,
            tipo_licencia_id,
            afp_id,
            estado_id,
            fecha_emision,
            dias: parseInt(dias),
            inicio_reposo,
            termino_reposo,
            tipo_reposo_id,
            jornada_id,
            lugar_reposo_id,
            direccion_reposo: direccion_reposo || null,
            observaciones: observaciones || null
        };

        const resultado = await crearLicencia(licencia);

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
        console.log("Error al crear la licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear la licencia"
        });
    }
}

export const obtenerLicenciaController = async (req, res) => {
    try {
        const resultado = await obtenerLicencia();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200, 
            data: resultado.licencia
        });
    } catch (error) {
        console.log("Error al obtener la licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener la licencia"
        });
    }
}

export const obtenerLicenciaPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la licencia es obligatorio"
            });
        }

        const resultado = await obtenerLicecniaPorId(id);

        if (!resultado.success){
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });        
        }
        return res.status(200).json({
            status: 200,
            data: resultado.licencia
        });
    } catch (error) {
        console.log("Error al obtener lal icencia por ID: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener la licencia por ID"
        });
    }
}

export const actualizarLicenciaController = async (req, res) => {
    try {
        const { id } = req.params;
        const { trabajador_id, profesional_id, tipo_licencia_id, afp_id, estado_id, fecha_emision, dias, inicio_reposo, termino_reposo, tipo_reposo_id, jornada_id, lugar_reposo_id, direccion_reposo, observaciones } = req.body;

        const licencia = {
            trabajador_id,
            profesional_id,
            tipo_licencia_id,
            afp_id,
            estado_id,
            fecha_emision,
            dias: parseInt(dias),
            inicio_reposo,
            termino_reposo,
            tipo_reposo_id,
            jornada_id,
            lugar_reposo_id,
            direccion_reposo: direccion_reposo || null,
            observaciones: observaciones || null
        };

        const resultado = await actualizarLicencia(id, licencia);

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
        console.log("Error al actualizar la licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error ak actualizar la licencia"
        });
    }
}

export const eliminarLicenciaController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la licencia es obligatorio"
            });
        }

        const resultado = await eliminarLicecnia(id);

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
        console.log("Error al eliminar la licencia: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar la licencia"
        });
    }
}