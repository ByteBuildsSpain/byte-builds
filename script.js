const builds = {
  starter: {
    id: "starter",
    name: "Byte Starter",
    price: 1099,
    cpu: "Intel Core i5",
    ram: "8GB DDR5",
    gpu: "RTX 5060",
    psu: "650W",
    storage: "1TB NVMe SSD",
    cooling: "Air cooling",
    case: "Standard Airflow",
    description: "Solid 1080p gaming without the unnecessary extras."
  },
  gaming: {
    id: "gaming",
    name: "Byte Gaming",
    price: 1499,
    cpu: "Intel Core i7",
    ram: "16GB DDR5",
    gpu: "RTX 5060 Ti 16GB",
    psu: "750W",
    storage: "1TB NVMe SSD",
    cooling: "Air cooling",
    case: "Standard Airflow",
    description: "A balanced powerhouse for high-FPS gaming and streaming.",
    popular: true
  },
  pro: {
    id: "pro",
    name: "Byte Pro",
    price: 1999,
    cpu: "Intel Core Ultra 7",
    ram: "32GB DDR5",
    gpu: "RTX 5070",
    psu: "850W",
    storage: "2TB NVMe SSD",
    cooling: "240mm AIO",
    case: "Standard Airflow",
    description: "Serious performance for gaming, streaming and creation."
  },
  proplus: {
    id: "proplus",
    name: "Byte Pro+",
    price: 2599,
    cpu: "Intel Core i9",
    ram: "32GB DDR5",
    gpu: "RTX 5070 Ti",
    psu: "850W",
    storage: "2TB NVMe SSD",
    cooling: "360mm AIO",
    case: "Premium Glass",
    description: "High-end power for demanding games and heavy workloads."
  },
  ultra: {
    id: "ultra",
    name: "Byte Ultra",
    price: 3499,
    cpu: "Intel Core Ultra 9",
    ram: "64GB DDR5",
    gpu: "RTX 5080",
    psu: "1000W",
    storage: "2TB NVMe SSD",
    cooling: "360mm AIO",
    case: "Premium Glass",
    description: "The flagship. Maximum performance with room to breathe."
  }
};

const configuratorPricing = {
  cpu: {
    "Intel Core i5": 0,
    "Intel Core i7": 150,
    "Intel Core Ultra 7": 250,
    "Intel Core i9": 350,
    "Intel Core Ultra 9": 500
  },
  gpu: {
    "RTX 5060": 0,
    "RTX 5060 Ti 16GB": 300,
    "RTX 5070": 650,
    "RTX 5070 Ti": 1050,
    "RTX 5080": 1450
  },
  ram: {
    "8GB DDR5": 0,
    "16GB DDR5": 100,
    "32GB DDR5": 500,
    "64GB DDR5": 950
  },
  storage: {
    "1TB NVMe SSD": 0,
    "2TB NVMe SSD": 90,
    "4TB NVMe SSD": 220
  },
  cooling: {
    "Air cooling": 0,
    "240mm AIO": 70,
    "360mm AIO": 120
  },
  psu: {
    "650W": 0,
    "750W": 50,
    "850W": 100,
    "1000W": 180
  },
  case: {
    "Standard Airflow": 0,
    "RGB Airflow": 50,
    "Premium Glass": 120
  }
};

const configDefaults = {
  cpu: "Intel Core i7",
  gpu: "RTX 5060 Ti 16GB",
  ram: "16GB DDR5",
  storage: "1TB NVMe SSD",
  cooling: "Air cooling",
  psu: "750W",
  case: "Standard Airflow",
  wifi: true,
  windows: true,
  rgb: true,
  useCase: "Gaming",
  budget: 2000
};

const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";
const WHATSAPP_MESSAGE = "Hi Byte Builds, I’d like to enquire about a custom PC.";

