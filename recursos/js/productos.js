export async function cargarProductos(ruta) {
    try {
        const respuesta = await fetch(ruta);
        if (!respuesta.ok) throw new Error(`Error al cargar productos: ${respuesta.statusText}`);
        const datos = await respuesta.json();
        return datos.productos;
    } catch (error) {
        console.error("Error al cargar productos:", error);
        return [];
    }
}

export function renderizarProductos(productos, contenedor) {
    if (!contenedor) {
        console.error("Contenedor no encontrado para renderizar productos.");
        return;
    }

    if (!productos || productos.length === 0) {
        contenedor.innerHTML = `<p class="no-products">No hay productos disponibles.</p>`;
        return;
    }

    contenedor.innerHTML = productos.map(producto => `
        <article class="product-item">
            <figure>
                <img src="${producto.imagen}" alt="${producto.nombre}" />
            </figure>
            <div>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
            </div>
            <button class="add-to-cart" data-id="${producto.id}">Agregar al Carrito</button>
        </article>
    `).join('');
}

export function filtrarProductos(productos, { texto = "", precioMax = Infinity, categoria = null }) {
    return productos.filter(producto => {
        const nombreCoincide = producto.nombre.toLowerCase().includes(texto.toLowerCase());
        const precioCoincide = producto.precio <= precioMax;
        const categoriaCoincide = !categoria || producto.categoria === categoria;
        return nombreCoincide && precioCoincide && categoriaCoincide;
    });
}
