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
        Schema::create('surveying_data', function (Blueprint $table) {
            $table->id();
            $table->string('surveying_data_name');
            $table->bigInteger('surveying_list_id');
            $table->foreign('surveying_list_id')->references('id')->on('surveying_lists');
            $table->integer('bs')->nullable();
            $table->integer('ih');
            $table->integer('fs')->nullable();
            $table->integer('gh');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveying_data');
    }
};
