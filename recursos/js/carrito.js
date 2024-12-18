let carrito = [];

export function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

export function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    actualizarContadorCarrito();
}

export function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    actualizarContadorCarrito();
    renderizarCarrito();
}

export function actualizarContadorCarrito() {
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = totalProductos;
    }
}

export function renderizarCarrito() {
    const contenedorCarro = document.getElementById("contenedor-carro");
    if (!contenedorCarro) return;

    contenedorCarro.innerHTML = ''; 

    if (carrito.length === 0) {
        contenedorCarro.innerHTML = 'No hay productos';
    } else {
        carrito.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto-carrito');
            productoElemento.innerHTML = `
                <span>${producto.nombre}</span>
                <span>Cantidad: ${producto.cantidad}</span>
                <button class="btn-eliminar" data-id="${producto.id}">❌</button>
            `;
            contenedorCarro.appendChild(productoElemento);
        });

        contenedorCarro.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const idProducto = parseInt(e.target.dataset.id, 10);
                eliminarDelCarrito(idProducto);
            });
        });
    }
}


export function abrirCarrito() {
    renderizarCarrito();
    document.getElementById("popup-carro").showModal();
}
