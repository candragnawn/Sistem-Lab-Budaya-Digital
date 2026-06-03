<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class StoreOtherDataRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'data_key' => 'nullable|string|max:255',
            'data_value' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:255',
        ];
    }
}
