<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use App\Models\Classe;

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
            $response['message'] = 'Credenciales incorrectas';
        } else {
            if (auth()->attempt($credentials)) {
                $token = auth()->user()->createToken('authToken')->plainTextToken;
                $response['status'] = 200;
                $response['message'] = 'Inicio de sesión exitoso';
                $response['token'] = $token;
                $response['user'] = auth()->user();

            } else {
                $response['status'] = 201;
                $response['message'] = 'Credenciales incorrectas';
            }
        }
        return response()->json($response, $response['status']);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        $resonse = [
            'status' => 200,
            'message' => 'Sesion cerrada con éxito'
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
            $response['message'] = 'Usuario encontrado';
            $response['user'] = auth()->user();
        } else {
            $response['message'] = 'Usuario no encontrado';
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
            'last_name' => $request->last_name,
            'birth_date' => $request->birth_date,
            'age' => $request->age,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone' => $request->phone,
            'civil_status' => $request->civil_status,
            'role' => $request->role, // 1 for 'admin', 2 for 'teacher', 3 for 'tutor'
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        if ($request->has('photo')) {
            // save photo to storage
            // $imageName = time().$request->first_name.'_profile.'.$request->photo->extension();
            $baseURL = url('/');
            $imageName = $baseURL . '/images/users/profile/' . time() . $request->first_name . '_profile.' . $request->photo->extension();
            $request->photo->move(public_path('images/users/profile/'), $imageName);
            $user->photo = $imageName;
        }

        $user->save();

        $response['status'] = 200;
        $response['message'] = 'Usuario registrado con éxito';
        $response['user'] = $user;

        return response()->json($response, $response['status']);
    }

    public function edit(Request $request, $id)
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
            $user->role = $request->role;// 1 for 'admin', 2 for 'teacher', 3 for 'tutor'

            if ($request->has('photo')) {
                //delete old photo
                if ($user->photo) {
                    $photo = explode('/', $user->photo);
                    $photo = end($photo);
                    $path = public_path('images/users/profile/' . $photo);
                    if (file_exists($path)) {
                        unlink($path);
                    }
                }
                // save photo to storage
                $baseURL = url('/');
                $imageName = $baseURL . '/images/users/profile/' . time() . $request->first_name . '_profile.' . $request->photo->extension();
                $request->photo->move(public_path('images/users/profile/'), $imageName);
                $user->photo = $imageName;
            }

            $user->save();

            $response['status'] = 200;
            $response['message'] = 'Usuario actualizado con éxito';
            $response['user'] = $user;
        } else {
            $response['status'] = 201;
            $response['message'] = 'Usuario no encontrado';
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
            $response['message'] = 'Usuario encontrado';
            $response['user'] = $user;
        } else {
            $response['status'] = 201;
            $response['message'] = 'Usuario no encontrado';
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
                $path = public_path('images/users/profile/' . $photo);
                if (file_exists($path)) {
                    unlink($path);
                }
            }

            $user->delete();
            $response['status'] = 200;
            $response['message'] = 'Usuario eliminado con éxito';
        } else {
            $response['status'] = 201;
            $response['message'] = 'Usuario no encontrado';
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
            $response['message'] = 'Usuarios encontrados';
            $response['users'] = $users;
        } else {
            $response['status'] = 201;
            $response['message'] = 'Usuarios no encontrados';
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
        ]);

        if ($request->email != auth()->user()->email) {
            $response['status'] = 201;
            $response['message'] = 'Ocurrió un error';
            return response()->json($response, $response['status']);
        }

        $user = auth()->user();

        if (!password_verify($request->currentPassword, $user->password)) {
            $response['status'] = 201;
            $response['message'] = 'La contraseña actual no es válida';
            return response()->json($response, $response['status']);
        }

        //verify if old password is the same as new password
        if (password_verify($request->newPassword, $user->password)) {
            $response['status'] = 201;
            $response['message'] = 'La nueva contraseña no puede ser igual a la anterior';
            return response()->json($response, $response['status']);
        }

        $user->password = bcrypt($request->newPassword);
        $user->save();
        $response['status'] = 200;
        $response['message'] = 'Password changed successfully';

        return response()->json($response, $response['status']);
    }

    public function verifyTokenToChangePassword(Request $request)
    {
        $response = [
            'status' => 0,
            'message' => ''
        ];

        $request->validate([
            'token' => 'required',
            'email' => 'required|email'
        ]);

        $token = Cache::get('password_reset_token' . $request->email);

        if (!$token) {
            $response['status'] = 201;
            $response['message'] = 'El token ha expirado';
            return response()->json($response, $response['status']);
        }

        if ($token != $request->token) {
            $response['status'] = 201;
            $response['message'] = 'El token no es válido';
            return response()->json($response, $response['status']);
        }

        $response['status'] = 200;
        $response['message'] = 'El token es válido';

        return response()->json($response, $response['status']);
    }

    public function resetPassword(Request $request){
        $response = [
            'status' => 0,
            'message' => ''
        ];


        $request->validate([
            'email' => 'required|email',
            'newPassword' => 'required',
            'token' => 'required'
        ]);

        $token = Cache::get('password_reset_token' . $request->email);

        if (!$token) {
            $response['status'] = 201;
            $response['message'] = 'El token ha expirado';
            return response()->json($response, $response['status']);
        }

        if ($token != $request->token) {
            $response['status'] = 201;
            $response['message'] = 'El token no es válido';
            return response()->json($response, $response['status']);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $response['status'] = 201;
            $response['message'] = 'El usuario no existe';
            return response()->json($response, $response['status']);
        }

        //verify if old password is the same as new password
        if (password_verify($request->newPassword, $user->password)) {
            $response['status'] = 201;
            $response['message'] = 'La nueva contraseña no puede ser igual a la anterior';
            return response()->json($response, $response['status']);
        }

        //delete token
        Cache::forget('password_reset_token' . $request->email);

        $user->password = bcrypt($request->newPassword);
        $user->save();

        $response['status'] = 200;
        $response['message'] = 'Contraseña restablecida con éxito';

        return response()->json($response, $response['status']);
    }
}
