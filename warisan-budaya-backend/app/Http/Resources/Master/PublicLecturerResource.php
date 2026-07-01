<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicLecturerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nidn' => $this->nidn,
            'nip' => $this->nip,
            'name' => $this->name,
            'title_prefix' => $this->title_prefix,
            'title_suffix' => $this->title_suffix,
            'faculty' => $this->faculty,
            'department' => $this->department,
            'study_program' => $this->study_program,
            'bio' => $this->bio,
            'gender' => $this->gender,
            'status' => $this->status,
            'photo_url' => $this->photo_url,
            'is_verified' => $this->is_verified,
            'sinta_id' => $this->sinta_id,
            'scopus_id' => $this->scopus_id,
            'sister_id' => $this->sister_id,
            'google_scholar_id' => $this->google_scholar_id,
            'orcid_id' => $this->orcid_id,
            'sinta_score_3yr' => $this->sinta_score_3yr,
            'sinta_score_total' => $this->sinta_score_total,
            'publications_count' => $this->whenCounted('publications'),
            'research_count' => $this->whenCounted('research'),
            'teachings_count' => $this->whenCounted('teachings'),
            'communityServices_count' => $this->whenCounted('communityServices'),
            
            // Relations
            'academic' => $this->whenLoaded('academic'),
            'addresses' => $this->whenLoaded('addresses'),
            'families' => $this->whenLoaded('families'),
            'identities' => $this->whenLoaded('identities'),
            'inpassings' => $this->whenLoaded('inpassings'),
            'stats' => $this->whenLoaded('stats'),
            'otherData' => $this->whenLoaded('otherData'),
            'placements' => $this->whenLoaded('placements'),
            'positions' => $this->whenLoaded('positions'),
            'professorEmeritus' => $this->whenLoaded('professorEmeritus'),
            'ranks' => $this->whenLoaded('ranks'),
            'workContracts' => $this->whenLoaded('workContracts'),
            'hki' => $this->whenLoaded('hki'),
            'publicationAuthors' => $this->whenLoaded('publicationAuthors'),
            'teachings' => $this->whenLoaded('teachings'),
            'detaserings' => $this->whenLoaded('detaserings'),
            'academicOrations' => $this->whenLoaded('academicOrations'),
            'additionalTasks' => $this->whenLoaded('additionalTasks'),
            'lectureMentorings' => $this->whenLoaded('lectureMentorings'),
            'studentDevelopments' => $this->whenLoaded('studentDevelopments'),
            'studentExaminations' => $this->whenLoaded('studentExaminations'),
            'studentSupervisions' => $this->whenLoaded('studentSupervisions'),
            'teachingActivities' => $this->whenLoaded('teachingActivities'),
            'teachingMaterials' => $this->whenLoaded('teachingMaterials'),
            'visitingScientists' => $this->whenLoaded('visitingScientists'),
            'communityServices' => $this->whenLoaded('communityServices'),
            'journalManagers' => $this->whenLoaded('journalManagers'),
            'speakers' => $this->whenLoaded('speakers'),
            'structuralPositions' => $this->whenLoaded('structuralPositions'),
            'publications' => $this->whenLoaded('publications'),
            'research' => $this->whenLoaded('research'),
            'diklats' => $this->whenLoaded('diklats'),
            'certifications' => $this->whenLoaded('certifications'),
            'competencyTests' => $this->whenLoaded('competencyTests'),
            'awards' => $this->whenLoaded('awards'),
            'otherSupportingActivities' => $this->whenLoaded('otherSupportingActivities'),
            'professionalMemberships' => $this->whenLoaded('professionalMemberships'),
            'allowances' => $this->whenLoaded('allowances'),
            'scholarships' => $this->whenLoaded('scholarships'),
            'welfares' => $this->whenLoaded('welfares'),
        ];
    }
}
