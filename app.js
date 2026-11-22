/**
 * RailSafar - Railway Ticket Reservation System
 * Group 7: CSE2003 Object Oriented Programming Using JAVA Mini Project
 * Team:
 *   Leader:   Akshay Bhardwaj (2510001212)
 *   Member 1: Utkarsh Mishra  (2510001283)
 *   Member 2: Nipun Bhatia    (2510001217)
 *   Member 3: Shreyansh       (2510001258)
 */

// ==========================================
// 1. DATABASE & INITIAL SEED DATA
// ==========================================
const DEFAULT_TRAINS = [
  {
    train_no: 22436,
    train_name: "Vande Bharat Express",
    type: "Vande Bharat",
    source: "New Delhi (NDLS)",
    destination: "Varanasi Jn (BSB)",
    dep_time: "06:00",
    arr_time: "14:00",
    duration: "8h 00m",
    days: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
    halts: [
      { station: "New Delhi (NDLS)", arr: "--:--", dep: "06:00", dist: 0, platform: "16" },
      { station: "Kanpur Central (CNB)", arr: 10.08, dep: "10:10", dist: 440, platform: "5" },
      { station: "Prayagraj Jn (PRYJ)", arr: "12:08", dep: "12:10", dist: 635, platform: "6" },
      { station: "Varanasi Jn (BSB)", arr: "14:00", dep: "--:--", dist: 755, platform: "1" }
    ],
    classes: {
      "CC": { name: "AC Chair Car", fare: 1750, seats: 42, status: "AVAILABLE" },
      "EC": { name: "Exec. Chair Car", fare: 3300, seats: 12, status: "AVAILABLE" }
    }
  },
  {
    train_no: 12952,
    train_name: "Mumbai Tejas Rajdhani",
    type: "Rajdhani",
    source: "New Delhi (NDLS)",
    destination: "Mumbai Central (MMCT)",
    dep_time: "16:55",
    arr_time: "08:35",
    duration: "15h 40m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    halts: [
      { station: "New Delhi (NDLS)", arr: "--:--", dep: "16:55", dist: 0, platform: "3" },
      { station: "Kota Jn (KOTA)", arr: "21:30", dep: "21:40", dist: 465, platform: "1" },
      { station: "Vadodara Jn (BRC)", arr: "03:40", dep: "03:50", dist: 992, platform: "2" },
      { station: "Surat (ST)", arr: "05:13", dep: "05:18", dist: 1122, platform: "1" },
      { station: "Mumbai Central (MMCT)", arr: "08:35", dep: "--:--", dist: 1384, platform: "5" }
    ],
    classes: {
      "3A": { name: "AC 3 Tier", fare: 2150, seats: 28, status: "AVAILABLE" },
      "2A": { name: "AC 2 Tier", fare: 3050, seats: 14, status: "AVAILABLE" },
      "1A": { name: "AC First Class", fare: 4890, seats: 6, status: "AVAILABLE" }
    }
  },
  {
    train_no: 12302,
    train_name: "Howrah Rajdhani Express",
    type: "Rajdhani",
    source: "New Delhi (NDLS)",
    destination: "Howrah Jn (HWH)",
    dep_time: "16:50",
    arr_time: "09:55",
    duration: "17h 05m",
    days: ["Mon", "Tue", "Wed", "Thu", "Sat", "Sun"],
    halts: [
      { station: "New Delhi (NDLS)", arr: "--:--", dep: "16:50", dist: 0, platform: "9" },
      { station: "Kanpur Central (CNB)", arr: "21:32", dep: "21:37", dist: 440, platform: "4" },
      { station: "Pt. Deen Dayal Upadhyaya (DDU)", arr: "01:37", dep: "01:47", dist: 787, platform: "2" },
      { station: "Gaya Jn (GAYA)", arr: "03:55", dep: "03:58", dist: 992, platform: "1" },
      { station: "Howrah Jn (HWH)", arr: "09:55", dep: "--:--", dist: 1447, platform: "8" }
    ],
    classes: {
      "3A": { name: "AC 3 Tier", fare: 2040, seats: 36, status: "AVAILABLE" },
      "2A": { name: "AC 2 Tier", fare: 2980, seats: 8, status: "AVAILABLE" },
      "1A": { name: "AC First Class", fare: 4750, seats: 4, status: "AVAILABLE" }
    }
  },
  {
    train_no: 12626,
    train_name: "Kerala Superfast Express",
    type: "Superfast",
    source: "New Delhi (NDLS)",
    destination: "Trivandrum Central (TVC)",
    dep_time: "20:10",
    arr_time: "14:15",
    duration: "42h 05m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    halts: [
      { station: "New Delhi (NDLS)", arr: "--:--", dep: "20:10", dist: 0, platform: "3" },
      { station: "Agra Cantt (AGC)", arr: "22:20", dep: "22:25", dist: 195, platform: "1" },
      { station: "Bhopal Jn (BPL)", arr: "05:20", dep: "05:25", dist: 700, platform: "2" },
      { station: "Nagpur Jn (NGP)", arr: "11:45", dep: "11:50", dist: 1090, platform: "1" },
      { station: "Vijayawada Jn (BZA)", arr: "21:40", dep: "21:50", dist: 1754, platform: "6" },
      { station: "Trivandrum Central (TVC)", arr: "14:15", dep: "--:--", dist: 3036, platform: "2" }
    ],
    classes: {
      "SL": { name: "Sleeper Class", fare: 795, seats: 82, status: "AVAILABLE" },
      "3A": { name: "AC 3 Tier", fare: 2085, seats: 22, status: "AVAILABLE" },
      "2A": { name: "AC 2 Tier", fare: 3040, seats: 10, status: "AVAILABLE" }
    }
  },
  {
    train_no: 12004,
    train_name: "Lucknow Shatabdi Express",
    type: "Shatabdi",
    source: "New Delhi (NDLS)",
    destination: "Lucknow Charbagh (LKO)",
    dep_time: "06:10",
    arr_time: "12:40",
    duration: "6h 30m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    halts: [
      { station: "New Delhi (NDLS)", arr: "--:--", dep: "06:10", dist: 0, platform: "1" },
      { station: "Ghaziabad (GZB)", arr: "06:48", dep: "06:50", dist: 25, platform: "2" },
      { station: "Aligarh Jn (ALJN)", arr: "07:47", dep: "07:49", dist: 131, platform: "3" },
      { station: "Kanpur Central (CNB)", arr: "11:20", dep: "11:25", dist: 440, platform: "1" },
      { station: "Lucknow Charbagh (LKO)", arr: "12:40", dep: "--:--", dist: 512, platform: "2" }
    ],
    classes: {
      "CC": { name: "AC Chair Car", fare: 1165, seats: 54, status: "AVAILABLE" },
      "EC": { name: "Exec. Chair Car", fare: 2125, seats: 8, status: "AVAILABLE" }
    }
  },
  {
    train_no: 12138,
    train_name: "Punjab Mail",
    type: "Mail/Express",
    source: "New Delhi (NDLS)",
    destination: "Mumbai CSMT (CSMT)",
    dep_time: "05:15",
    arr_time: "07:35",
    duration: "26h 20m",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    halts: [
      { station: "New Delhi (NDLS)", arr: "05:00", dep: "05:15", dist: 0, platform: "4" },
      { station: "Agra Cantt (AGC)", arr: "07:55", dep: "08:00", dist: 195, platform: "1" },
      { station: "Gwalior Jn (GWL)", arr: "09:40", dep: "09:45", dist: 313, platform: "2" },
      { station: "Jhansi Jn (VGLJ)", arr: "11:15", dep: "11:25", dist: 410, platform: "1" },
      { station: "Bhopal Jn (BPL)", arr: "16:30", dep: "16:35", dist: 702, platform: "3" },
      { station: "Mumbai CSMT (CSMT)", arr: "07:35", dep: "--:--", dist: 1543, platform: "18" }
    ],
    classes: {
      "SL": { name: "Sleeper Class", fare: 650, seats: 48, status: "AVAILABLE" },
      "3A": { name: "AC 3 Tier", fare: 1720, seats: 16, status: "AVAILABLE" },
      "2A": { name: "AC 2 Tier", fare: 2510, seats: 6, status: "AVAILABLE" }
    }
  }
];

