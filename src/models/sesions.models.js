import bcrypt from "bcryptjs"; 
import { pool } from "../database/database.js"; 
import { generarToken } from "../utils/jwt.js";

export const loginUsuario = async (email, password_hash) => {
    try {
     
      const [rows] = await pool.query("SELECT id, rol, email, password_hash FROM users WHERE email = ? AND eliminado != 1", [email]);
  
     
      if (rows.length === 0) {
        return { 
          status: 404, 
          message: "Usuario no encontrado" };
      }
  
      const usuario = rows[0];
  
      const passwordValida = await bcrypt.compare(password_hash, usuario.password_hash);
  
      if (!passwordValida) {
        return { 
          status: 401, 
          message: "Contraseña incorrecta" };
      }

      const tokenUsuario = { id: usuario.id, email: usuario.email, rol: usuario.rol };
      const token = generarToken(tokenUsuario);

      return {
        status: 200,
        message: "Login exitoso",
        token: token,   
      };
    } catch (error) {
      console.log("Error en loginUsuario model:", error);
      return { status: 500, message: "Error en el servidor" };
    }
  };
