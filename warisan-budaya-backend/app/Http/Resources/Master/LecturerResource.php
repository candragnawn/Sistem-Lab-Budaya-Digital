<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id'          => $this->id,
        'nidn'        => $this->nidn,
        'nip'         => $this->nip,
        'name'        => $this->name,
        'title_prefix' => $this->title_prefix,
        'title_suffix' => $this->title_suffix,
        'nama_lengkap' => trim(($this->title_prefix ? $this->title_prefix . ' ' : '') . $this->name . ($this->title_suffix ? ', ' . $this->title_suffix : '')),
        'email'       => $this->email,
        'phone'       => $this->phone,
        'bio'         => $this->bio,
        'gender'      => $this->gender,
        'birth_date'  => $this->birth_date,
        'birth_place' => $this->birth_place,
        'status'      => $this->status,
        'photo_url'   => $this->photo_url,
        'faculty'     => $this->faculty,
        'department'  => $this->department,
        'study_program' => $this->study_program,
        'sinta_id'    => $this->sinta_id,
        'scopus_id'   => $this->scopus_id,
        'google_scholar_id' => $this->google_scholar_id,
        'orcid_id'    => $this->orcid_id,
        'sister_id'   => $this->sister_id,
        'sinta_score_3yr'   => $this->sinta_score_3yr,
        'sinta_score_total' => $this->sinta_score_total,
        'is_verified' => $this->is_verified,
        'created_at'  => $this->created_at?->format('Y-m-d H:i:s'),

        // Stats — hanya muncul kalau relasi stats di-load
        'statistik' => $this->when($this->relationLoaded('stats'), function () {
            return [
                'jurnal'     => $this->stats->jurnal_count ?? 0,
                'buku'       => $this->stats->buku_count ?? 0,
                'hki'        => $this->stats->hki_count ?? 0,
                'pengabdian' => $this->stats->pengabdian_count ?? 0,
            ];
        }),

        // Count relations — ?with_count=publications,teachings
        'publications_count' => $this->whenCounted('publications'),
        'teachings_count'    => $this->whenCounted('teachings'),

        // Relations — hanya muncul jika di-request via ?include=
        'academic'         => $this->whenLoaded('academic'),
        'addresses'        => $this->whenLoaded('addresses'),
        'families'         => $this->whenLoaded('families'),
        'identities'       => $this->whenLoaded('identities'),
        'inpassings'       => $this->whenLoaded('inpassings'),
        'stats'            => $this->whenLoaded('stats'),
        'placements'       => $this->whenLoaded('placements'),
        'positions'        => $this->whenLoaded('positions'),
        'professorEmeritus' => $this->whenLoaded('professorEmeritus'),
        'ranks'            => $this->whenLoaded('ranks'),
        'workContracts'    => $this->whenLoaded('workContracts'),
        'hki'              => $this->whenLoaded('hki'),
        'publicationAuthors' => $this->whenLoaded('publicationAuthors'),
        'teachings'        => $this->whenLoaded('teachings'),
        'teachingActivities' => $this->whenLoaded('teachingActivities'),
        'teachingMaterials' => $this->whenLoaded('teachingMaterials'),
        'detaserings'      => $this->whenLoaded('detaserings'),
        'academicOrations' => $this->whenLoaded('academicOrations'),
        'additionalTasks'  => $this->whenLoaded('additionalTasks'),
        'lectureMentorings' => $this->whenLoaded('lectureMentorings'),
        'studentDevelopments' => $this->whenLoaded('studentDevelopments'),
        'studentExaminations' => $this->whenLoaded('studentExaminations'),
        'studentSupervisions' => $this->whenLoaded('studentSupervisions'),
        'visitingScientists' => $this->whenLoaded('visitingScientists'),
        'communityServices' => $this->whenLoaded('communityServices'),
        'journalManagers'  => $this->whenLoaded('journalManagers'),
        'speakers'         => $this->whenLoaded('speakers'),
        'structuralPositions' => $this->whenLoaded('structuralPositions'),
        'publications'     => $this->whenLoaded('publications'),
        'research'         => $this->whenLoaded('research'),
        'diklats'          => $this->whenLoaded('diklats'),
        'certifications'   => $this->whenLoaded('certifications'),
        'competencyTests'  => $this->whenLoaded('competencyTests'),
        'awards'           => $this->whenLoaded('awards'),
        'otherSupportingActivities' => $this->whenLoaded('otherSupportingActivities'),
        'professionalMemberships'   => $this->whenLoaded('professionalMemberships'),
        'allowances'       => $this->whenLoaded('allowances'),
        'scholarships'     => $this->whenLoaded('scholarships'),
        'welfares'         => $this->whenLoaded('welfares'),

        // Alias lama untuk backward compat
        'riwayat_pendidikan'  => $this->whenLoaded('education'),
        'riwayat_golongan'    => $this->whenLoaded('ranks'),
        'riwayat_jabatan'     => $this->whenLoaded('positions'),
        'riwayat_ikatan_kerja' => $this->whenLoaded('workContracts'),
        'riwayat_mengajar'    => $this->whenLoaded('teachings'),
        'publikasi'           => $this->whenLoaded('publications'),
        'keluarga'            => $this->whenLoaded('families'),
        'penelitian'          => $this->whenLoaded('research'),
        ];
    }
}
