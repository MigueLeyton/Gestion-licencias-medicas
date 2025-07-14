import { pool as db } from "../database/database.js";
import { decodificarToken } from "../utils/jwt.js";

// Middleware para verificar la modificación de usuarios.
// Este middleware se encarga de verificar si el usuario tiene el rol adecuado para modificar otros usuarios.
export const verificarModificacionUsuarios = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del header Authorization

        const { id, rol} = decodificarToken(token);

        const query = "SELECT rol FROM users WHERE id = ? AND eliminado = 0";
        
        const values = [id];

        const [result] = await db.query(query, values);

        if (result.length === 0) {
            console.log("Usuario no encontrado o eliminado");
            return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
        }
        console.log("rol token:", rol);
        console.log("rol base de datos:", result[0]?.rol);

        if (rol !== result[0]?.rol) {
            console.log("Rol del token no coincide con el rol en la base de datos");
            return res.status(403).json({ status: 403, message: "Acceso denegado" });
        }

        if (id == req.params.id){
            return next(); // Si el id del token coincide con el id del usuario, permitir la modificación
        }

        if (result[0].rol !== "Administrador") {
            console.log("Rol de administrador no encontrado o no es válido");
            return res.status(403).json({ status: 403, message: "Acceso denegado" });
        }
        console.log("Rol de administrador verificado correctamente");
        next(); // Si el rol es de administrador, permitir la modificación



    } catch (error) {
        console.error("Error al verificar la modificación de usuarios:", error);
        return res.status(500).json({ status: 500, message: "Error interno del servidor" });
        
    }
}