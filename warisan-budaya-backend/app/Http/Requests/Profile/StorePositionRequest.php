<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class StorePositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'civil_servant_status' => $this->input('civil_servant_status', '-'),
        ]);
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'functional_position' => 'nullable|string|max:255',
            'decree_number' => 'nullable|string|max:255',
            'decree_date' => 'nullable|date',
            'effective_date' => 'nullable|date',
            'civil_servant_status' => 'nullable|string|max:255',
        ];
    }
}
