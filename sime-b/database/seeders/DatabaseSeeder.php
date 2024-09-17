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
            'photo' => '',
            'address' => '123 Main St',
            'phone' => '123-456-7890',
            'civil_status' => 1,
            'role' => 1,
            'email' => 'marioaguilar@mailinator.com',
            'password' => bcrypt('M4r10r34l'),
        ]);

        \App\Models\User::create([
            'first_name' => 'Fer',
            'last_name' => 'Ugalde',
            'birth_date' => '1990-01-01',
            'age' => 30,
            'gender' => 1,
            'photo' => '',
            'address' => '123 Main St',
            'phone' => '123-456-7890',
            'civil_status' => 1,
            'role' => 1,
            'email' => 'fer@fer.com',
            'password' => bcrypt('Fernanda123'),
        ]);
    }
}
