# PROJECT TIMELINE & IMPLEMENTATION ROADMAP
## 16-Week Enterprise Delivery Plan & Work Breakdown Structure (WBS)
**Client:** Company A Automotive Pvt. Ltd. (Authorised Dealer for Brand X, Lucknow, UP)
**Document Ref:** TIMELINE-COMA-2026-V1.0 | **Effective Date:** November 2026 | **Version:** 1.0 (Approved)

---

# 1. Executive Delivery Summary & Milestone Alignment

**Implementation Strategy:** This document establishes the comprehensive 16-week project implementation roadmap and Work Breakdown Structure (WBS) for the delivery, configuration, testing, and deployment of the Centralised Digital Dealership Platform for Company A Automotive Pvt. Ltd. The project is structured into 8 distinct bi-weekly sprints across 6 sequential delivery phases, designed to balance rapid value realization with rigorous operational testing across all 6 dealership facilities in Lucknow.

> [!NOTE]
> **Delivery Milestone & Commercial Alignment**
>
> The implementation timeline is directly tied to the commercial milestones set forth in the Master Services Agreement:
> 
> • **Milestone 1 (Sprint 1 / Week 2):** Discovery, Architecture & SRS Sign-Off (20% Tranche)
> • **Milestone 2 (Sprint 3 / Week 6):** Digital Showroom & Lucknow On-Road Pricing Engine Delivery (25% Tranche)
> • **Milestone 3 (Sprint 6 / Week 12):** Booking Engines & 5-Minute SLA Watchdog Functional Delivery (25% Tranche)
> • **Milestone 4 (Sprint 7 / Week 14):** Hazratganj Flagship Pilot Clearance & Staff Training (20% Tranche)
> • **Milestone 5 (Sprint 8 / Week 16):** Full Network Go-Live & 30-Day Hypercare Commencement (10% Tranche)

# 2. High-Level Phase Breakdown & Delivery Schedule

| Phase | Sprint Cadence | Calendar Window | Primary Focus & Core Objectives | Key Deliverables |
| --- | --- | --- | --- | --- |
| Phase 1: Discovery & Architecture | Sprint 1 | Weeks 1 – 2 | Requirement finalisation, Lucknow RTO tax rule audit, system architecture & database schema setup | Approved SRS, UI Wireframes, Database Schema, Dev/Staging Environments |
| Phase 2: Customer Showroom & Pricing | Sprint 2 – 3 | Weeks 3 – 6 | Digital showroom catalogue, variant comparator, dynamic Lucknow on-road pricing engine & EMI calculator | Interactive Model Pages, Lucknow RTO Calculation Engine, Mobile UI Core |
| Phase 3: Booking & Concurrency Engine | Sprint 4 – 5 | Weeks 7 – 10 | Atomic test-drive booking engine with demo fleet mutex locking, workshop capacity scheduler for 2 service centres | Test-Drive Booking Engine, Workshop Bay Capacity Manager, SMS Notifications |
| Phase 4: Operations Hub & SLA Watchdog | Sprint 6 | Weeks 11 – 12 | 5-minute SLA watchdog timer, round-robin lead auto-routing, certified used-car trade-in calculator, DMS CSV export | Dealership Lead Inbox, SLA Red-Alert Escalator, Used Car Valuation Estimator |
| Phase 5: AI Co-Pilot & Security Audit | Sprint 7 | Weeks 13 – 14 | AI buyer summary & first-reply assistant, DPDP Act 2023 compliance audit, OWASP vulnerability penetration testing | AI Dealership Co-Pilot, Consent Manager, Penetration Test Sign-off, UAT Release |
| Phase 6: Pilot, Training & Full Go-Live | Sprint 8 | Weeks 15 – 16 | Hazratganj Flagship pilot deployment, staff training (40 DSEs + 15 advisors), rollout to Gomti Nagar, Kanpur Rd & workshops | Staff Certification, Full Production Go-Live, Final Handover, Hypercare Start |


# 3. Sprint-by-Sprint Work Breakdown Structure (WBS)

## Sprint 1 (Weeks 1 – 2): Architecture, Discovery & Foundation

**Sprint Objective:** Establish engineering infrastructure, solidify Lucknow RTO tax slabs, and finalize user journey designs.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 1.1 | Conduct on-site operational discovery across Hazratganj Flagship, Transport Nagar, and Chinhat workshops | Project Manager / Lead Architect |
| 1.2 | Audit and codify official Lucknow (UP-32) RTO tax tables, road tax slabs, municipal charges, and cess rates | Automotive Domain SME |
| 1.3 | Provision secure cloud staging infrastructure (PostgreSQL database, Redis cache, TLS certificates) | DevOps Lead |
| 1.4 | Deliver comprehensive UX/UI design wireframes and interactive Figma prototypes for mobile and desktop | UI/UX Designer |
| 1.5 | Formal sign-off of Software Requirements Specification (SRS) and architecture specification | Client Project Sponsor / PM |


