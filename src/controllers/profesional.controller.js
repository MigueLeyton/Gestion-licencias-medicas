import { crearProfesional, obtenerProfesionales, obtenerProfesionalesPorId, actualizarProfesional, eliminarProfesinal } from "../models/profesionales.models.js"; 

// Controladores para la gestión de profesionales
// Crear un nuevo profesional
export const crearProfesionalController = async (req, res) => {
    try {
        const { rut, nombres, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono } = req.body;

        if (!rut || !nombres || !apellido_paterno || !apellido_materno || !especialidad || !direccion || !telefono) {
            return res.status(400).json({
                status: 400,
                message: "Todos los campos son obligatorios"
            });
        }

        const nuevoProfesional = {
            rut,
            nombres,
            apellido_paterno,
            apellido_materno,
            especialidad,
            otra_especialidad,
            direccion,
            telefono
        };

        const resultado = await crearProfesional(nuevoProfesional);

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(201).json({
            status: 201,
            insertedId: resultado.insertedId,
            message: resultado.message,
        }); 
    } catch (error) {
        console.log("Error al crear profesional:", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear profesional"
        });
    }
}

// Obtener todos los profesionales
export const obtenerProfesionalesController = async (req, res) => {
    try {
        const resultado = await obtenerProfesionales(); 

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Datos obtenidos correctamente",
            data: resultado.profesionales
        });
    } catch (error) {
        console.log("Error al obtener profesionales:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener los profesionales"
        });
    }
}

// Obtener un profesional por ID
export const obtenerProfesionalesPorIdController = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del profesional es obligatorio"
            });
        }
        
        const resultado = await obtenerProfesionalesPorId(id);

        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Datos obtenidos correctamente",
            data: resultado.profesionales
        });
    } catch (error) {
        console.log("Error al obtener profesionales por ID:", error);
        res.status(500).json({
            status:500,
            message: "Error al obtener el profesional por ID"
        });
    }
}

// Actualizar un profesional
export const actualizarProfesionalController = async (req, res) => {
    try {
        const { id } = req.params;
        const { rut, nombre, apellido_paterno, apellido_materno, especialidad, otra_especialidad, direccion, telefono } = req.body;

        const profesionalActualizado = {
            rut,
            nombre,
            apellido_paterno,
            apellido_materno,
            especialidad,
            otra_especialidad,
            direccion,
            telefono
        }

        const resultado = await actualizarProfesional(id, profesionalActualizado);
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
    }catch (error) {
        console.log("Error al actualizar profesional:", error);
        res.statuts(500).json({
            status: 500,
            message: "Error al actualizar profesional"
        });
    }
}

// Eliminar un profesional
export const eliminarProfesionalContoller = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del profesional es obligatorio"
            });
        }

        const resultado = await eliminarProfesinal(id);
        if (!resultado.success) {
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Profesional eliminado correctamente"
        });
    }catch (error) {
        console.log("Error al eliminar profesional:", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar profesional"
        });
    }
}