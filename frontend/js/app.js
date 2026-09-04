// ---------- Application State ----------
const now = new Date();
const AppState = {
  currentPage: "page1",
  email: "",
  dateIdea: "",
  coffeeType: "",
  food: "",
  date: "",
  time: "",
  notes: "",
  calMonth: now.getMonth(),
  calYear: now.getFullYear(),
};

// ---------- DOM References ----------
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const pages = {
  page1: $("#page1"),
  page2: $("#page2"),
  page3: $("#page3"),
  pageFood: $("#pageFood"),
  pageCoffee: $("#pageCoffee"),
  pageDateTime: $("#pageDateTime"),
  pageSummary: $("#pageSummary"),
};

const progressDots = $("#progressDots");
const confettiOverlay = $("#confettiOverlay");
const heartsContainer = $("#heartsContainer");

// Step 1 Elements
const yesBtn = $("#yesBtn");
const noBtn = $("#noBtn");
const noMessage = $("#noMessage");

// Step 2 Elements
const emailInput = $("#emailInput");
const emailError = $("#emailError");
const emailNextBtn = $("#emailNextBtn");
const emailBackBtn = $("#emailBackBtn");

// Step 3 Elements
const ideaCards = $$(".idea-card");
const ideaError = $("#ideaError");
const ideaNextBtn = $("#ideaNextBtn");
const ideaBackBtn = $("#ideaBackBtn");

// Food Page Elements
const foodCards = $$("#foodGrid .choice-card");
const foodPreviewContainer = $("#foodPreviewContainer");
const foodError = $("#foodError");
const foodNextBtn = $("#foodNextBtn");
const foodBackBtn = $("#foodBackBtn");

// Coffee Page Elements
const coffeeCards = $$("#coffeeGrid .choice-card");
const coffeePreviewContainer = $("#coffeePreviewContainer");
const coffeeError = $("#coffeeError");
const coffeeNextBtn = $("#coffeeNextBtn");
const coffeeBackBtn = $("#coffeeBackBtn");

// DateTime Page Elements
const calendarGrid = $("#calendarGrid");
const calMonthYear = $("#calMonthYear");
const calPrev = $("#calPrev");
const calNext = $("#calNext");
const timeGrid = $("#timeGrid");
const timeSectionTitle = $("#timeSectionTitle");
const dateTimeSubtitle = $("#dateTimeSubtitle");
const notesInput = $("#notesInput");
const dateTimeError = $("#dateTimeError");
const dateTimeNextBtn = $("#dateTimeNextBtn");
const dateTimeBackBtn = $("#dateTimeBackBtn");

// Summary Page Elements
const summarySection = $("#summarySection");
const successSection = $("#successSection");
const confirmEmail = $("#confirmEmail");
const confirmIdea = $("#confirmIdea");
const confirmFood = $("#confirmFood");
const confirmFoodWrapper = $("#confirmFoodWrapper");
const confirmCoffee = $("#confirmCoffee");
const confirmCoffeeWrapper = $("#confirmCoffeeWrapper");
const confirmDate = $("#confirmDate");
const confirmTime = $("#confirmTime");
const confirmNotes = $("#confirmNotes");
const confirmNotesWrapper = $("#confirmNotesWrapper");
const submitDateBtn = $("#submitDateBtn");
const summaryBackBtn = $("#summaryBackBtn");
const submitError = $("#submitError");
const successEmail = $("#successEmail");
const successDateTime = $("#successDateTime");
const resetBtn = $("#resetBtn");

// ---------- Constants ----------
const AFTERNOON_TIME_SLOTS = [
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

const EVENING_TIME_SLOTS = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
];

const DAYS_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const MONTHS_VN = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

