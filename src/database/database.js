import { createPool } from "mysql2/promise"; // Importar el paquete mysql2 y el método createPool para hacer la conexión a la base de datos
import { config } from "dotenv"; // Importar el paquete dotenv para cargar las variables de entorno que están en el archivo .env

config(); // Cargar las variables de entorno desde el archivo .env

export const pool = createPool({            // Crear un pool de conexiones a la base de datos
  host: process.env.DB_HOST,                // Obtener el nombre del host de la base de datos desde las variables de entorno
  user: process.env.DB_USER,                // Obtener el nombre de usuario de la base de datos desde las variables de entorno
  password: process.env.DB_PASSWORD,        // Obtener la contraseña de la base de datos desde las variables de entorno
  database: process.env.DB_DATABASE,        // Obtener el nombre de la base de datos desde las variables de entorno
  connectionLimit: 10,                      // Establecer el número máximo de conexiones en el pool
  dateStrings: true,                        // Configurar las fechas para que se devuelvan como cadenas (Es opcional, esto lo ocupaba en mi programa)
});

pool.getConnection((err, connection) => {   // Obtener una conexión del pool, sirve más que nada para verificar que la conexión a la base de datos es correcta cuando se inicia el servidor
  if (err) {
    console.log("Error al conectar a la base de datos", err);
    return;
  }
  console.log("Conectado a la base de datos");
  connection.release();
});
