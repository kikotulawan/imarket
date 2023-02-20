<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{User, Order};

class RiderController extends Controller
{
    public function _construct()
    {
        $this->middleware('auth:api');
    }

    public function allOrders()
    {
        $orders = Order::with(['content', 'buyer.user.address', 'content.product.product_info'])->get();
        return response()->json($orders);
    }

    public function orderInfo($id)
    {
        $order = Order::where('id', $id)->with(['content', 'buyer.user.address', 'content.product.product_info'])->first();
        return response()->json($order);
    }

    public function acceptOrder($id)
    {
        $order = Order::where('id', $id)->with(['content', 'buyer.user.address', 'content.product.product_info'])->first();
        $order->update([
            'status' => 'Your order is on its way'
        ]);
        return response()->json($order);
    }
    
    public function completeOrder($id)
    {
        $order = Order::where('id', $id)->with(['content', 'buyer.user.address', 'content.product.product_info'])->first();
        $order->update([
            'status' => 'Order delivered'
        ]);
        return response()->json($order);
    }
}
