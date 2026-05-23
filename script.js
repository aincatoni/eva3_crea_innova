const etaElements = document.querySelectorAll("[data-live-eta]");
const routeProgressElements = document.querySelectorAll("[data-route-progress]");
const progressFillElements = document.querySelectorAll("[data-progress-fill]");
const progressValueElements = document.querySelectorAll("[data-progress-value]");
const searchInput = document.getElementById("orderSearch");
const tableBody = document.getElementById("ordersTableBody");

const etaSequence = [
  { eta: "14:35 hrs", detail: "Vehiculo a 12 km del destino. Trafico moderado.", progress: "75%" },
  { eta: "14:29 hrs", detail: "Vehiculo a 9 km del destino. Ruta optimizada automaticamente.", progress: "82%" },
  { eta: "14:24 hrs", detail: "Vehiculo a 6 km del destino. Cliente notificado por correo.", progress: "90%" },
  { eta: "14:18 hrs", detail: "Ultima milla en zona de entrega. Preparando validacion QR.", progress: "96%" }
];

let etaIndex = 0;

if (etaElements.length && routeProgressElements.length) {
  setInterval(() => {
    etaIndex = (etaIndex + 1) % etaSequence.length;
    etaElements.forEach((element) => {
      element.textContent = etaSequence[etaIndex].eta;
    });
    routeProgressElements.forEach((element) => {
      element.textContent = etaSequence[etaIndex].detail;
    });
    progressFillElements.forEach((element) => {
      element.style.width = etaSequence[etaIndex].progress;
    });
    progressValueElements.forEach((element) => {
      element.textContent = etaSequence[etaIndex].progress;
    });
  }, 2800);
}

if (searchInput && tableBody) {
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row) => {
      const matches = row.textContent.toLowerCase().includes(query);
      row.classList.toggle("is-hidden", !matches);
    });
  });
}
