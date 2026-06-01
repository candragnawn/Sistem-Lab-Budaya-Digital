<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkContractResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status_kerja' => $this->work_status,
            'status_saat_ini' => $this->current_status,
            'tmt' => $this->tmt,
        ];
    }
}
