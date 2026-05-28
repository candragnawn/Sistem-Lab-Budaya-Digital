<?php

namespace App\Http\Requests\PelaksanaanPengabdian;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJournalManagerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'journal_name' => 'nullable|string|max:255',
            'decree_number' => 'nullable|string|max:255',
            'effective_date' => 'nullable|string|max:255',
            'end_date' => 'nullable|string|max:255',
            'is_active' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
        ];
    }
}
