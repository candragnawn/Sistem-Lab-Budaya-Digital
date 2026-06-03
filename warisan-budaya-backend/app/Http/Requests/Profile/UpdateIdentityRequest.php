<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIdentityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'nik' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:255',
            'citizenship' => 'nullable|string|max:255',
            'npwp' => 'nullable|string|max:255',
        ];
    }
}
