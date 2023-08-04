const productosActividades = []

function recuperarActividadesDeLocalStorage() {
    return JSON.parse(localStorage.getItem('MisActividades')) || []
}

const actividades = recuperarActividadesDeLocalStorage();

function guardarActEnLocalStorage() {
    localStorage.setItem('MisActividades', JSON.stringify(actividades));
}

function listarProductosEnCarritoHTML(actividad) {
    return `<tr>
                <td>${actividad.fecha}</td>
                <td>${actividad.codigo}</td>
                <td>${actividad.nombre}</td>
                <td>$ ${actividad.precio.toLocaleString()}</td>
                <td><button class="button button-outline btn-quitar" data-id="${actividad.id}">Quitar</button></td>
            </tr>`;
}

function retornarCardError() {
    return `<td colspan= "5">
    <div class="card-error">
                <h2>Que no te agarre ansiedad!!</h2>
                <h3>Estamos trabajando en la fechas de Actividades, vuelve en unos minutos...</h3>
            </div></td>`
}

/* funcion principal para crear filas con actividades */
function crearFilaHTML(producto) {
    return `<tr>
                <td class="class-table-number">${producto.fecha}</td>
                <td>${producto.nombre}</td>
                <td class="class-table-disponibles">${producto.turno} Disponibles</td>
                <td>$ ${producto.precio}</td>
                <td><button id="${producto.id}" class="button button-outline">Seleccionar</button></td>
            </tr>`;
        }