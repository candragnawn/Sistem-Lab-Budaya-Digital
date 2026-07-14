<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Master\LecturerResource;

class UserResource extends JsonResource
{
    protected $token;

    public function __construct($resource, $token = null)
    {
        parent::__construct($resource);
        $this->token = $token;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'nama' => $this->name,
            'email' => $this->email,
            'lecturer_id' => $this->lecturer_id,
            'role' => $this->role,
            'avatar_path' => $this->avatar_path,
            'avatar_url'  => $this->avatar_path ? asset('storage/' . $this->avatar_path) : null,
            'lecturer'    => new LecturerResource($this->whenLoaded('lecturer')),
        ];

        if ($this->token) {
            $data['message'] = 'Login Success';
            $data['access_token'] = $this->token;
            $data['token_type'] = 'Bearer';
        }
        return $data;
    }
}
