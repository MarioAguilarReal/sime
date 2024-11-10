<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentLearningType;

class ApiLearningTypeController extends Controller
{
    private function createResponse($status = 200, $message = '', $data = [])
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    public function setLearningType(Request $request, $id){
        $request->validate([
            'learning_type' => 'required',
        ]);

        $student = Student::find($id);

        if($student){
            $learningType = new StudentLearningType([
                'learning_type' => $request->learning_type,
            ]);

            $student->learningType()->save($learningType);

            return $this->createResponse(200, 'Tipo de aprendizaje registrado correctamente', $learningType);
        }
        else {
            return $this->createResponse(201, 'Estudiante no encontrado');
        }
    }

    public function updateLearningType(Request $request, $id){
        $request->validate([
            'learning_type' => 'required',
        ]);

        $learningType = StudentLearningType::find($id);

        if($learningType){
            $learningType->learning_type = $request->learning_type;
            $learningType->save();

            return $this->createResponse(200, 'Tipo de aprendizaje actualizado correctamente', $learningType);
        }
        else {
            return $this->createResponse(201, 'Tipo de aprendizaje no encontrado');
        }
    }
}
