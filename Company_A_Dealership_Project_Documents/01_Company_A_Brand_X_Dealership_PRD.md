# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Centralised Omnichannel Dealership Platform & Lead Velocity Engine
**Client:** Company A Automotive Pvt. Ltd. (Authorised Dealer for Brand X, Lucknow, UP)
**Document Ref:** PRD-COMA-2026-V1.0 | **Effective Date:** November 2026 | **Version:** 1.0 (Approved)

---

# 1. Executive Summary & Strategic Business Case

**Business Background:** Company A Automotive Pvt. Ltd. is the premier authorised passenger-car dealership for Brand X across Lucknow, Uttar Pradesh. The dealership currently operates an extensive network consisting of three new-vehicle sales showrooms, two dedicated service workshops, and a certified pre-owned car yard. While the dealership attracts strong consumer brand equity, its digital infrastructure historically consisted of an unintegrated brochure website and disconnected offline workflows (manual Excel spreadsheets, unassigned portal leads, WhatsApp media sharing, and phone-based service logs).

**The Solution:** This fragmentation results in substantial revenue leakage across both new vehicle sales and after-sales service operations. This Product Requirements Document (PRD) defines the complete functional and technical specifications for a centralised, omnichannel dealership web application and internal operations hub designed to systematically capture, route, and convert digital demand.

> [!WARNING]
> **Quantified Commercial Problem & Recovery Opportunity**
>
> Based on operational dealership data and client brief baseline metrics:
> 
> 1. **New Car Lead Leakage:** 4,500 digital leads/mo received across web and portals. 30% (1,350 leads) are missed or uncontacted within 24 hours. Delayed response drops conversion from 6% to 2% (a 4% conversion penalty = 54 lost car sales/mo). At an average dealer margin of ₹25,000 per car, monthly lost sales margin equals ₹13,50,000, representing an annual revenue loss of **₹1.62 Crore**.
> 
> 2. **Service Booking Leakage:** 3,000 service calls/mo received. 20% (600 calls) go unanswered during peak workshop rush hours. 50% of unanswered owners (300 customers) defect to third-party garages. At an average ticket size of ₹4,500 and a 30% contribution margin, monthly lost margin is ₹4,05,000, representing an annual loss of **₹48.60 Lakh**.
> 
> 3. **Total Annual Recoverable Margin:** **₹2,10,60,000 (~₹2.11 Crore per annum)**.

# 2. Dealership Network Topology & Physical Footprint

The platform natively models Company A's multi-facility operational footprint across the Lucknow metropolitan territory:

| Facility Name | Facility Type | Location / Address | Capacity & Resources | Primary Digital Role |
| --- | --- | --- | --- | --- |
| Hazratganj Flagship | New Car Showroom | MG Marg, Hazratganj, Lucknow | 10 Sales Execs (DSE), 4 Demo Cars | Central flagship, VIP test-drives, primary lead routing |
| Gomti Nagar Showroom | New Car Showroom | Vipin Khand, Gomti Nagar, Lucknow | 6 Sales Execs (DSE), 2 Demo Cars | High-growth residential customer walk-ins & home test-drives |
| Kanpur Road Showroom | New Car Showroom | Sector B, Kanpur Road, Lucknow | 6 Sales Execs (DSE), 2 Demo Cars | Commercial and south Lucknow suburban catchment |
| Transport Nagar Central | Service Workshop | Phase 1, Transport Nagar, Lucknow | 8 Mechanical Bays, 10 Service Advisors | Major mechanical overhauls, periodic maintenance, paint booth |
| Chinhat East Workshop | Service Workshop | Ayodhya Highway, Chinhat, Lucknow | 5 Mechanical Bays, 5 Service Advisors | Express service, periodic maintenance, east quadrant coverage |
| Faizabad Road Yard | Certified Pre-Owned Yard | Faizabad Road, Lucknow | 80-Vehicle Staging, 3 Valuators | Exchange evaluation, 150-point refurbishment, pre-owned delivery |


# 3. User Personas & Role-Based Access Control (RBAC)

Strict role isolation ensures data confidentiality, DPDP Act compliance, and clear operational accountability:

