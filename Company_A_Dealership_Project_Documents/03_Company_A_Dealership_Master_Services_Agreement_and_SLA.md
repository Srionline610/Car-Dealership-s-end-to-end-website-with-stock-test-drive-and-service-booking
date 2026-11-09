# MASTER SERVICES AGREEMENT, STATEMENT OF WORK & SLA
## Turnkey Dealership Software Development, Enterprise Deployment & Ongoing SLA Support
**Client:** Company A Automotive Pvt. Ltd. (CIN: U50100UP2015PTC072198)
**Service Provider:** Enterprise Digital Solutions & Technology Partner
**Document Ref:** MSA-COMA-2026-V1.0 | **Effective Date:** 15th November 2026 | **Version:** 1.0 (Approved Legal Draft)

---

# 1. Parties & Recitals

THIS MASTER SERVICES AGREEMENT (the "Agreement"), together with its Statement of Work (SOW) and Service Level Agreement (SLA), is entered into this 15th day of November, 2026 (the "Effective Date"), by and between:

1. **COMPANY A AUTOMOTIVE PRIVATE LIMITED**, a private limited company incorporated under the Companies Act, 2013 (CIN: U50100UP2015PTC072198), having its Registered Office and Flagship Showroom at MG Marg, Hazratganj, Lucknow, Uttar Pradesh 226001, acting as an Authorised Dealer for Brand X (hereinafter referred to as the "Client" or "Company A", which expression shall unless repugnant to the context include its successors and permitted assigns); and

2. **THE TECHNOLOGY SERVICE PROVIDER**, a professional enterprise software engineering firm specialized in automotive retail digital transformation (hereinafter referred to as the "Service Provider", which expression shall unless repugnant to the context include its successors and permitted assigns).

### Recitals
WHEREAS, Company A operates 3 passenger-car showrooms (Hazratganj Flagship, Gomti Nagar, Kanpur Road), 2 service workshops (Transport Nagar Central, Chinhat East), and a certified pre-owned yard (Faizabad Road) in the Lucknow metropolitan territory;

WHEREAS, Company A suffers an estimated annual revenue margin leakage of approximately ₹2.11 Crore (comprising ₹1.62 Crore in lost vehicle sales margins due to 30% uncontacted digital leads, and ₹48.60 Lakh in lost workshop contribution due to 20% dropped service booking calls);

WHEREAS, the Service Provider possesses proprietary technical expertise in architecting high-concurrency automotive booking platforms, deterministic RTO tax pricing engines, and automated lead velocity SLA watchdog systems, and has agreed to build, deploy, train staff, and maintain the Platform under the terms set forth herein.

# 2. Scope of Services & Statement of Work (SOW)

**Core Obligations:** The Service Provider shall deliver a fully functional, enterprise-grade, turn-key software solution comprising the 8 functional modules specified in Product Requirements Document Ref: PRD-COMA-2026-V1.0 and executed across the 16-week timeline set forth in Timeline Ref: TIMELINE-COMA-2026-V1.0, specifically:

- **Module 1:** Interactive new-car digital showroom with model comparisons and WebP 360-degree visualizer.
- **Module 2:** Deterministic Lucknow (UP-32) RTO on-road pricing engine with road tax, municipal fees, TCS, and EMI calculator.
- **Module 3:** Atomic test-drive booking engine with demo fleet mutex locking across all 3 showrooms.
- **Module 4:** Certified pre-owned marketplace with 150-point inspection viewer and trade-in buyback estimator.
- **Module 5:** Workshop bay capacity scheduler for Transport Nagar (8 bays) and Chinhat East (5 bays) with concierge pickup/drop.
- **Module 6:** Dealership Operations Hub with 5-minute SLA lead watchdog, automated round-robin routing, and red-alert escalation.
- **Module 7:** AI Dealership Co-Pilot providing human-in-the-loop buyer summaries and bilingual reply drafts with strict safety guardrails.
- **Module 8:** Admin CMS, daily DMS CSV export pipeline, and third-party portal CSV lead ingestion.


# 3. Commercial Consideration & Milestone Payment Schedule

**Fixed Price Implementation Fee:** In consideration of the full and satisfactory performance of the turnkey implementation services, Company A agrees to pay a fixed price implementation fee of ₹28,50,000 (Rupees Twenty-Eight Lakh Fifty Thousand only) plus applicable GST (18%). All payments shall be released strictly against formal verification and acceptance of defined deliverables according to the following schedule:

| Milestone | Delivery Milestone Description | Timeline Target | % Tranche | Tranche Amount (INR) | Verification Deliverables |
| --- | --- | --- | --- | --- | --- |
| Milestone 1 | Mobilisation, Architecture & SRS Sign-Off | Week 2 (End Sprint 1) | 20% | ₹5,70,000 | Approved SRS, UI Figma Prototypes, Cloud Staging Setup |
| Milestone 2 | Digital Showroom & Lucknow Pricing Engine | Week 6 (End Sprint 3) | 25% | ₹7,12,500 | Public Showroom, Lucknow RTO Engine verified on 50 quotes |
| Milestone 3 | Booking Engines & 5-Min SLA Watchdog | Week 12 (End Sprint 6) | 25% | ₹7,12,500 | Atomic Test-Drive Mutex, Workshop Bays, SLA Red-Alert Hub |
| Milestone 4 | Hazratganj Flagship Pilot Clearance & Training | Week 14 (End Sprint 7) | 20% | ₹5,70,000 | Pilot Deployment, UAT Sign-off, 55 Dealership Staff Certified |
| Milestone 5 | Network-wide Go-Live & 30-Day Stabilization | Week 16 (End Sprint 8) | 10% | ₹2,85,000 | Full Go-Live across 6 sites, 30-day Hypercare sign-off |
| Total | Complete Turnkey Platform Delivery | 16 Weeks | 100% | ₹28,50,000 | Exclusive of statutory GST (18%) |


