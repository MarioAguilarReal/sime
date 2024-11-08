<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\StudentCognitiveSkills;

class ApiCognitiveSkillsController extends Controller
{
    public function register(Request $request, $id){
        $response = [
            'status' => 0,
            'message' => '',
            'data' => ''
        ];

        $request->validate([
            'cognitive_list' => 'required|array',
        ]);

        $student = Student::find($id);
        if(!$student){
            $response['status'] = 201;
            $response['message'] = 'No student found';
            return response()->json($response, $response['status']);
        }

        $student_cognitive_skills = new StudentCognitiveSkills ([
            'cognitive_list' => json_encode($request->cognitive_list),
        ]);

        if ($student_cognitive_skills){
            $student->cognitiveSkills()->save($student_cognitive_skills);

            $response['status'] = 200;
            $response['message'] = 'Student cognitive skills registered successfully';
            $response['data'] = $student_cognitive_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student cognitive skills not registered';
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

        $student_cognitive_skills = $student->cognitiveSkills()->first();
        if($student_cognitive_skills){
            $student_cognitive_skills->cognitive_list = json_decode($student_cognitive_skills->cognitive_list, true);

            $response['status'] = 200;
            $response['message'] = 'Student cognitive skills found';
            $response['data'] = $student_cognitive_skills;
        }else{
            $response['status'] = 201;
            $response['message'] = 'No student cognitive skills found';
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
            'cognitive_list' => 'required|array',
        ]);

        $student_cognitive_skills = StudentCognitiveSkills::where('student_id', $id)->first();
        if($student_cognitive_skills){
            $student_cognitive_skills->update([
                'cognitive_list' => json_encode($request->cognitive_list),
            ]);

            $response['status'] = 200;
            $response['message'] = 'Student cognitive skills updated successfully';
            $response['data'] = $student_cognitive_skills;
        }else{
            $response['status'] = 201;
            $response['message'] = 'No student cognitive skills found';
        }
        return response()->json($response, $response['status']);
    }
}
