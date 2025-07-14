import { crearTrabajador, obtenerTrabajadores, obtenerTrabajadorPorId, actualizarTrabajador, eliminarTrabajador } from "../models/trabajadores.models.js";

// Controladores para la gestión de trabajadores
// Crear un nuevo trabajador
export const crearTrabajadorController = async (req, res) => {
    try {
        const { rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible, tiene_hijos } = req.body;

        if (!rut || !nombres || !apellido_paterno || !apellido_materno || !fecha_nacimiento || !remuneracion_imponible || tiene_hijos === undefined) {
            return res.status(400).json({
                status: 400,
                message: "Todos los campos son obligatorios"
            });
        }

        const nuevoTrabajador = {
            rut,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            remuneracion_imponible: parseFloat(remuneracion_imponible),
            tiene_hijos: Boolean(tiene_hijos)
        }

        const resultado = await crearTrabajador(nuevoTrabajador);

        if(!resultado.success){
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }

        return res.status(201).json({   
                status: 201,
                insertedId: resultado.insertedId,
                message: resultado.message
            });

    } catch (error) {
        console.log("Error al crear trabajador:", error);
        res.status(500).json({
            status: 500,
            message: "Error al crear trabajador"
        });
    }
}

// Obtener todos los trabajadores
export const obtenerTrabajadoresController = async (req, res) => {
    try {
        const resultado = await obtenerTrabajadores();

        if (!resultado.success) {
            return res.status(400).json({
                status: 400,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Datos obtenidos correctamente",
            data: resultado.trabajadores
        });
    } catch (error) {
        console.log("Error al obtener trabajadores:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener trabajadores"
        });
    }
}

// Obtener un trabajador por ID
export const obtenerTrabajadorPorIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del trabajador es obligatorio"
            });
        }

        const resultado = await obtenerTrabajadorPorId(id);

        if (!resultado.success){
            return res.status(404).json({
                status: 404,
                message: resultado.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Trabajador encontrado correctamente",
            data: resultado.trabajador
        });
    } catch (error) {
        console.log("Error al obtener trabajador por ID:", error);
        res.status(500).json({
            status: 500,
            message: "Error al obtener trabajador por ID"
        });
    }
}

// Actualizar un trabajador
export const actualizarTrabajadorController = async (req, res) => {
    try {
        const { id } = req.params;
        const { rut, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, remuneracion_imponible } = req.body;
        let { tiene_hijos } = req.body;

        if(tiene_hijos == undefined || tiene_hijos == "") {
            tiene_hijos = null;
        }

        const trabajadorActualizado = {
            rut,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            remuneracion_imponible,
            tiene_hijos
        }

        const resultado = await actualizarTrabajador(id, trabajadorActualizado);

        if(!resultado.success){
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
        console.log("Error al actualizar trabajador:", error);
        res.status(500).json({
            status: 500,
            message: "Error al actualizar trabajador"
        });
    }
}

// Eliminar un trabajador
export const eliminarTrabajadorController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "El ID del trabajador es obligatorio"
            });
        }

        const resultado = await eliminarTrabajador(id);
        if(!resultado.success){
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
        console.log("Error al eliminar trabajador:", error);
        res.status(500).json({
            status: 500,
            message: "Error al eliminar trabajador"
        });
        
    }
}