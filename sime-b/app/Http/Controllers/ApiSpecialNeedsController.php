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
      'data' => ''
    ];


    $request->validate([
      'usaer_status' => 'required',
      'learning_problems' => 'required',
      'diseases' => 'required',
      'treatment_place' => 'required',
      'special_treatment' => 'required',
    ]);

    $student = Student::find($id);
    if(!$student){
      $response['status'] = 201;
      $response['message'] = 'No student found';
      return response()->json($response, $response['status']);
    }

    $student_special_needs = new StudentSpecialNeeds ([
      'usaer_status' => $request->usaer_status,
      'learning_problems' => $request->learning_problems,
      'diseases' => $request->diseases,
      'treatment_place' => $request->treatment_place,
      'special_treatment' => $request->special_treatment,
    ]);

    if ($student_special_needs){
      $student->specialNeeds()->save($student_special_needs);

      $response['status'] = 200;
      $response['message'] = 'Student special needs registered successfully';
      $response['data'] = $student_special_needs;
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
      'data' => ''
    ];

    $student = Student::find($id_student);

    $student_special_needs = $student->specialNeeds()->first();
    if($student_special_needs){
      $response['status'] = 200;
      $response['message'] = 'Student special needs found';
      $response['data'] = $student_special_needs;
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
      'data' => ''
    ];

    $request->validate([
      'usaer_status' => 'required',
      'learning_problems' => 'required',
      'diseases' => 'required',
      'treatment_place' => 'required',
      'special_treatment' => 'required',
    ]);

    $student_special_needs = StudentSpecialNeeds::where('student_id', $id_student)->first();

    if ($student_special_needs){
      $student_special_needs->update([
        'usaer_status' => $request->usaer_status,
        'learning_problems' => $request->learning_problems,
        'diseases' => $request->diseases,
        'treatment_place' => $request->treatment_place,
        'special_treatment' => $request->special_treatment,
      ]);

      $response['status'] = 200;
      $response['message'] = 'Student special needs updated successfully';
      $response['data'] = $student_special_needs;
    }
    else {
      $response['status'] = 201;
      $response['message'] = 'Student special needs not updated';
    }
    return response()->json($response, $response['status']);
  }
}
