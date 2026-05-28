<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RankResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'group_code' => $this->group_code,
            'rank_name' => $this->rank_name,
            'sk_number' => $this->sk_number,
            'sk_date' => $this->sk_date,
            'tmt' => $this->tmt,
            'received_date' => $this->received_date,
        ];
    }
}
