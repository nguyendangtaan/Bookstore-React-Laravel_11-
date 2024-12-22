<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AuthorResource;
use App\Http\Resources\AuthorBookResource;
use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AuthorResource::collection(
            Author::latest('created_at')->paginate(12)
        );
    }

    /**
     * Display a listing of the resource for main page
     */
    public function authorBook($id)
    {
        $author = Author::with('books')->findOrFail($id);

        // Trả về thông tin chi tiết của tác giả
        return response()->json([
            'success' => true,
            'data' => [
                'author' => new AuthorBookResource($author), // Resource cho tác giả
            ]
        ], 200);
    }

}
