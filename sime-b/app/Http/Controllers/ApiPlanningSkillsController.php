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
            'students_planning_skills' => ''
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
        
        $student_planning_skills = StudentPlanningSkills::create ([
            'focus' => $request->focus,
            'detect' => $request->detect,
            'correlation' => $request->correlation,
        ]);
        
        if ($student_planning_skills){
            $student->student_planning_skills_id = $student_planning_skills->id;
            $student->save();

            $response['status'] = 200;
            $response['message'] = 'Student planning skills registered successfully';
            $response['students_planning_skills'] = $student_planning_skills;
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
            'students_planning_skills' => ''
        ];

        $student_planning_skills = StudentPlanningSkills::find($id);
        if($student_planning_skills){
            $response['status'] = 200;
            $response['message'] = 'Planning skills found';
            $response['students_planning_skills'] = $student_planning_skills;
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
            'students_planning_skills' => ''
        ];

        $request->validate([
            'focus' => 'required',
            'detect' => 'required',
            'correlation' => 'required',
        ]);

        $student_planning_skills = StudentPlanningSkills::find($id);

        if($student_planning_skills){
            $student_planning_skills->focus = $request->focus;
            $student_planning_skills->detect = $request->detect;
            $student_planning_skills->correlation = $request->correlation;
            $student_planning_skills->save();
            
            $response['status'] = 200;
            $response['message'] = 'Planning skills updated successfully';
            $response['students_planning_skills'] = $student_planning_skills;
        } else {
            $response['status'] = 201;
            $response['message'] = 'No planning skills found';
        }
        return response()->json($response, $response['status']);
    }
}
