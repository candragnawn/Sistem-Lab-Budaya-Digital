<?php

namespace App\Http\Requests\PelaksanaanPenelitian;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResearchRequest extends FormRequest
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
            'scientific_field' => 'nullable|string|max:255',
            'implementation_year' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
        ];
    }
}
