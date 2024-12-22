<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'author_id' => $this->author_id,
            'author_name' => $this->author_name,
            'author_slug' => $this->author_slug,
            'yob' => $this->yob,
            'nationality' => $this->nationality,
            'author_img' => $this->author_img ? asset($this->author_img) : null, // Tạo URL đầy đủ cho ảnh
            'author_desc' => $this->author_desc,
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}
