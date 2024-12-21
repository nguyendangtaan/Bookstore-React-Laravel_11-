@extends('admin.layouts.app')

@section('title')
    Mã giảm giá
@endsection

@section('content')
<div class="row">
    @include('admin.layouts.sidebar')
    <div class="col-md-9">
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h3 class="mt-2">Mã giảm giá ({{$coupons->count()}})</h3>
                    <a href="{{route('admin.coupons.create')}}" class="btn btn-sm btn-primary">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <hr>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Trị giá</th>
                                <th scope="col">Hiệu lực</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($coupons as $key => $coupon)
                                <tr>
                                    <th scope="row">{{$key += 1}}</th>
                                    <td>{{$coupon->coupon_name}}</td>
                                    <td>{{$coupon->discount}}</td>
                                    <td>
                                        @if ($coupon->checkIfValid())
                                            <span class="bg-success border border-dark p-1 text-white">
                                                Valid until {{\Carbon\Carbon::parse($coupon->valid_until)->diffForHumans()}}
                                            </span>
                                        @else
                                            <span class="bg-danger border border-dark p-1 text-white">
                                                Hết hạn
                                            </span>
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{route('admin.coupons.edit', $coupon->coupon_id)}}" class="btn btn-sm btn-warning">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" onclick="deleteItem({{$coupon->coupon_id}})" class="btn btn-sm btn-danger">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                        <form id="{{$coupon->coupon_id}}" action="{{route('admin.coupons.destroy', $coupon->coupon_id)}}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
