/* Este es el controlador, este es el encargado de manejar las peticiones que llegan al servidor, de devolver una respuesta al cliente y de ejecutar la lógica de negocio que está en el modelo*/

//Importamos las funciones que están en el modelo para poder usarlas en el controlador
import { crearUsuario, obtenerUsuarioPorId, obtenerUsuarios, actualizarUsuario, eliminarUsuario } from "../models/usuarios.js"; // Importamos las funciones que están en el modelo para poder usarlas en el controlador
import { loginUsuario } from "../models/usuarios.js";

// Para no confundirnos de nombre con las funciones que están en el modelo, le agregamos Controller al final de cada función para identificarlas bien,
// esto es totalmente opcional, ustedes ven los nombres que le quieren poner
export const obtenerUsuariosController = async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios(); // Llamamos a la función que está en el modelo para obtener los usuarios

        return res.status(usuarios.status).json({ status: usuarios.status, message: usuarios.message, data: usuarios.data }); // Devolvemos la respuesta al cliente con el código 200 y los usuarios obtenidos, status, message y data los sacamos del objeto que se mmanda en el modelo

    } catch (error) {
        console.log("Error en el controlador", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el controlador, así en caso de error se en qué archivo buscar
        return res.status(500).json({ status: 500, message: "Error en el servidor",});
        
    }
}

