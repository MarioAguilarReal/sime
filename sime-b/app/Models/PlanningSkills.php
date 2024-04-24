<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanningSkills extends Model
{
    use HasFactory;

    protected $fillable = [
        'focus',
        'detect',
        'correlation',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
