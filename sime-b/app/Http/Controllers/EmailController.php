<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ChangePasswordMail;
use Illuminate\Support\Facades\Cache;
use Validator;


class EmailController extends Controller
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

    public function sendEmailToForgetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return $this->createResponse(422, 'Error de validación', $validator->errors());
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $token  = Hash::make(bin2hex(random_bytes(64)));
        Cache::put('password_reset_token'. $user->email, $token, now()->addMinutes(30));

        try {
            Mail::send('mail.change-password', ['user' => $user, 'token' => $token], function ($message) use ($user) {
                $message->to($user->email);
                $message->subject('Restablecer contraseña');
            });

            return $this->createResponse(200, 'Correo electrónico enviado');
        } catch (\Exception $e) {
            return $this->createResponse(500, 'Error al enviar el correo electrónico');
        }

    }
}
