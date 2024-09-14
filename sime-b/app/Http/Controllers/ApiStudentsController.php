<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentAcademicData;
use App\Models\SpecialNeeds;
use App\Models\LearningType;
use App\Models\PlanningSkills;
use App\Models\SocialSkills;

class ApiStudentsController extends Controller
{
    public function all(){
        $response = [
            'status' => 0,
            'message' => '',
            'students' => ''
        ];

        $students = Student::all();
        if ($students){
            $response['status'] = 200;
            $response['message'] = 'Students fetched successfully';
            $response['students'] = $students;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No students found';
        }
        return response()->json($response, $response['status']);
    }

    public function register(Request $request){
        $response = [
            'status' => 0,
            'message' => '',
            'students' => ''
        ];

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            //'photo' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'address' => 'required',
            'trans_type' => 'required',
            'age' => 'required',
            'civil_status' => 'required',
            'birth_place' => 'required',
            'nationality' => 'required',
            'curp' => 'required',
            'transport_time' => 'required',
            'tutor_name' => 'required',
            'tutor_phone' => 'required',
            'tutor_age' => 'required',
            'tutor_address' => 'required',
            'tutor_email' => 'required',
            'tutor_birth_date' => 'required',
            'tutor_occupation' => 'required',
            'tutor_schooling' => 'required',
            'tutor_live_student' => 'required',
            'tutor_curp' => 'required',
            'emergency_contact_name_1' => 'required',
            'emergency_contact_phone_1' => 'required',
            'emergency_contact_relationship_1' => 'required',
            'emergency_contact_name_2' => 'required',
            'emergency_contact_phone_2' => 'required',
            'emergency_contact_relationship_2' => 'required',
        ]);

        $student = Student::create ([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'photo' => 'default.jpg',
            'birth_date' => $request->birth_date,
            'gender' => $request->gender,
            'address' => $request->address,
            'trans_type' => $request->trans_type,
            'age' => $request->age,
            'civil_status' => $request->civil_status,
            'birth_place' => $request->birth_place,
            'nationality' => $request->nationality,
            'curp' => $request->curp,
            'transport_time' => $request->transport_time,
            'tutor_name' => $request->tutor_name,
            'tutor_phone' => $request->tutor_phone,
            'tutor_age' => $request->tutor_age,
            'tutor_address' => $request->tutor_address,
            'tutor_email' => $request->tutor_email,
            'tutor_birth_date' => $request->tutor_birth_date,
            'tutor_occupation' => $request->tutor_occupation,
            'tutor_schooling' => $request->tutor_schooling,
            'tutor_live_student' => $request->tutor_live_student,
            'tutor_curp' => $request->tutor_curp,
            'emergency_contact_name_1' => $request->emergency_contact_name_1,
            'emergency_contact_phone_1' => $request->emergency_contact_phone_1,
            'emergency_contact_relationship_1' => $request->emergency_contact_relationship_1,
            'emergency_contact_name_2' => $request->emergency_contact_name_2,
            'emergency_contact_phone_2' => $request->emergency_contact_phone_2,
            'emergency_contact_relationship_2' => $request->emergency_contact_relationship_2,
        ]);

        if ($request->has('photo')) {
            $baseURL = url('/');
            $imageName = $baseURL.'/images/students/'.time().$request->first_name.'_student.'.$request->photo->extension();
            $request->photo->move(public_path('images/students/'),$imageName);
            $student->photo = $imageName;
        }

        $student->save();

        $response['status'] = 200;
        $response['message'] = 'Student registered successfully';
        $response['students'] = $student;

        return response()->json($response, $response['status']);
    }

    public function show($id){
        $response = [
            'status' => 0,
            'message' => '',
            'student' => ''
        ];

        $student = Student::find($id);

        if ($student){
            $response['status'] = 200;
            $response['message'] = 'Student fetched successfully';
            $response['student'] = $student;
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'No student found';
        }

        return response()->json($response, $response['status']);
    }

    public function update(Request $request, $id){
        $response = [
            'status' == 0,
            'message' => '',
            'student' => ''
        ];

        $student = Student::find($id);

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'address' => 'required',
            'trans_type' => 'required',
            'age' => 'required',
            'civil_status' => 'required',
            'birth_place' => 'required',
            'nationality' => 'required',
            'curp' => 'required',
            'transport_time' => 'required',
            'tutor_name' => 'required',
            'tutor_phone' => 'required',
            'tutor_age' => 'required',
            'tutor_address' => 'required',
            'tutor_email' => 'required',
            'tutor_birth_date' => 'required',
            'tutor_occupation' => 'required',
            'tutor_schooling' => 'required',
            'tutor_live_student' => 'required',
            'tutor_curp' => 'required',
            'emergency_contact_name_1' => 'required',
            'emergency_contact_phone_1' => 'required',
            'emergency_contact_relationship_1' => 'required',
            'emergency_contact_name_2' => 'required',
            'emergency_contact_phone_2' => 'required',
            'emergency_contact_relationship_2' => 'required',
        ]);

        if($student){
            $student->first_name = $request->first_name;
            $student->last_name = $request->last_name;
            $student->birth_date = $request->birth_date;
            $student->gender = $request->gender;
            $student->address = $request->address;
            $student->trans_type = $request->trans_type;
            $student->age = $request->age;
            $student->civil_status = $request->civil_status;
            $student->birth_place = $request->birth_place;
            $student->nationality = $request->nationality;
            $student->curp = $request->curp;
            $student->transport_time = $request->transport_time;
            $student->tutor_name = $request->tutor_name;
            $student->tutor_phone = $request->tutor_phone;
            $student->tutor_age = $request->tutor_age;
            $student->tutor_address = $request->tutor_address;
            $student->tutor_email = $request->tutor_email;
            $student->tutor_birth_date = $request->tutor_birth_date;
            $student->tutor_occupation = $request->tutor_occupation;
            $student->tutor_schooling = $request->tutor_schooling;
            $student->tutor_live_student = $request->tutor_live_student;
            $student->tutor_curp = $request->tutor_curp;
            $student->emergency_contact_name_1 = $request->emergency_contact_name_1;
            $student->emergency_contact_phone_1 = $request->emergency_contact_phone_1;
            $student->emergency_contact_relationship_1 = $request->emergency_contact_relationship_1;
            $student->emergency_contact_name_2 = $request->emergency_contact_name_2;
            $student->emergency_contact_phone_2 = $request->emergency_contact_phone_2;
            $student->emergency_contact_relationship_2 = $request->emergency_contact_relationship_2;

            if($request->has('photo')){
                //delete old photo
                if ($student->photo){
                    $photo = explode('/', $student->photo);
                    $photo = end($photo);
                    $path = public_path('images/students/'.$photo);
                    if (file_exists($path)){
                        unlink($path);
                    }
                }
                // save photo to storage
                $baseURL = url('/');
                $imageName = $baseURL.'/images/students/'.time().$request->first_name.'_student.'.$request->photo->extension();
                $request->photo->move(public_path('images/students/'),$imageName);
                $student->photo = $imageName;
            }

            $student->save();

            $response['status'] = 200;
            $response['message'] = 'Student updated successfully';
            $response['student'] = $student;

        } else {
            $response['status'] = 201;
            $response['message'] = 'Student not found';
        }

        return response()->json($response, $response['status']);
    }

    function delete($id){
        $response = [
            'status' => 0,
            'message' => '',
            'student' => ''
        ];

        $student = Student::find($id);

        if ($student){
            if ($student->photo){
                $photo = explode('/', $student->photo);
                $photo = end($photo);
                $path = public_path('images/student/'.$photo);
                if (file_exists($path)){
                    unlink($path);
                }
            }
            $student->delete();
            $response['status'] = 200;
            $response['message'] = 'Student deleted successfully';
        }
        else {
            $response['status'] = 201;
            $response['message'] = 'Student not found';
        }

        return response()->json($response, $response['status']);
    }
}
