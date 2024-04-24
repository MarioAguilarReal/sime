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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('photo')->nulleable();
            $table->date('birth_date');
            $table->string('gender');
            $table->string('address');
            $table->string('trans_type');
            $table->integer('age');
            $table->string('civil_status');
            $table->string('tutor_name');
            $table->integer('tutor_phone');
            $table->integer('tutor_age');
            $table->string('tutor_address');
            $table->string('tutor_email');
            $table->string('cognitive_skills')->nulleable();
            $table->string('alternative_skills')->nulleable();
            $table->foreignId('student_academic_data_id')->constrained()->nulleable();
            $table->foreignId('student_learning_type_id')->constrained()->nulleable();
            $table->foreignId('student_special_needs_id')->constrained()->nulleable();
            $table->foreignId('student_social_skills_id')->constrained()->nulleable();
            $table->foreignId('student_planning_skills_id')->constrained()->nulleable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
