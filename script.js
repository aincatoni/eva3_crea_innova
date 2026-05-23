const etaElement = document.getElementById("liveEta");
const routeProgressText = document.getElementById("routeProgressText");
const searchInput = document.getElementById("orderSearch");
const tableBody = document.getElementById("ordersTableBody");

const etaSequence = [
  { eta: "14:35 hrs", detail: "Vehiculo a 12 km del destino. Trafico moderado." },
  { eta: "14:29 hrs", detail: "Vehiculo a 9 km del destino. Ruta optimizada automaticamente." },
  { eta: "14:24 hrs", detail: "Vehiculo a 6 km del destino. Cliente notificado por correo." },
  { eta: "14:18 hrs", detail: "Ultima milla en zona de entrega. Preparando validacion QR." }
];

let etaIndex = 0;

if (etaElement && routeProgressText) {
  setInterval(() => {
    etaIndex = (etaIndex + 1) % etaSequence.length;
    etaElement.textContent = etaSequence[etaIndex].eta;
    routeProgressText.textContent = etaSequence[etaIndex].detail;
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
