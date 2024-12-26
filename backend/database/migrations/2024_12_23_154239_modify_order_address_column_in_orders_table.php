<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Đổi tên cột và thay đổi kiểu dữ liệu từ string sang integer
            $table->integer('qty')->after('total_price');  // Thêm cột 'qty'
            $table->dropColumn('order_address');  // Xóa cột 'order_address'
        });
    }
    
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Quay lại thay đổi
            $table->string('order_address')->after('total_price');  // Thêm lại cột 'order_address'
            $table->dropColumn('qty');  // Xóa cột 'qty'
        });
    }
    
};
