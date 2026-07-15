<?php

namespace App\Http\Requests\Master;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLecturerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'is_verified' => 'sometimes|boolean',
            'nidn' => 'nullable|string|max:255',
            'nip' => 'nullable|string|max:255',
            'name' => 'nullable|string|max:255',
            'name_registered_dukcapil' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'title_prefix' => 'nullable|string|max:255',
            'title_suffix' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'birth_place' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'faculty' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'study_program' => 'nullable|string|max:255',
            'sinta_id' => 'nullable|string|max:255',
            'scopus_id' => 'nullable|string|max:255',
            'sister_id' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'required' => 'Kolom :attribute wajib diisi.',
            'unique' => 'Data :attribute sudah terdaftar di sistem.',
            'exists' => 'Data :attribute yang dipilih tidak valid atau tidak ditemukan.',
            'email' => 'Format :attribute harus berupa alamat email yang valid.',
            'max' => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
            'name.required' => 'Nama dosen wajib diisi.',
        ];
    }
}
