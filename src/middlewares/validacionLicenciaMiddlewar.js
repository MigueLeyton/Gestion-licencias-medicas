import { validarLicencia } from "../utils/validacionesLicencia.js";

// Middleware para validar los datos de una licencia médica.
// Este middleware se encarga de validar los datos enviados en el cuerpo de la solicitud para la creación o actualización de una licencia médica.
export const validarLicenciaMiddleware = (req, res, next) => {
    const errores = validarLicencia (req.body);
    if (errores.length > 0) {
        return res.status(400).json({
            status: 400,
            message: "Error de validación",
            errores,
        })
    }

    //Si todo esta ok, sigue
    next();
};

