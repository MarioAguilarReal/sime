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
            $table->string('photo')->nullable();
            $table->date('birth_date');
            $table->integer('gender');
            $table->string('address');
            $table->integer('trans_type');
            $table->integer('age');
            $table->integer('civil_status');
            $table->string('tutor_name');
            $table->string('tutor_phone');
            $table->integer('tutor_age');
            $table->string('tutor_address');
            $table->string('tutor_email');
            $table->string('cognitive_skills')->nullable();
            $table->string('alternative_skills')->nullable();
            $table->foreignId('student_academic_data_id')->nullable()->constrained();
            $table->foreignId('student_learning_type_id')->nullable()->constrained();
            $table->foreignId('student_special_needs_id')->nullable()->constrained();
            $table->foreignId('student_social_skills_id')->nullable()->constrained();
            $table->foreignId('student_planning_skills_id')->nullable()->constrained();
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
