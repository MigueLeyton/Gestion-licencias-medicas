import { crearJornada, obtenerJornadas, obtenerJornadasPorId, actualizarJornada, eliminarJornada } from "../models/jornadas.models.js";

// Controladores para la gestión de jornadas laborales
// Crear una nueva jornada
export const crearJornadaController = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                status: 400,
                message: "El nombre de la jornada es obligatorio"
            });
        }

        const jornada = {
            nombre
        };

        const resultado = await crearJornada(jornada);

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
        console.log("Error al crear jornada:", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear la jornada"
        });
    }
}

// Obtener todas las jornadas
export const obtenerJornadasController = async (req, res) => {
    try {
        const resultado = await obtenerJornadas();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400, 
                message: resultado.message
            });
        } 
        return res.status(200).json({
            status: 200,
            message: "Jornadas obtenidas correctamente",
            data: resultado.jornadas
        });

    } catch (error) {
        console.log("Error al obtener jornadas:", error)
        res.status(500).json({
            status: 500,
            message: "Error al obtener jornadas"
        });
    }
}

// Obtener una jornada por ID
export const obtenerJornadasPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la jornada es obligatorio"
            });
        }

        const resultado = await obtenerJornadasPorId(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Jornada obtenida correctamente",
            data: resultado.jornada
        });
    } catch (error) {
        console.log("Error al obtener jornada por ID:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener jornada por ID",
        });
    }
}

// Actualizar una jornada
export const actualizarJornadasController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const jornadaActualizada = {
            nombre
        };

        const resultado = await actualizarJornada(id, jornadaActualizada);

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
        console.log("Error al actualizar la jornada:", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar la jornada",
        });
    }
}

// Eliminar una jornada
export const eliminarJornadaController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID de la jornada es obligatorio"
            });
        }

        const resultado = await eliminarJornada(id);
        
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
        console.log("Error al eliminar la jornada: ", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar la jornada"
        });
    }
}