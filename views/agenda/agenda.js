const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
const invalidCheck = document.querySelector('.invalid-check');
const form = document.querySelector('#form');
const totalCountSpan = document.querySelector('.total-count');
const completedCountSpan = document.querySelector('.completed-count');
const incompletedCountSpan = document.querySelector('.incompleted-count');

// --- AGENDA POR WHATSAPP ---
document.getElementById("formCita").addEventListener("submit", function(e){
      e.preventDefault();

      // Datos del formulario
      let nombre = document.getElementById("nombre").value;
      let telefono = document.getElementById("telefono").value;
      let servicio = document.getElementById("servicio").value;
      let fecha = document.getElementById("fecha").value;
      let hora = document.getElementById("hora").value;

      // Número de WhatsApp de la peluquería (ejemplo: Venezuela +58)
      let numeroPeluqueria = "5491144931652"; 

      // Mensaje que se enviará
      let mensaje = `Hola MONTESTILISTA, soy ${nombre}. Quiero agendar una cita.\n
      📞 Teléfono: ${telefono}\n
      ✂️ Servicio: ${servicio}\n
      📅 Fecha: ${fecha}\n
      ⏰ Hora: ${hora}`;

    // Crear enlace de WhatsApp directamente
let url = `https://wa.me/5491144931652?text=${encodeURIComponent(mensaje)}`;
      // Abrir WhatsApp
      window.open(url, "_blank");
    });
// --- FIN AGENDA POR WHATSAPP ---