## Sprint 2 (Weeks 3 – 4): Vehicle Discovery & Interactive Digital Showroom

**Sprint Objective:** Build the brand-compliant digital showroom showcasing Brand X's new car portfolio.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 2.1 | Construct responsive model discovery catalog with fuel type, transmission, and price filtering | Frontend Engineer 1 |
| 2.2 | Implement high-resolution WebP image gallery, 360-degree color swatch previewer, and spec sheets | Frontend Engineer 2 |
| 2.3 | Develop side-by-side vehicle variant comparison engine with highlighted feature differentiators | Frontend Engineer 1 |
| 2.4 | Build backend vehicle master data models and administrative CRUD interfaces | Backend Engineer 1 |
| 2.5 | Execute automated mobile responsiveness and page speed audit (LCP < 2.5s) | QA Automation Lead |


## Sprint 3 (Weeks 5 – 6): Dynamic Lucknow On-Road Pricing Engine & EMI Amortization

**Sprint Objective:** Deliver deterministic, exact-to-the-rupee Lucknow on-road price breakdowns and financing tools.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 3.1 | Build Lucknow RTO rule engine (UP road tax slabs, TCS 1%, registration, postal, and municipal fees) | Backend Engineer 1 |
| 3.2 | Develop dynamic quotation generator itemizing Ex-Showroom, Insurance, FASTag, and Dealer Logistics | Backend Engineer 2 |
| 3.3 | Implement interactive EMI calculator with slider adjustments for loan tenure, down payment, and bank APR | Frontend Engineer 2 |
| 3.4 | Build Admin Price Table Configurator allowing dealership management to adjust base prices and insurance options | Full-Stack Engineer |
| 3.5 | Perform validation testing against 50 real-world historical sales quotations to verify exact Rupee parity | QA Automation Lead / SME |


## Sprint 4 (Weeks 7 – 8): Atomic Test-Drive Booking Engine & Demo Fleet Concurrency Lock

**Sprint Objective:** Eliminate double-booking of demo cars via atomic reservation and calendar synchronization.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 4.1 | Create demo fleet registry mapping VIN, model, transmission, and base showroom (Hazratganj, Gomti, Kanpur Rd) | Backend Engineer 1 |
| 4.2 | Implement Redis-backed atomic mutex locking for 45-minute booking slots with 15-minute sanitisation buffers | Backend Engineer 2 |
| 4.3 | Build customer booking journey with OTP mobile verification and Driving License image upload | Frontend Engineer 1 |
| 4.4 | Develop showroom-specific demo car schedule view and manual override console for Sales Managers | Frontend Engineer 2 |
| 4.5 | Execute high-concurrency JMeter stress tests simulating 100 simultaneous bookings on a single demo car | QA Automation Lead |


## Sprint 5 (Weeks 9 – 10): Workshop Service Capacity Scheduler & Concierge Module

**Sprint Objective:** Digitize service appointments to eliminate phone drop-offs and prevent workshop congestion.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 5.1 | Model mechanical bay capacity for Transport Nagar (8 bays) and Chinhat East (5 bays) | Backend Engineer 1 |
| 5.2 | Implement dynamic bay throttling logic differentiating Periodic Maintenance (2 hrs) vs Running Repair (4 hrs) | Backend Engineer 2 |
| 5.3 | Develop customer service booking flow with optional Doorstep Concierge Pick-Up & Drop selection | Frontend Engineer 1 |
| 5.4 | Build Service Advisor Workshop Dashboard with drag-and-drop bay calendar and status trackers | Frontend Engineer 2 |
| 5.5 | Integrate automated SMS/WhatsApp appointment confirmation triggers with Google Maps directions | DevOps / Backend |


## Sprint 6 (Weeks 11 – 12): Dealership Operations Hub, 5-Minute SLA Watchdog & Used Car Hub

**Sprint Objective:** Deploy the lead velocity engine to eliminate missed leads and integrate certified pre-owned trade-ins.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 6.1 | Construct unified Lead Inbox with automated round-robin routing based on showroom proximity and DSE load | Backend Engineer 1 |
| 6.2 | Build real-time 5-minute SLA countdown timer with visual Amber (3 min) and Red (5 min) manager escalation alerts | Frontend Engineer 1 |
| 6.3 | Develop Certified Pre-Owned showcase for Faizabad Road yard inventory with 150-point inspection scorecard | Frontend Engineer 2 |
| 6.4 | Build Trade-in Buyback Calculator with depreciation matrix and manager review pipeline | Backend Engineer 2 |
| 6.5 | Implement automated daily CSV export for Brand X Dealer Management System (DMS) reconciliation | Full-Stack Engineer |


