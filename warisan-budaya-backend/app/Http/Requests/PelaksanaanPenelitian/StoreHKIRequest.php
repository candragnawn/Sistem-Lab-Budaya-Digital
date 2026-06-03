<?php

namespace App\Http\Requests\PelaksanaanPenelitian;

use Illuminate\Foundation\Http\FormRequest;

class StoreHKIRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'hki_type' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'quartile' => 'nullable|string|max:255',
            'certificate_number' => 'nullable|string|max:255',
            'publish_date' => 'nullable|date',
        ];
    }
}
