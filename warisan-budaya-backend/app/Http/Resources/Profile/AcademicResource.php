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
            'science_cluster' => $this->science_cluster,
            'science_tree' => $this->science_tree,
            'science_branch' => $this->science_branch,
            'sinta_id' => $this->sinta_id,
        ];
    }
}
