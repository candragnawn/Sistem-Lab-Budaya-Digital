<?php

namespace App\Http\Requests\Reward;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScholarshipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'scholarship_type' => 'nullable|string|max:255',
            'scholarship_name' => 'nullable|string|max:255',
            'start_year' => 'nullable|string|max:255',
            'end_year' => 'nullable|string|max:255',
            'is_active' => 'nullable|string|max:255',
        ];
    }
}
