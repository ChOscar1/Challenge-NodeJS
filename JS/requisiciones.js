async function listarProductos() {
    try {
        const conexion = await fetch("http://localhost:3001/productos"); // Realizar la solicitud GET a la URL proporcionada
        const conexionConvertida = await conexion.json(); // Convertir la respuesta a JSON
        return conexionConvertida; // Devolver los datos convertidos
    } catch (error) {
        console.error('Error al listar productos:', error); // Manejar errores en la consola
        return null; // Devolver null en caso de error
    }
}

async function enviarProducto(nombre, precio, imagen, id) {
    try {
        const productos = await listarProductos();
        // Encuentra el mayor ID actual y suma 1 para obtener el nuevo ID
        const nuevoId = productos.length ? Math.max(...productos.map(p => parseInt(p.id, 10))) + 1 : 1;
        const conexion = await fetch("http://localhost:3001/productos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                id: nuevoId.toString(), // Asegura que el ID sea un string
                nombre: nombre,
                precio: `${precio} dolares`,
                imagen: imagen
            })
        });

        if (!conexion.ok) {
            throw new Error("Ha ocurrido un error al enviar el producto");
        }

        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error('Error al enviar producto:', error);
        return null;
    }
}

async function eliminarProducto(id) {
    try {
        const conexion = await fetch(`http://localhost:3001/productos/${id}`, {
            method: "DELETE",
        });
        if (!conexion.ok) {
            throw new Error("Ha ocurrido un error al eliminar el producto");
        }
        return true;
    } catch (error) {
        console.error('Error al eliminar producto:',id, error);
        return false;
    }
}


export const conexionAPI = {
    listarProductos,
    enviarProducto,
    eliminarProducto
};