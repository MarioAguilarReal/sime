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
            'data' => ''
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

        $student_alternative_skills = new StudentAlternativeSkills ([
            'alternative_list' => json_encode($request->alternative_list),
        ]);

        if ($student_alternative_skills){
            $student->alternativeSkills()->save($student_alternative_skills);

            $response['status'] = 200;
            $response['message'] = 'Student alternative skills registered successfully';
            $response['data'] = $student_alternative_skills;
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
            'data' => ''
        ];

        $student = Student::find($id);

        $student_alternative_skills = $student->alternativeSkills()->first();
        if($student_alternative_skills){
            $student_alternative_skills->alternative_list = json_decode($student_alternative_skills->alternative_list, true);

            $response['status'] = 200;
            $response['message'] = 'Student alternative skills found';
            $response['data'] = $student_alternative_skills;
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
            'data' => ''
        ];

        $request->validate([
            'alternative_list' => 'required|array',
        ]);

        $student_alternative_skills = StudentAlternativeSkills::where('student_id', $id)->first();
        if($student_alternative_skills){
            $student_alternative_skills->update([
                'alternative_list' => json_encode($request->alternative_list),
            ]);

            $response['status'] = 200;
            $response['message'] = 'Student alternative skills updated successfully';
            $response['data'] = $student_alternative_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student alternative skills found';
        }
        return response()->json($response, $response['status']);
    }
}
