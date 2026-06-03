<?php

namespace App\Http\Requests\PelaksanaanPendidikan;

use Illuminate\Foundation\Http\FormRequest;

class StoreDetaseringRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'target_university' => 'nullable|string|max:255',
            'activity_category' => 'nullable|string|max:255',
            'assignment_decree_number' => 'nullable|string|max:255',
            'decree_date' => 'nullable|string|max:255',
        ];
    }
}
