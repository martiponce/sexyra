import { cargarProductos, renderizarProductos, filtrarProductos } from './productos.js';
import { cargarCarrito, agregarAlCarrito, eliminarDelCarrito, renderizarCarrito, abrirCarrito } from './carrito.js';

document.addEventListener("DOMContentLoaded", async () => {
    const contenedorProductos = document.querySelector(".products");
    const contenedorCarrito = document.getElementById("contenedor-carro");
    const filtroTexto = document.getElementById("filterName");
    const filtroPrecio = document.getElementById("filterPrice");
    const precioSeleccionado = document.getElementById("selectedPrice");
    const popupCarro = document.getElementById("popup-carro");

    cargarCarrito();
    renderizarCarrito(contenedorCarrito);

    const url = new URL(window.location);
    const pathname = url.pathname;

    if (pathname.includes("productos.html")) {
        
        const productos = await cargarProductos('./recursos/json/productos.json');

        
        const categoria = url.searchParams.get("categoria");
        const productosFiltrados = categoria
            ? filtrarProductos(productos, { categoria })
            : productos;

        renderizarProductos(productosFiltrados, contenedorProductos);

        if (filtroTexto) {
            filtroTexto.addEventListener("input", () => {
                const texto = filtroTexto.value;
                const productosFiltrados = filtrarProductos(productos, { texto });
                renderizarProductos(productosFiltrados, contenedorProductos);
            });
        }

        if (filtroPrecio) {
            filtroPrecio.addEventListener("input", () => {
                const precioMax = parseInt(filtroPrecio.value, 10);
                precioSeleccionado.textContent = precioMax;
                const productosFiltrados = filtrarProductos(productos, { precioMax });
                renderizarProductos(productosFiltrados, contenedorProductos);
            });
        }

        contenedorProductos.addEventListener("click", (e) => {
            if (e.target.classList.contains("add-to-cart")) {
                const idProducto = parseInt(e.target.dataset.id, 10);
                const producto = productos.find(p => p.id === idProducto);
                if (producto) {
                    agregarAlCarrito(producto);
                    renderizarCarrito(contenedorCarrito);
                }
            }
        });
    }

    contenedorCarrito.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-from-cart")) {
            const idProducto = parseInt(e.target.dataset.id, 10);
            eliminarDelCarrito(idProducto);
            renderizarCarrito(contenedorCarrito);
        }
    });

    document.getElementById("carrito").addEventListener("click", () => {
        abrirCarrito();
    });
});
