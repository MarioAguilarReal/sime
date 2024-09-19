<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ChangePasswordMail;
use Illuminate\Support\Facades\Cache;


class EmailController extends Controller
{
    //

    public function sendEmailToForgetPassword(Request $request)
    {
        $response = [
            'status' => 200,
            'message' => '',
        ];

        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $response['status'] = 203;
            $response['message'] = 'El usuario no existe';
            return response()->json($response, 203);
        }
        // generate token and save in password_reset_tokens table as cache
        $token = bin2hex(random_bytes(64));
        Cache::put('password_reset_token'. $user->email, $token, now()->addMinutes(30));

        try {
            Mail::send('mail.change-password', ['user' => $user, 'token' => $token], function ($message) use ($user) {
                $message->to($user->email);
                $message->subject('Restablecer contraseña');
            });

            $response['status'] = 200;
            $response['message'] = 'Se ha enviado un correo electrónico para restablecer la contraseña';
        } catch (\Exception $e) {
            \Log::error('Error al enviar el correo_ electrónico: ' . $e->getMessage());
            $response['status'] = 500;
            $response['message'] = 'Error al enviar el correo electrónico';
            return response()->json($response, 500);
        }

        return response()->json($response);
    }
}
