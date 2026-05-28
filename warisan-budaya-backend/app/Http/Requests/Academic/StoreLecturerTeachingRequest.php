<?php

namespace App\Http\Requests\Academic;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLecturerTeachingRequest extends FormRequest
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
            'course_name' => 'nullable|string|max:255',
            'course_type' => 'nullable|string|max:255',
            'scientific_field' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
            'student_count' => 'nullable|integer',
            'credits' => 'nullable|integer'
        ];
    }
}
