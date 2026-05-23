const themeStorageKey = "tecnomarket-theme";
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2.5v2.5"></path><path d="M12 19v2.5"></path><path d="M4.93 4.93l1.77 1.77"></path><path d="M17.3 17.3l1.77 1.77"></path><path d="M2.5 12H5"></path><path d="M19 12h2.5"></path><path d="M4.93 19.07l1.77-1.77"></path><path d="M17.3 6.7l1.77-1.77"></path></svg>';
const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path></svg>';

function applyTheme(theme) {
  const isLight = theme === "light";

  document.documentElement.dataset.theme = theme;

  themeButtons.forEach((button) => {
    const label = isLight ? "Modo oscuro" : "Modo claro";
    const icon = isLight ? moonIcon : sunIcon;

    button.innerHTML = `<span class="theme-toggle-icon">${icon}</span><span>${label}</span>`;
    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute("aria-label", isLight ? "Activar modo oscuro" : "Activar modo claro");
  });
}

function resolveInitialTheme() {
  const storedTheme = window.localStorage.getItem(themeStorageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "light";
}

applyTheme(resolveInitialTheme());

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
  });
});

prefersLightScheme.addEventListener("change", (event) => {
  const storedTheme = window.localStorage.getItem(themeStorageKey);

  if (storedTheme) {
    return;
  }

  applyTheme(event.matches ? "light" : "dark");
});

const etaElements = document.querySelectorAll("[data-live-eta]");
const routeProgressElements = document.querySelectorAll("[data-route-progress]");
const progressFillElements = document.querySelectorAll("[data-progress-fill]");
const progressValueElements = document.querySelectorAll("[data-progress-value]");
const searchInput = document.getElementById("orderSearch");
const tableBody = document.getElementById("ordersTableBody");
const mobileMenuButton = document.querySelector("[data-menu-toggle]");
const mobileMenuCloseTargets = document.querySelectorAll("[data-menu-close], [data-mobile-sidebar] .nav-item");

function closeMobileMenu() {
  document.body.classList.remove("mobile-menu-open");

  if (mobileMenuButton) {
    mobileMenuButton.setAttribute("aria-expanded", "false");
  }
}

if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", () => {
    const willOpen = !document.body.classList.contains("mobile-menu-open");

    document.body.classList.toggle("mobile-menu-open", willOpen);
    mobileMenuButton.setAttribute("aria-expanded", String(willOpen));
  });

  mobileMenuCloseTargets.forEach((element) => {
    element.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) {
      closeMobileMenu();
    }
  });
}

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
