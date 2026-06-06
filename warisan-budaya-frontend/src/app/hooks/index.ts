import { createResourceHooks } from './useApi';
import {
  lecturerApi, identityApi, addressApi, familyApi, employmentApi, positionApi,
  rankApi, inpassingApi, placementApi, contractApi, educationApi, diklatApi,
  certificationApi, testApi, teachingApi, teachingMaterialApi, supervisionApi,
  examinationApi, developmentApi, additionalTaskApi, detaseringApi,
  visitingScientistApi, researchApi, publicationApi, authorPublicationApi,
  hkiApi, communityServiceApi, speakerApi, journalManagerApi, awardApi,
  professionalMembershipApi, otherActivityApi, allowanceApi, scholarshipApi,
  welfareApi, categoryApi, eventApi, verificationApi,
} from '../services/api';

import type {
  Lecturer, Identity, Address, Family, Employment, Position, Rank, Inpassing,
  Placement, Contract, Education, Diklat, Certification, Test, Teaching,
  TeachingMaterial, Supervision, Examination, Development, AdditionalTask,
  Detasering, VisitingScientist, Research, Publication, AuthorPublication,
  HKI, CommunityService, Speaker, JournalManager, Award, ProfessionalMembership,
  OtherActivity, Allowance, Scholarship, Welfare, Category, Event, Verification,
} from '../types';

// ============================================================
// LECTURER & STATS
// ============================================================

export const useLecturers = createResourceHooks<Lecturer>('lecturers', lecturerApi);

// ============================================================
// PROFILE MODULE
// ============================================================

export const useIdentity = createResourceHooks<Identity>('identity', identityApi);
export const useAddress = createResourceHooks<Address>('address', addressApi);
export const useFamily = createResourceHooks<Family>('family', familyApi);
export const useEmployment = createResourceHooks<Employment>('employment', employmentApi);
export const usePosition = createResourceHooks<Position>('positions', positionApi);
export const useRank = createResourceHooks<Rank>('ranks', rankApi);
export const useInpassing = createResourceHooks<Inpassing>('inpassing', inpassingApi);
export const usePlacement = createResourceHooks<Placement>('placements', placementApi);
export const useContract = createResourceHooks<Contract>('contracts', contractApi);

// ============================================================
// QUALIFICATION MODULE
// ============================================================

export const useEducation = createResourceHooks<Education>('education', educationApi);
export const useDiklat = createResourceHooks<Diklat>('diklat', diklatApi);
export const useCertification = createResourceHooks<Certification>('certifications', certificationApi);
export const useTest = createResourceHooks<Test>('tests', testApi);

// ============================================================
// EDUCATION IMPLEMENTATION MODULE
// ============================================================

export const useTeaching = createResourceHooks<Teaching>('teaching', teachingApi);
export const useTeachingMaterial = createResourceHooks<TeachingMaterial>('teaching-materials', teachingMaterialApi);
export const useSupervision = createResourceHooks<Supervision>('supervision', supervisionApi);
export const useExamination = createResourceHooks<Examination>('examinations', examinationApi);
export const useDevelopment = createResourceHooks<Development>('development', developmentApi);
export const useAdditionalTask = createResourceHooks<AdditionalTask>('additional-tasks', additionalTaskApi);
export const useDetasering = createResourceHooks<Detasering>('detasering', detaseringApi);
export const useVisitingScientist = createResourceHooks<VisitingScientist>('visiting-scientists', visitingScientistApi);

// ============================================================
// RESEARCH MODULE
// ============================================================

export const useResearch = createResourceHooks<Research>('research', researchApi);
export const usePublication = createResourceHooks<Publication>('publications', publicationApi);
export const useAuthorPublication = createResourceHooks<AuthorPublication>('author-publications', authorPublicationApi);
export const useHKI = createResourceHooks<HKI>('hki', hkiApi);

// ============================================================
// COMMUNITY SERVICE MODULE
// ============================================================

export const useCommunityService = createResourceHooks<CommunityService>('community-service', communityServiceApi);
export const useSpeaker = createResourceHooks<Speaker>('speakers', speakerApi);
export const useJournalManager = createResourceHooks<JournalManager>('journal-managers', journalManagerApi);

// ============================================================
// SUPPORTING MODULE
// ============================================================

export const useAward = createResourceHooks<Award>('awards', awardApi);
export const useProfessionalMembership = createResourceHooks<ProfessionalMembership>('professional-memberships', professionalMembershipApi);
export const useOtherActivity = createResourceHooks<OtherActivity>('other-activities', otherActivityApi);

// ============================================================
// REWARD MODULE
// ============================================================

export const useAllowance = createResourceHooks<Allowance>('allowances', allowanceApi);
export const useScholarship = createResourceHooks<Scholarship>('scholarships', scholarshipApi);
export const useWelfare = createResourceHooks<Welfare>('welfare', welfareApi);

// ============================================================
// ADMIN MODULE
// ============================================================

export const useCategory = createResourceHooks<Category>('categories', categoryApi);
export const useEvent = createResourceHooks<Event>('events', eventApi);
export const useVerification = createResourceHooks<Verification>('verifications', verificationApi);
