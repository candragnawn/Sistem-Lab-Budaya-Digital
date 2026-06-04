<?php

namespace App\Http\Requests\Master;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLecturerRequest extends FormRequest
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
            //
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
