document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    // Verificar usuario ycontraseña
    const usuarioEncontrado = registros.find(registro => registro.nombre === usuario);

    if (!usuarioEncontrado || usuarioEncontrado.contrasena !== contrasena) {
        Swal.fire({
            title: 'Error',
            text: 'Usuario o contraseña incorrectos.',
            icon: 'error',
        });
        return;
    }
    // localStorage
    localStorage.setItem('usuarioEncontrado', JSON.stringify(usuarioEncontrado));

    window.location.href = 'reservas.html';
});
