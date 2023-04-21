<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use App\Notifications\ResetPasswordNotification;

class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if ($user) {
            $token = Password::createToken($user);
            $initUrl = url(config('app.url'));
            $url = "{$initUrl}/reset-password?token={$token}&email={$user->email}";

            $user->notify(new ResetPasswordNotification($url));

            return response()->json([
                'message' => 'パスワードリセットリンクが送信されました。メールを確認してください。'
            ]);
        } else {
            return response()->json([
                'message' => 'このメールアドレスは登録されていません。'
            ], 404);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, $password) {
                $user->password = bcrypt($password);
                $user->setRememberToken(Str::random(60));
                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? response()->json(['status' => __($status)], 200)
            : response()->json(['email' => __($status)], 400);
    }
}
