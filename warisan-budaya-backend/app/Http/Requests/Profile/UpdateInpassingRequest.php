<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInpassingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'rank_group' => 'nullable|string|max:255',
            'decree_number' => 'nullable|string|max:255',
            'effective_date' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:255',
        ];
    }
}
