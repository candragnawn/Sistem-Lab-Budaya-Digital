<?php

namespace App\Http\Requests\Academic;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLecturerStudyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'entry_year' => 'nullable|integer',
            'level' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'study_program' => 'nullable|string|max:255',
            'scholarship' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'Types_of_Learning' => 'nullable|string|max:255',
        ];
    }
}
