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
        Schema::create('student_academic_datas', function (Blueprint $table) {
            $table->id();
            $table->integer('grade_level');
            $table->string('student_id');
            $table->float('last_grade_average');
            $table->float('actual_grade_average');
            $table->integer('behavior');
            $table->integer('group_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_academic_datas');
    }
};
