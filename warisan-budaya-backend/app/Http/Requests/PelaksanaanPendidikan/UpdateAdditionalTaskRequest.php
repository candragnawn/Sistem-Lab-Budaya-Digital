<?php

namespace App\Http\Requests\PelaksanaanPendidikan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdditionalTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'additional_task' => 'nullable|string|max:255',
            'work_unit' => 'nullable|string|max:255',
            'institution' => 'nullable|string|max:255',
            'start_date' => 'nullable|string|max:255',
            'end_date' => 'nullable|string|max:255',
        ];
    }
}
