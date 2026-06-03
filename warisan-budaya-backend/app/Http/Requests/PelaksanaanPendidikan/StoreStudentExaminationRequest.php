<?php

namespace App\Http\Requests\PelaksanaanPendidikan;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentExaminationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'examination_title' => 'nullable|string|max:255',
            'scientific_field' => 'nullable|string|max:255',
            'examination_type' => 'nullable|string|max:255',
            'study_program' => 'nullable|string|max:255',
        ];
    }
}
