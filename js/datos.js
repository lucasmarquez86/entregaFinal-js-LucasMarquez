    const usuarioEncontrado = JSON.parse(localStorage.getItem('usuarioEncontrado'));

    if (usuarioEncontrado) {
        const datosMostrar = [
            { label: 'Nombre', valor: usuarioEncontrado.nombre },
            { label: 'Apellido', valor: usuarioEncontrado.apellido },
            { label: 'Email', valor: usuarioEncontrado.email },
            { label: 'Celular', valor: usuarioEncontrado.celular },
            { label: 'Cumpleaños', valor: usuarioEncontrado.cumpleanos },
            { label: 'DNI', valor: usuarioEncontrado.dni },
        ];

        llenarDatosEnLista(datosMostrar);
    } 

function llenarDatosEnLista(datos) {
    const lista = document.getElementById('misDatos');
    lista.innerHTML = '';
    datos.forEach((dato) => {
        const item = document.createElement('li');
        item.className = 'dato-item';
        item.textContent = `${dato.label}: ${dato.valor}`;
        lista.appendChild(item);
    });
}

// Redirigir a la página de inicio (index.html) para iniciar sesión nuevamente
const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
cerrarSesionBtn.addEventListener('click', () => {
localStorage.removeItem('usuarioEncontrado');
window.location.href = 'index.html';
});