// ---------- Venue Spotlight Data ----------
const VENUES = {
  coffee: {
    "Option bình thường": {
      name: "Góc Vuông",
      address: "16 Ng. 6 P. Tôn Thất Tùng, Kim Liên, Hà Nội",
      mapUrl: "https://maps.app.goo.gl/orvnWBFh27oaAP5M9",
      image: "images/goc_vuong.jpg",
      tag: "Quán Cafe Chill • Nhạc êm",
    },
    "Cafe mèo": {
      name: "Râu Thỏ",
      address: "9, ngách 5 Ng. 85 P. Nguyễn Lương Bằng, Đống Đa, Hà Nội",
      mapUrl: "https://maps.app.goo.gl/eLB7snk1QF9wpLAn9",
      image: "images/rau_tho.jpg",
      tag: "Quán Cafe Mèo • Cưng xỉu",
    },
  },
  food: {
    "Pasta": {
      name: "Gusto Pasta Bar",
      address: "13B P. Nguyễn Gia Thiều, Cửa Nam, Hà Nội",
      mapUrl: "https://maps.app.goo.gl/qQPXkLVabyC6s3s66",
      image: "images/gusto_pasta.jpg",
      tag: "Món Ý & Pasta • Ấm cúng",
    },
    "Mì cay": {
      name: "Em hum biết ✨",
      address: "Chỗ này để em chọn hoặc anh dẫn đi bất ngờ nha! 🍜💕",
      mapUrl: "",
      image: "",
      tag: "Mì Cay Bất Ngờ",
      isSurprise: true,
    },
    "Gà rán": {
      name: "Chicken 88",
      address: "363 Đ. Nguyễn Khang, Cầu Giấy, Hà Nội",
      mapUrl: "https://maps.app.goo.gl/ea8YmSGq1zGbjLRA8",
      image: "images/chicken_88.jpg",
      tag: "Gà Rán Giòn Rụm • Đậm vị",
    },
  },
};

function renderVenueSpotlight(containerEl, venueInfo) {
  if (!containerEl) return;
  if (!venueInfo) {
    containerEl.classList.add("hidden");
    containerEl.innerHTML = "";
    return;
  }

  let mediaHtml = "";
  if (venueInfo.image) {
    mediaHtml = `
      <div class="venue-preview-img-wrapper">
        <img src="${venueInfo.image}" alt="${venueInfo.name}" class="venue-preview-img" loading="lazy" />
      </div>
    `;
  } else if (venueInfo.isSurprise) {
    mediaHtml = `
      <div class="venue-preview-img-wrapper flex items-center justify-center bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-rose-500/20 text-center p-4">
        <div>
          <div class="text-4xl mb-1 animate-bounce-slow">🍜✨</div>
          <div class="text-pink-200 text-sm font-bold">Địa điểm bí mật</div>
          <div class="text-white/70 text-xs mt-1">Anh sẽ dẫn em đến quán mì cay siêu ngon!</div>
        </div>
      </div>
    `;
  }

  let mapBtnHtml = "";
  if (venueInfo.mapUrl) {
    mapBtnHtml = `
      <a href="${venueInfo.mapUrl}" target="_blank" rel="noopener noreferrer" class="venue-preview-map-btn">
        <span>🗺️</span> Xem vị trí trên Google Maps ↗
      </a>
    `;
  } else {
    mapBtnHtml = `
      <span class="venue-preview-map-btn cursor-default bg-pink-500/15 border-pink-500/30 text-pink-200">
        <span>🛵</span> Anh chở em đi tận nơi nhé!
      </span>
    `;
  }

  containerEl.innerHTML = `
    <div class="venue-preview-card">
      <span class="venue-preview-tag">${venueInfo.tag || "Gợi ý địa điểm"}</span>
      ${mediaHtml}
      <div class="venue-preview-name">
        <span>📍</span> ${venueInfo.name}
      </div>
      <div class="venue-preview-addr">${venueInfo.address}</div>
      ${mapBtnHtml}
    </div>
  `;
  containerEl.classList.remove("hidden");
}

// ---------- Floating Hearts Initialization ----------
function initFloatingHearts() {
  heartsContainer.innerHTML = "";
  const emojis = ["❤️", "💕", "💖", "✨", "🌸", "💗", "🥰", "💌", "🐱", "☕"];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement("span");
    el.className = "heart-float";
    el.textContent = emojis[i % emojis.length];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = 0.8 + Math.random() * 1.2 + "rem";
    el.style.animationDuration = 7 + Math.random() * 10 + "s";
    el.style.animationDelay = Math.random() * 8 + "s";
    heartsContainer.appendChild(el);
  }
}

