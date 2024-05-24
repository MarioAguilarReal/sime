<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_planning_skills', function (Blueprint $table) {
            $table->id();
            $table->integer('focus');
            $table->integer('detect');
            $table->integer('correlation');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_planning_skills');
    }
};
