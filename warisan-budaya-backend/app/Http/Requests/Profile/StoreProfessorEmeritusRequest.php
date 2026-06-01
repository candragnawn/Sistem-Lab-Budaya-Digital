<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class StoreProfessorEmeritusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'title_name' => 'nullable|string|max:255',
            'university' => 'nullable|string|max:255',
            'start_date' => 'nullable|string|max:255',
            'end_date' => 'nullable|string|max:255',
        ];
    }
}
