<?php

namespace App\Http\Requests\Penunjang;

use Illuminate\Foundation\Http\FormRequest;

class StoreAwardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'award_name' => 'nullable|string|max:255',
            'award_type' => 'nullable|string|max:255',
            'institution' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
        ];
    }
}