const buildGrid = document.getElementById("build-grid");
const estimatedPriceEl = document.getElementById("estimated-price");
const summaryListEl = document.getElementById("summary-list");
const recommendationTitleEl = document.getElementById("recommendation-title");
const recommendationTextEl = document.getElementById("recommendation-text");
const requestBuildBtn = document.getElementById("request-build-btn");
const requestModal = document.getElementById("request-modal");
const form = document.getElementById("build-request-form");
const buildSummary = document.getElementById("build-summary");
const formBudget = document.getElementById("form-budget");
const whatsappLink = document.getElementById("whatsapp-link");

const state = {
  cpu: configDefaults.cpu,
  gpu: configDefaults.gpu,
  ram: configDefaults.ram,
  storage: configDefaults.storage,
  cooling: configDefaults.cooling,
  psu: configDefaults.psu,
  case: configDefaults.case,
  wifi: configDefaults.wifi,
  windows: configDefaults.windows,
  rgb: configDefaults.rgb,
  useCase: configDefaults.useCase,
  budget: configDefaults.budget
};

const optionOrder = {
  cpu: ["Intel Core i5", "Intel Core i7", "Intel Core Ultra 7", "Intel Core i9", "Intel Core Ultra 9"],
  gpu: ["RTX 5060", "RTX 5060 Ti 16GB", "RTX 5070", "RTX 5070 Ti", "RTX 5080"],
  ram: ["8GB DDR5", "16GB DDR5", "32GB DDR5", "64GB DDR5"],
  storage: ["1TB NVMe SSD", "2TB NVMe SSD", "4TB NVMe SSD"],
  cooling: ["Air cooling", "240mm AIO", "360mm AIO"],
  psu: ["650W", "750W", "850W", "1000W"],
  case: ["Standard Airflow", "RGB Airflow", "Premium Glass"]
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function getTotalPrice() {
  const base =
    (configuratorPricing.cpu[state.cpu] || 0) +
    (configuratorPricing.gpu[state.gpu] || 0) +
    (configuratorPricing.ram[state.ram] || 0) +
    (configuratorPricing.storage[state.storage] || 0) +
    (configuratorPricing.cooling[state.cooling] || 0) +
    (configuratorPricing.psu[state.psu] || 0) +
    (configuratorPricing.case[state.case] || 0);

  const extras = (state.wifi ? 0 : -30) + (state.windows ? 0 : -130) + (state.rgb ? 40 : 0);

  return base + extras;
}

function updateRecommendation() {
  const useCase = state.useCase;
  let title = "Recommended for Gaming";
  let text = "Balanced performance with strong GPU value and smooth gameplay.";

  if (useCase === "Gaming + Streaming") {
    title = "Recommended for Gaming + Streaming";
    text = "A stronger CPU and GPU combination for consistent frame rates, smooth streaming and multitasking.";
  } else if (useCase === "Video Editing") {
    title = "Recommended for Video Editing";
    text = "Prioritise more RAM, a stronger CPU and responsive storage for editing and rendering.";
  } else if (useCase === "Work") {
    title = "Recommended for Work";
    text = "Built for reliability, CPU performance and efficient multitasking.";
  } else if (useCase === "Other") {
    title = "Recommended for Custom Workloads";
    text = "This build can be tailored further if you need a specialised setup for engineering, design, voice work or development.";
  }

  recommendationTitleEl.textContent = title;
  recommendationTextEl.textContent = text;
}

function renderBuildCards() {
  buildGrid.innerHTML = Object.values(builds).map((build) => {
    const popularBadge = build.popular ? `<span class="popular-badge">Most Popular</span>` : "";
    return `
      <article class="build-card ${build.popular ? "popular" : ""}">
        ${popularBadge}
        <div class="build-header">
          <h3>${build.name}</h3>
          <div class="build-price">${formatPrice(build.price)}</div>
        </div>

        <p>${build.description}</p>

        <ul class="spec-list">
          <li>${build.cpu}</li>
          <li>${build.ram}</li>
          <li>${build.gpu}</li>
          <li>${build.psu}</li>
          <li>${build.storage}</li>
        </ul>

        <div class="build-actions">
          <a href="#configure" class="btn btn-secondary">Configure</a>
          <button type="button" class="btn btn-primary build-request-btn" data-build="${build.id}">Request</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderOptionGroup(groupKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const options = optionOrder[groupKey];
  container.innerHTML = options.map((option) => {
    const selected = state[groupKey] === option ? "selected" : "";
    const priceValue = configuratorPricing[groupKey][option] ?? 0;
    const label = priceValue === 0 ? option : `${option} (+${formatPrice(priceValue)})`;

    return `
      <label class="option-item ${selected}" data-group="${groupKey}" data-value="${option}">
        <input type="radio" name="${groupKey}" value="${option}" ${state[groupKey] === option ? "checked" : ""} />
        <span class="dot"></span>
        <span>${label}</span>
      </label>
    `;
  }).join("");
}

function renderSummary() {
  const total = getTotalPrice();
  estimatedPriceEl.textContent = formatPrice(total);

  summaryListEl.innerHTML = `
    <li><span>CPU</span><strong>${state.cpu}</strong></li>
    <li><span>GPU</span><strong>${state.gpu}</strong></li>
    <li><span>RAM</span><strong>${state.ram}</strong></li>
    <li><span>Storage</span><strong>${state.storage}</strong></li>
    <li><span>Cooling</span><strong>${state.cooling}</strong></li>
    <li><span>PSU</span><strong>${state.psu}</strong></li>
    <li><span>Case</span><strong>${state.case}</strong></li>
    <li><span>Wi‑Fi</span><strong>${state.wifi ? "Yes" : "No"}</strong></li>
    <li><span>Windows 11</span><strong>${state.windows ? "Yes" : "No"}</strong></li>
    <li><span>RGB</span><strong>${state.rgb ? "Yes" : "No"}</strong></li>
  `;

  updateRecommendation();
  formBudget.value = `${state.budget}`;
}

function renderAll() {
  renderBuildCards();
  renderOptionGroup("cpu", "cpu-options");
  renderOptionGroup("gpu", "gpu-options");
  renderOptionGroup("ram", "ram-options");
  renderOptionGroup("storage", "storage-options");
  renderOptionGroup("cooling", "cooling-options");
  renderOptionGroup("psu", "psu-options");
  renderOptionGroup("case", "case-options");
  renderSummary();

  document.getElementById("useCase").value = state.useCase;
  document.getElementById("budget").value = state.budget;
  document.getElementById("wifi-option").checked = state.wifi;
  document.getElementById("windows-option").checked = state.windows;
  document.getElementById("rgb-option").checked = state.rgb;
}

function updateWhatsAppLink() {
  const configured = WHATSAPP_NUMBER && !WHATSAPP_NUMBER.includes("YOUR_");

  if (configured) {
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  } else {
    whatsappLink.href = `https://wa.me/?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  }
}

function openModal() {
  const total = getTotalPrice();
  const summary = `
BYTE BUILDS ENQUIRY

Name: [Your name]
Email: [Your email]
Use: ${state.useCase}
Estimated price: ${formatPrice(total)}
CPU: ${state.cpu}
GPU: ${state.gpu}
RAM: ${state.ram}
Storage: ${state.storage}
Cooling: ${state.cooling}
PSU: ${state.psu}
Wi‑Fi: ${state.wifi ? "Yes" : "No"}
Windows 11: ${state.windows ? "Yes" : "No"}
RGB: ${state.rgb ? "Yes" : "No"}
  `;
  buildSummary.textContent = summary;
  requestModal.classList.remove("hidden");
  requestModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  requestModal.classList.add("hidden");
  requestModal.setAttribute("aria-hidden", "true");
}

function attachEvents() {
  document.querySelector(".menu-toggle").addEventListener("click", () => {
    const nav = document.querySelector(".main-nav");
    const toggle = document.querySelector(".menu-toggle");
    nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
  });

  document.querySelectorAll(".main-nav a").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".main-nav").classList.remove("open");
      document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    });
  });

  document.getElementById("useCase").addEventListener("change", (event) => {
    state.useCase = event.target.value;
    renderSummary();
  });

  document.getElementById("budget").addEventListener("input", (event) => {
    const value = Number(event.target.value) || 0;
    state.budget = value;
    renderSummary();
  });

  document.querySelectorAll("[name='cpu']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.cpu = event.target.value;
      renderSummary();
      renderOptionGroup("cpu", "cpu-options");
    });
  });

  document.querySelectorAll("[name='gpu']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.gpu = event.target.value;
      renderSummary();
      renderOptionGroup("gpu", "gpu-options");
    });
  });

  document.querySelectorAll("[name='ram']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.ram = event.target.value;
      renderSummary();
      renderOptionGroup("ram", "ram-options");
    });
  });

  document.querySelectorAll("[name='storage']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.storage = event.target.value;
      renderSummary();
      renderOptionGroup("storage", "storage-options");
    });
  });

  document.querySelectorAll("[name='cooling']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.cooling = event.target.value;
      renderSummary();
      renderOptionGroup("cooling", "cooling-options");
    });
  });

  document.querySelectorAll("[name='psu']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.psu = event.target.value;
      renderSummary();
      renderOptionGroup("psu", "psu-options");
    });
  });

  document.querySelectorAll("[name='case']").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.case = event.target.value;
      renderSummary();
      renderOptionGroup("case", "case-options");
    });
  });

  document.getElementById("wifi-option").addEventListener("change", (event) => {
    state.wifi = event.target.checked;
    renderSummary();
  });

  document.getElementById("windows-option").addEventListener("change", (event) => {
    state.windows = event.target.checked;
    renderSummary();
  });

  document.getElementById("rgb-option").addEventListener("change", (event) => {
    state.rgb = event.target.checked;
    renderSummary();
  });

  document.querySelectorAll(".build-request-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const buildKey = button.dataset.build;
      const selectedBuild = builds[buildKey];
      state.cpu = selectedBuild.cpu;
      state.gpu = selectedBuild.gpu;
      state.ram = selectedBuild.ram;
      state.storage = selectedBuild.storage;
      state.cooling = selectedBuild.cooling;
      state.psu = selectedBuild.psu;
      state.case = selectedBuild.case;
      state.useCase = "Gaming";
      state.budget = selectedBuild.price;

      renderAll();
      openModal();
    });
  });

  requestBuildBtn.addEventListener("click", openModal);

  document.querySelector(".modal-close").addEventListener("click", closeModal);

  document.querySelector("[data-close='true']").addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !requestModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") || "[Your name]";
    const email = formData.get("email") || "[Your email]";
    const use = formData.get("use") || state.useCase;
    const games = formData.get("games") || "Not specified";
    const software = formData.get("software") || "Not specified";
    const notes = formData.get("notes") || "No additional notes";
    const budget = formData.get("budget") || state.budget;
    const preferredCpu = formData.get("preferredCpu") || state.cpu;
    const preferredGpu = formData.get("preferredGpu") || state.gpu;
    const phone = formData.get("phone") || "Not provided";

    const summary = `
BYTE BUILDS ENQUIRY

Name: ${name}
Email: ${email}
Phone: ${phone}
Use: ${use}
Games: ${games}
Software: ${software}
Notes: ${notes}
Budget: €${budget}
Preferred CPU: ${preferredCpu}
Preferred GPU: ${preferredGpu}
Estimated price: ${formatPrice(getTotalPrice())}
CPU: ${state.cpu}
GPU: ${state.gpu}
RAM: ${state.ram}
Storage: ${state.storage}
Cooling: ${state.cooling}
PSU: ${state.psu}
Wi‑Fi: ${state.wifi ? "Yes" : "No"}
Windows 11: ${state.windows ? "Yes" : "No"}
RGB: ${state.rgb ? "Yes" : "No"}
      `;

    buildSummary.textContent = summary;
    form.reset();
    form.querySelector('input[name="name"]').focus();
  });
}

renderAll();
updateWhatsAppLink();
attachEvents();

