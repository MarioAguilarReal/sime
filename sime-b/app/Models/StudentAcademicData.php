<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAcademicData extends Model
{
    use HasFactory;

    protected $table = 'student_academic_datas';

    protected $fillable = [
        'grade_level',
        'student_id',
        'last_grade_average',
        'actual_grade_average',
        'behavior',
        'group_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
