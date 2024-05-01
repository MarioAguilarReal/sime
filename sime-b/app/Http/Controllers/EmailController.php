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

    public function sendEmailChangePassword(Request $request, $id)
    {
        $response = [
            'status' => 200,
            'message' => '',
        ];

        $user = User::find($id);
        if (!$user) {
            $response['status'] = 404;
            $response['error'] = 'User not found';
            return response()->json($response, 404);
        }
        // generate token and save in password_reset_tokens table as cache
        $token = bin2hex(random_bytes(64));
        Cache::put('password_reset_token'. $user->email, $token, now()->addMinutes(30));

        Mail::to($user->email)->send(new ChangePasswordMail($user, $token));

        $response['message'] = 'Email sent successfully';

        return response()->json($response);

    }
}
