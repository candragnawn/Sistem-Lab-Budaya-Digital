<?php

namespace App\Http\Requests\Kompetensi;

use Illuminate\Foundation\Http\FormRequest;

class StorecertificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'certification_type' => 'nullable|string|max:255',
            'study_type' => 'nullable|string|max:255',
            'educator_registration_number' => 'nullable|string|max:255',
            'certificate_sk_number' => 'nullable|string|max:255',
            'certification_year' => 'nullable|string|max:255',
        ];
    }
}
