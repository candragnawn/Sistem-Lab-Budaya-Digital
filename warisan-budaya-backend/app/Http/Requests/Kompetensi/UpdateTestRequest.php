<?php

namespace App\Http\Requests\Kompetensi;

use Illuminate\Foundation\Http\FormRequest;

class UpdatetestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Lecturer_id' => 'nullable|string|max:255',
            'test_name' => 'nullable|string|max:255',
            'test_score' => 'nullable|string|max:255',
            'organizer' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
        ];
    }
}
