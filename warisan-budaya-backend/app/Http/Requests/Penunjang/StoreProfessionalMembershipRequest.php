<?php

namespace App\Http\Requests\Penunjang;

use Illuminate\Foundation\Http\FormRequest;

class StoreProfessionalMembershipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'organization_name' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'membership_start' => 'nullable|string|max:255',
            'membership_end' => 'nullable|string|max:255',
            'professional_institution' => 'nullable|string|max:255',
        ];
    }
}
