<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class StorePlacementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'education_level' => $this->input('education_level', '-'),
        ]);
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'status' => 'nullable|string|max:255',
            'employment_bond' => 'nullable|string|max:255',
            'education_level' => 'nullable|string|max:255',
            'unit' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'start_date' => 'nullable|string|max:255',
            'exit_date' => 'nullable|string|max:255',
            'end_date' => 'nullable|string|max:255',
            'assignment_homebase' => 'nullable|string|max:255',
        ];
    }
}
