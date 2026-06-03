<?php

namespace App\Http\Requests\Reward;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWelfareRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'welfare_type' => 'nullable|string|max:255',
            'welfare_service' => 'nullable|string|max:255',
            'organizer' => 'nullable|string|max:255',
            'start_year' => 'nullable|string|max:255',
            'selection_year' => 'nullable|string|max:255',
        ];
    }
}
