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
            'alamat' => $this->address,
            'rt' => $this->rt,
            'rw' => $this->rw,
            'kelurahan' => $this->village,
            'kecamatan' => $this->district,
            'provinsi' => $this->province,
            'kode_pos' => $this->postal_code,
            'nomor_telepon' => $this->phone_number,
        ];
    }
}