| User Role | Target Persona | Public / Internal | Permitted System Actions | Data Visibility Restrictions |
| --- | --- | --- | --- | --- |
| Car Buyer / Owner | Prospective vehicle buyer or current Brand X owner | Public (Guest/Auth) | Browse catalogue, calculate on-road price & EMI, book test-drives, request service, submit trade-in | Own personal booking records and contact data only |
| Digital Sales Exec (DSE) | Showroom floor sales consultant | Internal (Auth) | View assigned leads, claim pooled leads, log call attempts, record test-drive completion, request quotation | Assigned leads only; strictly no visibility into peer leads or global pricing formulas |
| Sales / Branch Manager | Showroom General Manager / Team Lead | Internal (Auth) | Lead reassignment, DSE SLA monitoring, demo fleet schedule override, review AI-drafted communications | Full showroom-level visibility; cannot alter master RTO tax or pricing configurations |
| Service Advisor / Controller | Workshop receptionist and bay scheduler | Internal (Auth) | View workshop bay calendar, confirm appointment slots, assign technician bays, mark job card open/close | Workshop-specific service appointments and vehicle service histories only |
| Used-Car Valuation Manager | Certified Pre-Owned yard manager | Internal (Auth) | Review trade-in requests, view algorithmic price suggestions, enter physical inspection adjustments, approve quotes | Faizabad Road yard inventory, trade-in pipeline, valuation comp data |
| Central System Administrator | Dealership IT / Operations Director | Internal (Admin) | Manage user accounts & roles, configure UP RTO tax tables, update vehicle master data, export DMS CSV, view audit logs | Unrestricted enterprise-wide platform configuration and audit logs |


# 4. Scope Boundaries & Explicit Exclusions

- **Phase 1 Core (In-Scope Must-Haves):** Interactive new vehicle digital catalogue with variant comparison; Lucknow dynamic on-road price calculator; Atomic test-drive slot reservation with demo vehicle mutex locking; 5-minute SLA lead watchdog with red-alert countdown; Workshop bay capacity manager for Transport Nagar and Chinhat; Certified used-car inventory showcase; AI-assisted buyer summarisation and reply drafting with human review.
- **Phase 2 Enhancements (Planned Fast-Follow):** Automated WhatsApp Business Cloud API notifications (in place of mock SMS); Automated trade-in valuation comp crawler; Multi-showroom stock transfer workflow; Customer self-service rescheduling portal.
- **Explicit Client Exclusions:** 1. Direct Live DMS Integration (excluded per OEM protocol; replaced by structured daily CSV export/import). 2. Online Payment Gateway for vehicle booking advances (regulatory escrow and refund compliance deferred). 3. Spare-Parts E-Commerce (requires warehouse ERP live synchronisation). 4. Unattended Autonomous AI Customer Commitments (strict human-in-the-loop requirement enforced).

# 5. Detailed Functional Specifications

## 5.1 Module 1: Vehicle Discovery & Digital Showroom

Provides a premium, brand-compliant digital showroom experience for Brand X's vehicle portfolio. Each model page features high-resolution WebP exterior/interior photography, interactive colour swatches, technical specification breakdowns (engine displacement, transmission, fuel efficiency, safety ratings), and side-by-side variant comparisons.

- **Performance:** High-fidelity mobile-first responsive rendering with sub-2.0s initial visual paint.
- **Filtering:** Dynamic variant filtering by fuel type (Petrol, Diesel, Hybrid, EV), transmission (Manual, Auto, DCT), and budget bracket.
- **CTAs:** Direct call-to-actions on every variant card: 'Get On-Road Price', 'Book Test Drive', 'Download Brochure (PDF)'.

## 5.2 Module 2: Lucknow RTO & UP State On-Road Pricing Engine

Features a deterministic, admin-configurable pricing engine reflecting exact Lucknow (UP-32) RTO taxation rules rather than inaccurate generic national calculators.

| Price Component | Calculation Methodology (UP / Lucknow) | Configuration Type | Editable by Admin? |
| --- | --- | --- | --- |
| Ex-Showroom Price | Base vehicle price as notified by Brand X OEM | Master Table | Yes (CSV or UI) |
| UP Road Tax (RTO) | Slab-based: Petrol <10L (8%), Petrol >10L (10%), Diesel (10-12%), EV (0% rebate per UP EV Policy) | Deterministic Rule Engine | Yes (Tax Admin) |
| Registration & Municipal Fee | Fixed Lucknow RTO smart card, postal fee, and municipal charges (₹1,500 - ₹2,500) | Fixed Charge | Yes |
| TCS (Tax Collected at Source) | 1.00% on Ex-Showroom value exceeding ₹10,00,000 (Sec 206C(1F) Income Tax Act) | Statutory Rule | Yes (System locked) |
| Comprehensive Insurance | 1 Year Comprehensive Own Damage + 3 Years Mandatory Third Party Cover | Tiered Matrix | Yes |
| Zero-Depreciation Add-on | Optional toggle for bumper-to-bumper consumable cover & engine protector | Add-on Toggle | Yes |
| FASTag & High Security Plate | Mandatory NHAI FASTag issuance and UP HSRP installation (₹600) | Statutory Fixed | No |
| Dealer Handling / Logistics | Transparently itemised transit and pre-delivery inspection charges | Itemised Line Item | Yes |


