<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OtherDataResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kunci_data' => $this->data_key,
            'nilai_data' => $this->data_value,
            'catatan' => $this->notes,
        ];
    }
}
