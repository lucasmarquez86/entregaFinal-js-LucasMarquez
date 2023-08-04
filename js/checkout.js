const tableBody = document.querySelector('tbody');
const sectionProductos = document.querySelector('section')
const btnComprar = document.querySelector('button#btnComprar')

function mostrarMsgCarritoVacio() {
    return `<td colspan= "5">
    <div class="card-error">
                <h5>El carrito de Actividades está vacío. <a href="reservas.html">INGRESE AQUI>> </a> para seleccionar actividades</h5>
            </div></td>`;
}

function activarClickQuitarDelCarrito() {
    const botonesQuitar = document.querySelectorAll('button.btn-quitar');
    botonesQuitar.forEach((botonQuitar) => {
        botonQuitar.addEventListener('click', () => {
            let idActividad = actividades.findIndex((actividad) => actividad.id === parseInt(botonQuitar.dataset.id));
            if (idActividad !== -1) {
                actividades.splice(idActividad, 1);
                guardarActEnLocalStorage();
                armarCarrito();
            }
        });
    });
}

function armarCarrito() {
    if (actividades.length > 0) {
        tableBody.innerHTML = '';
        actividades.forEach((actividad) => tableBody.innerHTML += listarProductosEnCarritoHTML(actividad));
        tableBody.innerHTML += calcularTotalCarrito(actividades);
        activarClickQuitarDelCarrito();
    } else {
        tableBody.innerHTML = mostrarMsgCarritoVacio();
    }
}

armarCarrito();

btnComprar.addEventListener('click', ()=> {
    Swal.fire({
        title: '¿Confirmas la compra de los productos?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'CONFIRMAR',
        denyButtonText: 'CANCELAR'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('productosActividades')
            productosActividades.length = 0
            Swal.fire('Muchas gracias por su compra!', '', 'success')
            sectionProductos.innerHTML = mostrarMsgCarritoVacio()
        }
    })
})

function calcularTotalCarrito(carrito){
    let totalCarrito = carrito.length > 0 ? carrito.reduce((acc, actividad)=> acc + actividad.precio,0) : 0.00
    return `<tr>
    <td></td>
    <td></td>
    <td><strong>TOTAL:</strong></td>
    <td><strong>$ ${totalCarrito.toLocaleString()}</strong></td>
    <td></td>
</tr>`
}