<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class StoreAcademicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|exists:lecturers,id',
            'science_cluster' => 'nullable|string|max:255',
            'science_tree' => 'nullable|string|max:255',
            'science_branch' => 'nullable|string|max:255',
            'sinta_id' => 'nullable|string|max:255',
        ];
    }
}
