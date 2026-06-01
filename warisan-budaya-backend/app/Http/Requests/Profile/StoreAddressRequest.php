<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'rt' => 'nullable|string|max:255',
            'rw' => 'nullable|string|max:255',
            'village' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255',
        ];
    }
}
