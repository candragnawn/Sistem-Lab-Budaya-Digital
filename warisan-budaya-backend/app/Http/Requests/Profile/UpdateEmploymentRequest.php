<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmploymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'nip' => 'nullable|string|max:255',
            'sk_cpns_number' => 'nullable|string|max:255',
            'sk_cpns_date' => 'nullable|string|max:255',
            'rank_group' => 'nullable|string|max:255',
            'sk_date' => 'nullable|string|max:255',
            'work_years' => 'nullable|string|max:255',
            'work_months' => 'nullable|string|max:255',
            'employment_status' => 'nullable|string|max:255',
            'active_status' => 'nullable|string|max:255',
        ];
    }
}
