const form = document.getElementById("promoForm"); // formulario de creación/edición
const tableBody = document.querySelector("#promoTable tbody"); // cuerpo de la tabla de promociones
const API_URL = "/api/promociones-admin"; // ruta relativa, más limpia si frontend y backend están juntos

let editingId = null; // flag para saber si estamos editando

// Crear o editar promoción
form.addEventListener("submit", async (e) => { // manejar el envío del formulario
  e.preventDefault(); // prevenir recarga de página

  const promo = { // construir objeto promoción desde el formulario
    title: document.getElementById("title").value, //
    description: document.getElementById("description").value,
    type: document.querySelector('input[name="promoType"]:checked').value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    label: document.getElementById("label").value,
  };
// Llamada API
// Si editingId está seteado, es edición; si no, creación
  try {
    if (editingId) {
      // modo edición
      await fetch(`${API_URL}/${editingId}`, { // usar el ID para la URL
        method: "PUT", // método PUT para actualizar
        headers: { "Content-Type": "application/json" }, // encabezado JSON (guardar y transportar datos)
        body: JSON.stringify(promo), // cuerpo con datos de la promoción en formato JSON
      });
      alert("Promoción actualizada"); // notificar éxito
      editingId = null; // salir del modo edición
    } else {
      // modo creación. envia la nueva promocion al servidor 
      await fetch(API_URL, { // URL base para crear
        method: "POST", // método POST para crear
        headers: { "Content-Type": "application/json" }, // encabezado JSON
        body: JSON.stringify(promo), // cuerpo con datos de la promoción en formato JSON
      });
      alert("Promoción creada"); //notificar éxito
    }
// Reset formulario y recargar lista
    form.reset();
    loadPromotions(); //recargar la lista de promociones
  } catch (error) {
    console.error(error);
    alert("Error al guardar la promoción"); // notificar error
  }
});

// Cargar promociones
async function loadPromotions() { //funcion asíncrona para cargar promociones
  tableBody.innerHTML = ""; // limpiar tabla antes de recargar
  try {
    const response = await fetch(API_URL); // llamar a la API para obtener promociones
    const promos = await response.json(); // parsear respuesta JSON

    promos.forEach((promo) => { // iterar o recorre sobre cada promoción
      const row = document.createElement("tr"); // crear una fila de tabla
      // llenar la fila con datos de la promoción
      row.innerHTML = ` 
        <td>${promo.title}</td>
        <td>${promo.description}</td>
        <td>${promo.type}</td>
        <td>${new Date(promo.startDate).toLocaleDateString()} - ${new Date(promo.endDate).toLocaleDateString()}</td>
        <td>
          <button onclick="editPromotion('${promo._id}')">Editar</button>
          <button onclick="deletePromotion('${promo._id}')">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row); // agregar la fila a la tabla
    });
  } catch (error) {
    console.error(error);
    alert("Error al cargar promociones");
  }
}

// Eliminar promoción
async function deletePromotion(id) { // función asíncrona para eliminar promoción
  if (!confirm("¿Eliminar esta promoción?")) return; // confirmar eliminación
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // llamada API DELETE
    loadPromotions(); // recargar lista tras eliminar
  } catch (error) {
    console.error(error);
    alert("Error al eliminar");
  }
}

// Editar promoción
async function editPromotion(id) { // función asíncrona para editar promoción
  try {
    const response = await fetch(`${API_URL}/${id}`); // llamada API GET para obtener datos de la promoción
    const promo = await response.json(); // parsear respuesta JSON

    // llenar el formulario con los datos de la promoción

    document.getElementById("title").value = promo.title;
    document.getElementById("description").value = promo.description;
    document.querySelector(`input[name="promoType"][value="${promo.type}"]`).checked = true;
    document.getElementById("startDate").value = promo.startDate.split("T")[0];
    document.getElementById("endDate").value = promo.endDate.split("T")[0];
    document.getElementById("label").value = promo.label || "";

    editingId = id; // activa modo edición
  } catch (error) {
    console.error(error);
    alert("Error al editar");
  }
}

// Inicializar
loadPromotions();
//get esta para obtener datos de la api y mostrarlos en la tabla 
//fetch es para hacer llamadas a la api (get, post, put, delete)
//forEach es para iterar sobre un array y ejecutar una función por cada elemento
//innerHTML es para establecer o obtener el contenido HTML de un elemento
//addEventListener es para escuchar eventos en un elemento (como submit en un formulario)