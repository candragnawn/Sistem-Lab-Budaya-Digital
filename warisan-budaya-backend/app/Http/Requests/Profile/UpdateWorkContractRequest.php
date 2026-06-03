<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWorkContractRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'work_status' => 'nullable|string|max:255',
            'current_status' => 'nullable|string|max:255',
            'tmt' => 'nullable|string|max:255',
        ];
    }
}