Includes an interactive EMI Amortization Estimator allowing buyers to adjust loan tenure (12 to 84 months), down payment percentage, and bank interest rates (7.5% to 12.0%) with instantaneous monthly recalculation.

## 5.3 Module 3: Atomic Test-Drive Booking Engine & Demo Fleet Mutex Lock

Eliminates double-booking of demo vehicles across showrooms through database-level atomic locking:

- **Fleet Registry:** Each demo car is registered in the system with its specific VIN, fuel type, transmission, and base showroom location (Hazratganj: 4 cars; Gomti Nagar: 2 cars; Kanpur Road: 2 cars).
- **Slot Granularity:** Slots are structured in 45-minute operating windows with a 15-minute sanitisation and transit buffer (1 hour total per booking).
- **Booking Modes:** Customer chooses between 'Showroom Visit' or 'Home / Office Doorstep Test Drive' (restricted to a 12 km geofence from the selected showroom).
- **Concurrency Lock:** When a customer selects a slot, an atomic mutex lock is placed for 10 minutes while mobile OTP verification and driving license capture are completed. If unconfirmed within 10 minutes, the slot automatically unlocks.
- **Confirmation:** Upon confirmation, automated calendar invites and SMS/WhatsApp booking vouchers containing DSE details and Google Maps location are dispatched.

## 5.4 Module 4: Certified Pre-Owned Marketplace & Trade-in Buyback Calculator

Showcases certified pre-owned inventory stationed at the Faizabad Road Yard and provides an automated trade-in valuation estimator for customers upgrading to Brand X.

- **Inventory Transparency:** Each used vehicle card displays the verified 150-point inspection badge, certified odometer reading, ownership serial (1st/2nd owner), insurance validity, and high-resolution defect-disclosure photography.
- **Trade-In Calculator:** Customers enter registration year, make, model, variant, fuel type, recorded mileage, and body condition to receive an algorithmic indicative valuation range (e.g., ₹4,80,000 – ₹5,15,000).
- **Manager Approval:** Algorithmic estimates are strictly labelled as 'Indicative Subject to Physical Inspection at Faizabad Road Yard'. System alerts the Used-Car Valuation Manager to schedule an on-site or doorstep evaluation.

## 5.5 Module 5: Workshop Service Appointment & Dynamic Bay Capacity Scheduler

Directly remedies the ₹48.60 Lakh annual service loss by capturing digital bookings and eliminating phone drop-offs:

- **Capacity Modeling:** Transport Nagar Central: 8 active mechanical bays (max 32 cars/day). Chinhat East Workshop: 5 active mechanical bays (max 20 cars/day).
- **Job Weighting:** System differentiates between 'Periodic Maintenance Service' (2-hour bay allocation) and 'Running Repair / Accidental Diagnostic' (4-hour bay allocation).
- **Intelligent Throttling:** When a workshop's hourly bay allocation reaches 85% capacity, that time slot is throttled and greyed out to prevent workshop floor congestion and quality degradation.
- **Concierge Option:** Customers can select optional Doorstep Concierge Driver Pick-Up & Drop with real-time driver contact details.

## 5.6 Module 6: Dealership Operations Hub & 5-Minute Lead Velocity Engine

The operational nerve-centre designed to solve the 30% missed lead rate. Implements an automated, accountable lead routing and escalation workflow:

| Workflow Stage | Trigger Condition | System Action | Escalation & SLA Threshold |
| --- | --- | --- | --- |
| 1. Lead Ingestion | Web form, test drive request, or imported portal CSV | Deduplicate by mobile number; assign unique Lead ID; parse customer intent | Instant (< 2 seconds) |
| 2. Auto-Routing | New unassigned lead created | Assign via weighted Round-Robin to available DSEs at closest showroom based on PIN code | Immediate assignment |
| 3. SLA Watchdog Start | Lead assigned to DSE | Start 5-Minute Countdown Timer; push instant notification (Sound alert + SMS/WhatsApp) | T - 0:00 to 5:00 minutes (Green Timer) |
| 4. Amber Warning | Lead uncontacted at 3 minutes | Visual pulse alert on DSE dashboard; warning notification pushed | T - 3:00 minutes (Amber Warning) |
| 5. Red Alert Escalation | Lead uncontacted at 5 minutes | Timer turns Red; automated alert sent to Sales Manager; lead reassigned to next senior DSE | T - 5:00 minutes (Red Alert Breach) |
| 6. Call Disposition | DSE initiates call via telephony/mobile | DSE logs outcome: Connected, Busy, Test Drive Scheduled, Quote Requested, Lost | Mandatory before closing lead record |