export const obtenerUsuarioPorIdController = async (req, res) => {
    try {
        // Obtenemos el id del usuario que queremos obtener de la url, este viene a través de la petición, en las routes explico más a fondo
        const id = req.params.id; 

        // Validamos que el id sea un número o que no venga vacio, si no es así, devolvemos un error 400
        if (isNaN(id) || !id) {
            return res.status(400).json({ status: 400, message: "El id no es válido", });
        }
        // Si quieren esta validación podría hacerse por separado cada una para que sea más fácil de entender, pero yo lo hice así para que no se vea tan largo el código, pero eso ya depende de cada uno

        // Si el id es válido, llamamos a la función que está en el modelo para obtener el usuario por id
        const usuario = await obtenerUsuarioPorId(id); // Llamamos a la función que está en el modelo para obtener el usuario por id

        return res.status(usuario.status).json({ status: usuario.status, message: usuario.message, data: usuario.data }); // Devolvemos la respuesta al cliente con el código 200 y el usuario obtenido, status, message y data los sacamos del objeto que se manda en el modelo

    } catch (error) {
        console.log("Error en el controlador", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el controlador, así en caso de error se en qué archivo buscar
        return res.status(500).json({ status: 500, message: "Error en el servidor",});   
    }
}

export const crearUsuarioController = async (req, res) => {
    try {
        // Se hace la desestructuración de los datos que vienen en el body de la petición, esto es para obtener los datos del usuario que queremos crear, esto lo explico más a fondo en el modelo
        const { nombre, correo, password } = req.body; // Obtenemos los datos del usuario que queremos crear del body de la petición

        // Validamos que los datos no vengan vacios, si no es así, devolvemos un error 400
        if (!nombre || !correo || !password) {
            return res.status(400).json({ status: 400, message: "Los datos no son válidos", });
        }

        // Acá se podrían hacer más validaciones, como por ejemplo validar que el correo tenga un formato válido, o que la contraseña tenga una longitud mínima, pero eso ya depende de cada uno
        // Si los datos son válidos, llamamos a la función que está en el modelo para crear el usuario
        // Antes de llamar la función debemos crear un objeto con los datos del usuario, esto es para que la función que está en el modelo reciba un solo parámetro y no varios
        const usuario = {
            nombre,
            email: correo, // Si vemos el modelo, este me pide el dato como email y no como correo, sin embargo yo lo estoy recibiendo como correo, por lo que aquí le cambio el nombre a la variable para que coincida con el nombre que me pide el modelo
            password
        }
        // Ahora que tenemos el objeto con los datos del usuario, llamamos a la función que está en el modelo para crear el usuario
        const nuevoUsuario = await crearUsuario(usuario); // Llamamos a la función que está en el modelo para crear el usuario

        return res.status(nuevoUsuario.status).json({ status: nuevoUsuario.status, message: nuevoUsuario.message }); // Devolvemos la respuesta al cliente con el código 200 y el usuario creado, status, message y data los sacamos del objeto que se manda en el modelo

    } catch (error) {
        console.log("Error en el controlador", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el controlador, así en caso de error se en qué archivo buscar
        return res.status(500).json({ status: 500, message: "Error en el servidor",});   
    }
}

export const actualizarUsuarioController = async (req, res) => {
    try {
        const id = req.params.id; // Obtenemos el id del usuario que queremos actualizar de la url, este viene a través de la petición, en las routes explico más a fondo
        const { nombre, correo, password } = req.body; // Se hace la desestructuración de los datos que vienen en el body de la petición, esto es para obtener los datos del usuario que queremos actualizar, esto lo explico más a fondo en el modelo

        // Validamos que el id sea un número o que no venga vacio, si no es así, devolvemos un error 400
        if (isNaN(id) || !id) {
            return res.status(400).json({ status: 400, message: "El id no es válido", });
        }

        // Validamos que los datos no vengan vacios, si no es así, devolvemos un error 400
        if (!nombre || !correo || !password) {
            return res.status(400).json({ status: 400, message: "Los datos no son válidos", });
        }

        // Acá se podrían hacer más validaciones, como por ejemplo validar que el correo tenga un formato válido, o que la contraseña tenga una longitud mínima, pero eso ya depende de cada uno
        // Si los datos son válidos, llamamos a la función que está en el modelo para actualizar el usuario
        // Antes de llamar la función debemos crear un objeto con los datos del usuario, esto es para que la función que está en el modelo reciba un solo parámetro y no varios
        const usuario = {
            nombre,
            email: correo, // Si vemos el modelo, este me pide el dato como email y no como correo, sin embargo yo lo estoy recibiendo como correo, por lo que aquí le cambio el nombre a la variable para que coincida con el nombre que me pide el modelo
            password
        }

        // Si ven el modelo, la función que actualiza el usuario recibe dos parámetros, el id y el objeto con los datos del usuario, por lo que aquí le pasamos ambos parámetros
        const usuarioActualizado = await actualizarUsuario(id, usuario); // Llamamos a la función que está en el modelo para actualizar el usuario

        return res.status(usuarioActualizado.status).json({ status: usuarioActualizado.status, message: usuarioActualizado.message, data: usuarioActualizado.data }); // Devolvemos la respuesta al cliente con el código 200 y el usuario actualizado, status, message y data los sacamos del objeto que se manda en el modelo

    } catch (error) {
        console.log("Error en el controlador", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el controlador, así en caso de error se en qué archivo buscar
        return res.status(500).json({ status: 500, message: "Error en el servidor",});
    }
}

export const eliminarUsuarioController = async (req, res) => {
    try {
        const id = req.params.id; // Obtenemos el id del usuario que queremos eliminar de la url, este viene a través de la petición, en las routes explico más a fondo

        // Validamos que el id sea un número o que no venga vacio, si no es así, devolvemos un error 400
        if (isNaN(id) || !id) {
            return res.status(400).json({ status: 400, message: "El id no es válido", });
        }

        // Si el id es válido, llamamos a la función que está en el modelo para eliminar el usuario
        const usuarioEliminado = await eliminarUsuario(id); // Llamamos a la función que está en el modelo para eliminar el usuario

        return res.status(usuarioEliminado.status).json({ status: usuarioEliminado.status, message: usuarioEliminado.message, data: usuarioEliminado.data }); // Devolvemos la respuesta al cliente con el código 200 y el usuario eliminado, status, message y data los sacamos del objeto que se manda en el modelo

    } catch (error) {
        console.log("Error en el controlador", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el controlador, así en caso de error se en qué archivo buscar
        return res.status(500).json({ status: 500, message: "Error en el servidor",});
    }
}
// En este controlador no se hace la validación de que el id exista en la base de datos, ya que eso se hace en el modelo, si el id no existe,
// la función que está en el modelo devuelve un error 404, por lo que no es necesario hacer la validación aquí


// Este es el controlador que maneja la lógica cuando un usuario intenta iniciar sesión
export const loginUsuarioController = async (req, res) => {
    // Extraigo el email y password que vienen del frontend (en el body de la petición)
    const { email, password } = req.body;
  
    // Verifico que no vengan campos vacíos
    if (!email || !password) {
      return res.status(400).json({ status: 400, message: "Faltan datos" }); // Si falta algo, devuelvo error 400
    }
  
    // Llamo a la función loginUsuario (que debería validar las credenciales y devolver info o error)
    const resultado = await loginUsuario(email, password);
  
    // Devuelvo el resultado de esa función, sea éxito o error, con el código de estado correspondiente
    return res.status(resultado.status).json(resultado);
  };
  