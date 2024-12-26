<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
           'order_id' => $this->order_id,
            'customer' => $this->customer,
            'books' => $this->books,
            'coupon' => $this->coupon,
            'total_price' => $this->total_price,
            'qty' => $this->qty,
            'created_at' => $this->created_at,
            'delivered_at' => $this->delivered_at ? $this->delivered_at : null
        ];
    }
}