**Ongoing SLA Support Fee:** Commencing upon successful completion of Milestone 5 and the 30-day stabilization period, Company A shall pay a monthly SLA Management & Cloud Infrastructure Fee of ₹30,000 (Rupees Thirty Thousand only) plus applicable GST, billed quarterly in advance (₹90,000/quarter). This fee covers AWS hosting, Redis cluster management, 99.9% uptime monitoring, ongoing security patches, and L2/L3 support.

# 4. Service Level Agreement (SLA) & Penalty Framework

**Uptime Commitment:** The Service Provider warrants that the Platform shall maintain an overall monthly service availability of not less than 99.9% (excluding scheduled maintenance windows not exceeding 2 hours per month conducted between 02:00 AM and 04:00 AM IST). Incident severity levels and response commitments are defined below:

| Severity Level | Definition & Impact | Initial Response Time | Workaround / Fix Target | Liquidated Damages / Penalty Credit |
| --- | --- | --- | --- | --- |
| Severity 1 (Critical Outage) | Core platform down; customers unable to book test drives or view pricing; DSEs unable to access leads | < 30 Minutes | < 4 Hours | 1% of monthly SLA fee for every hour of delay exceeding 4 hours (up to 15% max) |
| Severity 2 (Major Feature Impairment) | A single module impaired (e.g., service bay scheduler down, but new car showroom & lead inbox active) | < 2 Hours | < 8 Hours | 0.5% of monthly SLA fee for every 2 hours of delay exceeding 8 hours |
| Severity 3 (Minor Defect) | Non-critical cosmetic defects, minor reporting delays, or general operational questions | < 8 Hours | < 48 Hours | Defect logging and priority queueing in next scheduled bi-weekly patch release |


# 5. Intellectual Property Rights & Ownership

**Custom Code Ownership:** Upon full receipt of the fixed price implementation fee by the Service Provider, all bespoke source code, database architectures, Lucknow RTO configuration schemas, UI design assets, and operational workflows developed specifically for Company A shall become the sole and exclusive intellectual property of Company A Automotive Pvt. Ltd. The Service Provider retains ownership of its pre-existing background libraries and frameworks, for which it hereby grants Company A a perpetual, irrevocable, worldwide, royalty-free license to use and modify.

# 6. Data Privacy, Confidentiality & DPDP Act 2023

**Statutory Compliance:**
Both parties acknowledge that customer lead data constitutes Digital Personal Data under the Digital Personal Data Protection Act, 2023 (DPDP Act). The Service Provider acts as a Data Processor and Company A acts as the Data Fiduciary. The Service Provider covenants that:

1. All customer Personally Identifiable Information (PII) including mobile numbers, addresses, and driving licenses shall be encrypted using AES-256.
2. No customer data shall be transmitted to third-party Large Language Model (LLM) APIs without cryptographic pseudonymisation/masking.
3. Any data security breach shall be notified to Company A in writing within six (6) hours of discovery.

# 7. Warranties & 12-Month Defect Liability Period

**Defect Warranty:** The Service Provider warrants that the Platform shall perform in material conformance with PRD-COMA-2026-V1.0 for a period of twelve (12) months following full network Go-Live. During this Defect Liability Period, the Service Provider shall rectify any reproducible software bugs, errors, or performance regressions free of any additional charge.

# 8. Governing Law, Dispute Resolution & Jurisdiction

**Arbitration & Jurisdiction:** This Agreement shall be governed by and construed in accordance with the laws of the Republic of India. Any dispute arising out of or in connection with this Agreement shall first be escalated to the Managing Director of Company A and the Chief Executive Officer of the Service Provider for amicable resolution within thirty (30) days. Failing amicable resolution, the dispute shall be referred to and finally resolved by a Sole Arbitrator appointed by mutual consent under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Lucknow, Uttar Pradesh. Subject to arbitration, the courts having jurisdiction over Lucknow (High Court of Judicature at Allahabad, Lucknow Bench) shall have exclusive jurisdiction.

# 9. Execution & Signatures Block

IN WITNESS WHEREOF, the parties hereto have caused this Master Services Agreement to be executed by their duly authorized representatives as of the Effective Date.

| Execution Dimension | For Company A Automotive Pvt. Ltd. (Client) | For Enterprise Technology Partner (Service Provider) |
| --- | --- | --- |
| Authorized Signatory | ____________________________________ | ____________________________________ |
| Name | Mr. R. K. Srivastava | Mr. A. V. Sharma |
| Title / Designation | Managing Director & CEO | Managing Partner & Head of Solutions |
| Date of Signature | 15th November 2026 | 15th November 2026 |
| Company Stamp / Seal | [ Corporate Seal - Lucknow ] | [ Corporate Seal - Technology Partner ] |

