<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentLearningType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    //belongsto student
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
