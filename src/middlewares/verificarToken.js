import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { verificarToken } from '../utils/jwt.js';

config();
 
export const verificarTokenMiddleware = (req, res, next) => {
    try {

        const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del header Authorization  
        const JWT_SECRET = process.env.JWT_SECRET;

        
        
        if(!token){
            return res.status(401).json({ status: 401, message: "No se ha mandado el token en la solicitud", });
        }

        const verificacionToken = verificarToken(token, JWT_SECRET);

        if (!verificacionToken) {
            return res.status(401).json({ 
                status: 401, 
                message: "Token inválido o expirado", 
                token: token
            });
        }
       
        next() 
    } catch (error) {
        console.log("Error en el middleware", error); 
        return res.status(500).json({ status: 500, message: "Error en el servidor",});
    }
}