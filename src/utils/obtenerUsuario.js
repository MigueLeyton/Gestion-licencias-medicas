import { pool as db} from "../database/database.js";
import jwt from "jsonwebtoken"
import {config} from "dotenv"

config()

// Función para obtener los datos del usuario a partir del token JWT.
export const obtenerDatosUsuario = async (token) => {
    try {
        const {id} = obtenerDatosToken(token)

        const query = "SELECT id, rol from users WHERE id = ? AND eliminado != 1"
        const values = [id]

        const [result] = await db.query(query, values)

        return result[0]

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Función para obtener los datos del token JWT.
const obtenerDatosToken = (token) => {
    const datosToken = jwt.decode(token, process.env.JWT_SECRET )

    return datosToken
}