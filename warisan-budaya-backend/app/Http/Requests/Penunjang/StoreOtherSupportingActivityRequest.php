<?php

namespace App\Http\Requests\Penunjang;

use Illuminate\Foundation\Http\FormRequest;

class StoreOtherSupportingActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'activity_name' => 'nullable|string|max:255',
            'organizing_institution' => 'nullable|string|max:255',
            'decree_number' => 'nullable|string|max:255',
            'start_date' => 'nullable|string|max:255',
            'end_date' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
        ];
    }
}
