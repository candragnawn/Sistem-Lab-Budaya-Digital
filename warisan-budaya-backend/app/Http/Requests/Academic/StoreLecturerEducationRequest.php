<?php

namespace App\Http\Requests\Academic;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLecturerEducationRequest extends FormRequest
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
            'country' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'study_program' => 'nullable|string|max:255',
            'study_type' => 'nullable|string|max:255',
            'scholarship' => 'nullable|string|max:255',
            'graduation_year' => 'nullable|integer',
            'predicate' => 'nullable|string|max:255'            
        ];
    }
}
