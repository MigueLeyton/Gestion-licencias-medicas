// -- Este es el modelo, aquí solo se debería de hacer la consulta a la base de datos y retornar los datos, nada de validar los datos que entran ni nada, eso lo hace el controlador

import bcrypt from "bcryptjs"; //Importamos el paquete de bcryptjs para encriptar las contraseñas
import { pool } from "../database/database.js"; // Importamos el pool de conexiones a la base de datos

export const obtenerUsuarios = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE estado = 1"); // Dentro de las comillas va la consulta SQL para obtener todos los usuarios, ver explicación en el obtenerUsuariosPorId del por qué no usar SELECT * en una consulta real
        // En la consulta anterior obtendremos todos los usuarios que tengan el estado 1, esto es para que no se muestren los usuarios eliminados, ya que en la base de datos no se eliminan, solo se actualiza su estado a 0


        if(rows.length === 0) {
            return {status: 404, message: "No se encontraron usuarios"}; // Si no se encuentran usuarios, se retorna un mensaje de error
        }

        return {status: 200, message: "Usuarios obtenidos correctamente", data: rows}; // Retornamos el estado y los datos obtenidos, *ver el comentario al final donde explico por que devuelvo esto

    } catch (error) {
        console.log("Error en el model: ", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el model, así en caso de error se en qué archivo buscar
        return {status: 500, message: error};
    }
}

export const obtenerUsuarioPorId = async (id) => {
    try {
        const idUsuario = id; // Aquí se obtiene el id del usuario que se quiere obtener, en este caso obtengo lo que llega a través del controlador

        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [idUsuario]); 
        // Aquí se hace la consulta a la base de datos para obtener el usuario por su id,
        // es una consulta de prueba solamente, en una real lo ideal es no poner un SELECT *, solo llamar a los datos que realmente se necesitan,
        // y aunque se necesite obtener todos los campos es mejor escribirlos uno a uno, en caso de escalar el sistema puede provocar problemas de rendimiento llamar todo.

        //Revisamos la cantidad de filas que se obtuvieron, si es 0 significa que no se encontró el usuario
        if(rows.length === 0) {
            return {status: 404, message: "Usuario no encontrado"}; // Si no se encuentra el usuario, se retorna un mensaje de error
        }

        // En caso de que se encuentre el usuario, se retorna el estado y los datos obtenidos
        return {status: 200, message: "Usuario obtenido correctamente", data: rows[0]}; // Retornamos el estado y los datos obtenidos, *ver el comentario al final donde explico por que devuelvo esto

    } catch (error) {
        console.log("Error en el model: ", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el model, así en caso de error se en qué archivo buscar
        return {status: 500, message: error};
    }
}

//Función para crear un usuario, recibe un objeto Usuario, más abajo explico el por qué
export const crearUsuario = async (usuario) => {
    try {
        /* En el controlador se crea un objeto Usuario, con el fin de simplificar los parámetros de la función, si no se hiciera así
          y el controlador le pasara los parámetros directamente a la función, dependiendo de los datos que tiene usuario la función puede ser demasiado larga y podría quedar así:
          export const crearUsuario = async (id, nombre, apellido, email, password, telefono_fijo, celular, domicilio, edad, estado_civil, establecimiento, cargo, contrato, genero ) => {...}
          Una función con tantos parámetros es difícil de leer y mantener, por lo que es mejor crear un objeto y pasarlo como parámetro */


        // Aquí se hace lo que se llama desestructuracion de objetos, definimos las variables que ocuparemos y automaticamente se completaran con los datos que vienen del objeto
        // Ejemplo:
        // El objeto se crea en el controlador y llega de la siguiente forma:
        //
        //  usuario: {
        //      id: 1,
        //      nombre: "Juan",
        //      apellido: "Pérez",
        //      email: "juan@gmail.com",
        //   }
        //
        const { nombre, email, password } = usuario; // Aquí se obtienen los datos del usuario que se quiere crear, en este caso obtengo lo que llega a través del controlador

        //  Al hacer la desestructuración es lo mismo que si hicieramos lo siguiente:
        //  const id = usuario.id;
        //  const nombre = usuario.nombre;
        //  const apellido = usuario.apellido;
        //  const email = usuario.email;
        //  
        //  Ojo aquí, si el objeto no tiene la propiedad que estamos tratando de desestructurar, la variable se queda como undefined, debe tener el mismo nombre
        //  Si intentamos hacer lo siguiente no funcionará:
        //  
        //  const { id_persona, nombre_persona, apellido_persona, email_persona } = usuario;
        //
        //  En este caso id_persona, nombre_persona, apellido_persona y email_persona no existen en el objeto usuario, por lo que las variables se quedan como undefined

        // Encriptamos la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10); // Generamos una sal para encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, salt); // Encriptamos la contraseña

        // Aquí se hace la consulta a la base de datos para crear el usuario
        const [rows] = await pool.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, hashedPassword]);

        return {status: 201, message: "Usuario creado correctamente"}; // Retornamos el estado y los datos obtenidos, *ver el comentario al final donde explico por que devuelvo esto
    }
    catch (error) {
        console.log("Error en el model: ", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el model, así en caso de error se en qué archivo buscar
        return {status: 500, message: error};
    }
}

