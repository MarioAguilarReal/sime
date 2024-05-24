<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\StudentSpecialNeeds;

class ApiSpecialNeedsController extends Controller
{
    public function register(Request $request, $id){
        
        $response = [
            'status' => 0,
            'message' => '',
            'students_special_needs' => ''
        ];

        
        $request->validate([
            'usaer_status' => 'required',
            'learning_problems' => 'required',
            'diseases' => 'required',
        ]);
        
        $student = Student::find($id);
        if(!$student){
            $response['status'] = 201;
            $response['message'] = 'No student found';
            return response()->json($response, $response['status']);
        }
        
        $student_special_needs = StudentSpecialNeeds::create ([
            'usaer_status' => $request->usaer_status,
            'learning_problems' => $request->learning_problems,
            'diseases' => $request->diseases,
        ]);
        
        if ($student_special_needs){
            $student->student_special_needs_id = $student_special_needs->id;
            $student->save();
            
            $response['status'] = 200;
            $response['message'] = 'Student special needs registered successfully';
            $response['students_special_needs'] = $student_special_needs;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student special needs not registered';
        }
        return response()->json($response, $response['status']);
    }

    public function show($id_student){
        $response = [
            'status' => 0,
            'message' => '',
            'students_special_needs' => ''
        ];

        $student_special_needs = StudentSpecialNeeds::find($id_student);
        if($student_special_needs){
            $response['status'] = 200;
            $response['message'] = 'Student special needs found';
            $response['students_special_needs'] = $student_special_needs;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student special needs found';
        }
        return response()->json($response, $response['status']);
    }

    public function update(Request $request, $id_student){
        $response = [
            'status' => 0,
            'message' => '',
            'students_special_needs' => ''
        ];
        
        $request->validate([
            'usaer_status' => 'required',
            'learning_problems' => 'required',
            'diseases' => 'required',
        ]);
        
        $student_special_needs = StudentSpecialNeeds::find($id_student);

        if ($student_special_needs){
            $student_special_needs->usaer_status = $request->usaer_status;
            $student_special_needs->learning_problems = $request->learning_problems;
            $student_special_needs->diseases = $request->diseases;
            $student_special_needs->save();

            $response['status'] = 200;
            $response['message'] = 'Student special needs updated successfully';
            $response['students_special_needs'] = $student_special_needs;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student special needs not updated';
        }
        return response()->json($response, $response['status']);
    }
}
