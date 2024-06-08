<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;

final class MeController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            throw new AuthorizationException('Unauthorized');
        }

        return new JsonResponse([
            'data' => [
                'userId' => $user->id,
                'userName' => $user->name,
            ],
        ]);
    }
}
