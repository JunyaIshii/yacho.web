<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

final class RegisterController extends Controller
{

    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();

        Auth::login($user);

        $response = [
            'user' => $user,
        ];

        return new JsonResponse($response);
    }
}
