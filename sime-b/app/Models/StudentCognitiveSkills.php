<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentCognitiveSkills extends Model
{
    use HasFactory;

    protected $fillable = [
        'cognitive_list',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
