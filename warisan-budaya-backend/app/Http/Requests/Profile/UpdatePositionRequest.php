<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'position_name' => 'nullable|string|max:255',
            'sk_number' => 'nullable|string|max:255',
            'sk_date' => 'nullable|string|max:255',
            'tmt' => 'nullable|string|max:255',
        ];
    }
}
