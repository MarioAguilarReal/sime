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
            'students_cognitive_skills' => ''
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
        
        $student_cognitive_skills = StudentCognitiveSkills::create ([
            'cognitive_list' => json_encode($request->cognitive_list),
        ]);
        
        if ($student_cognitive_skills){
            $student->student_cognitive_skills_id = $student_cognitive_skills->id;
            $student->save();

            $response['status'] = 200;
            $response['message'] = 'Student cognitive skills registered successfully';
            $response['students_cognitive_skills'] = $student_cognitive_skills;
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
            'students_cognitive_skills' => ''
        ];

        $student_cognitive_skills = StudentCognitiveSkills::find($id);
        if($student_cognitive_skills){
            $student_cognitive_skills->cognitive_list = json_decode($student_cognitive_skills->cognitive_list, true);
            
            $response['status'] = 200;
            $response['message'] = 'Student cognitive skills found';
            $response['students_cognitive_skills'] = $student_cognitive_skills;
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
            'students_cognitive_skills' => ''
        ];

        $request->validate([
            'cognitive_list' => 'required|array',
        ]);

        $student_cognitive_skills = StudentCognitiveSkills::find($id);
        if($student_cognitive_skills){
            $student_cognitive_skills->cognitive_list = json_encode($request->cognitive_list);
            $student_cognitive_skills->save();

            $response['status'] = 200;
            $response['message'] = 'Student cognitive skills updated successfully';
            $response['students_cognitive_skills'] = $student_cognitive_skills;
        }else{
            $response['status'] = 201;
            $response['message'] = 'No student cognitive skills found';
        }
        return response()->json($response, $response['status']);
    }
}
