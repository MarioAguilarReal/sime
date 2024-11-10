<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\StudentPlanningSkills;

class ApiPlanningSkillsController extends Controller
{
    public function register(Request $request, $id){
        $response = [
            'status' => 0,
            'message' => '',
            'data' => ''
        ];

        $request->validate([
            'focus' => 'required',
            'detect' => 'required',
            'correlation' => 'required',
        ]);

        $student = Student::find($id);
        if(!$student){
            $response['status'] = 201;
            $response['message'] = 'No student found';
            return response()->json($response, $response['status']);
        }

        $student_planning_skills = new StudentPlanningSkills ([
            'focus' => $request->focus,
            'detect' => $request->detect,
            'correlation' => $request->correlation,
        ]);

        if ($student_planning_skills){
            $student->planningSkills()->save($student_planning_skills);

            $response['status'] = 200;
            $response['message'] = 'Student planning skills registered successfully';
            $response['data'] = $student_planning_skills;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student planning skills not registered';
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

        $student_planning_skills = $student->planningSkills()->first();
        if($student_planning_skills){
            $response['status'] = 200;
            $response['message'] = 'Planning skills found';
            $response['data'] = $student_planning_skills;
        } else {
            $response['status'] = 201;
            $response['message'] = 'No planning skills found';
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
            'focus' => 'required',
            'detect' => 'required',
            'correlation' => 'required',
        ]);

        $student_planning_skills = StudentPlanningSkills::where('student_id', $id)->first();

        if($student_planning_skills){
            $student_planning_skills->update([
                'focus' => $request->focus,
                'detect' => $request->detect,
                'correlation' => $request->correlation,
            ]);

            $response['status'] = 200;
            $response['message'] = 'Planning skills updated successfully';
            $response['data'] = $student_planning_skills;
        } else {
            $response['status'] = 201;
            $response['message'] = 'No planning skills found';
        }
        return response()->json($response, $response['status']);
    }
}
