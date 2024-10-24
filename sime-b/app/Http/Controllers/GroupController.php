<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{
    //
    private function createResponse($status = 200, $message = '', $data = [])
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    public function all()
    {
        $groups = Group::all();

        return $this->createResponse(
            $groups->isNotEmpty() ? 200 : 201,
            $groups->isNotEmpty() ? 'Grupos encontrados' : 'No hay grupos disponibles',
            $groups
        );
    }

    public function show($id)
    {
        $group = Group::findOrFail($id);
        $group->subjects;

        return $this->createResponse(
            $group ? 200 : 201,
            $group ? 'Grupo encontrado' : 'Grupo no encontrado',
            $group
        );
    }

    public function register(Request $request)
    {
        $request->validate([
            'grade' => 'required',
            'group' => 'required',
            'user_id' => 'required',
        ]);

        $group = Group::create($request->all());

        if ($request->has('subject_id')) {
            $group->subjects()->attach($request->subject_id);
        }

        return $this->createResponse(
            $group ? 200 : 201,
            $group ? 'Grupo registrado' : 'Error al registrar el grupo',
            $group
        );
    }

    public function edit(Request $request, $id)
    {
        $request->validate([
            'grade' => 'required',
            'group' => 'required',
            'user_id' => 'required',
        ]);

        $group = Group::findOrFail($id);
        $group->update($request->all());

        if ($request->has('subject_id')) {
            $group->subjects()->sync($request->subject_id);
        }

        return $this->createResponse(
            $group ? 200 : 201,
            $group ? 'Grupo actualizado' : 'Error al actualizar el grupo',
            $group
        );
    }

    public function delete($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return $this->createResponse(
            200,
            'Grupo eliminado'
        );
    }


    public function groups_by_user($id)
    {
        $groups = Group::where('user_id', $id)->get();

        return $this->createResponse(
            $groups->isNotEmpty() ? 200 : 201,
            $groups->isNotEmpty() ? 'Grupos encontrados' : 'No hay grupos disponibles',
            $groups
        );
    }
}