## Sprint 7 (Weeks 13 – 14): AI Dealership Co-Pilot, Security Hardening & DPDP Compliance

**Sprint Objective:** Deploy generative AI productivity co-pilot, execute penetration testing, and finalize UAT.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 7.1 | Integrate AI Buyer Summary generating a 3-bullet briefing card from customer web browsing history | AI / Backend Engineer |
| 7.2 | Build AI First-Reply Assistant with bilingual (English/Hindi) message templates and mandatory human approval | Frontend Engineer 1 |
| 7.3 | Implement DPDP Act 2023 compliance: explicit consent checkboxes, PII data masking, and 30-day anonymisation | Security / Backend Lead |
| 7.4 | Execute OWASP Top-10 security penetration testing, vulnerability patching, and SSL hardening | DevOps / Security Lead |
| 7.5 | Conduct formal User Acceptance Testing (UAT) with Company A management and obtain pilot sign-off | Project Manager / All Leads |


## Sprint 8 (Weeks 15 – 16): Flagship Pilot, Staff Certification & Full Network Rollout

**Sprint Objective:** Execute live pilot at Hazratganj, train all dealership staff, and achieve network-wide Go-Live.

| WBS ID | Task Description & Functional Scope | Responsible Owner |
| --- | --- | --- |
| 8.1 | Deploy Phase 1 pilot live at Hazratganj Flagship Showroom and Transport Nagar Workshop (Week 15) | DevOps / PM |
| 8.2 | Deliver comprehensive classroom and on-the-floor training for 40 DSEs, 15 Service Advisors, and 5 Managers | Change Management Lead |
| 8.3 | Monitor 1-week pilot metrics, resolve minor edge-case logs, and tune lead routing weights | Full Engineering Team |
| 8.4 | Execute full network rollout to Gomti Nagar, Kanpur Road, Chinhat Workshop, and Faizabad Yard (Week 16) | DevOps / Tech Lead |
| 8.5 | Commence 30-day post-launch Hypercare stabilization and transition to ongoing SLA maintenance | Project Manager / Support Lead |


# 4. Resource Allocation & Project Governance Structure

To guarantee adherence to the 16-week timeline, a dedicated cross-functional delivery pod is assigned:

| Project Role | FTE | Key Responsibilities & Deliverables |
| --- | --- | --- |
| Project Manager / Scrum Master | 1.0 FTE | Sprint planning, stakeholder reporting, risk mitigation, weekly Steering Committee syncs |
| Lead Solution Architect | 0.5 FTE | System architecture, database schema, concurrency locking design, security oversight |
| Senior Frontend Engineers (x2) | 2.0 FTE | Next.js UI components, responsive digital showroom, booking flows, staff dashboard, SLA timers |
| Senior Backend Engineers (x2) | 2.0 FTE | Node.js REST APIs, Lucknow RTO price engine, Redis locking, DMS CSV pipelines, AI orchestration |
| QA & Automation Engineer | 1.0 FTE | JMeter concurrency tests, automated regression suite, mobile cross-browser testing, UAT defect logging |
| DevOps & Cloud Security Engineer | 0.5 FTE | CI/CD pipelines, staging/production AWS hosting, SSL/TLS, DPDP compliance masking, monitoring |
| Dealership Change Management Lead | 0.5 FTE | On-site staff training (40 DSEs, 15 advisors), user manuals, operational SOPs, pilot support |


# 5. Risk Management & Contingency Protocols

| Identified Risk | Severity | Impact Description | Proactive Mitigation Protocol |
| --- | --- | --- | --- |
| Staff Resistance to 5-Min SLA | High | DSEs may ignore timer alerts or view automated reassignment as punitive. | Implement gamified leaderboard incentives; run interactive role-play training during Sprint 8; provide 30-day grace transition. |
| DMS Format Schema Drift | Medium | Brand X OEM modifies internal DMS CSV import column layouts without notice. | Build dynamic column-mapping configurator in Admin CMS allowing instant adjustment without code redeployment. |
| Demo Vehicle Breakdowns | Medium | A scheduled demo car is taken out of service unexpectedly due to mechanical fault. | Provide instant 1-click 'Out of Service' fleet toggle reallocating bookings to backup vehicles or offering doorstep alternative. |
| Peak RTO Tax Regulatory Shifts | Low | UP State Government revises EV road tax or luxury cess rates mid-project. | RTO calculation rules are fully abstracted into database tables editable via Admin UI in under 2 minutes. |

