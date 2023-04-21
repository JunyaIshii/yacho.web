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
        Schema::create('site_members', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('site_id');
            $table->foreign('site_id')->references('id')->on('sites');
            $table->bigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('authority');
            $table->timestamps();
            $table->unique(['user_id', 'site_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_members');
    }
};
