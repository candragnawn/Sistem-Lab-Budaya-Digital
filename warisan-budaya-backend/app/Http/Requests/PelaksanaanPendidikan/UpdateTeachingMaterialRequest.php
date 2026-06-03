<?php

namespace App\Http\Requests\PelaksanaanPendidikan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeachingMaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'title' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:255',
            'publication_date' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
        ];
    }
}
