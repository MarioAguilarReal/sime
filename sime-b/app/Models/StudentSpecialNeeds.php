<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSpecialNeeds extends Model
{
    use HasFactory;

    protected $fillable = [
        'usaer_id',
        'learning_problems',
        'diseases',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
