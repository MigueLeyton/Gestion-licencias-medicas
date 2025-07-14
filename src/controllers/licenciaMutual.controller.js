import { crearLicenciaMutual, obtenerLicenciaMutual, obtenerLicenciaMutualPorId, obtenerLicenciaMutualPorFecha, actualizarLicenciaMutual, eliminarLicenciaMutual } from "../models/licenciaMutual.models.js";

// Controladores para la gestión de licencias mutuales
// Crear una nueva licencia mutual
export const crearLicenciaMutualController = async (req, res) => {
    try {
        const { licencia_id, mutual, institucion_mutual, fecha_compin } = req.body;

        if (!licencia_id || !mutual || !institucion_mutual || !fecha_compin) {
            return res.status(400).json({
                status: 400,
                message: "Todos los campos son obligatorios"
            });
        }

        const nuevaLicenciaMutual = {
            licencia_id,
            mutual,
            institucion_mutual,
            fecha_compin
        };

        const resultado = await crearLicenciaMutual(nuevaLicenciaMutual);

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
        console.log("Error al crear la licencia mutual:", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear la licencia mutual"
        });
    }
}

// Obtener todas las licencias mutuales
export const obtenerLicenciaMutualController = async (req, res) => {
    try {
        const resultado = await obtenerLicenciaMutual();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Licencias mutuales obtenidas correctamente",
            data: resultado.licenciaMutual
        });
    } catch (error) {
        console.log("Erro al obtener las licencas mutuales: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener las licencias mutuales"
        });
    }
}

// Obtener una licencia mutual por ID
export const obtenerLicenciaMutualPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la licencia mutual es obligatorio"
            });
        }

        const resultado = await obtenerLicenciaMutualPorId(id);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Licencia mutual obtenida correctamente",
            data: resultado.licenciaMutual
        });
    } catch (error) {
        console.loh("Error al obtener la licencua mutual por ID: ", error);
        res.status(500).json({
            message: "Error al obtener la licencia mutual por ID"
        });
    }
}

// Obtener licencias mutuales por fecha
export const obtenerLicenciaMutualPorFechaController = async (req, res) => {
    try {
        const { fecha } = req.body;

        if (!fecha) {
            return res.status(400).json({
                status: 400,
                message: "La fecha es obligatoria"
            });
        }

        const resultado = await obtenerLicenciaMutualPorFecha(fecha);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Licencias mutuales obtenidas por fecha correctamente",
            data: resultado.licenciaMutual
        });
    } catch (error) {
        console.log("Error al obtener las licencias mutuales por fecha: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener las licencias mutuales por fecha"
        }); 
    }
}

// Actualizar una licencia mutual
export const actualizadarLicenciaMutualController = async (req, res) => {
    try {
        const { id } = req.params;
        const { licencia_id, mutual, institucion_mutual, fecha_compin } = req.body;

        const licenciaMutual = {
            licencia_id,
            mutual,
            institucion_mutual,
            fecha_compin
        };

        const resultado = await actualizarLicenciaMutual(id, licenciaMutual);

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
        console.log("Error al actualizar la licencia mutual: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar la licencia mutual"
        });
    }
}

// Eliminar una licencia mutual
export const eliminadarLicenciaMutualController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la licencia mutual es obligatorio"
            });
        }

        const resultado = await eliminarLicenciaMutual(id);

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
        console.log("Error al eliminar la licencia mutual: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar ela licencia mutual"
        });
    }
}