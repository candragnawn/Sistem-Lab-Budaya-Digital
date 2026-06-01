<?php

namespace App\Http\Requests\Kualifikasi;

use Illuminate\Foundation\Http\FormRequest;

class UpdatediklatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'training_name' => 'nullable|string|max:255',
            'training_type' => 'nullable|string|max:255',
            'organizer' => 'nullable|string|max:255',
            'year' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
        ];
    }
}
