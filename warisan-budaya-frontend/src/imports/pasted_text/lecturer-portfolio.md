You are a Senior Frontend Engineer. Build a production-ready Lecturer Portfolio 
System (SISTER-style) with React + TypeScript + Tailwind + Shadcn UI + 
TanStack Table + React Query + React Hook Form + Zod + Lucide Icons.

DESIGN SYSTEM
Font: Plus Jakarta Sans / Inter | Weights: 400, 500 only (no semibold/bold)
Radius: 6px | Shadow: none | Border: #E2E8F0
Colors: primary #0F52BA · bg #F8FAFC · card #FFFFFF · divider #F1F5F9
  text #0F172A · body #334155 · muted #64748B · placeholder #94A3B8 · success #16A34A

LAYOUT
Fixed sidebar + topbar (breadcrumb, global search, notif, user menu) + main scroll
Mobile: collapsible sidebar overlay

SIDEBAR GROUPS & PAGES
Dashboard
Profil Dosen → Ringkasan · Identitas · Kontak · Keluarga · Kepegawaian · Jabatan · Pangkat · Inpassing · Penempatan · Kontrak
Kualifikasi → Pendidikan · Diklat · Sertifikasi · Tes Kompetensi
Pelaks. Pendidikan → Pengajaran · Bahan Ajar · Bimbingan · Pengujian · Pembinaan Mhs · Tugas Tambahan · Detasering · Visiting Scientist
Penelitian → Penelitian · Publikasi · Author Publikasi · HKI
Pengabdian → Pengabdian · Narasumber · Pengelola Jurnal
Penunjang → Penghargaan · Organisasi Profesi · Aktivitas Lainnya
Reward → Tunjangan · Beasiswa · Kesejahteraan
Admin → Manajemen Dosen · Verifikasi Data · Master Kategori · Event · Pengaturan

DASHBOARD WIDGETS
Profile card: photo · name · title_prefix/suffix · nidn · nip · email · phone · faculty · department · study_program · bio · status · is_verified
External IDs: sinta_id · scopus_id · sister_id · google_scholar_id · orcid_id
Stat cards (4): total_publications · total_citations · total_students · sinta_score_3yr/total
Charts: Publications/yr · Citations trend · Research trend · Pengabdian trend

PUBLIC PROFILE PAGE
Hero + Academic Summary + Research + Publications + HKI + Bahan Ajar + Pengabdian + Awards + Organisasi
Features: search · filter · sort · share · print · export PDF

CRUD PATTERN (apply to ALL modules)
List: server-side pagination + sort + filter + search + export + bulk actions
Per row: status badge + [Eye cyan] [Pencil amber] [Trash red] action buttons
Modals: Create · Edit · Delete confirm
States: loading skeleton · empty state · error state

FIELD MAP
Profile: nik · religion · citizenship · npwp · gender · birth_place · birth_date
Address: email · phone_number · address · rt · rw · village · district · province · postal_code
Family: marital_status · spouse_name · spouse_nip · spouse_occupation
Employment: sk_cpns_number · sk_cpns_date · rank_group · employment_status · active_status · work_years · work_months
Position: position_name · sk_number · sk_date · tmt
Rank: group_code · rank_name · received_date
Education: level · university · country · study_program · entry_year · graduation_year · status · study_type · scholarship · predicate
Diklat: training_name · training_type · organizer · year · status
Certification: certification_type · study_type · educator_registration_number · certificate_sk_number · certification_year
Test: test_name · test_score · organizer · year
Teaching: course_name · course_type · scientific_field · class · student_count · credits
TeachingMaterial: title · isbn · publication_date · publisher
Supervision: semester · activity_category · supervision_type · scientific_field · study_program
Examination: examination_title · scientific_field · examination_type · study_program
Development: guidance_title · guidance_type · activity_category · semester
AdditionalTask: additional_task · work_unit · institution · start_date · end_date
Detasering: target_university · activity_category · assignment_decree_number
VisitingScientist: host_university · duration · activity_date
Research: title · scientific_field · implementation_year · duration
Publication: title · category · type · journal_name · quartile · issn · doi · url · year · is_verified · author_position
HKI: title · hki_type · quartile · certificate_number · publish_date
CommunityService: title · scientific_field · implementation_year · duration
Speaker: paper_title · activity_category · organizer · activity_date
JournalManager: journal_name · role · decree_number · effective_date · end_date · is_active
Award: award_name · award_type · institution · year
ProfessionalMembership: organization_name · role · professional_institution · membership_start · membership_end
OtherActivity: activity_name · organizing_institution · decree_number · role · start_date · end_date
Allowance: allowance_name · allowance_type · granting_institution · funding_source · amount · start_year · end_year
Scholarship: scholarship_name · scholarship_type · start_year · end_year · is_active
Welfare: welfare_service · welfare_type · organizer · start_year · selection_year

DELIVERABLES
Folder structure · TypeScript interfaces · React Query hooks · API layer (Axios) ·
Page components · CRUD table components · Form components · Dashboard widgets ·
Public profile page · Mobile responsive views
Target aesthetic: clean enterprise academic portal (SISTER / PDDIKTI / SINTA style)