<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use App\Http\Controllers\Controllers;
use App\Models\Student;
use App\Models\StudentAcademicData;

class ApiStudentsAcademicDataController extends Controller
{

    public function register(Request $request, $id){
        $response = [
            'status' => 0,
            'message' => '',
            'students_academic_data' => ''
        ];

        $request->validate([
            'grade_level' => 'required',
            'student_id' => 'required',
            'last_grade_average' => 'required',
            'actual_grade_average' => 'required',
            'behavior' => 'required',
            'group_id' => 'required',
            'attendance' => 'required',
        ]);

        $student = Student::find($id);
        if(!$student){
            $response['status'] = 201;
            $response['message'] = 'No student found';
            return response()->json($response, $response['status']);
        }
        
        $student_academic_data = StudentAcademicData::create ([
            'grade_level' => $request->grade_level,
            'student_id' => $request->student_id,
            'last_grade_average' => $request->last_grade_average,
            'actual_grade_average' => $request->actual_grade_average,
            'behavior' => $request->behavior,
            'group_id' => $request->group_id,
            'attendance' => $request->attendance,
        ]);
        
        if ($student_academic_data){
            $student->student_academic_data_id = $student_academic_data->id;
            $student->save();

            $response['status'] = 200;
            $response['message'] = 'Student academic data registered successfully';
            $response['students_academic_data'] = $student_academic_data;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student academic data not registered';
        }
        return response()->json($response, $response['status']);
    }

    public function showAll(){
        $response = [
            'status' => 0,
            'message' => '',
            'students_academic_data' => ''
        ];

        $students_academic_data = StudentAcademicData::all();
        if ($students_academic_data){
            $response['status'] = 200;
            $response['message'] = 'Students academic data fetched successfully';
            $response['students_academic_data'] = $students_academic_data;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No students academic data found';
        }
        return response()->json($response, $response['status']);
    }

    public function show($id_student){
        $response = [
            'status' => 0,
            'message' => '',
            'students_academic_data' => ''
        ];

        $student_academic_data = StudentAcademicData::find($id_student);
        if ($student_academic_data){
            $response['status'] = 200;
            $response['message'] = 'Student academic data fetched successfully';
            $response['students_academic_data'] = $student_academic_data;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student academic data found';
        }
        return response()->json($response, $response['status']);
    }

    public function update(Request $request, $id_student){
        $response = [
            'status' => 0,
            'message' => '',
            'students_academic_data' => ''
        ];
        
        $request->validate([
            'grade_level' => 'required',
            'student_id' => 'required',
            'last_grade_average' => 'required',
            'actual_grade_average' => 'required',
            'behavior' => 'required',
            'group_id' => 'required',
            'attendance' => 'required',
        ]);

        $student_academic_data = StudentAcademicData::find($id_student);

        if ($student_academic_data){
            $student_academic_data->grade_level = $request->grade_level;
            $student_academic_data->last_grade_average = $request->last_grade_average;
            $student_academic_data->actual_grade_average = $request->actual_grade_average;
            $student_academic_data->behavior = $request->behavior;
            $student_academic_data->group_id = $request->group_id;
            $student_academic_data->attendance = $request->attendance;

            $student_academic_data->save();

            $response['status'] = 200;
            $response['message'] = 'Student academic data updated successfully';
            $response['students_academic_data'] = $student_academic_data;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student academic data found';
        }
        return response()->json($response, $response['status']);
    }
}
