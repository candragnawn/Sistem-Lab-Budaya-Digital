<?php

namespace App\Http\Requests\PelaksanaanPendidikan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVisitingScientistRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'host_university' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'activity_date' => 'nullable|string|max:255',
        ];
    }
}
