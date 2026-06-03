<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLecturerStatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'total_publications' => 'nullable|string|max:255',
            'total_citations' => 'nullable|string|max:255',
            'total_students' => 'nullable|string|max:255',
        ];
    }
}
