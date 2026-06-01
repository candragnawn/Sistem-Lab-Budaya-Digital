<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcademicResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rumpun_ilmu' => $this->science_cluster,
            'pohon_ilmu' => $this->science_tree,
            'cabang_ilmu' => $this->science_branch,
            'sinta_id' => $this->sinta_id,
        ];
    }
}
