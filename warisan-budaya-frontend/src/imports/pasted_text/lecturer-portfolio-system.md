You are a Senior Staff Frontend Engineer and Design System Architect.

Build a complete production-ready Lecturer Portfolio Information System UI (SISTER-style Academic Portfolio Platform) based on an existing Laravel backend architecture.

The frontend must map 1:1 with all available backend models and API resources.

============================================================
PROJECT CONTEXT
===============

System Name:
Warisan Budaya Digital - Lecturer Portfolio System

Primary Users:

1. Public Visitors
2. Lecturers
3. Administrators

Main Goals:

* Public can browse lecturer profiles, publications, research, and academic achievements without login.
* Lecturers can manage their complete academic portfolio.
* Admins can verify and manage all submitted records.

Architecture:

* Laravel Backend API
* React + TypeScript
* Tailwind CSS
* React Query
* Axios
* TanStack Table
* React Hook Form
* Zod Validation
* Shadcn UI
* Lucide React Icons

============================================================
STRICT DESIGN SYSTEM
====================

Fonts:

* Plus Jakarta Sans
* Inter

Font Weights:

* font-normal (400)
* font-medium (500)

Never use:

* font-semibold
* font-bold
* font-extrabold

Border:
border border-slate-200

Radius:
rounded-[6px]

Shadows:
shadow-none only

Color Tokens:

Primary:
#0F52BA

Background:
#F8FAFC

Card:
#FFFFFF

Border:
#E2E8F0

Divider:
#F1F5F9

Text Primary:
#0F172A

Text Secondary:
#334155

Text Muted:
#64748B

Placeholder:
#94A3B8

Success:
#16A34A

============================================================
APPLICATION STRUCTURE
=====================

Create a modern institutional dashboard with:

1. Fixed Sidebar
2. Top Navigation
3. Breadcrumb System
4. Multi-page Routing
5. Global Search
6. Notification Center
7. User Menu
8. Responsive Mobile Sidebar
9. Data Table System
10. Reusable CRUD Pattern

============================================================
SIDEBAR NAVIGATION STRUCTURE
============================

Dashboard

Profil Dosen
├── Ringkasan Profil
├── Identitas Diri
├── Kontak & Alamat
├── Keluarga
├── Kepegawaian
├── Jabatan
├── Pangkat
├── Inpassing
├── Penempatan
└── Kontrak Kerja

Kualifikasi & Kompetensi
├── Riwayat Pendidikan
├── Diklat
├── Sertifikasi
└── Tes Kompetensi

Pelaksanaan Pendidikan
├── Pengajaran
├── Bahan Ajar
├── Bimbingan Mahasiswa
├── Pengujian Mahasiswa
├── Pembinaan Mahasiswa
├── Tugas Tambahan
├── Detasering
└── Visiting Scientist

Penelitian & Publikasi
├── Penelitian
├── Publikasi Ilmiah
├── Author Publikasi
└── HKI

Pengabdian Masyarakat
├── Pengabdian
├── Narasumber
└── Pengelola Jurnal

Penunjang Akademik
├── Penghargaan
├── Organisasi Profesi
└── Aktivitas Penunjang

Reward & Kesejahteraan
├── Tunjangan
├── Beasiswa
└── Kesejahteraan

Admin
├── Manajemen Dosen
├── Verifikasi Data
├── Master Kategori
├── Event
└── Pengaturan Sistem

============================================================
DASHBOARD OVERVIEW
==================

Build a comprehensive dashboard using:

MODEL: Lecturer
MODEL: LecturerStat

Profile Widget:

* photo_path
* name
* title_prefix
* title_suffix
* nidn
* nip
* email
* phone
* faculty
* department
* study_program
* bio
* status
* is_verified

External IDs Widget:

* sinta_id
* scopus_id
* sister_id
* google_scholar_id
* orcid_id

Statistics Cards:

* total_publications
* total_citations
* total_students
* sinta_score_3yr
* sinta_score_total

Charts:

* Publications per Year
* Citations Trend
* Research Trend
* Community Service Trend

============================================================
PUBLIC PROFILE PAGE
===================

Create a public-facing lecturer profile page.

Sections:

