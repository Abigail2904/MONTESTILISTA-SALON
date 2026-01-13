// Selecciona los elementos del formulario por su ID en el HTML
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');


// Agrega un "escuchador" (listener) al evento 'submit' del formulario
// Es decir, cuando el usuario hace clic en "Iniciar sesión" o presiona Enter
form.addEventListener('submit', async e => {
    e.preventDefault();
    try{
        //// Crea un objeto 'user' con los datos que el usuario escribió
        const user = {
        email: emailInput.value,
        password: passwordInput.value
    };
    //console.log(user);
    // Envía una petición HTTP POST al backend, a la ruta '/api/login'
        // El objeto 'user' se envía en el cuerpo de la petición
    await axios.post('/api/login', user);
    window.location.pathname = ('../admin/index.html'); // Si la respuesta es exitosa (no hay errores),
        // redirige al usuario a la página principal de tareas

    } catch(error) {
   // console.log(error);
    // Muestra el mensaje de error que viene del servidor dentro del elemento HTML con id "error-text"
    errorText.innerHTML = error.response.data.error;
    }
});



    