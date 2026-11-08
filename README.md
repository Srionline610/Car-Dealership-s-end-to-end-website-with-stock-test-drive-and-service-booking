# Company A — Authorised Brand X Dealership Platform (Lucknow)
### End-to-End Web Platform with Vehicle Stock, Atomic Test-Drive, Workshop Capacity Booking & 5-Minute Lead SLA Watchdog

---

## 1. Executive Summary & Client Context

* **Client:** Company A, Lucknow  
* **Dealership Status:** Authorised Dealer for passenger-car brand **Brand X**  
* **Annual Turnover:** Approximately ₹550–650 Crore  
* **Annual Volume:** ~6,000 New Cars sold, ~900 Certified Used Cars sold  
* **Physical Footprint in Lucknow:**
  1. **Hazratganj Flagship Showroom:** 42/1 MG Marg, Hazratganj
  2. **Gomti Nagar Showroom:** Plot 12, Vibhuti Khand, Gomti Nagar
  3. **Kanpur Road Showroom:** Sector B, Bargawan, Kanpur Road
  4. **Transport Nagar Central Workshop:** Phase 1, Transport Nagar (8 Service Bays)
  5. **Chinhat East Workshop:** Deva Road Industrial Area, Chinhat (5 Service Bays)
  6. **Certified Pre-Owned Yard:** Faizabad Road

---

## 2. Business Impact & ₹2.11 Crore Revenue Recovery Model

| Problem in Current Operating Model | Financial & Operational Impact | Platform Engineering Solution |
| :--- | :--- | :--- |
| **Missed Online Leads (Section 3.1)** | 4,500 leads/mo; 30% (1,350) not called within 24h. Conversion drops from 6% to 2% (4% gap) = **54 lost car sales/mo**. At ₹25k margin, **₹13.5 Lakh/mo or ₹1.62 Crore lost annually**. | **5-Minute Lead SLA Watchdog:** Active countdown timers, automatic assignment to showroom consultants, supervisor escalation upon breach, and one-click AI response drafting. |
| **Unanswered Service Calls (Section 3.2)** | 3,000 service calls/mo; 20% (600) unanswered; 50% (300) migrate to independent garages. At ₹4,500 ticket @ 30% margin = **₹4.05 Lakh/mo or ₹48.6 Lakh lost annually**. | **Direct Workshop Capacity Booking:** Real-time bay occupancy evaluation across Transport Nagar (8 bays) & Chinhat (5 bays) with instant confirmation. |
| **WhatsApp Used-Car Spreadsheets** | Photos shared ad-hoc via WhatsApp; no searchable inventory or inspection transparency. | **Certified Pre-Owned Marketplace:** Searchable inventory, 140-point inspection certificates, masked privacy plates (`UP 32 ** 4821`), and warranty badges. |
| **Pricing Confusion & Disputes** | Lack of standardized Lucknow on-road price breakups leading to customer friction. | **Deterministic Pricing Engine:** Versioned admin tables with UP RTO taxes, comprehensive insurance, mandatory Fastag, and optional accessories. Zero AI hallucination. |
| **Combined Value Recovery** | **Estimated ₹2.106 Crore (~₹2.11 Cr) annual margin leakage recovery** | **Single Unified Platform.** |

---

## 3. The 4 Core Engineering Pillars

```
                                  +-----------------------------------------------+
                                  |     Public Digital Showroom (React / PWA)     |
                                  |  - New Car Showcase with Variant Switcher     |
                                  |  - Certified Used Cars with Masked Plates     |
                                  |  - Interactive EMI Calculator                 |
                                  |  - English & हिन्दी Language Toggle           |
                                  +-----------------------+-----------------------+
                                                          |
                 +----------------------------------------+----------------------------------------+
                 |                                        |                                        |
                 v                                        v                                        v
+----------------------------------+   +------------------------------------+   +----------------------------------+
|  Deterministic Pricing Engine    |   |    Atomic Booking Concurrency      |   |   5-Minute Lead SLA Watchdog     |
|  - Zero-AI dependency            |   |  - Mutex slot reservation          |   |  - Measures human first-contact  |
|  - UP RTO + Insurance + Fastag   |   |  - Demo fleet mapped to showrooms  |   |  - Live ticking timer            |
|  - Versioned validity dates      |   |  - Workshop bay capacity engine    |   |  - Supervisor escalation alert   |
|  - Graceful fallback on expiry   |   |  - 409 Conflict rejection on clash |   |  - Round-robin / specialty route |
+----------------------------------+   +------------------------------------+   +----------------------------------+
                                                          |
                                                          v
                                       +------------------------------------+
                                       | Assistive AI Co-Pilot (Guardrailed)|
                                       |  - Factual Buyer Summary           |
                                       |  - English & Hindi Reply Drafter   |
                                       |  - Comps-based Used Valuation Band |
                                       |  - Mandatory human review & edit   |
                                       +------------------------------------+
```

---

## 4. End-to-End Verification & Tested Results

### A. Atomic Concurrency Lock Test
Attempting to reserve the same demo vehicle (`DEMO-H-01`) at the same date and slot (`12:00 PM - 01:00 PM`):
* **Booking 1:** `HTTP 201 Created` &rarr; Slot successfully locked with Booking Reference `TDB-2886`.
* **Booking 2:** `HTTP 409 Conflict` &rarr; *"Slot was just reserved by another customer. Please select another slot."*

### B. 5-Minute Lead SLA Timer Test
* Lead `LEAD-113` generated for Sunil Verma with `createdAt` timestamp.
* Active countdown started: `291s remaining` (Status: `active`).
* Sales consultant triggered `/api/leads/LEAD-113/contact` with call outcome.
* Status switched to `Contacted`, SLA marked as `met`, verified response time `9s`.

### C. Assistive AI Bilingual Drafter Test
* Input: `{ customerName: "Alok Kumar", modelInterest: "Model H ZX Automatic", preferredLanguage: "Hindi" }`
* Output:
  > *"नमस्ते Alok Kumar, Company A (Brand X authorised dealership, Lucknow) से Rajesh Sharma बात कर रहा हूँ। आपकी Model H ZX Automatic में रुचि के लिए बहुत-बहुत धन्यवाद। हम आपके लिए हमारे हजरतगंज / गोमती नगर शोरूम में एक व्यक्तिगत टेस्ट-ड्राइव और लखनऊ ऑन-रोड प्राइस ब्रेकअप तैयार कर सकते हैं। क्या मैं आपसे आज 5 मिनट बात कर सकता हूँ आपकी सुविधानुसार? धन्यवाद!"*
* Guardrails: Strictly prohibits unauthorized discount guarantees or binding delivery dates.

---

## 5. Technology Stack

* **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide Icons
* **Backend:** Node.js, Express.js (REST API + Static Asset Serving)
* **Database & Concurrency:** In-memory operational store with relational models (`showrooms`, `workshops`, `models`, `variants`, `vehicle_stock`, `demo_vehicles`, `leads`, `bookings`, `pricing_tables`)
* **Privacy & Compliance:** Digital Personal Data Protection (DPDP) Act 2023 consent records, masked license plates (`UP 32 ** 4821`), and purpose limitation.

---

## 6. How to Run the Application

```bash
# 1. Clone or navigate to the project directory:
cd C:\Users\baluv\.gemini\antigravity\scratch\dealership_platform

# 2. Start the unified production server (serves frontend UI on port 5000):
npm start

# 3. Open in your browser:
http://localhost:5000/
```

### Development Mode (with Hot-Reloading)
```bash
# In terminal 1 (Backend API):
npm run dev:server

# In terminal 2 (Vite Client):
npm run dev:client
```
