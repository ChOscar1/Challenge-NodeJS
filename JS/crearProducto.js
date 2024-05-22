import { conexionAPI } from "./requisiciones.js";

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    // Imprimir los valores para depuración
    console.log("Nombre:", nombre);
    console.log("Precio:", precio);
    console.log("Imagen:", imagen);

    try {
        await conexionAPI.enviarProducto(nombre, precio, imagen); // No se pasa el ID aquí
        console.log("enviado");
    } catch (error) {
        alert(error.message);
    }
}

formulario.addEventListener("submit", evento => crearProducto(evento));
