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
        Schema::table('students', function (Blueprint $table) {
            $table->string('maternal_surname')->nullable()->change();
            $table->integer('gender')->nullable()->change();
            $table->string('address')->nullable()->change();
            $table->integer('trans_type')->nullable()->change();
            $table->integer('civil_status')->nullable()->change();
            $table->string('birth_place')->nullable()->change();
            $table->string('nationality')->nullable()->change();
            $table->string('curp')->nullable()->change();
            $table->string('transport_time')->nullable()->change();

            $table->string('tutor_name')->nullable()->change();
            $table->string('tutor_phone')->nullable()->change();
            $table->integer('tutor_age')->nullable()->change();
            $table->string('tutor_address')->nullable()->change();
            $table->string('tutor_email')->nullable()->change();
            $table->date('tutor_birth_date')->nullable()->change();
            $table->string('tutor_occupation')->nullable()->change();
            $table->string('tutor_schooling')->nullable()->change();
            $table->integer('tutor_live_student')->nullable()->change();
            $table->string('tutor_curp')->nullable()->change();

            $table->string('emergency_contact_name_1')->nullable()->change();
            $table->string('emergency_contact_phone_1')->nullable()->change();
            $table->string('emergency_contact_relationship_1')->nullable()->change();
            $table->string('emergency_contact_name_2')->nullable()->change();
            $table->string('emergency_contact_phone_2')->nullable()->change();
            $table->string('emergency_contact_relationship_2')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->string('maternal_surname')->nullable(false)->change();
            $table->integer('gender')->nullable(false)->change();
            $table->string('address')->nullable(false)->change();
            $table->integer('trans_type')->nullable(false)->change();
            $table->integer('civil_status')->nullable(false)->change();
            $table->string('birth_place')->nullable(false)->change();
            $table->string('nationality')->nullable(false)->change();
            $table->string('curp')->nullable(false)->change();
            $table->string('transport_time')->nullable(false)->change();

            $table->string('tutor_name')->nullable(false)->change();
            $table->string('tutor_phone')->nullable(false)->change();
            $table->integer('tutor_age')->nullable(false)->change();
            $table->string('tutor_address')->nullable(false)->change();
            $table->string('tutor_email')->nullable(false)->change();
            $table->date('tutor_birth_date')->nullable(false)->change();
            $table->string('tutor_occupation')->nullable(false)->change();
            $table->string('tutor_schooling')->nullable(false)->change();
            $table->integer('tutor_live_student')->nullable(false)->change();
            $table->string('tutor_curp')->nullable(false)->change();

            $table->string('emergency_contact_name_1')->nullable(false)->change();
            $table->string('emergency_contact_phone_1')->nullable(false)->change();
            $table->string('emergency_contact_relationship_1')->nullable(false)->change();
            $table->string('emergency_contact_name_2')->nullable(false)->change();
            $table->string('emergency_contact_phone_2')->nullable(false)->change();
            $table->string('emergency_contact_relationship_2')->nullable(false)->change();
        });
    }
};
