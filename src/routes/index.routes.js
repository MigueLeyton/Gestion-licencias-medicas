import usuariosRoutes from './usuarios.routes.js';
import trabajadoresRoutes from './trabajadores.routes.js';
import hijosRoutes from './hijos.routes.js';
import profesionalesRoutes from './profesionales.routes.js'; 
import SesionsRoutes from './sesions.routes.js';
import tiposReposoRoutes from './tiposReposo.routes.js';
import lugaresReposoRouter from './lugaresReposo.routes.js';
import jornadasRouter from './jornadas.routes.js';
import afpRoutes from './afp.routes.js';
import licenciaMutualRouter from './licenciaMutual.routes.js';
import tiposLicenciaRouter from './tiposLicencia.routes.js';
import estadosLicenciaRoutes from './estadosLicencia.routes.js';
import licenciaExtensionRouter from './licenciaExtension.routes.js';
import licenciasRoutes from './licencias.routes.js';
import licenciaHijoRoutes from './licenciaHijo.routes.js';
import historialRemuneracionRoutes from './historialRemuneracion.routes.js';

import { Router } from 'express';

const router = Router();

router.use("/api", usuariosRoutes);
router.use("/api", trabajadoresRoutes);
router.use("/api", hijosRoutes);
router.use("/api", profesionalesRoutes);
router.use("/api", SesionsRoutes);
router.use("/api", tiposReposoRoutes);
router.use("/api", lugaresReposoRouter);
router.use("/api", jornadasRouter);
router.use("/api", afpRoutes);
router.use("/api", licenciaMutualRouter);
router.use("/api", tiposLicenciaRouter);
router.use("/api", estadosLicenciaRoutes);
router.use("/api", licenciaExtensionRouter);
router.use("/api", licenciasRoutes);
router.use("/api", licenciaHijoRoutes);
router.use("/api", historialRemuneracionRoutes);

export default router;