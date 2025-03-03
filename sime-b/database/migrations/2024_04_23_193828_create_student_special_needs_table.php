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
        Schema::create('student_special_needs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->nullable()->constrained('students')->onDelete('cascade');
            $table->integer('usaer_status');
            $table->string('learning_problems');
            $table->string('diseases');
            $table->string('treatment_place');
            $table->string('special_treatment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_special_needs');
    }
};
