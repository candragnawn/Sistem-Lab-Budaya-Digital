<?php

namespace App\Http\Requests\Kualifikasi;

use Illuminate\Foundation\Http\FormRequest;

class UpdateeducationsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Lecturer_id' => 'nullable|string|max:255',
            'entry_year' => 'nullable|string|max:255',
            'level' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'study_program' => 'nullable|string|max:255',
            'graduation_year' => 'nullable|string|max:255',
            'predicate' => 'nullable|string|max:255',
        ];
    }
}
