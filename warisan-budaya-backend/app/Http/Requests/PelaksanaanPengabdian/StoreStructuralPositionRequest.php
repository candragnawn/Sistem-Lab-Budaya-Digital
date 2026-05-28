<?php

namespace App\Http\Requests\PelaksanaanPengabdian;

use Illuminate\Foundation\Http\FormRequest;

class StoreStructuralPositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'structural_position' => 'nullable|string|max:255',
            'decree_number' => 'nullable|string|max:255',
            'start_date' => 'nullable|string|max:255',
            'end_date' => 'nullable|string|max:255',
        ];
    }
}
