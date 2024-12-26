<?php

namespace App\Http\Controllers\Api;

use Stripe\Stripe;
use App\Models\Order;
use Stripe\PaymentIntent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Coupon;
use ErrorException;

class OrderController extends Controller
{
    /**
     * Store new order
     */
    public function store(Request $request)
    {
        foreach ($request->books as $book) {
            $order = Order::create([
                'qty' => $book['qty'],
                'customer_id' => $request->user()->customer_id,
                'coupon_id' => $book['coupon_id'],
                'total_price' => $this->calculateTotal($book['price'],$book['qty'],$book['coupon_id']),
            ]);
            $order->books()->attach($book['book_id'], [
                'item_price' => $book['price'],
                'item_qty' => $book['qty'],
            ]);
            
        }
        return response()->json([
            'user' => UserResource::make($request->user())
        ]);
    }

    /**
     * Pay order using stripe
     */
    public function payOrderByStripe(Request $request)
    {
        Stripe::setApiKey("sk_test_51QZFTiA0hiX5Shx2bzArrCDWhg8aVujgTU4G8uX4B7jVnPEy6b222L8wdkEJEmqZtae3PSGMyfjhRnAqy7oCSHZS006uqnYOwU");
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $this->calculateOrderTotal($request->cartItems),
                'currency' => 'vnd',
                'description' => 'Aurora Bookstore'
            ]);
            //generate the client secret
            $output = [
                'clientSecret' => $paymentIntent->client_secret
            ];
            //send the client secret to the front end
            return response()->json($output);
        } catch (ErrorException $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function calculateOrderTotal($items)
    {
        $total = 0;
        foreach ($items as $item) {
            $total += $this->calculateTotal($item['price'],$item['qty'],$item['coupon_id']);
        }
        return $total * 100;
    }

    public function calculateTotal($price,$qty,$coupon_id)
    {
        $discount = 0;
        $total = $price * $qty;
        $coupon = Coupon::find($coupon_id);
        if($coupon) {
            if($coupon->checkIfValid()) {
                $discount = $total * $coupon->discount / 100;
            }
        }
        return $total - $discount;
    }
}