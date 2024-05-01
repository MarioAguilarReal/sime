<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        $response = [
            'status' => 0,
            'message' => '',
            'token' => '',
            'user' => ''
        ];

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');

        if (User::where('email', $request->email)->doesntExist()) {
            $response['status'] = 201;
            $response['message'] = 'User does not exist';
        }else{
            if (auth()->attempt($credentials)) {
                $token = auth()->user()->createToken('authToken')->plainTextToken;
                $response['status'] = 200;
                $response['message'] = 'Login successful';
                $response['token'] = $token;
                $response['user'] = auth()->user();

            } else {
                $response['status'] = 201;
                $response['message'] = 'Invalid credentials';
            }
        }
        return response()->json($response, $response['status']);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        $resonse = [
            'status' => 200,
            'message' => 'Logged out'
        ];
        return response()->json($resonse, 200);
    }

    public function me(Request $request)
    {
        $response = [
            'status' => 200,
            'message' => '',
            'user' => ''
        ];
        if (auth()->user()) {
            $response['message'] = 'User found';
            $response['user'] = auth()->user();
        } else {
            $response['message'] = 'User not found';
            $response['status'] = 201;
            $response['user'] = null;
        }

        return response()->json($response, 200);
    }

    public function register(Request $request)
    {
        $response = [
            'status' => 0,
            'message' => '',
            'user' => ''
        ];

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'birth_date' => 'required|date',
            'age' => 'required',
            'gender' => 'required',
            // 'photo' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'civil_status' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' =>  $request->last_name,
            'birth_date' => $request->birth_date,
            'age' => $request->age,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone' => $request->phone,
            'civil_status' => $request->civil_status,
            'is_teacher' => $request->is_teacher,
            'is_tutor' => $request->is_tutor,
            'is_admin' => $request->is_admin,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        if ($request->has('photo')) {
            // save photo to storage
            // $imageName = time().$request->first_name.'_profile.'.$request->photo->extension();
            $baseURL = url('/');
            $imageName = $baseURL.'/images/users/profile/'.time().$request->first_name.'_profile.'.$request->photo->extension();
            $request->photo->move(public_path('images/users/profile/'), $imageName);
            $user->photo = $imageName;
        }

        $user->save();

        $response['status'] = 200;
        $response['message'] = 'User created successfully';
        $response['user'] = $user;

        return response()->json($response, 200);
    }

    public function edit(Request $request,  $id)
    {

        $response = [
            'status' => 0,
            'message' => '',
            'user' => ''
        ];

        $user = User::find($id);

        if ($user) {
            $request->validate([
                'first_name' => 'required',
                'last_name' => 'required',
                'birth_date' => 'required|date',
                'age' => 'required',
                'gender' => 'required',
                'address' => 'required',
                'phone' => 'required',
                'civil_status' => 'required',

            ]);

            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->birth_date = $request->birth_date;
            $user->age = $request->age;
            $user->gender = $request->gender;
            $user->address = $request->address;
            $user->phone = $request->phone;
            $user->civil_status = $request->civil_status;
            $user->is_teacher = $request->is_teacher;
            $user->is_tutor = $request->is_tutor;
            $user->is_admin = $request->is_admin;

            if ($request->has('photo')) {
                //delete old photo
                if ($user->photo) {
                    $photo = explode('/', $user->photo);
                    $photo = end($photo);
                    $path = public_path('images/users/profile/'.$photo);
                    if (file_exists($path)) {
                        unlink($path);
                    }
                }
                // save photo to storage
                // $imageName = time().$request->first_name.'_profile.'.$request->photo->extension();
                $baseURL = url('/');
                $imageName = $baseURL.'/images/users/profile/'.time().$request->first_name.'_profile.'.$request->photo->extension();
                $request->photo->move(public_path('images/users/profile/'), $imageName);
                $user->photo = $imageName;
            }

            $user->save();

            $response['status'] = 200;
            $response['message'] = 'User updated successfully';
            $response['user'] = $user;
        } else {
            $response['status'] = 201;
            $response['message'] = 'User not found';
        }

        return response()->json($response, $response['status']);
    }


    public function show($id)
    {
        $response = [
            'status' => 0,
            'message' => '',
            'user' => ''
        ];

        $user = User::find($id);

        if ($user) {
            $response['status'] = 200;
            $response['message'] = 'User found';
            $response['user'] = $user;
        } else {
            $response['status'] = 201;
            $response['message'] = 'User not found';
        }

        return response()->json($response, $response['status']);
    }


    public function delete($id)
    {
        $response = [
            'status' => 0,
            'message' => ''
        ];

        $user = User::find($id);

        if ($user) {
            $user->tokens()->delete();
            //delete photo
            if ($user->photo) {
                $photo = explode('/', $user->photo);
                $photo = end($photo);
                $path = public_path('images/users/profile/'.$photo);
                if (file_exists($path)) {
                    unlink($path);
                }
            }

            $user->delete();
            $response['status'] = 200;
            $response['message'] = 'User deleted successfully';
        } else {
            $response['status'] = 201;
            $response['message'] = 'User not found';
        }

        return response()->json($response, $response['status']);
    }

    public function all(Request $request)
    {
        $response = [
            'status' => 0,
            'message' => '',
            'users' => ''
        ];

        $users = User::all();
        if ($users) {
            $response['status'] = 200;
            $response['message'] = 'Users found';
            $response['users'] = $users;
        } else {
            $response['status'] = 201;
            $response['message'] = 'Users not found';
        }

        return response()->json($response, $response['status']);
    }


    public function changePassword(Request $request)
    {
        $response = [
            'status' => 0,
            'message' => ''
        ];

        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required',
            'confirmPassword' => 'required|same:newPassword',
            'email' => 'required|email',
            'token' => 'required'
        ]);

        if (Cache::get('password_reset_token'. $request->email) != $request->token) {
            $response['status'] = 201;
            $response['message'] = 'Invalid token';
            return response()->json($response, $response['status']);
        }

        $user = auth()->user();

        if (password_verify($request->currentPassword, $user->password)) {
            $user->password = bcrypt($request->newPassword);
            $user->save();
            $response['status'] = 200;
            $response['message'] = 'Password changed successfully';
        } else {
            $response['status'] = 201;
            $response['message'] = 'Invalid current password';
        }

        return response()->json($response, $response['status']);
    }
}
