// Este es el middleware, acá pondremos funciones que queremos que se ejecuten antes de llegar al controlador, por ejemplo, validar que el usuario esté autenticado, o validar que el token sea válido, etc.

//Esta en una función para mostrarles cómo se hace, no usará datos de la petición, los definiré aca pero realmente ustedes deben sacarlos de la petición
const token = 1234 //Este simula como si hubieramos obtenido el token de la petición, en este caso lo defino aqui pero en realidad se obtendría de la petición
 
export const verificarToken = (req, res, next) => {
    try {
        // Acá se hace la verificación del token, si el token no viene en la petición, se devuelve un error 401
        if(!token){
            return res.status(401).json({ status: 401, message: "No se ha mandado el token en la solicitud", });
        }

        // Lo mismo acá, voy a verificar si el token es igual a 1234, si no es así, se devuelve un error 401

        if(token !== 1234){
            return res.status(401).json({ status: 401, message: "El token no es válido", });
        }

        // Si el token es válido, se llama a la función next() para que se ejecute el siguiente middleware o controlador
        next() // Con next() daremos por finalizada la ejecución del middleware y pasaremos a lo siguiente que venga, puede ser otro middleware o el controlador
    } catch (error) {
        console.log("Error en el middleware", error); // Se imprime el error en la consola para poder ver que fue lo que falló, personalmente yo coloco el lugar en el que se produjo el error en este caso el middleware, así en caso de error se en qué archivo buscar
        return res.status(500).json({ status: 500, message: "Error en el servidor",});
    }
}