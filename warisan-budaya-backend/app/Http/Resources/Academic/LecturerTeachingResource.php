<?php

namespace App\Http\Resources\Academic;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerTeachingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
        'id' => $this->id,
        'course_name' => $this->course_name,
        'course_type' => $this->course_type,
        'scientific_field' => $this->scientific_field,
        'class' => $this->class,
        'student_count' => $this->student_count,
        'credits' => $this->credits
        ];
    }
}
