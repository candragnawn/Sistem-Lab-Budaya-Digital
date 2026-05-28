<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmploymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nip' => $this->nip,
            'sk_cpns_number' => $this->sk_cpns_number,
            'sk_cpns_date' => $this->sk_cpns_date,
            'rank_group' => $this->rank_group,
            'sk_date' => $this->sk_date,
            'work_years' => $this->work_years,
            'work_months' => $this->work_months,
            'employment_status' => $this->employment_status,
            'active_status' => $this->active_status,
        ];
    }
}
