<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use App\Models\Classe;
use App\Models\User;
use Illuminate\Support\Facades\Log;


class ClasseController extends Controller
{
    private function createResponse($status=200, $message ='', $data = []){
        return response() -> json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    public function all()
    {
        $classes = Classe::all();

        return $this->createResponse(
            $classes->isNotEmpty() ? 200 : 201,
            $classes->isNotEmpty() ? 'Materias encontradas' : 'No hay materias disponibles',
            $classes
        );
    }

    public function show($id)
    {
        $classe = Classe::findOrFail($id);

        return $this->createResponse(
            $classe ? 200 : 201,
            $classe ? 'Materia encontrada' : 'Materia no encontrada',
            $classe
        );
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required',
        ]);

        $classe = Classe::create($request->all());

        return $this->createResponse(
            $classe ? 200 : 201,
            $classe ? 'Materia registrada' : 'Error al registrar la materia',
            $classe
        );
    }

    public function edit(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required',
        ]);

        $classe = Classe::findOrFail($id);
        $classe->update($request->all());

        return $this->createResponse(
            $classe ? 200 : 201,
            $classe ? 'Materia actualizada' : 'Error al actualizar la materia',
            $classe
        );
    }

    public function delete($id)
    {
        $classe = Classe::findOrFail($id);
        $classe->delete();

        return $this->createResponse(
            200,
            'Materia eliminada'
        );
    }


    public function classes_by_user($id)
    {
        $user = User::findOrFail($id);
        $classes = $user->classes()->get();

        return $this->createResponse(
            $classes->isNotEmpty() ? 200 : 201,
            $classes->isNotEmpty() ? 'Materias encontradas' : 'No hay materias disponibles',
            $classes
        );
    }

    public function available_classes(){
        $available_classes = Classe::doesntHave('groups')->get();

        return $this->createResponse(
            $available_classes->isNotEmpty() ? 200 : 201,
            $available_classes->isNotEmpty() ? 'Materias disponibles' : 'No hay materias disponibles',
            $available_classes
        );
    }

    public function classes_by_group($id){
        $group = Group::findOrFail($id);
        $classes = $group->subjects()->get();

        return $this->createResponse(
            $classes->isNotEmpty() ? 200 : 201,
            $classes->isNotEmpty() ? 'Materias encontradas' : 'No hay materias disponibles',
            $classes
        );
    }
}
