<?php

namespace App\Http\Requests\PelaksanaanPendidikan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeachingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'course_name' => 'nullable|string|max:255',
            'course_type' => 'nullable|string|max:255',
            'scientific_field' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
            'student_count' => 'nullable|string|max:255',
            'credits' => 'nullable|string|max:255',
        ];
    }
}
