<?php

namespace App\Http\Requests\PelaksanaanPenelitian;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePublicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'publication_author_id' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'quartile' => 'nullable|string|max:255',
            'journal_name' => 'nullable|string|max:255',
            'issn' => 'nullable|string|max:255',
            'doi' => 'nullable|string|max:255',
            'is_verified' => 'required|boolean',
            'year' => 'nullable|string|max:255',
            'url' => 'required|file|mimes:pdf|max:2048',
        ];
    }
}
