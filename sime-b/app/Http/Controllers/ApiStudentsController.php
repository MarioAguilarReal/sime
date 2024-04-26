<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentAcademicData;
use App\Models\SpecialNeeds;
use App\Models\LearningType;
use App\Models\PlanningSkills;
use App\Models\SocialSkills;

class ApiStudentsController extends Controller
{
    public function all(){
        $response = [
            'status' => 0,
            'message' => '',
            'students' => ''
        ];

        $students = Student::all();
        if ($students){
            $response['status'] = 200;
            $response['message'] = 'Students fetched successfully';
            $response['students'] = $students;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No students found';
        }
        return response()->json($response, $response['status']);
    }
}
