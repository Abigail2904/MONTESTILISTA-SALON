import { createNotification } from '../components/notification.js';   //import axios from 'axios';
//console.log(axios);

// Selección de elementos del DOM
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');

//regex validations
const EMAIL_VALIDATION =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
const NAME_VALIDATION = /^[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1\s]*)$/;

// estado de validaciones
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

// función genérica que devuelve boolean y aplica clases
function validateField(input, regex) {
  const value = input.value.trim();
  const ok = regex ? regex.test(value) : (value.length > 0);
  if (ok) {
    input.classList.add('valid');
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
  }
  return ok;
}

function updateButtonState() {
  const allValid = nameValidation && emailValidation && passwordValidation && matchValidation;
  formBtn.disabled = !allValid;
  if (allValid) formBtn.classList.remove('disabled');
  else formBtn.classList.add('disabled');
}

/* Eventos de inputs */
nameInput.addEventListener('input', () => {
  nameValidation = validateField(nameInput, NAME_VALIDATION);
  updateButtonState();
});

emailInput.addEventListener('input', () => {
  emailValidation = validateField(emailInput, EMAIL_VALIDATION);
  updateButtonState();
});

passwordInput.addEventListener('input', () => {
  passwordValidation = validateField(passwordInput, PASSWORD_VALIDATION);
  // también revalidar match si hay valor
  matchValidation = matchInput.value ? (matchInput.value === passwordInput.value) : false;
  if (matchInput.value) {
    if (matchValidation) {
      matchInput.classList.add('valid'); matchInput.classList.remove('invalid');
    } else {
      matchInput.classList.add('invalid'); matchInput.classList.remove('valid');
    }
  }
  updateButtonState();
});

matchInput.addEventListener('input', () => {
  matchValidation = (matchInput.value === passwordInput.value) && passwordInput.value.length > 0;
  if (matchValidation) {
    matchInput.classList.add('valid'); matchInput.classList.remove('invalid');
  } else {
    matchInput.classList.add('invalid'); matchInput.classList.remove('valid');
  }
  updateButtonState();
});

/* submit (ejemplo mínimo) */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (formBtn.disabled) return;
  // crear usuario new user
  // envia datos al backend usando axios
  // maneja respuestas exitosas y errores mostrando notificaciones
  try {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    }
    console.log('nuevo usuario',newUser);

    const { data }= await axios.post('/api/users', newUser);
     createNotification(false, data); 
    setTimeout(() => {
        notification.innerHTML = '';
    }, 5000)

    nameInput.value = ''; 
    emailInput.value = '';
    passwordInput.value = '';
    matchInput.value = '';
    validations(nameInput, false); 
   validations(emailInput, false);
   validations(passwordInput, false);
   validations(matchInput, false);

  } catch (error) {
      // Mostrar notificación de error
       createNotification(true, error.response.data.error);
      setTimeout(() => {
          notification.innerHTML = '';
      }, 5000)
      
      
  }
});
//crea un objeto nuevo de usuario y lo envía al servidor mediante una solicitud POST utilizando axios. Si la solicitud es exitosa, muestra una notificación de éxito y limpia el formulario; si hay un error, muestra una notificación de error.