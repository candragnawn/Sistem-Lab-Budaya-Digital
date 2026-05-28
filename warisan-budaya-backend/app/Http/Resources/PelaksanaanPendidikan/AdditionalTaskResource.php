<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdditionalTaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'additional_task' => $this->additional_task,
            'work_unit' => $this->work_unit,
            'institution' => $this->institution,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
