const form = document.getElementById("promoForm");
const tableBody = document.querySelector("#promoTable tbody");
const API_URL = "/api/promociones-admin"; // ruta relativa, más limpia si frontend y backend están juntos

let editingId = null; // flag para saber si estamos editando

// Crear o editar promoción
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const promo = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    type: document.querySelector('input[name="promoType"]:checked').value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    label: document.getElementById("label").value,
  };

  try {
    if (editingId) {
      // modo edición
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promo),
      });
      alert("Promoción actualizada");
      editingId = null; // salir del modo edición
    } else {
      // modo creación
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promo),
      });
      alert("Promoción creada");
    }

    form.reset();
    loadPromotions();
  } catch (error) {
    console.error(error);
    alert("Error al guardar la promoción");
  }
});

// Cargar promociones
async function loadPromotions() {
  tableBody.innerHTML = "";
  try {
    const response = await fetch(API_URL);
    const promos = await response.json();

    promos.forEach((promo) => {
      const row = document.createElement("tr");
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
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    alert("Error al cargar promociones");
  }
}

// Eliminar promoción
async function deletePromotion(id) {
  if (!confirm("¿Eliminar esta promoción?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadPromotions();
  } catch (error) {
    console.error(error);
    alert("Error al eliminar");
  }
}

// Editar promoción
async function editPromotion(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const promo = await response.json();

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