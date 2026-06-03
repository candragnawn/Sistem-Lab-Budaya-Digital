<?php

namespace App\Http\Requests\Reward;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAllowanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'allowance_type' => 'nullable|string|max:255',
            'allowance_name' => 'nullable|string|max:255',
            'granting_institution' => 'nullable|string|max:255',
            'funding_source' => 'nullable|string|max:255',
            'start_year' => 'nullable|string|max:255',
            'end_year' => 'nullable|string|max:255',
            'amount' => 'nullable|string|max:255',
        ];
    }
}