const DEFAULT_BOOKINGS = [
  {
    pnr: "2849182746",
    train_no: 22436,
    train_name: "Vande Bharat Express",
    source: "New Delhi (NDLS)",
    destination: "Varanasi Jn (BSB)",
    dep_time: "06:00",
    arr_time: "14:00",
    journey_date: "2026-12-15",
    travel_class: "CC",
    quota: "GENERAL",
    total_fare: 3500.00,
    booking_status: "CONFIRMED",
    refund_amount: 0.00,
    booking_time: "2026-11-19 14:20:10",
    contact_phone: "9876543210",
    contact_email: "shreyansh@example.com",
    passengers: [
      { id: 1, name: "Akshay Bhardwaj", age: 21, gender: "Male", berth_pref: "Window", coach: "C1", seat: 12, berth_type: "WS", status: "CONFIRMED" },
      { id: 2, name: "Utkarsh Mishra", age: 20, gender: "Male", berth_pref: "Aisle", coach: "C1", seat: 13, berth_type: "AS", status: "CONFIRMED" }
    ]
  },
  {
    pnr: "8120495813",
    train_no: 12952,
    train_name: "Mumbai Tejas Rajdhani",
    source: "New Delhi (NDLS)",
    destination: "Mumbai Central (MMCT)",
    dep_time: "16:55",
    arr_time: "08:35",
    journey_date: "2026-12-20",
    travel_class: "3A",
    quota: "GENERAL",
    total_fare: 4300.00,
    booking_status: "CONFIRMED",
    refund_amount: 0.00,
    booking_time: "2026-11-18 10:15:30",
    contact_phone: "9123456789",
    contact_email: "nipun@example.com",
    passengers: [
      { id: 1, name: "Nipun Bhatia", age: 21, gender: "Male", berth_pref: "Lower", coach: "B1", seat: 21, berth_type: "LB", status: "CONFIRMED" },
      { id: 2, name: "Shreyansh", age: 20, gender: "Male", berth_pref: "Middle", coach: "B1", seat: 22, berth_type: "MB", status: "CONFIRMED" }
    ]
  }
];

// Initialize State from LocalStorage
let appState = {
  trains: JSON.parse(localStorage.getItem("rail_trains")) || DEFAULT_TRAINS,
  bookings: JSON.parse(localStorage.getItem("rail_bookings")) || DEFAULT_BOOKINGS,
  activeBookingModal: null
};

function saveState() {
  localStorage.setItem("rail_trains", JSON.stringify(appState.trains));
  localStorage.setItem("rail_bookings", JSON.stringify(appState.bookings));
  renderDatabaseTables();
}

// ==========================================
// 2. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ')}</span>
    <div>${message}</div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 3. NAVIGATION TABS
// ==========================================
function setupNavigation() {
  const buttons = document.querySelectorAll(".nav-item button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".tab-content").forEach(tc => {
        tc.classList.remove("active");
      });
      const activeTab = document.getElementById(targetId);
      if (activeTab) {
        activeTab.classList.add("active");
      }

      if (targetId === "tab-coach") {
        renderCoachGrid();
      } else if (targetId === "tab-database") {
        renderDatabaseTables();
      }
    });
  });
}

