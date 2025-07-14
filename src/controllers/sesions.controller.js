import { loginUsuario } from "../models/sesions.models.js";

// Controladores para la gestión de sesiones de usuario
// Iniciar sesión de usuario
export const loginUsuarioController = async (req, res) => {
    const { email, password} = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        status: 400, 
        message: "Faltan datos" }
    );
    }
    const resultado = await loginUsuario(email, password);
    return res.status(resultado.status).json(resultado);
};

// Cerrar sesión de usuario
export const logoutUsuarioController = (req, res) => {
    return res.status(200).json({ 
      status: 200, 
      message: "Sesión cerrada exitosamente" }
    );
}