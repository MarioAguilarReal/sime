<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'grade',
        'group',
        'user_id',
        'comments',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function subjects()
    {
        return $this->belongsToMany(Classe::class, 'group_subject', 'group_id', 'subject_id');
    }
}
