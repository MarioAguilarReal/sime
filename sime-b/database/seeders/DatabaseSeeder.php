<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::create([
            'first_name' => 'Mario',
            'last_name' => 'Aguilar',
            'birth_date' => '1990-01-01',
            'age' => 30,
            'gender' => 1,
            'photo' => 'photo.jpg',
            'address' => '123 Main St',
            'phone' => '123-456-7890',
            'civil_status' => 1,
            'is_teacher' => true,
            'is_tutor' => true,
            'is_admin' => true,
            'email' => 'mario@mario.com',
            'password' => bcrypt('password'),
        ]);
    }
}
