import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import usuariosRoutes from './routes/usuarios.routes.js';
import licenciasRoutes from './routes/licencias.js';
import trabajadoresRoutes from './routes/trabajadores.routes.js';
import hijosRoutes from './routes/hijos.routes.js';
import profesionalesRoutes from './routes/profesionales.routes.js'; 
import SesionsRoutes from './routes/sesions.routes.js';
import tiposReposoRoutes from './routes/tiposReposo.routes.js';

const app = express(); 

config(); 

const PORT = process.env.SERVER_PORT || 3000; 

app.use(cors()); 
app.use(express.json()); 

app.use("/api", usuariosRoutes); 
app.use("/api", licenciasRoutes);
app.use("/api", trabajadoresRoutes);
app.use("/api", hijosRoutes); 
app.use("/api", profesionalesRoutes); 
app.use("/api", SesionsRoutes);
app.use("/api", tiposReposoRoutes);

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});
