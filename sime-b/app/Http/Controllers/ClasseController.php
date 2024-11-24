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
            $classes->isNotEmpty() ? 'Clases encontradas' : 'No hay clases disponibles',
            $classes
        );
    }

    public function show($id)
    {
        $classe = Classe::findOrFail($id);

        return $this->createResponse(
            $classe ? 200 : 201,
            $classe ? 'Clase encontrada' : 'Clase no encontrada',
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

        $classe = Classe::create($request->except('status')); // create() is a method to insert a record to the database

        return $this->createResponse(
            $classe ? 200 : 201,
            $classe ? 'Clase registrada' : 'Error al registrar la clase',
            $classe
        );
    }

    public function edit(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required',
            'max_students' => 'required',
        ]);

        $classe = Classe::findOrFail($id);
        $classe->update($request->except('status'));

        return $this->createResponse(
            $classe ? 200 : 201,
            $classe ? 'Clase actualizada' : 'Error al actualizar la clase',
            $classe
        );
    }

    public function delete($id)
    {
        $classe = Classe::findOrFail($id);
        $classe->delete();

        return $this->createResponse(
            200,
            'Clase eliminada'
        );
    }


    public function classes_by_user($id)
    {
        $user = User::findOrFail($id);
        $classes = $user->classes()->get();

        return $this->createResponse(
            $classes->isNotEmpty() ? 200 : 201,
            $classes->isNotEmpty() ? 'Clases encontradas' : 'No hay clases disponibles',
            $classes
        );
    }

    public function available_classes(){
        $available_classes = Classe::doesntHave('groups')->get();

        return $this->createResponse(
            $available_classes->isNotEmpty() ? 200 : 201,
            $available_classes->isNotEmpty() ? 'Clases disponibles' : 'No hay clases disponibles',
            $available_classes
        );
    }

    public function classes_by_group($id){
        $group = Group::findOrFail($id);
        $classes = $group->subjects()->get();

        return $this->createResponse(
            $classes->isNotEmpty() ? 200 : 201,
            $classes->isNotEmpty() ? 'Clases encontradas' : 'No hay clases disponibles',
            $classes
        );
    }
}
