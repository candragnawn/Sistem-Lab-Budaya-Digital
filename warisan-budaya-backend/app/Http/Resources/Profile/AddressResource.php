<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'address' => $this->address,
            'rt' => $this->rt,
            'rw' => $this->rw,
            'village' => $this->village,
            'district' => $this->district,
            'province' => $this->province,
            'postal_code' => $this->postal_code,
            'phone_number' => $this->phone_number,
        ];
    }
}