## 5.7 Module 7: AI-Assisted Dealership Co-Pilot & Safety Guardrails

Deploys generative AI strictly as an internal staff productivity accelerator with rigid safety guardrails:

- **Buyer Summary:** Parses customer journey history (models browsed, RTO price breakdown viewed, test-drive preferences, trade-in details) into a 3-bullet concise briefing card for the DSE before dialing.
- **Reply Assistant:** Generates professional, bilingual (English & Hindi) first-contact message templates tailored to the specific variant and enquiry type.

> [!WARNING]
> **Strict AI Safety Guardrails & Prohibitions**
>
> 1. No Unattended Autonomous Sending: AI is technically prohibited from dispatching messages directly to external customers. Every draft must be explicitly approved or edited by a human DSE.
> 2. No Price Commitments: AI is hardcoded to never quote discount figures, trade-in valuations, or financial commitments. All figures must link strictly to deterministic admin price tables.
> 3. PII Masking: Customer names, phone numbers, and addresses are masked prior to calling LLM inference APIs.

## 5.8 Module 8: Admin CMS, Price Configurator & Data Pipelines

Empowers dealership leadership to manage prices, inventory, and lead pipelines without requiring software developer intervention:

- **DMS CSV Pipeline:** Daily automated export of leads, test-drive bookings, and service job cards into standard UTF-8 CSV formatted specifically for ingestion into Brand X's proprietary Dealer Management System (DMS).
- **Portal Lead Ingestion:** Automated daily CSV importer for third-party automotive portal leads (CarWale, CarDekho, Meta Lead Ads, Google Ads) with duplicate mobile detection.
- **Security Audit Log:** Complete administrative audit log recording every user login, price change, lead reassignment, and customer record export.

# 6. Non-Functional Requirements & Compliance Architecture

| Dimension | Target Standard | Measurement & Verification Method |
| --- | --- | --- |
| Performance (Speed) | Largest Contentful Paint (LCP) < 2.5 seconds; Time to Interactive (TTI) < 3.2s on standard 4G mobile networks | Lighthouse CI audit integrated into deployment pipeline |
| Availability & Uptime | 99.9% monthly uptime (maximum allowable unscheduled downtime < 43 minutes/month) | Automated ping monitoring across public endpoints with Slack/SMS alerts |
| Concurrency & Locking | Zero double-bookings across demo fleet and workshop bays under simulated 100 concurrent checkout attempts | Automated JMeter / k6 concurrency stress tests on Redis mutex locking |
| DPDP Act 2023 Compliance | Explicit consent capture checkboxes for SMS/WhatsApp communication; right to digital erasure; purpose limitation | Legal privacy audit; automated 30-day data anonymisation for uncontacted leads |
| Information Security | Role-based JWT authentication with 8-hour expiry; AES-256 database encryption at rest; TLS 1.3 in transit | OWASP Top-10 vulnerability scan and static code security analysis prior to UAT |


# 7. Formal Acceptance Criteria & Quality Gates

Final acceptance of the platform by Company A Automotive Pvt. Ltd. is contingent upon satisfying the following verifiable criteria:

- **Gate 1 (Pricing Engine):** On-road price calculation matches official Lucknow RTO tax and statutory tables to the exact Rupee across 10 sample configurations.
- **Gate 2 (Concurrency Lock):** Zero instances of overlapping test-drive reservations when 10 simultaneous booking attempts are executed on a single demo vehicle.
- **Gate 3 (SLA Watchdog):** Visual amber warning fires at exactly 3:00 minutes and red alert reassignment triggers at exactly 5:00 minutes upon unacknowledged lead creation.
- **Gate 4 (DMS Pipeline):** Daily CSV export successfully parses and imports into Brand X DMS test environment without format or encoding errors.
- **Gate 5 (Privacy Compliance):** DPDP consent mechanism logs user timestamp, IP, and opted channels; unchecking consent blocks outbound marketing triggers.
