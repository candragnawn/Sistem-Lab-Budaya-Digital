import type {
  Lecturer, LecturerStat, Identity, Address, Family, Employment, Position,
  Rank, Inpassing, Placement, Contract, Education, Diklat, Certification,
  Test, Teaching, TeachingMaterial, Supervision, Examination, Development,
  AdditionalTask, Detasering, VisitingScientist, Research, Publication,
  AuthorPublication, HKI, CommunityService, Speaker, JournalManager,
  Award, ProfessionalMembership, OtherActivity, Allowance, Scholarship,
  Welfare, Category, Event, Verification, PaginatedResponse, PaginationParams,
  ApiResponse
} from '../types';
import axios from '../lib/axios';

// ============================================================
// GENERIC CRUD FUNCTIONS
// ============================================================

function createApiService<T>(endpoint: string) {
  return {
    getAll: (params?: PaginationParams) =>
      axios.get<PaginatedResponse<T>>(`/${endpoint}`, { params }),

    getOne: (id: number | string) =>
      axios.get<ApiResponse<T>>(`/${endpoint}/${id}`),

    create: (data: Partial<T>) =>
      axios.post<ApiResponse<T>>(`/${endpoint}`, data),

    update: (id: number | string, data: Partial<T>) =>
      axios.put<ApiResponse<T>>(`/${endpoint}/${id}`, data),

    delete: (id: number | string) =>
      axios.delete<ApiResponse<void>>(`/${endpoint}/${id}`),

    export: (format: 'csv' | 'excel' | 'pdf', params?: PaginationParams) =>
      axios.get(`/${endpoint}/export`, {
        params: { ...params, format },
        responseType: 'blob'
      }),
  };
}

// ============================================================
// LECTURER & STATS
// ============================================================

export const lecturerApi = {
  ...createApiService<Lecturer>('lecturers'),
  getStats: (id: number) =>
    axios.get<ApiResponse<LecturerStat>>(`/lecturers/${id}/stats`),
  getPublicProfile: (id: number) =>
    axios.get<ApiResponse<Lecturer & { stats: LecturerStat }>>(`/public/lecturers/${id}`),
  getAnalytics: (id: number) =>
    axios.get<ApiResponse<{ pub_trend: any[], research_trend: any[] }>>(`/public/lecturers/${id}/analytics`),
};

// ============================================================
// PROFILE MODULE
// ============================================================

export const identityApi = createApiService<Identity>('identity');
export const addressApi = createApiService<Address>('address');
export const familyApi = createApiService<Family>('family');
export const employmentApi = createApiService<Employment>('employment');
export const positionApi = createApiService<Position>('positions');
export const rankApi = createApiService<Rank>('ranks');
export const inpassingApi = createApiService<Inpassing>('inpassing');
export const placementApi = createApiService<Placement>('placements');
export const contractApi = createApiService<Contract>('contracts');

// ============================================================
// QUALIFICATION MODULE
// ============================================================

export const educationApi = createApiService<Education>('education');
export const diklatApi = createApiService<Diklat>('diklat');
export const certificationApi = createApiService<Certification>('certifications');
export const testApi = createApiService<Test>('tests');

// ============================================================
// EDUCATION IMPLEMENTATION MODULE
// ============================================================

export const teachingApi = createApiService<Teaching>('teaching');
export const teachingMaterialApi = createApiService<TeachingMaterial>('teaching-materials');
export const supervisionApi = createApiService<Supervision>('supervision');
export const examinationApi = createApiService<Examination>('examinations');
export const developmentApi = createApiService<Development>('development');
export const additionalTaskApi = createApiService<AdditionalTask>('additional-tasks');
export const detaseringApi = createApiService<Detasering>('detasering');
export const visitingScientistApi = createApiService<VisitingScientist>('visiting-scientists');

// ============================================================
// RESEARCH MODULE
// ============================================================

export const researchApi = createApiService<Research>('research');
export const publicationApi = createApiService<Publication>('publications');
export const publicPublicationApi = createApiService<Publication>('public/publications');
export const authorPublicationApi = createApiService<AuthorPublication>('author-publications');
export const hkiApi = createApiService<HKI>('hki');

// ============================================================
// COMMUNITY SERVICE MODULE
// ============================================================

export const communityServiceApi = createApiService<CommunityService>('community-service');
export const speakerApi = createApiService<Speaker>('speakers');
export const journalManagerApi = createApiService<JournalManager>('journal-managers');

// ============================================================
// SUPPORTING MODULE
// ============================================================

export const awardApi = createApiService<Award>('awards');
export const professionalMembershipApi = createApiService<ProfessionalMembership>('professional-memberships');
export const otherActivityApi = createApiService<OtherActivity>('other-activities');

// ============================================================
// REWARD MODULE
// ============================================================

export const allowanceApi = createApiService<Allowance>('allowances');
export const scholarshipApi = createApiService<Scholarship>('scholarships');
export const welfareApi = createApiService<Welfare>('welfare');

// ============================================================
// ADMIN MODULE
// ============================================================

export const categoryApi = createApiService<Category>('categories');
export const eventApi = createApiService<Event>('events');
export const verificationApi = {
  ...createApiService<Verification>('verifications'),
  approve: (id: number, notes?: string) =>
    axios.post<ApiResponse<Verification>>(`/verifications/${id}/approve`, { notes }),
  reject: (id: number, notes: string) =>
    axios.post<ApiResponse<Verification>>(`/verifications/${id}/reject`, { notes }),
};

// ============================================================
// AUTH
// ============================================================

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    axios.post<ApiResponse<{ token: string; user: Lecturer }>>('/auth/login', credentials),

  logout: () =>
    axios.post<ApiResponse<void>>('/auth/logout'),

  me: () =>
    axios.get<ApiResponse<Lecturer>>('/auth/me'),

  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) =>
    axios.post<ApiResponse<{ token: string; user: Lecturer }>>('/auth/register', data),
};
