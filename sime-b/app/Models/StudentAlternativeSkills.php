<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAlternativeSkills extends Model
{
    use HasFactory;

    protected $fillable = [
        'alternative_list',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