// ---------- Dynamic Flow & Navigation ----------
function getFlowPages() {
  const isCoffeeOnly = AppState.dateIdea.includes("Đi coffee date (buổi chiều)");
  if (isCoffeeOnly) {
    return ["page1", "page2", "page3", "pageCoffee", "pageDateTime", "pageSummary"];
  } else {
    return ["page1", "page2", "page3", "pageFood", "pageCoffee", "pageDateTime", "pageSummary"];
  }
}

function updateProgressDots(pageId) {
  const flow = getFlowPages();
  const currentIndex = flow.indexOf(pageId);
  const total = flow.length;

  let dotsHtml = "";
  for (let i = 0; i < total; i++) {
    let classes = "dot";
    if (i === currentIndex) classes += " active";
    else if (i < currentIndex) classes += " done";
    dotsHtml += `<span class="${classes}"></span>`;
  }
  progressDots.innerHTML = dotsHtml;
}

function goToPage(pageId) {
  AppState.currentPage = pageId;

  // Toggle pages visibility
  Object.keys(pages).forEach((key) => {
    if (pages[key]) {
      pages[key].classList.toggle("active", key === pageId);
    }
  });

  updateProgressDots(pageId);

  // Smooth scroll to top of app card
  const card = $("#appCard");
  if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest" });

  if (pageId === "page2" && emailInput) {
    setTimeout(() => emailInput.focus(), 300);
  }
}

// ---------- Step 1: Playful "NO" Button ----------
let noClickCount = 0;
const noBtnWrapper = noBtn ? noBtn.closest(".btn-no-wrapper") : null;
const canHover = window.matchMedia("(hover: hover)").matches;

if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    if (!noBtnWrapper || !canHover) return;
    const maxX = 120;
    const maxY = 60;
    const dx = (Math.random() - 0.5) * maxX * 2;
    const dy = (Math.random() - 0.5) * maxY * 2;
    noBtnWrapper.style.transform = `translate(${dx}px, ${dy}px)`;
    noBtnWrapper.style.transition =
      "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)";
  });

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noClickCount++;
    noMessage.classList.remove("hidden");
    const messages = [
      "🥺 are you sure? Nghĩ lại xíu điii chị iu... 💕",
      "😤 Bấm YES mới đúng nè chị ơi!",
      "💀 Không trốn thằng em này được đâu nha!",
      "🥰 Bấm YES để đi first date thui nào!",
      "💗 Em vẫn đang kiên trì hỏi tiếp nè...",
      "❤️ Chỉ có 1 đáp án duy nhất là YES thui!",
    ];
    noMessage.textContent =
      messages[Math.min(noClickCount - 1, messages.length - 1)];

    if (noClickCount > 3) {
      noBtn.style.transform = "scale(0.7)";
      noBtn.style.opacity = "0.4";
      setTimeout(() => {
        noBtn.style.transform = "scale(1)";
        noBtn.style.opacity = "1";
      }, 600);
    }
    if (noClickCount > 5) {
      noMessage.textContent = "💖 Thôi để em bấm YES hộ chị lun nhé! 💖";
      setTimeout(() => {
        yesBtn.click();
      }, 500);
    }
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    goToPage("page2");
  });
}

// ---------- Step 2: Email Validation & Navigation ----------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

if (emailNextBtn) {
  emailNextBtn.addEventListener("click", () => {
    const val = emailInput.value.trim();
    if (!isValidEmail(val)) {
      emailError.classList.remove("hidden");
      emailInput.focus();
      return;
    }
    emailError.classList.add("hidden");
    AppState.email = val;
    goToPage("page3");
  });
}

if (emailInput) {
  emailInput.addEventListener("input", () => {
    if (emailError && !emailError.classList.contains("hidden")) {
      if (isValidEmail(emailInput.value)) {
        emailError.classList.add("hidden");
      }
    }
  });

  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      emailNextBtn.click();
    }
  });
}

