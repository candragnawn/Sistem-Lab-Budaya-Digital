<?php

namespace App\Http\Requests\PelaksanaanPendidikan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentSupervisionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'semester' => 'nullable|string|max:255',
            'activity_category' => 'nullable|string|max:255',
            'supervision_type' => 'nullable|string|max:255',
            'scientific_field' => 'nullable|string|max:255',
            'study_program' => 'nullable|string|max:255',
        ];
    }
}
