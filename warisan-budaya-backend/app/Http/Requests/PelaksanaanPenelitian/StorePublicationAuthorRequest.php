<?php

namespace App\Http\Requests\PelaksanaanPenelitian;

use Illuminate\Foundation\Http\FormRequest;

class StorePublicationAuthorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'publication_id' => 'nullable|string|max:255',
            'author_position' => 'nullable|string|max:255',
        ];
    }
}
