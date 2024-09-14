<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSpecialNeeds extends Model
{
    use HasFactory;

    protected $fillable = [
        'usaer_status',
        'learning_problems',
        'diseases',
        'treatment_place',
        'special_treatment',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