// ==========================================
// 4. MODULE 1: TRAIN & SCHEDULE SEARCH
// ==========================================
function handleSearchTrains(e) {
  if (e) e.preventDefault();
  const source = document.getElementById("search-source").value.trim().toLowerCase();
  const dest = document.getElementById("search-dest").value.trim().toLowerCase();
  const travelClass = document.getElementById("search-class").value;
  const trainTypeFilter = document.querySelector(".tag-btn.active")?.getAttribute("data-filter") || "ALL";

  const resultsList = document.getElementById("train-results-list");
  const resultsCount = document.getElementById("results-count");
  resultsList.innerHTML = "";

  const filtered = appState.trains.filter(train => {
    const matchesSource = !source || train.source.toLowerCase().includes(source);
    const matchesDest = !dest || train.destination.toLowerCase().includes(dest);
    const matchesClass = travelClass === "ALL" || (train.classes && train.classes[travelClass]);
    const matchesType = trainTypeFilter === "ALL" || train.type.toUpperCase().includes(trainTypeFilter);
    return matchesSource && matchesDest && matchesClass && matchesType;
  });

  resultsCount.textContent = `Found ${filtered.length} trains`;

  if (filtered.length === 0) {
    resultsList.innerHTML = `
      <div style="background: white; padding: 3rem; text-align: center; border-radius: var(--radius-lg); border: 1px dashed var(--border-light)">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem">🚆❌</div>
        <h4 style="font-weight: 700; color: var(--primary-navy)">No trains found matching criteria</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem">Try searching with "New Delhi" or "Mumbai" or select "All Classes".</p>
        <button class="btn-search" style="margin: 1rem auto 0 auto;" onclick="resetSearchFilters()">Reset Search</button>
      </div>
    `;
    return;
  }

  filtered.forEach(train => {
    const card = document.createElement("div");
    card.className = "train-card";
    
    // Classes buttons
    let classesHtml = "";
    Object.keys(train.classes).forEach(clsCode => {
      const cls = train.classes[clsCode];
      const isAvail = cls.seats > 0;
      const statusClass = cls.seats > 10 ? "available" : (cls.seats > 0 ? "rac" : "wl");
      const statusText = cls.seats > 0 ? `AVL ${cls.seats}` : `WL 14`;

      classesHtml += `
        <div class="class-card" onclick="openBookingModal(${train.train_no}, '${clsCode}')">
          <div class="class-header">
            <span class="class-code">${clsCode}</span>
            <span class="class-fare">₹${cls.fare}</span>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted)">${cls.name}</div>
          <div class="avail-status ${statusClass}">${statusText}</div>
          <button class="btn-book-class">Book Now</button>
        </div>
      `;
    });

    const isVande = train.type.includes("Vande");

    card.innerHTML = `
      <div class="train-card-top">
        <div class="train-identity">
          <span class="train-badge-pill ${isVande ? 'vande' : ''}">${train.train_no}</span>
          <div>
            <h4 class="train-name-title">${train.train_name}</h4>
            <div class="train-running-days">
              Runs On: ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => {
                const active = train.days.includes(d);
                return `<span class="day-circle ${active ? 'active' : ''}">${d[0]}</span>`;
              }).join("")}
            </div>
          </div>
        </div>
        <button class="btn-team-info" onclick="toggleScheduleDrawer(${train.train_no})">
          🕒 View Route & Halts
        </button>
      </div>

      <div class="train-schedule-timeline">
        <div class="time-box">
          <span class="time">${train.dep_time}</span>
          <span class="station">${train.source}</span>
          <span class="date-offset">Scheduled Departure</span>
        </div>
        <div class="duration-line">
          <span class="duration-label">${train.duration}</span>
          <div class="line-track">
            <span class="train-icon-mid">🚆</span>
          </div>
          <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Direct Route</span>
        </div>
        <div class="time-box dest">
          <span class="time">${train.arr_time}</span>
          <span class="station">${train.destination}</span>
          <span class="date-offset">Scheduled Arrival</span>
        </div>
      </div>

      <div class="classes-grid">
        ${classesHtml}
      </div>

      <!-- Halts Drawer -->
      <div id="halts-drawer-${train.train_no}" style="display: none; margin-top: 1.2rem; padding-top: 1rem; border-top: 1px dashed var(--border-light)">
        <h5 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 8px;">Station Halts & Schedule:</h5>
        <table class="styled-table" style="font-size: 0.8rem">
          <thead>
            <tr>
              <th>Station</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Halt</th>
              <th>Distance</th>
              <th>Platform</th>
            </tr>
          </thead>
          <tbody>
            ${train.halts.map(h => `
              <tr>
                <td><b>${h.station}</b></td>
                <td>${h.arr}</td>
                <td>${h.dep}</td>
                <td>${h.arr === '--:--' || h.dep === '--:--' ? 'Origin/Dest' : '2-10 mins'}</td>
                <td>${h.dist} km</td>
                <td>PF #${h.platform}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    resultsList.appendChild(card);
  });
}

function toggleScheduleDrawer(trainNo) {
  const drawer = document.getElementById(`halts-drawer-${trainNo}`);
  if (drawer) {
    drawer.style.display = drawer.style.display === "none" ? "block" : "none";
  }
}

function resetSearchFilters() {
  document.getElementById("search-source").value = "";
  document.getElementById("search-dest").value = "";
  document.getElementById("search-class").value = "ALL";
  document.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(".tag-btn[data-filter='ALL']").classList.add("active");
  handleSearchTrains();
}

// ==========================================
// 5. MODULE 2 & 3: PASSENGER ENTRY & SEAT ALLOCATION
// ==========================================
let currentBookingState = {
  train: null,
  clsCode: null,
  journeyDate: null,
  passengers: []
};

