import { pool as db } from "../database/database.js";
import { decodificarToken } from "../utils/jwt.js";

export const verificarAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del header Authorization  
        
        if (!token) {
            return res.status(401).json({ status: 401, message: "Token no proporcionado" });
        }

        const { id, rol } = decodificarToken(token);
        
        const query = "SELECT rol FROM users WHERE id = ? AND eliminado = 0";
        const values = [id];

        const [result] = await db.query(query, values);
        
        if (result.length === 0) {
            console.log("Usuario no encontrado o eliminado");
            return res.status(404).json({ status: 404, message: "Usuario no encontrado" });
        }

        if (rol !== result[0]?.rol) {
            console.log("Rol del token no coincide con el rol en la base de datos");
            return res.status(403).json({ status: 403, message: "Acceso denegado" });
        }

        if (result[0].rol !== "Administrador") {
            console.log("Rol de administrador no encontrado o no es válido");
            return res.status(403).json({ status: 403, message: "Acceso denegado" });
        }
        console.log("Rol de administrador verificado correctamente");
        next();
    } catch (error) {
        console.error("Error al verificar el rol de administrador:", error);
        return res.status(500).json({ status: 500, message: "Error interno del servidor" });
    }
}