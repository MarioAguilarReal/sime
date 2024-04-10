<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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
        return response()->json(auth()->user(), 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json(['token' => $token], 200);
    }
}
