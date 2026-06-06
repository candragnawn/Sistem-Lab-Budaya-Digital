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
            'name' => $this->name,
            'title_prefix' => $this->title_prefix,
            'title_suffix' => $this->title_suffix,
            'nidn' => $this->nidn,
            'nip' => $this->nip,
            'email' => $this->email,
            'phone' => $this->phone,
            'photo_url' => $this->photo_url,
            'photo_path' => $this->photo_path,
            'faculty' => $this->faculty,
            'department' => $this->department,
            'study_program' => $this->study_program,
            'bio' => $this->bio,
            'status' => $this->status,
            'sinta_id' => $this->sinta_id,
            'scopus_id' => $this->scopus_id,
            'google_scholar_id' => $this->google_scholar_id,
            'orcid_id' => $this->orcid_id,
            'stats' => $this->stats,
            'publications_count' => $this->publications_count,
        ];
    }
}
