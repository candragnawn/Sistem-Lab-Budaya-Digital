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
            'work_status' => $this->work_status,
            'current_status' => $this->current_status,
            'tmt' => $this->tmt,
        ];
    }
}
