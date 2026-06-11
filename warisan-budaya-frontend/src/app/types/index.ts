// ============================================================
// CORE TYPES
// ============================================================

export interface Lecturer {
  id: number;
  photo_path?: string;
  name: string;
  title_prefix?: string;
  title_suffix?: string;
  nidn: string;
  nip: string;
  email: string;
  phone: string;
  faculty: string;
  department: string;
  study_program: string;
  bio?: string;
  status: string;
  is_verified: boolean;
  sinta_id?: string;
  scopus_id?: string;
  sister_id?: string;
  google_scholar_id?: string;
  orcid_id?: string;
  created_at: string;
  updated_at: string;
}

export interface LecturerStat {
  lecturer_id: number;
  total_publications: number;
  total_citations: number;
  total_students: number;
  sinta_score_3yr: number;
  sinta_score_total: number;
}

// ============================================================
// PROFILE MODULE
// ============================================================

export interface Identity {
  id: number;
  lecturer_id: number;
  nik: string;
  religion: string;
  citizenship: string;
  npwp: string;
  gender: string;
  birth_place: string;
  birth_date: string;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  lecturer_id: number;
  email: string;
  phone_number: string;
  address: string;
  rt: string;
  rw: string;
  village: string;
  district: string;
  province: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
}

export interface Family {
  id: number;
  lecturer_id: number;
  marital_status: string;
  spouse_name?: string;
  spouse_nip?: string;
  spouse_occupation?: string;
  created_at: string;
  updated_at: string;
}

export interface Employment {
  id: number;
  lecturer_id: number;
  sk_cpns_number: string;
  sk_cpns_date: string;
  rank_group: string;
  employment_status: string;
  active_status: string;
  work_years: number;
  work_months: number;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: number;
  lecturer_id: number;
  position_name: string;
  sk_number: string;
  sk_date: string;
  tmt: string;
  created_at: string;
  updated_at: string;
}

export interface Rank {
  id: number;
  lecturer_id: number;
  group_code: string;
  rank_name: string;
  received_date: string;
  created_at: string;
  updated_at: string;
}

export interface Inpassing {
  id: number;
  lecturer_id: number;
  sk_number: string;
  sk_date: string;
  old_rank: string;
  new_rank: string;
  effective_date: string;
  created_at: string;
  updated_at: string;
}

