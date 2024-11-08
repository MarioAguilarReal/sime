<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\StudentSocialSkills;

class ApiSocialSkillsController extends Controller
{
    public function register(Request $request, $id){
        $response = [
            'status' => 0,
            'message' => '',
            'data' => ''
        ];

        $request->validate([
            'basic' => 'required|array',
            'advanced' => 'required|array',
            'feelings' => 'required|array',
            'assault' => 'required|array',
            'stress' => 'required|array',
            'planning' => 'required|array',
        ]);

        $student = Student::find($id);
        if(!$student){
            $response['status'] = 201;
            $response['message'] = 'No student found';
            return response()->json($response, $response['status']);
        }

        $student_social_skills = new StudentSocialSkills ([
            'basic' => json_encode($request->basic),
            'advanced' => json_encode($request->advanced),
            'feelings' => json_encode($request->feelings),
            'assault' => json_encode($request->assault),
            'stress' => json_encode($request->stress),
            'planning' => json_encode($request->planning),
        ]);

        if ($student_social_skills){
            $student->socialSkills()->save($student_social_skills);

            $response['status'] = 200;
            $response['message'] = 'Student social skills registered successfully';
            $response['data'] = $student_social_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student social skills not registered';
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

        $student_social_skills = $student->socialSkills()->first();
        if($student_social_skills){
            $student_social_skills->basic = json_decode($student_social_skills->basic, true);
            $student_social_skills->advanced = json_decode($student_social_skills->advanced, true);
            $student_social_skills->feelings = json_decode($student_social_skills->feelings, true);
            $student_social_skills->assault = json_decode($student_social_skills->assault, true);
            $student_social_skills->stress = json_decode($student_social_skills->stress, true);
            $student_social_skills->planning = json_decode($student_social_skills->planning, true);

            $response['status'] = 200;
            $response['message'] = 'Student social skills found';
            $response['students_social_skills'] = $student_social_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student social skills found';
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
            'basic' => 'required|array',
            'advanced' => 'required|array',
            'feelings' => 'required|array',
            'assault' => 'required|array',
            'stress' => 'required|array',
            'planning' => 'required|array',
        ]);

        $student_social_skills = StudentSocialSkills::where('student_id', $id)->first();

        if($student_social_skills){
            $student_social_skills->update([
                'basic' => json_encode($request->basic),
                'advanced' => json_encode($request->advanced),
                'feelings' => json_encode($request->feelings),
                'assault' => json_encode($request->assault),
                'stress' => json_encode($request->stress),
                'planning' => json_encode($request->planning),
            ]);

            $response['status'] = 200;
            $response['message'] = 'Student social skills updated successfully';
            $response['data'] = $student_social_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student social skills not updated';
        }
        return response()->json($response, $response['status']);
    }
}
