import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import usuariosRoutes from './routes/usuarios.js';

const app = express(); // Creamos una instancia de express

config(); // Cargamos las variables de entorno desde el archivo .env

const PORT = process.env.SERVER_PORT || 3000; // Definimos el puerto en el que se va a ejecutar la aplicación, si no se define en las variables de entorno, se usará el puerto 3000

// Usamos el middleware cors para permitir peticiones desde otros dominios, este es un error bastante común, si no se usa este middleware, no se podrán hacer peticiones desde el frontend a la API, esto es porque el navegador bloquea las peticiones que se hacen desde otro dominio por motivos de seguridad
app.use(cors()); 
// Si llega a dar error de CORS, deben configurar la linea anterior, indicando más especifico la configuración



app.use(express.json()); // Usamos el middleware express.json() para poder recibir datos en formato JSON en el body de las peticiones, esto es necesario para poder recibir los datos que vienen en el body de la petición, si no se usa este middleware, no se podrán recibir los datos que vienen en el body de la petición

app.use("/api", usuariosRoutes); // Usamos el router que creamos para las rutas de los usuarios, esto es para que todas las rutas que definimos en el archivo usuarios.js empiecen con /api, por ejemplo, la ruta /usuarios se convertirá en /api/usuarios

app.listen(PORT, () => { // Iniciamos el servidor y le indicamos que escuche en el puerto definido anteriormente
    console.log(`Servidor corriendo en el puerto ${PORT}`); // Imprimimos en la consola que el servidor está corriendo y en qué puerto
});

// Por lo general si ocurre algún error cuando intenten ejecutar el servidor, se puede deber a que el puerto ya está en uso,
// por lo que deben cambiar el puerto en el archivo .env, o cerrar el programa que está usando ese puerto, o cambiar el puerto en el archivo .env
// otro error puede ser que no identifique las rutas, por lo que deben revisar si están importando el archivo de rutas correctamente,
// otro error puede ser que no identifique el archivo .env, por lo que deben revisar si está en la raíz del proyecto y si está correctamente configurado
