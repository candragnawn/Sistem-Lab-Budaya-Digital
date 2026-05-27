<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'id' => $this -> id,
            'name' => $this->name,
            'email' => $this->email,
        ];

        if ($this->token) {
            $data['message'] = 'Login Success';
            $data['access_token'] = $this->token;
            $data['token_type'] = 'Bearer';
        }
        return $data;
    }
}
