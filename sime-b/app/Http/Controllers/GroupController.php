<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{
    //

    public function all()
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => []
        ];

        $groups = Group::all();
        if($groups) {
            $response['data'] = $groups;
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

        $group = Group::find($id);

        if($group) {
            $response['data'] = $group;
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
            'user_id' => 'required'
        ]);

        $group = new Group();
        $group->name = $request->name;
        $group->description = $request->description;
        $group->user_id = $request->user_id;
        $group->save();

        $response['data'] = $group;
        $response['message'] = 'Data saved';

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
            'user_id' => 'required'
        ]);

        $group = Group::find($id);
        $group->name = $request->name;
        $group->description = $request->description;
        $group->user_id = $request->user_id;
        $group->save();

        $response['data'] = $group;
        $response['message'] = 'Data updated';

        return response()->json($response, $response['status']);
    }

    public function delete($id)
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => ''
        ];

        $group = Group::find($id);
        $group->delete();

        $response['message'] = 'Data deleted';

        return response()->json($response, $response['status']);
    }


    public function groups_by_user($id)
    {
        $response = [
            'status' => 200,
            'message' => '',
            'data' => []
        ];

        $groups = Group::where('user_id', $id)->get();
        if($groups) {
            $response['data'] = $groups;
            $response['message'] = 'Data found';
        }else{
            $response['status'] = 201;
            $response['message'] = 'No data found';
        }
        return response()->json($response, $response['status']);
    }
}
