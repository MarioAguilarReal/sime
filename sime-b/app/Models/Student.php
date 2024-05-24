<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;


    protected $fillable = [
        'first_name',
        'last_name',
        'photo',
        'birth_date',
        'gender',
        'address',
        'trans_type',
        'age',
        'civil_status',
        'tutor_name',
        'tutor_phone',
        'tutor_age',
        'tutor_address',
        'tutor_email',
        'student_academic_data_id',
        'learning_type_id',
        'cognitive_skills_id',
        'special_needs_id',
        'social_skills_id',
        'alternative_skills_id',
        'planning_skills_id',
    ];

    public function studentAcademicData()
    {
        return $this->hasOne(StudentAcademicData::class);
    }

    public function learningType()
    {
        return $this->hasOne(LearningType::class);
    }

    public function cognitiveSkills()
    {
        return $this->hasOne(CognitiveSkills::class);
    }

    public function specialNeeds()
    {
        return $this->hasOne(SpecialNeeds::class);
    }

    public function socialSkills()
    {
        return $this->hasOne(SocialSkills::class);
    }

    public function alternativeSkills()
    {
        return $this->hasOne(AlternativeSkills::class);
    }

    public function planningSkills()
    {
        return $this->hasOne(PlanningSkills::class);
    }

}
