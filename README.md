# RailSafar - Railway Ticket Reservation System
### CSE2003 | Object Oriented Programming using JAVA | B.Tech CSE Semester 3 | Mini Project

---

## 👥 Group 7 Team Members
| Role | Name | UID |
| :--- | :--- | :--- |
| **Leader** | **Akshay Bhardwaj** | `2510001212` |
| **Member 1** | **Utkarsh Mishra** | `2510001283` |
| **Member 2** | **Nipun Bhatia** | `2510001217` |
| **Member 3** | **Shreyansh** | `2510001258` |

---

## 📌 Project Overview
**RailSafar** is a modern, full-featured Railway Ticket Reservation application designed to search trains, book tickets with smart berth allocation, check PNR status with digital boarding passes, and process ticket cancellations with official IRCTC refund calculations.

In addition to a responsive web portal, the repository contains the complete Java OOP backend meeting all syllabus requirements of **CSE2003 (Units 1 to 5)**.

---

## 🚀 Key Modules Implemented

### 1. Train and Schedule Search
- Search by origin station, destination station, journey date, travel class, and quota.
- Pre-loaded with popular trains: **Vande Bharat Express (22436)**, **Mumbai Tejas Rajdhani (12952)**, **Howrah Rajdhani (12302)**, **Kerala Superfast (12626)**, **Lucknow Shatabdi (12004)**, and **Punjab Mail (12138)**.
- Filter by train category (Vande Bharat, Rajdhani, Shatabdi, Superfast).
- Expandable **Train Route & Schedule** view displaying all intermediate halts, arrival/departure timings, distances, and platforms.

### 2. Passenger Details Entry
- Dynamic passenger form supporting up to 6 passengers per booking.
- Captures Full Name, Age, Gender, and Berth Preference (*Lower, Middle, Upper, Side Lower, Side Upper, Window Seat*).
- **Senior Citizen Concession (40%)**: Automatically detected when passenger age $\ge 60$.
- Comprehensive Fare Summary breakdown with Base Fare, Reservation Fee, Superfast Charge, and 5% GST.

### 3. Seat / Berth Allocation
- **Smart Berth Allocation Engine**:
  - Emulates thread-safe allocation in `SynchronizedSeatAllocator.java`.
  - Prioritizes Lower Berths (LB) for Senior Citizens.
  - Groups passengers in adjacent berths within the same coach/cabin.
- **Interactive 2D Coach Berth Visualizer**:
  - Displays a 72-berth Indian Railways LHB coach (*Bay 1 to Bay 9*).
  - Highlights available berths (green), occupied berths (gray), and the user's confirmed seats (orange/gold).

### 4. Ticket Cancellation and Refund Calculation
- Lookup ticket by 10-digit PNR.
- Departure timeline slider simulating time remaining before chart preparation (1 hour to 72 hours).
- **Official IRCTC Cancellation Slabs**:
  - **$> 48\text{ hours}$**: Flat clerkage deduction (₹240 for 1A, ₹200 for 2A, ₹180 for 3A/CC, ₹120 for Sleeper).
  - **$12\text{ to }48\text{ hours}$**: 25% of total ticket fare deduction (subject to minimum clerkage).
  - **$4\text{ to }12\text{ hours}$**: 50% of total ticket fare deduction.
  - **$< 4\text{ hours}$ / Chart Prepared**: No refund (100% deduction).
- Instant seat inventory restoration upon cancellation.

### 5. PNR Status Check & Digital Boarding Pass
- Real-time 10-digit PNR tracker.
- Official **Electronic Reservation Slip (ERS)** format featuring passenger status (*CNF / Coach / Berth / Type*).
- Dynamic SVG QR Code for verification by TTE scanners.
- Native Print / Save as PDF capability.

---

## 📚 CSE2003 Syllabus Concepts Applied

