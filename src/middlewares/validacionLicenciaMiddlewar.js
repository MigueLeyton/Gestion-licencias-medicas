import { validarLicencia } from "../utils/validacionesLicencia.js";

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

