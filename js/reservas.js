const tableProductos = document.querySelector('#tablaProductos');
const inputBuscar = document.querySelector('#inputSearch');
const productosEnCarrito = document.querySelector('span#productosEnCarrito');
const URL = 'js/actividades.json';

function mostrarTotalProdsEnCarrito() {
    productosEnCarrito.textContent = actividades.length;
}
actividades.length > 0 && mostrarTotalProdsEnCarrito();

function activarClickEnBotonesProductos() {
    const botones = document.querySelectorAll('button.button-outline');
    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.id);
            const producto = productosActividades.find((prod) => prod.id === id);
            if (producto && producto.turno > 0) { // Verificar si hay turnos disponibles
                actividades.push(producto);
                guardarActEnLocalStorage();
                producto.turno--; // Descontar un turno
                mostrarTotalProdsEnCarrito();
                Swal.fire({
                    title: `Actividad agregada: ${producto.nombre}`,
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Cambiar el texto y estilo del botón
                boton.textContent = 'Actividad Seleccionada';
                boton.disabled = true;
                boton.classList.add('seleccionado');
                // Actualizar la cantidad de turnos disponibles
                const tdDisponibles = boton.closest('tr').querySelector('.class-table-disponibles');
                tdDisponibles.textContent = `${producto.turno} Disponibles`;
            } else {
                Swal.fire({
                    title: 'No hay más turnos disponibles para esta actividad.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        });
    });
}

function cargarProductos(array) {
    tableProductos.innerHTML = '';
    array.forEach((producto) => tableProductos.innerHTML += crearFilaHTML(producto));
    activarClickEnBotonesProductos();
}

inputBuscar.addEventListener("search", () => {
    localStorage.setItem("ultimaBusqueda", inputSearch.value);
    const arrayResultante = productosActividades.filter((producto) => producto.nombre.toLowerCase().includes(inputBuscar.value.trim().toLowerCase()));
    cargarProductos(arrayResultante);
});

function obtenerActividades() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            productosActividades.push(...data);
            cargarProductos(productosActividades);
            cargarActividadesGuardadas();
        })
        .catch((error) => tableProductos.innerHTML = retornarCardError());
}

function cargarActividadesGuardadas() {
    actividades.length = 0;
    const actividadesGuardadas = recuperarActividadesDeLocalStorage();
    actividades.push(...actividadesGuardadas);
    deshabilitarBotonesSeleccionados();
}

function deshabilitarBotonesSeleccionados() {
    const botonesSeleccionados = document.querySelectorAll('button.button-outline');
    botonesSeleccionados.forEach((boton) => {
        const id = parseInt(boton.id);
        if (actividades.some((actividad) => actividad.id === id)) {
            boton.textContent = 'Actividad Seleccionada';
            boton.disabled = true;
            boton.classList.add('seleccionado');
        }
    });
}

obtenerActividades()



