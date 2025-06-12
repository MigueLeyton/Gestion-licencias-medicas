import { loginUsuario } from "../models/sesions.models.js";

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
