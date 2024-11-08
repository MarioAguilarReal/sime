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
            /** Student */
            $table->id();
            $table->string('first_name');
            $table->string('maternal_surname');
            $table->string('paternal_surname');
            $table->string('photo')->nullable();
            $table->date('birth_date');
            $table->integer('gender');
            $table->string('address');
            $table->integer('trans_type');
            $table->integer('age');
            $table->integer('civil_status');
            $table->string('birth_place');
            $table->string('nationality');
            $table->string('curp');
            $table->string('transport_time');
            /** Tutor */
            $table->string('tutor_name');
            $table->string('tutor_phone');
            $table->integer('tutor_age');
            $table->string('tutor_address');
            $table->string('tutor_email');
            $table->date('tutor_birth_date');
            $table->string('tutor_occupation');
            $table->string('tutor_schooling');
            $table->integer('tutor_live_student');
            $table->string('tutor_curp');
            /** Emergency Contact*/
            $table->string('emergency_contact_name_1');
            $table->string('emergency_contact_phone_1');
            $table->string('emergency_contact_relationship_1');
            $table->string('emergency_contact_name_2');
            $table->string('emergency_contact_phone_2');
            $table->string('emergency_contact_relationship_2');

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
