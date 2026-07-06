<?php

namespace App\Http\Requests\PelaksanaanPenelitian;

use Illuminate\Foundation\Http\FormRequest;

class StorePublicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'publication_author_id' => 'nullable|string|max:255',
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'source' => 'required|string|max:255',
            'quartile' => 'nullable|string|max:255',
            'journal_name' => 'nullable|string|max:255',
            'issn' => 'nullable|string|max:255',
            'doi' => 'nullable|string|max:255',
            'is_verified' => 'required|boolean',
            'year' => 'required|string|max:255',
            'url' => 'nullable|file|mimes:pdf|max:2048',
        ];
    }
}
