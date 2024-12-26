@extends('admin.layouts.app')

@section('title')
    Dashboard
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white">
                        <h3 class="mt-2">Dashboard</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <div class="row mb-2">
                            <!-- Today's orders -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong class="badge bg-success">
                                                Today's Orders
                                            </strong>
                                            <span class="badge bg-success">
                                                {{ $todayOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $todayOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <!-- Yesterday's Order -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong class="badge bg-primary">
                                                Yesterday's Orders
                                            </strong>
                                            <span class="badge bg-primary">
                                                {{ $yesterdayOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $yesterdayOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <!-- Month's Order -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong class="badge bg-danger">
                                                Month's Orders
                                            </strong>
                                            <span class="badge bg-danger">
                                                {{ $monthOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $monthOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                            <!-- Year's Order -->
                            <div class="col-md-6 mb-2">
                                <div class="card shadow-sm">
                                    <div class="card-header bg-white">
                                        <div class="d-flex justify-content-between">
                                            <strong class="badge bg-dark">
                                                Year's Orders
                                            </strong>
                                            <span class="badge bg-success">
                                                {{ $yearOrders->count() }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="card-footer text-center bg-white">
                                        <strong>
                                            {{ $yearOrders->sum('total_price') }} vnđ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
