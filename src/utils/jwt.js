import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definida la variable de entorno");
 }

export const generarToken = (usuario) => {
    const { id, email, rol } = usuario;
    const token = jwt.sign({
        id,
        email,
        rol
    }, JWT_SECRET, {
        expiresIn: "30m" // El token expira en 30 minutos
    });
    return token;
}

export const verificarToken = (token) => {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

export const decodificarToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}