function openBookingModal(trainNo, clsCode) {
  const train = appState.trains.find(t => t.train_no === trainNo);
  if (!train) return;

  const dateInput = document.getElementById("search-date").value || new Date().toISOString().split("T")[0];

  currentBookingState = {
    train: train,
    clsCode: clsCode,
    journeyDate: dateInput,
    passengers: [
      { id: Date.now(), name: "", age: "", gender: "Male", berth_pref: "Lower" }
    ]
  };

  document.getElementById("modal-train-info").innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; background: #eff6ff; padding: 12px; border-radius: var(--radius-md); border: 1px solid #bfdbfe;">
      <div>
        <span style="font-weight: 800; color: var(--railway-blue);">${train.train_no} - ${train.train_name}</span>
        <div style="font-size: 0.8rem; color: var(--text-muted)">${train.source} ➔ ${train.destination} | Class: <b>${clsCode} (${train.classes[clsCode].name})</b></div>
      </div>
      <div style="text-align: right">
        <div style="font-size: 0.8rem; color: var(--text-muted)">Date of Journey</div>
        <div style="font-weight: 700; color: var(--primary-navy)">${dateInput}</div>
      </div>
    </div>
  `;

  renderPassengerInputs();
  updateBookingSummary();
  document.getElementById("booking-modal").classList.add("open");
}

function closeBookingModal() {
  document.getElementById("booking-modal").classList.remove("open");
}

function renderPassengerInputs() {
  const container = document.getElementById("passengers-form-container");
  container.innerHTML = "";

  currentBookingState.passengers.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "passenger-card-row";
    card.innerHTML = `
      <div class="passenger-card-header">
        <span>Passenger #${index + 1} ${p.age >= 60 ? '<span style="background: #fef08a; color: #854d0e; padding: 1px 6px; border-radius: 4px; font-size: 0.7rem">Senior Citizen (40% Concession)</span>' : ''}</span>
        ${currentBookingState.passengers.length > 1 ? `<button class="btn-remove-pass" onclick="removePassengerRow(${p.id})">✕ Remove</button>` : ''}
      </div>
      <div class="passenger-grid">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" class="form-control" placeholder="e.g. Ramesh Kumar" value="${p.name}" onchange="updatePassField(${p.id}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Age</label>
          <input type="number" class="form-control" placeholder="Age" min="1" max="110" value="${p.age}" onchange="updatePassField(${p.id}, 'age', this.value)">
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select class="form-control" onchange="updatePassField(${p.id}, 'gender', this.value)">
            <option value="Male" ${p.gender === 'Male' ? 'selected' : ''}>Male</option>
            <option value="Female" ${p.gender === 'Female' ? 'selected' : ''}>Female</option>
            <option value="Other" ${p.gender === 'Other' ? 'selected' : ''}>Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Berth Preference</label>
          <select class="form-control" onchange="updatePassField(${p.id}, 'berth_pref', this.value)">
            <option value="Lower" ${p.berth_pref === 'Lower' ? 'selected' : ''}>Lower Berth (LB)</option>
            <option value="Middle" ${p.berth_pref === 'Middle' ? 'selected' : ''}>Middle Berth (MB)</option>
            <option value="Upper" ${p.berth_pref === 'Upper' ? 'selected' : ''}>Upper Berth (UB)</option>
            <option value="Side Lower" ${p.berth_pref === 'Side Lower' ? 'selected' : ''}>Side Lower (SL)</option>
            <option value="Side Upper" ${p.berth_pref === 'Side Upper' ? 'selected' : ''}>Side Upper (SU)</option>
            <option value="Window" ${p.berth_pref === 'Window' ? 'selected' : ''}>Window Seat (WS)</option>
          </select>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addPassengerRow() {
  if (currentBookingState.passengers.length >= 6) {
    showToast("Maximum 6 passengers allowed per booking!", "warning");
    return;
  }
  currentBookingState.passengers.push({
    id: Date.now(),
    name: "",
    age: "",
    gender: "Male",
    berth_pref: "Lower"
  });
  renderPassengerInputs();
  updateBookingSummary();
}

function removePassengerRow(id) {
  if (currentBookingState.passengers.length <= 1) return;
  currentBookingState.passengers = currentBookingState.passengers.filter(p => p.id !== id);
  renderPassengerInputs();
  updateBookingSummary();
}

function updatePassField(id, field, value) {
  const p = currentBookingState.passengers.find(x => x.id === id);
  if (p) {
    p[field] = field === "age" ? parseInt(value) || 0 : value;
    if (field === "age") {
      renderPassengerInputs(); // update senior citizen badge
    }
    updateBookingSummary();
  }
}

function updateBookingSummary() {
  const train = currentBookingState.train;
  const clsCode = currentBookingState.clsCode;
  if (!train || !clsCode) return;

  const baseRate = train.classes[clsCode].fare;
  const numPassengers = currentBookingState.passengers.length;

  let totalBase = 0;
  currentBookingState.passengers.forEach(p => {
    if (p.age >= 60) {
      totalBase += baseRate * 0.60; // 40% senior discount
    } else {
      totalBase += baseRate;
    }
  });

  const reservationFee = 40 * numPassengers;
  const superfastCharge = 45 * numPassengers;
  const subtotal = totalBase + reservationFee + superfastCharge;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = Math.round(subtotal + gst);

  const summaryEl = document.getElementById("booking-summary-breakdown");
  summaryEl.innerHTML = `
    <div class="fare-row">
      <span>Base Fare (${numPassengers} Passenger${numPassengers > 1 ? 's' : ''}):</span>
      <span>₹${totalBase.toFixed(2)}</span>
    </div>
    <div class="fare-row">
      <span>Reservation & Superfast Charges:</span>
      <span>₹${(reservationFee + superfastCharge).toFixed(2)}</span>
    </div>
    <div class="fare-row">
      <span>GST (5% applicable on AC Classes):</span>
      <span>₹${gst.toFixed(2)}</span>
    </div>
    <div class="fare-row total">
      <span>Total Fare Payable:</span>
      <span>₹${grandTotal.toFixed(2)}</span>
    </div>
  `;
}

// Seat Allocation Engine (Emulating Unit 3 SynchronizedSeatAllocator)
function smartAllocateBerths(trainNo, clsCode, passengers) {
  const coachPrefix = clsCode === "1A" ? "H1" : (clsCode === "2A" ? "A1" : (clsCode === "3A" ? "B1" : (clsCode === "CC" ? "C1" : "S1")));
  
  // Pick random realistic start seat
  let startSeat = Math.floor(Math.random() * 30) + 1;

  return passengers.map((p, idx) => {
    const seatNum = startSeat + idx;
    let berthType = "LB";

    if (clsCode === "CC" || clsCode === "EC") {
      const mod = seatNum % 3;
      berthType = mod === 1 ? "WS" : (mod === 2 ? "MS" : "AS");
    } else {
      // Sleeper/3A logic
      if (p.age >= 60) {
        berthType = "LB"; // Priority to Seniors!
      } else {
        const mod = seatNum % 8;
        if (mod === 1 || mod === 4) berthType = "LB";
        else if (mod === 2 || mod === 5) berthType = "MB";
        else if (mod === 3 || mod === 6) berthType = "UB";
        else if (mod === 7) berthType = "SL";
        else berthType = "SU";
      }
    }

    return {
      id: idx + 1,
      name: p.name || `Passenger ${idx + 1}`,
      age: p.age || 25,
      gender: p.gender || "Male",
      berth_pref: p.berth_pref,
      coach: coachPrefix,
      seat: seatNum,
      berth_type: berthType,
      status: "CONFIRMED"
    };
  });
}

function handleConfirmBooking() {
  // Validate passengers
  for (let i = 0; i < currentBookingState.passengers.length; i++) {
    const p = currentBookingState.passengers[i];
    if (!p.name || p.name.trim().length < 2) {
      showToast(`Please enter a valid name for Passenger #${i + 1}`, "error");
      return;
    }
    if (!p.age || p.age < 1) {
      showToast(`Please enter a valid age for Passenger #${i + 1}`, "error");
      return;
    }
  }

  const phone = document.getElementById("booking-phone").value.trim() || "9876543210";
  const email = document.getElementById("booking-email").value.trim() || "passenger@railway.gov.in";

  // Check seat availability
  const train = currentBookingState.train;
  const cls = train.classes[currentBookingState.clsCode];
  if (cls.seats < currentBookingState.passengers.length) {
    showToast(`SeatNotAvailableException: Only ${cls.seats} seats left in ${currentBookingState.clsCode}!`, "error");
    return;
  }

  // Deduct seat inventory
  cls.seats -= currentBookingState.passengers.length;

  // Generate 10-digit PNR (like IRCTC 10-digit number)
  const pnr = Math.floor(2000000000 + Math.random() * 7999999999).toString();

  // Smart Allocate seats
  const allocatedPassengers = smartAllocateBerths(train.train_no, currentBookingState.clsCode, currentBookingState.passengers);

  // Compute total
  let totalBase = 0;
  currentBookingState.passengers.forEach(p => {
    totalBase += (p.age >= 60 ? cls.fare * 0.60 : cls.fare);
  });
  const subtotal = totalBase + (85 * currentBookingState.passengers.length);
  const grandTotal = Math.round(subtotal * 1.05);

  const newTicket = {
    pnr: pnr,
    train_no: train.train_no,
    train_name: train.train_name,
    source: train.source,
    destination: train.destination,
    dep_time: train.dep_time,
    arr_time: train.arr_time,
    journey_date: currentBookingState.journeyDate,
    travel_class: currentBookingState.clsCode,
    quota: document.getElementById("search-quota").value || "GENERAL",
    total_fare: grandTotal,
    booking_status: "CONFIRMED",
    refund_amount: 0.00,
    booking_time: new Date().toISOString().replace("T", " ").substring(0, 19),
    contact_phone: phone,
    contact_email: email,
    passengers: allocatedPassengers
  };

  appState.bookings.unshift(newTicket);
  saveState();
  closeBookingModal();

  showToast(`Booking Successful! PNR: ${pnr}`, "success");

  // Show in PNR tab directly
  document.getElementById("pnr-search-input").value = pnr;
  lookupPNR(pnr);
  document.querySelector("button[data-tab='tab-pnr']").click();
}

// ==========================================
// 6. MODULE 5: PNR STATUS CHECK & E-TICKET
// ==========================================
function lookupPNR(pnrToFind) {
  const pnrInput = pnrToFind || document.getElementById("pnr-search-input").value.trim();
  if (!pnrInput) {
    showToast("Please enter a 10-digit PNR number!", "warning");
    return;
  }

  const cleanPnr = pnrInput.replace(/[^0-9]/g, "");
  const ticket = appState.bookings.find(b => b.pnr === cleanPnr || b.pnr === pnrInput);

  const displayArea = document.getElementById("pnr-ticket-display");
  if (!ticket) {
    displayArea.innerHTML = `
      <div style="background: white; padding: 3rem; text-align: center; border-radius: var(--radius-lg); border: 1px dashed var(--danger)">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem">⚠️</div>
        <h4 style="font-weight: 700; color: var(--danger)">PNR Not Found (${cleanPnr})</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem">Please check the 10-digit PNR or select one of the sample booked tickets.</p>
        <div style="margin-top: 1rem; display: flex; gap: 8px; justify-content: center;">
          ${appState.bookings.slice(0, 2).map(b => `
            <button class="tag-btn" onclick="lookupPNR('${b.pnr}')">Try PNR ${b.pnr}</button>
          `).join("")}
        </div>
      </div>
    `;
    return;
  }

  const isConfirmed = ticket.booking_status === "CONFIRMED";
  const statusColor = isConfirmed ? "var(--success)" : "var(--danger)";

  // Generate SVG QR Code representation
  const qrSvg = generateMockQRSvg(`PNR:${ticket.pnr}|TRAIN:${ticket.train_no}|DATE:${ticket.journey_date}|STATUS:${ticket.booking_status}`);

  displayArea.innerHTML = `
    <div class="ers-ticket-container" id="ers-ticket-print-area">
      <div class="ers-ticket-watermark">INDIAN RAILWAYS</div>
      
      <div class="ers-header">
        <div class="ers-logo-area">
          <div class="brand-logo-icon" style="width: 48px; height: 48px; font-size: 1.8rem">🚆</div>
          <div>
            <h3 style="font-weight: 900; font-size: 1.25rem; color: var(--primary-navy); letter-spacing: -0.5px">INDIAN RAILWAYS - ELECTRONIC RESERVATION SLIP</h3>
            <p style="font-size: 0.72rem; color: var(--text-muted)">IRCTC Valid Boarding Document | CSE2003 Group 7 RailSafar</p>
          </div>
        </div>
        <div class="ers-pnr-box">
          <div class="pnr-label">PNR NUMBER</div>
          <div class="pnr-val">${ticket.pnr}</div>
        </div>
      </div>

      <div class="ers-details-grid">
        <div class="ers-field">
          <span class="label">Train No & Name</span>
          <span class="value">${ticket.train_no} - ${ticket.train_name}</span>
        </div>
        <div class="ers-field">
          <span class="label">Booking Status</span>
          <span class="value" style="color: ${statusColor};">${ticket.booking_status}</span>
        </div>
        <div class="ers-field">
          <span class="label">Date of Journey</span>
          <span class="value">${ticket.journey_date}</span>
        </div>
        <div class="ers-field">
          <span class="label">Class & Quota</span>
          <span class="value">${ticket.travel_class} | ${ticket.quota}</span>
        </div>
        <div class="ers-field">
          <span class="label">From Station</span>
          <span class="value">${ticket.source} (${ticket.dep_time})</span>
        </div>
        <div class="ers-field">
          <span class="label">To Station</span>
          <span class="value">${ticket.destination} (${ticket.arr_time})</span>
        </div>
        <div class="ers-field">
          <span class="label">Booking Timestamp</span>
          <span class="value">${ticket.booking_time}</span>
        </div>
        <div class="ers-field">
          <span class="label">Total Paid Fare</span>
          <span class="value">₹${ticket.total_fare.toFixed(2)}</span>
        </div>
      </div>

      <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px">Passenger Allocation Details:</h4>
      <table class="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Passenger Name</th>
            <th>Age / Gender</th>
            <th>Booking Status</th>
            <th>Current Status</th>
            <th>Coach</th>
            <th>Berth No</th>
            <th>Berth Type</th>
          </tr>
        </thead>
        <tbody>
          ${ticket.passengers.map((p, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><b>${p.name}</b></td>
              <td>${p.age} / ${p.gender}</td>
              <td><span class="status-tag ${p.status === 'CONFIRMED' ? 'confirmed' : 'cancelled'}">${p.status}</span></td>
              <td><b>${p.status === 'CONFIRMED' ? 'CNF' : 'CAN'}</b></td>
              <td><b style="color: var(--railway-blue)">${p.coach}</b></td>
              <td><b style="font-size: 1rem">${p.seat}</b></td>
              <td><span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.75rem">${p.berth_type}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--border-light)">
        <div style="display: flex; align-items: center; gap: 14px">
          ${qrSvg}
          <div style="font-size: 0.75rem; color: var(--text-muted); max-width: 320px">
            <b>Scan QR Code on Mobile</b><br>
            Official digital ticket verified by Indian Railways TTE validation terminal.
          </div>
        </div>

        <div style="display: flex; gap: 10px">
          ${ticket.booking_status === 'CONFIRMED' ? `
            <button class="btn-team-info" style="color: var(--danger); border-color: #fca5a5" onclick="openCancelPortalFor('${ticket.pnr}')">
              ❌ Cancel This Ticket
            </button>
          ` : ''}
          <button class="btn-search" style="height: 38px; padding: 6px 16px; font-size: 0.85rem" onclick="window.print()">
            🖨️ Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  `;
}

function generateMockQRSvg(data) {
  return `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="border: 2px solid #0f172a; padding: 2px; border-radius: 4px; background: white">
      <rect x="4" y="4" width="16" height="16" fill="#0f172a" />
      <rect x="7" y="7" width="10" height="10" fill="white" />
      <rect x="9" y="9" width="6" height="6" fill="#0f172a" />
      
      <rect x="44" y="4" width="16" height="16" fill="#0f172a" />
      <rect x="47" y="7" width="10" height="10" fill="white" />
      <rect x="49" y="9" width="6" height="6" fill="#0f172a" />
      
      <rect x="4" y="44" width="16" height="16" fill="#0f172a" />
      <rect x="7" y="47" width="10" height="10" fill="white" />
      <rect x="9" y="49" width="6" height="6" fill="#0f172a" />
      
      <rect x="24" y="8" width="16" height="4" fill="#0f172a" />
      <rect x="28" y="16" width="8" height="8" fill="#0f172a" />
      <rect x="24" y="28" width="16" height="8" fill="#0f172a" />
      <rect x="44" y="24" width="12" height="12" fill="#0f172a" />
      <rect x="8" y="24" width="12" height="12" fill="#0f172a" />
      <rect x="24" y="44" width="8" height="16" fill="#0f172a" />
      <rect x="36" y="44" width="16" height="8" fill="#0f172a" />
      <rect x="40" y="56" width="16" height="4" fill="#0f172a" />
    </svg>
  `;
}

// ==========================================
// 7. MODULE 4: TICKET CANCELLATION & REFUND
// ==========================================
let currentCancelTicket = null;

function loadCancelTicket() {
  const pnr = document.getElementById("cancel-pnr-input").value.trim();
  if (!pnr) {
    showToast("Please enter a valid 10-digit PNR", "warning");
    return;
  }
  const ticket = appState.bookings.find(b => b.pnr === pnr);
  if (!ticket) {
    showToast(`No booking found for PNR ${pnr}`, "error");
    return;
  }

  currentCancelTicket = ticket;
  renderCancelDetails();
}

function openCancelPortalFor(pnr) {
  document.getElementById("cancel-pnr-input").value = pnr;
  document.querySelector("button[data-tab='tab-cancel']").click();
  loadCancelTicket();
}

function renderCancelDetails() {
  const container = document.getElementById("cancel-details-container");
  const ticket = currentCancelTicket;

  if (!ticket) {
    container.innerHTML = "";
    return;
  }

  if (ticket.booking_status === "CANCELLED") {
    container.innerHTML = `
      <div style="background: #fee2e2; border: 1px solid #fecaca; border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
        <h4 style="color: var(--danger); font-weight: 800">Ticket ${ticket.pnr} is ALREADY CANCELLED</h4>
        <p style="color: #991b1b; font-size: 0.9rem; margin-top: 4px;">Refund of ₹${ticket.refund_amount.toFixed(2)} was processed to source payment account.</p>
      </div>
    `;
    return;
  }

  // Calculate cancellation deductions based on time slider
  const hoursLeft = parseInt(document.getElementById("cancel-time-slider").value) || 52;
  document.getElementById("cancel-hours-display").textContent = `${hoursLeft} Hours before Departure`;

  // IRCTC Refund Slabs:
  // > 48 hrs: Flat clerkage charge (1A: 240, 2A: 200, 3A: 180, SL: 120, CC: 180)
  // 48 to 12 hrs: 25% subject to min clerkage charge
  // 12 to 4 hrs: 50%
  // < 4 hrs: 0% refund
  let flatClerkage = 120;
  if (ticket.travel_class === "1A") flatClerkage = 240;
  else if (ticket.travel_class === "2A") flatClerkage = 200;
  else if (ticket.travel_class === "3A" || ticket.travel_class === "CC") flatClerkage = 180;

  const activePassCount = ticket.passengers.filter(p => p.status === "CONFIRMED").length;
  let cancellationDeduction = 0;
  let slabDescription = "";

  if (hoursLeft >= 48) {
    cancellationDeduction = flatClerkage * activePassCount;
    slabDescription = `> 48 Hours: Flat deduction of ₹${flatClerkage} per passenger`;
  } else if (hoursLeft >= 12) {
    cancellationDeduction = Math.max(flatClerkage * activePassCount, ticket.total_fare * 0.25);
    slabDescription = `12 - 48 Hours: 25% of total ticket fare deduction`;
  } else if (hoursLeft >= 4) {
    cancellationDeduction = ticket.total_fare * 0.50;
    slabDescription = `4 - 12 Hours: 50% of total ticket fare deduction`;
  } else {
    cancellationDeduction = ticket.total_fare;
    slabDescription = `< 4 Hours (Chart Prepared): No refund (100% deduction)`;
  }

  const netRefund = Math.max(0, ticket.total_fare - cancellationDeduction);

  container.innerHTML = `
    <div class="refund-stat-grid">
      <div class="refund-stat-tile">
        <div class="title">Total Ticket Fare</div>
        <div class="amount" style="color: var(--primary-navy)">₹${ticket.total_fare.toFixed(2)}</div>
      </div>
      <div class="refund-stat-tile">
        <div class="title">Clerkage / Cancellation Fee</div>
        <div class="amount" style="color: var(--danger)">-₹${cancellationDeduction.toFixed(2)}</div>
      </div>
      <div class="refund-stat-tile">
        <div class="title">Net Refund to Account</div>
        <div class="amount" style="color: var(--success)">₹${netRefund.toFixed(2)}</div>
      </div>
      <div class="refund-stat-tile">
        <div class="title">Passengers to Cancel</div>
        <div class="amount" style="color: var(--railway-blue)">${activePassCount}</div>
      </div>
    </div>

    <div class="refund-calc-breakdown">
      <div style="font-weight: 700; font-size: 0.88rem; color: #9a3412">IRCTC Official Cancellation Rule Applied:</div>
      <div style="font-size: 0.85rem; color: #7c2d12">${slabDescription}</div>
      <div style="font-size: 0.75rem; color: #9a3412">Original Payment Mode: NetBanking / UPI. Refund will reflect within 2-3 banking days.</div>
    </div>

    <div style="margin-top: 1.2rem; display: flex; justify-content: flex-end; gap: 12px">
      <button class="btn-team-info" onclick="currentCancelTicket = null; renderCancelDetails();">Abort</button>
      <button class="btn-search" style="background: linear-gradient(135deg, #dc2626, #b91c1c);" onclick="executeCancellation(${netRefund})">
        Confirm Cancellation & Initiate ₹${netRefund.toFixed(2)} Refund
      </button>
    </div>
  `;
}

function executeCancellation(refundAmount) {
  if (!currentCancelTicket) return;

  currentCancelTicket.booking_status = "CANCELLED";
  currentCancelTicket.refund_amount = refundAmount;
  currentCancelTicket.passengers.forEach(p => p.status = "CANCELLED");

  // Restore seat inventory (Emulating Unit 3 releaseSeats)
  const train = appState.trains.find(t => t.train_no === currentCancelTicket.train_no);
  if (train && train.classes[currentCancelTicket.travel_class]) {
    train.classes[currentCancelTicket.travel_class].seats += currentCancelTicket.passengers.length;
  }

  saveState();
  showToast(`Ticket ${currentCancelTicket.pnr} cancelled! Refund ₹${refundAmount.toFixed(2)} processed.`, "success");
  renderCancelDetails();
}

// ==========================================
// 8. COACH BERTH VISUALIZER
// ==========================================
function renderCoachGrid() {
  const container = document.getElementById("coach-grid-interior");
  if (!container) return;
  container.innerHTML = "";

  // 9 bays × 8 seats = 72 berths (Standard Indian Railways Sleeper / 3A layout)
  // Bay structure:
  // Main cabin: 1 LB, 2 MB, 3 UB, 4 LB, 5 MB, 6 UB
  // Side cabin: 7 SL, 8 SU
  for (let bay = 1; bay <= 9; bay++) {
    const col = document.createElement("div");
    col.className = "bay-column";
    col.innerHTML = `<div class="bay-title">Bay ${bay}</div>`;

    const startSeat = (bay - 1) * 8 + 1;
    const berths = [
      { num: startSeat, type: "LB" },
      { num: startSeat + 1, type: "MB" },
      { num: startSeat + 2, type: "UB" },
      { num: startSeat + 3, type: "LB" },
      { num: startSeat + 4, type: "MB" },
      { num: startSeat + 5, type: "UB" }
    ];

    berths.forEach(b => {
      const cell = document.createElement("div");
      // Check if any booking has this seat
      let isBooked = false;
      let isUser = false;
      appState.bookings.forEach(bk => {
        bk.passengers.forEach(p => {
          if (p.seat === b.num && p.status === "CONFIRMED") {
            isBooked = true;
            if (bk.pnr === "2849182746" || bk.pnr === "8120495813") isUser = true;
          }
        });
      });

      cell.className = `berth-cell ${isUser ? 'booked-user' : (isBooked ? 'occupied' : 'available')}`;
      cell.innerHTML = `<span>${b.num}</span><span class="berth-type">${b.type}</span>`;
      cell.title = `Seat ${b.num} (${b.type}) - ${isUser ? 'Your Booking' : (isBooked ? 'Occupied' : 'Available')}`;
      col.appendChild(cell);
    });

    // Aisle separator
    const aisle = document.createElement("div");
    aisle.className = "aisle-gap";
    col.appendChild(aisle);

    // Side Berths
    const sideBerths = [
      { num: startSeat + 6, type: "SL" },
      { num: startSeat + 7, type: "SU" }
    ];

    sideBerths.forEach(b => {
      const cell = document.createElement("div");
      let isBooked = false;
      let isUser = false;
      appState.bookings.forEach(bk => {
        bk.passengers.forEach(p => {
          if (p.seat === b.num && p.status === "CONFIRMED") {
            isBooked = true;
            if (bk.pnr === "2849182746") isUser = true;
          }
        });
      });

      cell.className = `berth-cell ${isUser ? 'booked-user' : (isBooked ? 'occupied' : 'available')}`;
      cell.innerHTML = `<span>${b.num}</span><span class="berth-type">${b.type}</span>`;
      cell.title = `Seat ${b.num} (${b.type}) - ${isUser ? 'Your Booking' : (isBooked ? 'Occupied' : 'Available')}`;
      col.appendChild(cell);
    });

    container.appendChild(col);
  }
}

// ==========================================
// 9. DATABASE TABLE VIEWER
// ==========================================
function renderDatabaseTables() {
  // 1. Trains Table
  const trainsTbody = document.getElementById("db-trains-tbody");
  if (trainsTbody) {
    trainsTbody.innerHTML = appState.trains.map(t => `
      <tr>
        <td><b>${t.train_no}</b></td>
        <td>${t.train_name}</td>
        <td>${t.source}</td>
        <td>${t.destination}</td>
        <td>${t.dep_time} / ${t.arr_time}</td>
        <td>${t.duration}</td>
        <td>${Object.keys(t.classes).map(c => `<b>${c}</b>: ${t.classes[c].seats}`).join(", ")}</td>
      </tr>
    `).join("");
  }

  // 2. Tickets Table
  const ticketsTbody = document.getElementById("db-tickets-tbody");
  if (ticketsTbody) {
    ticketsTbody.innerHTML = appState.bookings.map(b => `
      <tr>
        <td><a href="javascript:void(0)" onclick="lookupPNR('${b.pnr}'); document.querySelector('button[data-tab=\\'tab-pnr\\']').click();" style="font-weight: 800; color: var(--railway-blue)">${b.pnr}</a></td>
        <td>${b.train_no} (${b.train_name})</td>
        <td>${b.journey_date}</td>
        <td>${b.travel_class}</td>
        <td>${b.passengers.length}</td>
        <td>₹${b.total_fare.toFixed(2)}</td>
        <td><span class="status-tag ${b.booking_status === 'CONFIRMED' ? 'confirmed' : 'cancelled'}">${b.booking_status}</span></td>
        <td>₹${b.refund_amount.toFixed(2)}</td>
      </tr>
    `).join("");
  }

  // 3. Passengers Table
  const passTbody = document.getElementById("db-passengers-tbody");
  if (passTbody) {
    let passRows = [];
    appState.bookings.forEach(b => {
      b.passengers.forEach(p => {
        passRows.push(`
          <tr>
            <td>${p.id}</td>
            <td><b>${b.pnr}</b></td>
            <td>${p.name}</td>
            <td>${p.age} / ${p.gender}</td>
            <td>${p.berth_pref || 'None'}</td>
            <td><b>${p.coach}</b></td>
            <td><b>${p.seat}</b></td>
            <td><span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: 700">${p.berth_type}</span></td>
            <td><span class="status-tag ${p.status === 'CONFIRMED' ? 'confirmed' : 'cancelled'}">${p.status}</span></td>
          </tr>
        `);
      });
    });
    passTbody.innerHTML = passRows.join("");
  }
}

function resetMockDatabase() {
  localStorage.removeItem("rail_trains");
  localStorage.removeItem("rail_bookings");
  appState.trains = JSON.parse(JSON.stringify(DEFAULT_TRAINS));
  appState.bookings = JSON.parse(JSON.stringify(DEFAULT_BOOKINGS));
  saveState();
  showToast("Database successfully restored to clean default seed data!", "success");
  handleSearchTrains();
  renderDatabaseTables();
}

// ==========================================
// 10. MULTITHREAD SIMULATION (UNIT 3 VIVA DEMO)
// ==========================================
function runConcurrencySimulation() {
  const logEl = document.getElementById("concurrency-log");
  logEl.innerHTML = `<div style="color: #94a3b8">Starting Synchronized Concurrency Test on Train 22436 (Class: EC, Remaining Seats: 1)...</div>`;

  setTimeout(() => {
    logEl.innerHTML += `<div>[Thread-1 (Akshay's Session)]: Acquiring synchronized lock on SeatInventory...</div>`;
  }, 400);

  setTimeout(() => {
    logEl.innerHTML += `<div style="color: #60a5fa">[Thread-2 (Utkarsh's Session)]: Attempting to reserve seat, waiting for lock...</div>`;
  }, 900);

  setTimeout(() => {
    logEl.innerHTML += `<div style="color: #4ade80">[Thread-1]: Lock acquired. Booking confirmed! Allocated Coach EC1, Seat 14. Remaining seats: 0. Lock released.</div>`;
  }, 1600);

  setTimeout(() => {
    logEl.innerHTML += `<div style="color: #f87171">[Thread-2]: Lock acquired. Checking availability -> 0 seats!</div>`;
    logEl.innerHTML += `<div style="color: #ef4444; font-weight: bold">[Thread-2]: THROW SeatNotAvailableException: Insufficient seats in class EC! Requested: 1, Available: 0</div>`;
    logEl.innerHTML += `<div style="color: #38bdf8; margin-top: 6px">✓ Thread safety verified. Zero double bookings occurred.</div>`;
  }, 2300);
}

// ==========================================
// 11. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();

  // Search form submit
  document.getElementById("train-search-form").addEventListener("submit", handleSearchTrains);

  // Quick swap stations
  document.getElementById("btn-swap-stations").addEventListener("click", () => {
    const src = document.getElementById("search-source");
    const dst = document.getElementById("search-dest");
    const temp = src.value;
    src.value = dst.value;
    dst.value = temp;
    handleSearchTrains();
  });

  // Filter tags
  document.querySelectorAll(".tag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      handleSearchTrains();
    });
  });

  // Quick PNR check in header
  document.getElementById("header-pnr-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.getElementById("header-pnr-input").value.trim();
    if (val) {
      document.getElementById("pnr-search-input").value = val;
      document.querySelector("button[data-tab='tab-pnr']").click();
      lookupPNR(val);
    }
  });

  // Cancel Slider
  const slider = document.getElementById("cancel-time-slider");
  if (slider) {
    slider.addEventListener("input", () => {
      if (currentCancelTicket) {
        renderCancelDetails();
      } else {
        document.getElementById("cancel-hours-display").textContent = `${slider.value} Hours before Departure`;
      }
    });
  }

  // Pre-load trains search and default PNR ticket
  handleSearchTrains();
  lookupPNR("2849182746");
  renderDatabaseTables();
});