if (emailBackBtn) {
  emailBackBtn.addEventListener("click", () => {
    goToPage("page1");
  });
}

// ---------- Step 3: Date Idea Selection ----------
ideaCards.forEach((card) => {
  card.addEventListener("click", () => {
    ideaCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    AppState.dateIdea = card.dataset.idea;
    ideaNextBtn.disabled = false;
    ideaError.classList.add("hidden");
  });
});

if (ideaNextBtn) {
  ideaNextBtn.addEventListener("click", () => {
    if (!AppState.dateIdea) {
      ideaError.classList.remove("hidden");
      return;
    }

    const isCoffeeOnly = AppState.dateIdea.includes("Đi coffee date (buổi chiều)");
    if (isCoffeeOnly) {
      AppState.food = "";
      goToPage("pageCoffee");
    } else {
      goToPage("pageFood");
    }
  });
}

if (ideaBackBtn) {
  ideaBackBtn.addEventListener("click", () => {
    goToPage("page2");
  });
}

// ---------- Page Food: Food Selection (Pasta, Mì cay, Gà rán) ----------
foodCards.forEach((card) => {
  card.addEventListener("click", () => {
    foodCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    AppState.food = card.dataset.food;
    foodNextBtn.disabled = false;
    foodError.classList.add("hidden");
    renderVenueSpotlight(foodPreviewContainer, VENUES.food[AppState.food]);
  });
});

if (foodNextBtn) {
  foodNextBtn.addEventListener("click", () => {
    if (!AppState.food) {
      foodError.classList.remove("hidden");
      return;
    }
    goToPage("pageCoffee");
  });
}

if (foodBackBtn) {
  foodBackBtn.addEventListener("click", () => {
    goToPage("page3");
  });
}

// ---------- Page Coffee: Coffee Selection (Bình thường vs Cafe mèo) ----------
coffeeCards.forEach((card) => {
  card.addEventListener("click", () => {
    coffeeCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    AppState.coffeeType = card.dataset.coffee;
    coffeeNextBtn.disabled = false;
    coffeeError.classList.add("hidden");
    renderVenueSpotlight(coffeePreviewContainer, VENUES.coffee[AppState.coffeeType]);
  });
});

if (coffeeNextBtn) {
  coffeeNextBtn.addEventListener("click", () => {
    if (!AppState.coffeeType) {
      coffeeError.classList.remove("hidden");
      return;
    }

    // Configure DateTime page for the chosen idea
    const isCoffeeOnly = AppState.dateIdea.includes("Đi coffee date (buổi chiều)");
    if (isCoffeeOnly) {
      dateTimeSubtitle.textContent = "Chọn ngày & giờ buổi chiều phù hợp với em nhé ☕";
      timeSectionTitle.textContent = "Chọn khung giờ chiều 🕒";
    } else {
      dateTimeSubtitle.textContent = "Chọn ngày & giờ chiều tối để đi ăn và cafe nhé 🍽️☕";
      timeSectionTitle.textContent = "Chọn khung giờ chiều tối 🕒";
    }

    renderCalendar();
    renderTimes();
    checkDateTimeReady();
    goToPage("pageDateTime");
  });
}

if (coffeeBackBtn) {
  coffeeBackBtn.addEventListener("click", () => {
    const isCoffeeOnly = AppState.dateIdea.includes("Đi coffee date (buổi chiều)");
    if (isCoffeeOnly) {
      goToPage("page3");
    } else {
      goToPage("pageFood");
    }
  });
}

