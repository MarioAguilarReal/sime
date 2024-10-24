<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;


    protected $fillable = [
        //Student
        'first_name',
        'maternal_surname',
        'paternal_surname',
        'photo',
        'birth_date',
        'gender',
        'address',
        'trans_type',
        'age',
        'civil_status',
        'birth_place',
        'nationality',
        'curp',
        'transport_time',
        //'grade',    // relation 1-1
        //'group',    // relation 1-1
        //Tutor
        'tutor_name',
        'tutor_phone',
        'tutor_age',
        'tutor_address',
        'tutor_email',
        'tutor_birth_date',
        'tutor_occupation',
        'tutor_schooling',
        'tutor_live_student',   //boolean
        'tutor_curp',
        //Emergency Contact
        'emergency_contact_name_1',
        'emergency_contact_phone_1',
        'emergency_contact_relationship_1',
        'emergency_contact_name_2',
        'emergency_contact_phone_2',
        'emergency_contact_relationship_2',
        //More
        'student_academic_data_id',
        'learning_type_id',
        'cognitive_skills_id',
        'special_needs_id',
        'social_skills_id',
        'alternative_skills_id',
        'planning_skills_id',
        'comments_id',
    ];

    public function studentAcademicData()
    {
        return $this->hasOne(StudentAcademicData::class);
    }

    public function learningType()
    {
        return $this->hasOne(StudentLearningType::class);
    }

    public function cognitiveSkills()
    {
        return $this->hasOne(StudentCognitiveSkills::class);
    }

    public function specialNeeds()
    {
        return $this->hasOne(StudentSpecialNeeds::class);
    }

    public function socialSkills()
    {
        return $this->hasOne(StudentSocialSkills::class);
    }

    public function alternativeSkills()
    {
        return $this->hasOne(StudentAlternativeSkills::class);
    }

    public function planningSkills()
    {
        return $this->hasOne(StudentPlanningSkills::class);
    }

    public function comments()
    {
        return $this->hasOne(Comments::class);
    }

}
