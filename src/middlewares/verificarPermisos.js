import jwt from "jsonwebtoken"
import { pool as db } from "../database/database.js";
import { config } from 'dotenv';

config()

const JWT_SECRET = process.env.JWT_SECRET


export const puedeAccederDatos = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del header Authorization  

        const idUsuarioActualizado= req.params.id

        const decoded = jwt.verify(token, JWT_SECRET);

        let esMismoUsuario = false
        let esAdmin = false


        if(idUsuarioActualizado == decoded.id){
            esMismoUsuario = true
            
        }

        const query = "SELECT rol FROM users WHERE id = ? AND eliminado = 0";
        const values = [decoded.id]

        const [result] = await db.query(query, values)

        if(result[0].rol != decoded.rol){
            return res.status(401).json({status: 401, message : "Acceso denegado"})
        }

        esAdmin = result[0].rol == "Administrador" ? true : false



        if(!esAdmin && !esMismoUsuario){
            return res.status(401).json({status: 401, message : "Acceso denegado"})
        }

        if(!esAdmin && esMismoUsuario){
            next()
            return
        }

        next()




/*
        if(decoded.rol !== "Administrador" && !esMismoUsuario){
            return res.status(401).json({status: 401, message: "Acceso denegado"})
        }


        if(result.length === 0){
            return res.status(400).json({status: 400, message: "El usuario no esta registrado o ha sido eliminado"})
        }
        
        if (result[0].rol !== "Administrador" && !esMismoUsuario) {
            return res.status(401).json({ status: 401, message: "Acceso denegado" });
        }

        next()*/
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, message: "Error interno del servidor"})
    }
};
