import { conexionAPI } from "./requisiciones.js";

// Selecciona el contenedor de productos en el DOM
const contenedorProductos = document.querySelector('.productos-grid');

function crearCard(nombre, precio, imagen, id) {
    const productoBox = document.createElement("div");
    productoBox.className = "producto_box";
    productoBox.innerHTML = `
        <img src="${imagen}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>$ ${precio}</p>
        <button class="borrar-producto" data-id="${id}">
        <img src="./assets/basura.png" alt="Borrar"></button>`;

    // Agrega un event listener para el botón de borrar
    const botonBorrar = productoBox.querySelector('.borrar-producto');
    botonBorrar.addEventListener('click', async () => {
        const productoId = botonBorrar.getAttribute('data-id');
        console.log(productoId); // Verifica que el ID se esté obteniendo correctamente
        const resultado = await conexionAPI.eliminarProducto(productoId);
        if (resultado) {
            // Remover el producto del DOM
            productoBox.remove();
        } else {
            alert('No se pudo eliminar el producto');
        }
    });

    return productoBox;
}


async function listarProductos() {
    try {
        const listaAPI = await conexionAPI.listarProductos();

        // Limpiar el contenedor de productos antes de agregar nuevas tarjetas
        contenedorProductos.innerHTML = '';

        // Iterar sobre cada producto y crear una tarjeta HTML para cada uno
        listaAPI.forEach(producto => {
            contenedorProductos.appendChild(crearCard(producto.nombre, producto.precio, producto.imagen, producto.id));
        });
    } catch (error) {
        // Manejar errores en la consola
        console.error('Ha ocurrido un problema con la conexión:', error);
        // Mostrar un mensaje de error en caso de que falle la conexión
        contenedorProductos.innerHTML = `<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexión</h2>`;
    }
}




listarProductos();