| Unit | Syllabus Concept | Implementation in Group 7 Codebase | File Location |
| :--- | :--- | :--- | :--- |
| **Unit 1** | Classes `Train`, `Passenger`, `Ticket`; method overloading; arrays | Model classes with overloaded constructors, overloaded `matches()` search methods, and passenger array manipulation. | `java-backend/src/railway/model/Train.java`<br>`java-backend/src/railway/model/Passenger.java`<br>`java-backend/src/railway/booking/Ticket.java` |
| **Unit 2** | Interface `Reservable`; `Ticket` class hierarchy by class type; method overriding; package `railway.booking` | Interface `Reservable` with contract methods; polymorphic inheritance through `ACTicket` and `SleeperTicket` overriding `calculateFare()` and `calculateRefund()`. | `java-backend/src/railway/booking/Reservable.java`<br>`java-backend/src/railway/booking/ACTicket.java`<br>`java-backend/src/railway/booking/SleeperTicket.java` |
| **Unit 3** | `SeatNotAvailableException`; synchronized seat allocation across threads | Custom checked exception thrown when requested seats exceed capacity; `synchronized` seat reservation methods preventing race conditions during concurrent bookings. Includes live web simulation demo! | `java-backend/src/railway/exception/SeatNotAvailableException.java`<br>`java-backend/src/railway/booking/SynchronizedSeatAllocator.java` |
| **Unit 4** | JDBC with `PreparedStatement` for PNR queries | `BookingDAO.java` executing parameterized SQL queries for PNR tracking, booking transactions (`setAutoCommit(false)`), and ticket cancellation. | `java-backend/src/railway/dao/BookingDAO.java`<br>`database/schema.sql` |
| **Unit 5** | Swing form using `BorderLayout` and `FlowLayout`; `JButton` events and adapter class | Desktop GUI with `BorderLayout` (North banner, Center PNR output, South actions) and `FlowLayout`; handles events via `ActionListener`, `WindowAdapter`, and `KeyAdapter`. | `java-backend/src/railway/gui/RailwayReservationGUI.java` |

---

## 🗄️ Relational Database Tables

The SQL schema (`database/schema.sql`) includes:
1. `trains`: Train schedule, operating days, and class-wise seat capacity.
2. `tickets`: PNR, journey date, travel class, total passengers, total fare, booking status, and refund amounts.
3. `passengers`: Passenger profile, berth preference, allocated coach, seat number, berth type, and status.

---

## 🛠️ How to Run in VS Code (No Server Needed)

### 1. Open the Project in VS Code
- Open **VS Code**.
- Click **File** ➔ **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
- Select the project directory:
  ```
  C:\Users\shrey\.gemini\antigravity\scratch\railway-reservation-system
  ```

---

### 2. Run the Web App in VS Code (Zero Server Required)

Choose any of the following 4 methods:

#### Method A: Press `F5` (Pre-configured VS Code Run)
1. Open [index.html](file:///C:/Users/shrey/.gemini/antigravity/scratch/railway-reservation-system/index.html) in VS Code.
2. Press **`F5`** (or go to **Run & Debug** tab and click the green Play button).
3. The app opens immediately in your browser. **No server running required!**

#### Method B: Built-in VS Code Simple Browser (Runs inside VS Code)
1. In VS Code, press `Ctrl + Shift + P`.
2. Type: `Simple Browser: Show`.
3. Paste:
   ```
   file:///C:/Users/shrey/.gemini/antigravity/scratch/railway-reservation-system/index.html
   ```
4. The web app will render directly inside an editor tab in VS Code.

#### Method C: Right-Click in Explorer
1. In the VS Code left sidebar file explorer, right-click `index.html`.
2. Click **"Reveal in File Explorer"** (or **"Open with Default Application"**).
3. Double-click `index.html`.

#### Method D: Live Server Extension (Optional)
- If you use the VS Code **Live Server** extension: right-click `index.html` ➔ **"Open with Live Server"**.

---

### 3. Run the Java Swing GUI (CSE2003 Unit 5) in VS Code
- In VS Code, open:
  [RailwayReservationGUI.java](file:///C:/Users/shrey/.gemini/antigravity/scratch/railway-reservation-system/java-backend/src/railway/gui/RailwayReservationGUI.java)
- Click the **▶ Run** button at the top-right corner of the editor, or select **Run Java Swing GUI** from the Run & Debug menu.
- The desktop Swing GUI will launch with the BorderLayout and FlowLayout controls.
