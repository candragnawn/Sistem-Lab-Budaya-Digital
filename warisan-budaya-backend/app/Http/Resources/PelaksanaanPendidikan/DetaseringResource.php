<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetaseringResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'target_university' => $this->target_university,
            'activity_category' => $this->activity_category,
            'assignment_decree_number' => $this->assignment_decree_number,
            'decree_date' => $this->decree_date,
        ];
    }
}