Hero Profile
Academic Summary
Research
Publications
HKI
Teaching Materials
Community Service
Awards
Professional Membership

Include:
Search
Filtering
Sorting
Share Profile
Print Profile
Export PDF

============================================================
CRUD PAGE TEMPLATE
==================

For EVERY module create:

1. List Page
2. Detail Page
3. Create Modal
4. Edit Modal
5. Delete Confirmation

Features:

* Server-side Pagination
* Sorting
* Filtering
* Search
* Export
* Bulk Actions
* Status Badge
* Empty States
* Loading Skeletons

============================================================
MODULE FIELD MAPPING
====================

PROFILE

Identity:

* nik
* religion
* citizenship
* npwp
* gender
* birth_place
* birth_date

Address:

* email
* phone_number
* address
* rt
* rw
* village
* district
* province
* postal_code

Family:

* marital_status
* spouse_name
* spouse_nip
* spouse_occupation

Employment:

* sk_cpns_number
* sk_cpns_date
* rank_group
* employment_status
* active_status
* work_years
* work_months

Position:

* position_name
* sk_number
* sk_date
* tmt

Rank:

* group_code
* rank_name
* received_date

============================================================
QUALIFICATION MODULE
====================

Education:

* level
* university
* country
* study_program
* entry_year
* graduation_year
* status
* study_type
* scholarship
* predicate

Diklat:

* training_name
* training_type
* organizer
* year
* status

Certification:

* certification_type
* study_type
* educator_registration_number
* certificate_sk_number
* certification_year

Test:

* test_name
* test_score
* organizer
* year

============================================================
EDUCATION IMPLEMENTATION MODULE
===============================

Teaching:

* course_name
* course_type
* scientific_field
* class
* student_count
* credits

Teaching Material:

* title
* isbn
* publication_date
* publisher

Student Supervision:

* semester
* activity_category
* supervision_type
* scientific_field
* study_program

Student Examination:

* examination_title
* scientific_field
* examination_type
* study_program

Student Development:

* guidance_title
* guidance_type
* activity_category
* semester

Additional Task:

* additional_task
* work_unit
* institution
* start_date
* end_date

Detasering:

* target_university
* activity_category
* assignment_decree_number

Visiting Scientist:

* host_university
* duration
* activity_date

============================================================
RESEARCH MODULE
===============

Research:

* title
* scientific_field
* implementation_year
* duration

Publication:

* title
* category
* type
* journal_name
* quartile
* issn
* doi
* url
* year
* is_verified
* author_position

HKI:

* title
* hki_type
* quartile
* certificate_number
* publish_date

============================================================
COMMUNITY SERVICE MODULE
========================

Community Service:

* title
* scientific_field
* implementation_year
* duration

Speaker:

* paper_title
* activity_category
* organizer
* activity_date

Journal Manager:

* journal_name
* role
* decree_number
* effective_date
* end_date
* is_active

============================================================
SUPPORTING MODULE
=================

Award:

* award_name
* award_type
* institution
* year

Professional Membership:

* organization_name
* role
* professional_institution
* membership_start
* membership_end

Other Supporting Activity:

* activity_name
* organizing_institution
* decree_number
* role
* start_date
* end_date

============================================================
REWARD MODULE
=============

Allowance:

* allowance_name
* allowance_type
* granting_institution
* funding_source
* amount
* start_year
* end_year

Scholarship:

* scholarship_name
* scholarship_type
* start_year
* end_year
* is_active

Welfare:

* welfare_service
* welfare_type
* organizer
* start_year
* selection_year

============================================================
OUTPUT REQUIREMENTS
===================

Generate:

1. Complete Information Architecture
2. Full Routing Structure
3. Folder Structure
4. Sidebar Navigation
5. React Components
6. Page Layouts
7. CRUD Table Components
8. Form Components
9. Dashboard Widgets
10. Public Profile Pages
11. API Integration Layer
12. React Query Hooks
13. TypeScript Interfaces
14. Mobile Responsive Views
15. Empty States
16. Loading States
17. Error States

The design must resemble a modern academic system similar to SISTER, PDDIKTI, SINTA, and university lecturer information portals while maintaining clean enterprise-grade UI consistency.
