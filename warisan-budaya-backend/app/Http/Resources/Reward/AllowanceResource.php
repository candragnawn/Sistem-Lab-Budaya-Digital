<?php

namespace App\Http\Resources\Reward;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllowanceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'allowance_type' => $this->allowance_type,
            'allowance_name' => $this->allowance_name,
            'granting_institution' => $this->granting_institution,
            'funding_source' => $this->funding_source,
            'start_year' => $this->start_year,
            'end_year' => $this->end_year,
            'amount' => $this->amount,
        ];
    }
}
