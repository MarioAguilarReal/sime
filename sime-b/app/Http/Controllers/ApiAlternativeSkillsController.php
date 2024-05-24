<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\StudentAlternativeSkills;

class ApiAlternativeSkillsController extends Controller
{
    public function register(Request $request, $id){
        $response = [
            'status' => 0,
            'message' => '',
            'students_alternative_skills' => ''
        ];

        $request->validate([
            'alternative_list' => 'required|array',
        ]);

        $student = Student::find($id);
        if(!$student){
            $response['status'] = 201;
            $response['message'] = 'No student found';
            return response()->json($response, $response['status']);
        }
        
        $student_alternative_skills = StudentAlternativeSkills::create ([
            'alternative_list' => json_encode($request->alternative_list),
        ]);
        
        if ($student_alternative_skills){
            $student->student_alternative_skills_id = $student_alternative_skills->id;
            $student->save();

            $response['status'] = 200;
            $response['message'] = 'Student alternative skills registered successfully';
            $response['students_alternative_skills'] = $student_alternative_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student alternative skills not registered';
        }
        return response()->json($response, $response['status']);
    }

    public function show($id){
        $response = [
            'status' => 0,
            'message' => '',
            'students_alternative_skills' => ''
        ];

        $student_alternative_skills = StudentAlternativeSkills::find($id);
        if($student_alternative_skills){
            $student_alternative_skills->alternative_list = json_decode($student_alternative_skills->alternative_list, true);
            
            $response['status'] = 200;
            $response['message'] = 'Student alternative skills found';
            $response['students_alternative_skills'] = $student_alternative_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student alternative skills found';
        }
        return response()->json($response, $response['status']);
    }

    public function update(Request $request, $id){
        $response = [
            'status' => 0,
            'message' => '',
            'students_alternative_skills' => ''
        ];

        $request->validate([
            'alternative_list' => 'required|array',
        ]);

        $student_alternative_skills = StudentAlternativeSkills::find($id);
        if($student_alternative_skills){
            $student_alternative_skills->alternative_list = json_encode($request->alternative_list);
            $student_alternative_skills->save();

            $response['status'] = 200;
            $response['message'] = 'Student alternative skills updated successfully';
            $response['students_alternative_skills'] = $student_alternative_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student alternative skills found';
        }
        return response()->json($response, $response['status']);
    }
}
