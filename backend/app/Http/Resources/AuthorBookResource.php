<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthorBookResource extends JsonResource
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
            'author_img' => $this->author_img ? asset($this->author_img) : null, // URL ảnh đầy đủ
            'author_desc' => $this->author_desc,
            'created_at' => $this->created_at->format('Y-m-d'),
            'books' => $this->books->map(function ($book) {
                return [
                    'book_id' => $book->id,
                    'book_title' => $book->title,
                    'book_slug' => $book->slug,
                    'published_year' => $book->published_year,
                    'genre_name' => $book->genre->name ?? null, // Kiểm tra quan hệ genre
                    'book_img' => $book->book_img ? asset($book->book_img) : null,
                    'book_desc' => $book->description,
                    'created_at' => $book->created_at->format('Y-m-d'),
                    'updated_at' => $book->updated_at->format('Y-m-d'),
                    'rating' => $book->rating,
                    'reviews_count' => $book->reviews_count,
                ];
            }),
        ];
    }
}
