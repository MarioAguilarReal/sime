<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSocialSkills extends Model
{
    use HasFactory;

    protected $fillable = [
        'basic',
        'advanced',
        'feelings',
        'assault',
        'stress',
        'planning',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