export const actualizarUsuario = async (id, usuario) => {
    try {
        // Antes de, en el caso de actualizar un usuario, hay algunas cosas a tener en cuenta, no lo explicaré en este código, pero lo dejo para que ustedes investiguen y prueben como lo pueden hacer:
        // 1°. A pesar de que dije que acá no se hacían validaciones de los datos, en este caso hay que verificar si en la base de datos existe el id del usuario que se quiere actualizar,
        // 2°. Si el id existe, hay que verificar si el email que se quiere actualizar ya existe en la base de datos, si existe no se puede actualizar, ya que no se puede tener dos usuarios con el mismo email (Esto es opcional, depende de como sea su sistema)
        // 3°. Habrá ocaciones en el que no se requiere actualizar todos los campos, que les recomiendo, que verifiquen que campos vienen vacios y dependiendo de esto creen la query para actualizar solo los campos que requieren, ahí investiguen como lo pueden hacer


        // Aquí nuevamente hacemos la desestructuracion de objetos, definimos las variables que ocuparemos y automaticamente se completaran con los datos que vienen del objeto, 
        // en esta función aparte de pasar el objeto tambien se pasa el id del usuario, se pudo haber colocado el id dentro del objeto, pero lo hice así para que vean que se puede hacer de las dos formas

        const { nombre, email, password } = usuario; // Aquí se obtienen los datos del usuario que se quiere actualizar, en este caso obtengo lo que llega a través del controlador

        // Encriptamos la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10); // Generamos una sal para encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, salt); // Encriptamos la contraseña

        // Aquí se hace la consulta a la base de datos para actualizar el usuario
        const [rows] = await pool.query("UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?", [nombre, email, hashedPassword, id]);

        return {status: 200, message: "Usuario actualizado correctamente"}; // Retornamos el estado y los datos obtenidos, *ver el comentario al final donde explico por que devuelvo esto
    }
    catch (error) {
        console.log("Error en el model: ", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el model, así en caso de error se en qué archivo buscar
        return {status: 500, message: error};
    }
}

export const eliminarUsuario = async (id) => {
    try {
        const idUsuario = id; // Aquí se obtiene el id del usuario que se quiere eliminar, en este caso obtengo lo que llega a través del controlador

        // Aquí se hace la consulta a la base de datos para eliminar el usuario
        const [rows] = await pool.query("UPDATE usuarios SET estado = 0 WHERE id = ?", [idUsuario]);
        // Como se pueden dar cuenta, no elimino al usuario de la base de datos, simplemente actualizo su estado a 0, esto es para que no se elimine el usuario de la base de datos 
        // y se pueda recuperar en caso de que se necesite, otra razón es que si se elimina el registro de la base de datos y este esta asociado a otra tabla, se produciría un error
        // ya que la otra tabla no podría establecer la relación con el usuario eliminado

        // Revisamos la cantidad de filas afectadas que se obtuvieron, si es 0 significa que no se encontró el usuario y no se eliminó nada
        if(rows.affectedRows === 0) {
            return {status: 404, message: "Usuario no encontrado"}; // Si no se encuentra el usuario, se retorna un mensaje de error
        }
        // En caso de que se encuentre el usuario, se retorna el estado 
        return {status: 200, message: "Usuario eliminado correctamente"}; // Retornamos el estado y los datos obtenidos, *ver el comentario al final donde explico por que devuelvo esto

    } catch (error) {
        console.log("Error en el model: ", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el model, así en caso de error se en qué archivo buscar
        return {status: 500, message: error};
        
    }
}

//------------Explicacion de los retornos-----------------
// Lo ideal es retornar todo en el mismo formato, así al trabajar en el front end no tendrian confunciones al intentar hacer peticiones, 
// yo personalmente siempre devuelvo "status" que sería el codigo http de respuesta, "message" que sería un mensaje breve indicando si 
// la consulta fue correcta o no, y "data" que sería el objeto con los datos obtenidos 
// En el caso de los errores u funcionaes que en teoría no devuelven ningun dato, como lo puede ser eliminar un registro, solo devuelvo el "status" y el "message",
// ya que no es necesario devolver el "data" porque no hay nada que mostrar, pero si lo quieren hacer no hay problema, solo es una recomendación

// Esta función se encarga de validar el login: verifica si el usuario existe y si la contraseña es correcta
export const loginUsuario = async (email, password) => {
    try {
      // Consulto en la base de datos si existe un usuario con ese email y que tenga estado activo (estado = 1)
      const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ? AND estado = 1", [email]);
  
      // Si no se encuentra ningún usuario con ese email y estado, retorno error 404
      if (rows.length === 0) {
        return { status: 404, message: "Usuario no encontrado" };
      }
  
      // Si se encontró un usuario, lo guardo en una variable
      const usuario = rows[0];
  
      // Comparo la contraseña que me mandaron con la que está en la base de datos (que está hasheada)
      const passwordValida = await bcrypt.compare(password, usuario.password);
  
      // Si la contraseña no es válida, retorno error 401 (no autorizado)
      if (!passwordValida) {
        return { status: 401, message: "Contraseña incorrecta" };
      }
  
      // Si la contraseña es válida, retorno status 200 con un mensaje de éxito
      // Podría agregar un token (ej. JWT) aquí más adelante si quiero manejar sesiones/autenticación
      return {
        status: 200,
        message: "Login exitoso",
        data: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email
        }
      };
    } catch (error) {
      // Si hay un error en la consulta o en bcrypt, lo muestro en consola y devuelvo error 500
      console.log("Error en loginUsuario model:", error);
      return { status: 500, message: "Error en el servidor" };
    }
  };
  