export interface Placement {
  id: number;
  lecturer_id: number;
  institution: string;
  unit: string;
  sk_number: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: number;
  lecturer_id: number;
  contract_number: string;
  contract_type: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// QUALIFICATION MODULE
// ============================================================

export interface Education {
  id: number;
  lecturer_id: number;
  level: string;
  university: string;
  country: string;
  study_program: string;
  entry_year: number;
  graduation_year: number;
  status: string;
  study_type: string;
  scholarship?: string;
  predicate?: string;
  created_at: string;
  updated_at: string;
}

export interface Diklat {
  id: number;
  lecturer_id: number;
  training_name: string;
  training_type: string;
  organizer: string;
  year: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: number;
  lecturer_id: number;
  certification_type: string;
  study_type: string;
  educator_registration_number: string;
  certificate_sk_number: string;
  certification_year: number;
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: number;
  lecturer_id: number;
  test_name: string;
  test_score: number;
  organizer: string;
  year: number;
  created_at: string;
  updated_at: string;
}

// ============================================================
// EDUCATION IMPLEMENTATION MODULE
// ============================================================

export interface Teaching {
  id: number;
  lecturer_id: number;
  course_name: string;
  course_type: string;
  scientific_field: string;
  class: string;
  student_count: number;
  credits: number;
  semester: string;
  academic_year: string;
  created_at: string;
  updated_at: string;
}

export interface TeachingMaterial {
  id: number;
  lecturer_id: number;
  title: string;
  isbn?: string;
  publication_date: string;
  publisher: string;
  created_at: string;
  updated_at: string;
}

export interface Supervision {
  id: number;
  lecturer_id: number;
  student_name: string;
  semester: string;
  activity_category: string;
  supervision_type: string;
  scientific_field: string;
  study_program: string;
  created_at: string;
  updated_at: string;
}

export interface Examination {
  id: number;
  lecturer_id: number;
  student_name: string;
  examination_title: string;
  scientific_field: string;
  examination_type: string;
  study_program: string;
  examination_date: string;
  created_at: string;
  updated_at: string;
}

export interface Development {
  id: number;
  lecturer_id: number;
  guidance_title: string;
  guidance_type: string;
  activity_category: string;
  semester: string;
  created_at: string;
  updated_at: string;
}

export interface AdditionalTask {
  id: number;
  lecturer_id: number;
  additional_task: string;
  work_unit: string;
  institution: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Detasering {
  id: number;
  lecturer_id: number;
  target_university: string;
  activity_category: string;
  assignment_decree_number: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface VisitingScientist {
  id: number;
  lecturer_id: number;
  host_university: string;
  duration: string;
  activity_date: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// RESEARCH MODULE
// ============================================================

export interface Research {
  id: number;
  lecturer_id: number;
  title: string;
  scientific_field: string;
  implementation_year: number;
  duration: string;
  funding_source?: string;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: number;
  lecturer_id: number;
  title: string;
  category: string;
  type: string;
  journal_name: string;
  quartile?: string;
  issn?: string;
  doi?: string;
  url?: string;
  year: number;
  is_verified: boolean;
  author_position: string;
  created_at: string;
  updated_at: string;
}

export interface AuthorPublication {
  id: number;
  publication_id: number;
  author_name: string;
  author_position: number;
  affiliation: string;
  created_at: string;
  updated_at: string;
}

export interface HKI {
  id: number;
  lecturer_id: number;
  title: string;
  hki_type: string;
  quartile?: string;
  certificate_number: string;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// COMMUNITY SERVICE MODULE
// ============================================================

export interface CommunityService {
  id: number;
  lecturer_id: number;
  title: string;
  scientific_field: string;
  implementation_year: number;
  duration: string;
  created_at: string;
  updated_at: string;
}

export interface Speaker {
  id: number;
  lecturer_id: number;
  paper_title: string;
  activity_category: string;
  organizer: string;
  activity_date: string;
  created_at: string;
  updated_at: string;
}

export interface JournalManager {
  id: number;
  lecturer_id: number;
  journal_name: string;
  role: string;
  decree_number: string;
  effective_date: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================
// SUPPORTING MODULE
// ============================================================

export interface Award {
  id: number;
  lecturer_id: number;
  award_name: string;
  award_type: string;
  institution: string;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalMembership {
  id: number;
  lecturer_id: number;
  organization_name: string;
  role: string;
  professional_institution: string;
  membership_start: string;
  membership_end?: string;
  created_at: string;
  updated_at: string;
}

export interface OtherActivity {
  id: number;
  lecturer_id: number;
  activity_name: string;
  organizing_institution: string;
  decree_number: string;
  role: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// REWARD MODULE
// ============================================================

export interface Allowance {
  id: number;
  lecturer_id: number;
  allowance_name: string;
  allowance_type: string;
  granting_institution: string;
  funding_source: string;
  amount: number;
  start_year: number;
  end_year?: number;
  created_at: string;
  updated_at: string;
}

export interface Scholarship {
  id: number;
  lecturer_id: number;
  scholarship_name: string;
  scholarship_type: string;
  start_year: number;
  end_year?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Welfare {
  id: number;
  lecturer_id: number;
  welfare_service: string;
  welfare_type: string;
  organizer: string;
  start_year: number;
  selection_year: number;
  created_at: string;
  updated_at: string;
}

// ============================================================
// ADMIN MODULE
// ============================================================

export interface Category {
  id: number;
  name: string;
  type: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  name: string;
  event_type: string;
  start_date: string;
  end_date: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Verification {
  id: number;
  lecturer_id: number;
  module_type: string;
  module_id: number;
  status: 'pending' | 'verified' | 'rejected';
  notes?: string;
  verified_by?: number;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, unknown>;
}
