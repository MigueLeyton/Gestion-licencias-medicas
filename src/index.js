import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import usuariosRoutes from './routes/usuarios.routes.js';
//import licenciasRoutes from './routes/licencias.js';
import trabajadoresRoutes from './routes/trabajadores.routes.js';
import hijosRoutes from './routes/hijos.routes.js';
import profesionalesRoutes from './routes/profesionales.routes.js'; 
import SesionsRoutes from './routes/sesions.routes.js';
import tiposReposoRoutes from './routes/tiposReposo.routes.js';
import lugaresReposoRouter from './routes/lugaresReposo.routes.js';
import jornadasRouter from './routes/jornadas.routes.js';
import afpRoutes from './routes/afp.routes.js';
import licenciaMutualRouter from './routes/licenciaMutual.routes.js';
import tiposLicenciaRouter from './routes/tiposLicencia.routes.js';
import estadosLicenciaRoutes from './routes/estadosLicencia.routes.js';
import licenciaExtensionRouter from './routes/licenciaExtension.routes.js';
import licenciasRoutes from './routes/licencias.routes.js';
import licenciaHijoRoutes from './routes/licenciaHijo.routes.js';
import historialRemuneracionRoutes from './routes/historialRemuneracion.routes.js';

const app = express(); 

config(); 

const PORT = process.env.SERVER_PORT || 3000; 

app.use(cors()); 
app.use(express.json()); 

app.use("/api", usuariosRoutes); 
//app.use("/api", licenciasRoutes);
app.use("/api", trabajadoresRoutes);
app.use("/api", hijosRoutes); 
app.use("/api", profesionalesRoutes); 
app.use("/api", SesionsRoutes);
app.use("/api", tiposReposoRoutes);
app.use("/api", lugaresReposoRouter);
app.use("/api", jornadasRouter);
app.use("/api", afpRoutes);
app.use("/api", licenciaMutualRouter);
app.use("/api", tiposLicenciaRouter);
app.use("/api", estadosLicenciaRoutes);
app.use("/api", licenciaExtensionRouter);
app.use("/api", licenciasRoutes);
app.use("/api", licenciaHijoRoutes);
app.use("/api", historialRemuneracionRoutes);

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});
