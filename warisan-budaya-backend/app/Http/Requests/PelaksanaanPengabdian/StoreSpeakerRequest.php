<?php

namespace App\Http\Requests\PelaksanaanPengabdian;

use Illuminate\Foundation\Http\FormRequest;

class StoreSpeakerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lecturer_id' => 'nullable|string|max:255',
            'activity_category' => 'nullable|string|max:255',
            'paper_title' => 'nullable|string|max:255',
            'guest_lecturer_name' => 'nullable|string|max:255',
            'organizer' => 'nullable|string|max:255',
            'activity_date' => 'nullable|string|max:255',
        ];
    }
}