// ---------- Page DateTime: Calendar, Times & Notes ----------
function renderCalendar() {
  const { calMonth, calYear } = AppState;
  calMonthYear.textContent = `${MONTHS_VN[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  let html = "";
  DAYS_SHORT.forEach((d) => {
    html += `<div class="day-label">${d}</div>`;
  });

  for (let i = 0; i < firstDay; i++) {
    html += '<div class="day empty"></div>';
  }

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isPast = dateStr < todayStr;
    const isSelected = AppState.date === dateStr;
    const isToday = dateStr === todayStr;

    let classes = "day";
    if (isPast) classes += " empty";
    if (isSelected) classes += " selected";
    if (isToday && !isSelected) classes += " today";

    const clickable = !isPast ? `data-date="${dateStr}"` : "";
    html += `<div class="${classes}" ${clickable} title="${isToday ? 'Hôm nay' : ''}">${d}</div>`;
  }

  calendarGrid.innerHTML = html;

  calendarGrid.querySelectorAll(".day:not(.empty)").forEach((el) => {
    el.addEventListener("click", () => {
      const dateStr = el.dataset.date;
      if (!dateStr) return;
      calendarGrid
        .querySelectorAll(".day")
        .forEach((d) => d.classList.remove("selected"));
      el.classList.add("selected");
      AppState.date = dateStr;
      checkDateTimeReady();
    });
  });
}

if (calPrev) {
  calPrev.addEventListener("click", () => {
    if (AppState.calMonth === 0) {
      AppState.calMonth = 11;
      AppState.calYear--;
    } else {
      AppState.calMonth--;
    }
    renderCalendar();
  });
}

if (calNext) {
  calNext.addEventListener("click", () => {
    if (AppState.calMonth === 11) {
      AppState.calMonth = 0;
      AppState.calYear++;
    } else {
      AppState.calMonth++;
    }
    renderCalendar();
  });
}

function renderTimes() {
  const isCoffeeOnly = AppState.dateIdea.includes("Đi coffee date (buổi chiều)");
  const slots = isCoffeeOnly ? AFTERNOON_TIME_SLOTS : EVENING_TIME_SLOTS;

  let html = "";
  slots.forEach((t) => {
    const selected = AppState.time === t ? "selected" : "";
    html += `<div class="time-item ${selected}" data-time="${t}">${t}</div>`;
  });
  timeGrid.innerHTML = html;

  timeGrid.querySelectorAll(".time-item").forEach((el) => {
    el.addEventListener("click", () => {
      timeGrid
        .querySelectorAll(".time-item")
        .forEach((e) => e.classList.remove("selected"));
      el.classList.add("selected");
      AppState.time = el.dataset.time;
      checkDateTimeReady();
    });
  });
}

function checkDateTimeReady() {
  if (AppState.date && AppState.time) {
    dateTimeNextBtn.disabled = false;
    dateTimeError.classList.add("hidden");
  } else {
    dateTimeNextBtn.disabled = true;
  }
}

if (dateTimeNextBtn) {
  dateTimeNextBtn.addEventListener("click", () => {
    if (!AppState.date || !AppState.time) {
      dateTimeError.classList.remove("hidden");
      return;
    }

    if (notesInput) {
      AppState.notes = notesInput.value.trim();
    }

    populateSummary();
    goToPage("pageSummary");
  });
}

if (dateTimeBackBtn) {
  dateTimeBackBtn.addEventListener("click", () => {
    goToPage("pageCoffee");
  });
}

// ---------- Page Summary: Summary & Final Confirmation ----------
function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const dayOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][d.getDay()];
  return `${dayOfWeek}, ngày ${parts[2]}/${parts[1]}/${parts[0]}`;
}

function populateSummary() {
  confirmEmail.textContent = AppState.email;
  confirmIdea.textContent = AppState.dateIdea;
  confirmCoffee.textContent = AppState.coffeeType || "Chưa chọn";
  confirmDate.textContent = formatDisplayDate(AppState.date);
  confirmTime.textContent = AppState.time;

  const isCoffeeOnly = AppState.dateIdea.includes("Đi coffee date (buổi chiều)");
  if (!isCoffeeOnly && AppState.food) {
    confirmFood.textContent = AppState.food;
    confirmFoodWrapper.classList.remove("hidden");
  } else {
    confirmFoodWrapper.classList.add("hidden");
  }

  if (AppState.notes) {
    confirmNotes.textContent = AppState.notes;
    confirmNotesWrapper.classList.remove("hidden");
  } else {
    confirmNotesWrapper.classList.add("hidden");
  }

  submitError.classList.add("hidden");
  summarySection.classList.remove("hidden");
  successSection.classList.add("hidden");
}

if (summaryBackBtn) {
  summaryBackBtn.addEventListener("click", () => {
    goToPage("pageDateTime");
  });
}

if (submitDateBtn) {
  submitDateBtn.addEventListener("click", async () => {
    submitDateBtn.classList.add("btn-loading");
    submitError.classList.add("hidden");

    const payload = {
      email: AppState.email,
      dateIdea: AppState.dateIdea,
      coffeeType: AppState.coffeeType,
      foodPreference: AppState.food || null,
      selectedDate: AppState.date,
      selectedTime: AppState.time,
      notes: AppState.notes,
    };

    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || "Lỗi lưu dữ liệu. Vui lòng thử lại!");
      }

      // Success transition
      summarySection.classList.add("hidden");
      successSection.classList.remove("hidden");
      successEmail.textContent = AppState.email;
      successDateTime.textContent = `${formatDisplayDate(AppState.date)} lúc ${AppState.time}`;

      launchConfetti();
    } catch (err) {
      console.error("Submission failed:", err);
      submitError.textContent = `⚠️ ${err.message || "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại!"}`;
      submitError.classList.remove("hidden");
    } finally {
      submitDateBtn.classList.remove("btn-loading");
    }
  });
}

// ---------- Confetti Animation ----------
function launchConfetti() {
  const container = confettiOverlay;
  container.innerHTML = "";
  const colors = [
    "#ff6b9d",
    "#ffd700",
    "#8b5cf6",
    "#ff4d6d",
    "#fbbf24",
    "#34d399",
    "#f472b6",
    "#60a5fa",
  ];
  const emojis = ["❤️", "💕", "✨", "🎉", "🌸", "💖", "🥳", "🎊", "🥰", "🐱", "☕"];

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const isEmoji = Math.random() > 0.45;
    if (isEmoji) {
      piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      piece.style.fontSize = 0.8 + Math.random() * 1.3 + "rem";
      piece.style.width = "auto";
      piece.style.height = "auto";
      piece.style.background = "transparent";
    } else {
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = 6 + Math.random() * 10 + "px";
      piece.style.height = 6 + Math.random() * 10 + "px";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    }
    piece.style.left = Math.random() * 100 + "%";
    piece.style.top = "-20px";
    piece.style.animationDuration = 1.8 + Math.random() * 2.5 + "s";
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = "";
  }, 6000);
}

// ---------- Reset Everything ----------
function resetApp() {
  AppState.email = "";
  AppState.dateIdea = "";
  AppState.coffeeType = "";
  AppState.food = "";
  AppState.date = "";
  AppState.time = "";
  AppState.notes = "";
  AppState.calMonth = new Date().getMonth();
  AppState.calYear = new Date().getFullYear();

  if (emailInput) emailInput.value = "";
  if (notesInput) notesInput.value = "";
  ideaCards.forEach((c) => c.classList.remove("selected"));
  foodCards.forEach((f) => f.classList.remove("selected"));
  coffeeCards.forEach((c) => c.classList.remove("selected"));

  ideaNextBtn.disabled = true;
  foodNextBtn.disabled = true;
  coffeeNextBtn.disabled = true;
  dateTimeNextBtn.disabled = true;
  confettiOverlay.innerHTML = "";

  renderVenueSpotlight(foodPreviewContainer, null);
  renderVenueSpotlight(coffeePreviewContainer, null);

  summarySection.classList.remove("hidden");
  successSection.classList.add("hidden");

  goToPage("page1");
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetApp);
}

// Viewport height adjustment for mobile browsers
function adjustViewport() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
adjustViewport();
window.addEventListener("resize", adjustViewport);

// ---------- Final Initialization ----------
initFloatingHearts();
goToPage("page1");

console.log("💕 A Date With You - Separated Flows Ready ✨");
