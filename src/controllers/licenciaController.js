import { guardarLicenciaEnDB, obtenerLicenciasPendientes, actualizarEstadoLicencia } from "../models/dbLicencias.js";
import { validarLicencia } from "../utils/validacionesLicencia.js";
import { calcularDatosLicencia } from "../utils/calculoLicencia.js";

export const CrearLicenciaController = async (req, res) => {
  try {
    const datos = req.body;

    const errores = validarLicencia(datos);
    if (errores.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Errores de validación",
        errores,
      });
    }

    const licenciaCalculada = calcularDatosLicencia(datos);
    const licenciaGuardada = await guardarLicenciaEnDB(licenciaCalculada);

    if (!licenciaGuardada) {
      return res.status(500).json({
        status: 500,
        message: "Error al guardar la licencia médica en la base de datos",
      });
    }
    

    return res.status(201).json({
      status: 201,
      message: "Licencia médica registrada correctamente",
      data: licenciaGuardada,
    });

  } catch (error) {
    console.error("Error en el controlador de licencias:", error);
    return res.status(500).json({
      status: 500,
      message: "Error interno del servidor al registrar la licencia",
    });
  }
};

export const ObtenerLicenciasPendientesController = async (req, res) => {
  try {
    const licenciasPendientes = await obtenerLicenciasPendientes();

    return res.status(200).json({
      status: 200,
      message: "Licencias pendientes obtenidas correctamente",
      data: licenciasPendientes,
    });

  } catch (error) {
    console.error("Error al obtener licencias pendientes:", error);
    return res.status(500).json({
      status: 500,
      message: "Error interno del servidor al obtener licencias pendientes",
    });
  }
};

export const ActualizarEstadoLicenciaController = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['aprobada', 'rechazada'].includes(estado.toLowerCase())) {
      return res.status(400).json({
        status: 400,
        message: "Estado inválido. Solo se permite 'aprobada' o 'rechazada'.",
      });
    }

    const licenciaActualizada = await actualizarEstadoLicencia(id, estado.toLowerCase());

    if (!licenciaActualizada) {
      return res.status(404).json({
        status: 404,
        message: "Licencia no encontrada",
      });
    }

    return res.status(200).json({
      status: 200,
      message: `Licencia ${estado} correctamente`,
      data: licenciaActualizada,
    });

  } catch (error) {
    console.error("Error al actualizar estado de licencia:", error);
    return res.status(500).json({
      status: 500,
      message: "Error interno del servidor al actualizar el estado de la licencia",
    });
  }
};
