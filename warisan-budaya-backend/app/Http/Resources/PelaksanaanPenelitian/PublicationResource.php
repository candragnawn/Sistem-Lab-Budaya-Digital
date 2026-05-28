<?php

namespace App\Http\Resources\PelaksanaanPenelitian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'publication_author_id' => $this->publication_author_id,
            'title' => $this->title,
            'category' => $this->category,
            'type' => $this->type,
            'source' => $this->source,
            'quartile' => $this->quartile,
            'document_url' => $this->document_url,
            'is_verified' => $this->is_verified,
            'year' => $this->year,
            'url' => $this->url,
        ];
    }
}
