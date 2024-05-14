<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classe;

class ClasseController extends Controller
{
    //

    public function all()
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => []
        ];

        $classes = Classe::all();
        if($classes) {
            $response['data'] = $classes;
            $response['message'] = 'Data found';
        }else{
            $response['status'] = 201;
            $response['message'] = 'No data found';
        }
        return response()->json($response, $response['status']);
    }

    public function show($id)
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => []
        ];

        $classe = Classe::find($id);

        if($classe) {
            $response['data'] = $classe;
            $response['message'] = 'Data found';
        }else{
            $response['status'] = 201;
            $response['message'] = 'No data found';
        }

        return response()->json($response, $response['status']);
    }

    public function register(Request $request)
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => ''
        ];

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required',
            'max_students' => 'required',
            'status' => 'required'
        ]);

        $classe = new Classe();
        $classe->name = $request->name;
        $classe->description = $request->description;
        $classe->user_id = $request->user_id;
        $classe->max_students = $request->max_students;
        $classe->status = $request->status;
        $classe->save();

        $response['data'] = $classe;
        $response['message'] = 'Data saved successfully';

        return response()->json($response, $response['status']);
    }

    public function edit(Request $request, $id)
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => ''
        ];

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required',
            'max_students' => 'required',
            'status' => 'required'
        ]);

        $classe = Classe::find($id);
        $classe->name = $request->name;
        $classe->description = $request->description;
        $classe->user_id = $request->user_id;
        $classe->max_students = $request->max_students;
        $classe->status = $request->status;
        $classe->save();

        $response['data'] = $classe;
        $response['message'] = 'Data updated successfully';

        return response()->json($response, $response['status']);
    }

    public function delete($id)
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => ''
        ];

        $classe = Classe::find($id);
        $classe->delete();

        $response['data'] = $classe;
        $response['message'] = 'Data deleted successfully';

        return response()->json($response, $response['status']);
    }



}
