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

    private function createResponse($status = 200, $message = '', $data = [])
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    public function all(){
        $students = Student::all();

        if($students->isNotEmpty()){
            return $this->createResponse(200, 'Estudiantes encontrados', $students);
        }
        else {
            return $this->createResponse(201, 'No hay estudiantes disponibles');
        }
    }

    public function register(Request $request){
        $request->validate([
            'first_name' => 'required',
            'maternal_surname' => 'required',
            'paternal_surname' => 'required',
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

        $student = Student::create($request->except('photo'));

        if ($request->has('photo')) {
            $baseURL = url('/');
            $imageName = $baseURL.'/images/students/'.time().$request->first_name.'_student.'.$request->photo->extension();
            $request->photo->move(public_path('images/students/'),$imageName);
            $student->photo = $imageName;
        }

        $student->save();

        return $this->createResponse(
            $student ? 200 : 201,
            $student ? 'Estudiante registrado' : 'Error al registrar el estudiante',
            $student
        );
    }

    public function show($id){

        $student = Student::find($id);

        if($student){
            return $this->createResponse(200, 'Estudiante encontrado', $student);
        }
        else {
            return $this->createResponse(201, 'Estudiante no encontrado');
        }
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if(!$student){
            return $this->createResponse(201, 'Estudiante no encontrado');
        }

        $request->validate([
            'first_name' => 'required',
            'maternal_surname' => 'required',
            'paternal_surname' => 'required',
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

        $student->update($request->except('photo'));

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

        return $this->createResponse(200, 'Estudiante actualizado', $student);
    }

    function delete($id)
    {
        $student = Student::find($id);

        if(!$student){
            return $this->createResponse(201, 'Estudiante no encontrado');
        }

        if ($student->photo){
            $photo = explode('/', $student->photo);
            $photo = end($photo);
            $path = public_path('images/student/'.$photo);
            if (file_exists($path)){
                unlink($path);
            }
        }
        $student->delete();

        return $this->createResponse(200, 'Estudiante eliminado');
    }
}
