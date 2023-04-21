<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSiteMemberRequest;
use App\Http\Requests\UpdateSiteMemberRequest;
use App\Models\SiteMember;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SiteMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function userInfo(Request $request)
    {

        $user_id = $request->input('user_id');

        $data = DB::table('site_members')
            ->Join('sites', 'site_members.site_id', '=', 'sites.id')
            ->Join('users', 'site_members.user_id', '=', 'users.id')
            ->where('users.id', '=', $user_id)
            ->select(
                'site_members.id',
                'site_members.site_id',
                'sites.site_name',
                'site_members.authority',
            )
            ->orderBy('site_members.id', 'asc')
            ->get();

        if ($data->isEmpty()) {
            // 空の結果を返す
            return response()->json([]);
        } else {
            $result = $data->map(function ($item) {
                return [
                    'siteMemberId' => $item->id,
                    'siteId' => $item->site_id,
                    'siteName' => $item->site_name,
                    'authority' => $item->authority,
                ];
            });

            return response()->json($result);
        }
    }
    public function siteMembers(Request $request)
    {

        $site_id = $request->input('site_id');

        $data = DB::table('site_members')
            ->join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_id', '=', $site_id)
            ->select(
                'site_members.id',
                'users.name',
                'users.email',
                'site_members.authority',
            )
            ->orderBy('site_members.id', 'asc')
            ->get();

        if ($data->isEmpty()) {
            // 空の結果を返す
            return response()->json([]);
        } else {
            $result = $data->map(function ($item) {
                return [
                    'siteMemberId' => $item->id,
                    'userName' => $item->name,
                    'userEmail' => $item->email,
                    'authority' => $item->authority,
                ];
            });

            return response()->json($result);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiteMemberRequest $request)
    {
        $email = $request->input('email');
        $site_id = $request->input('site_id');

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'ユーザーが見つかりませんでした。'], 404);
        }

        $user_id = $user->id;

        $existingSiteMember = SiteMember::where('site_id', $site_id)->where('user_id', $user_id)->first();

        if ($existingSiteMember) {
            return response()->json(['message' => '既にこのユーザーは追加されています。'], 409);
        }

        SiteMember::create([
            'site_id' => $site_id,
            'user_id' => $user_id,
            'authority' => 0,
        ]);

        $data = DB::table('site_members')
            ->join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_id', '=', $site_id)
            ->select(
                'site_members.id',
                'users.name',
                'users.email',
                'site_members.authority',
            )
            ->orderBy('site_members.id', 'asc')
            ->get();

        $result = $data->map(function ($item) {
            return [
                'siteMemberId' => $item->id,
                'userName' => $item->name,
                'userEmail' => $item->email,
                'authority' => $item->authority,
            ];
        });

        return response()->json($result);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSiteMemberRequest $request, SiteMember $siteMember)
    {
        $id = $request->input('id');
        $authority = $request->input('authority');

        $site_member = SiteMember::findOrFail($id);
        $site_id = $site_member->site_id;

        $site_member->authority = $authority;
        $site_member->save();

        $data = DB::table('site_members')
            ->join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_id', '=', $site_id)
            ->select(
                'site_members.id',
                'users.name',
                'users.email',
                'site_members.authority',
            )
            ->orderBy('site_members.id', 'asc')
            ->get();

        $result = $data->map(function ($item) {
            return [
                'siteMemberId' => $item->id,
                'userName' => $item->name,
                'userEmail' => $item->email,
                'authority' => $item->authority,
            ];
        });

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $site_member_id = $request->input('site_member_id');
        $site_id = $request->input('site_id');

        $site_member = SiteMember::findOrFail($site_member_id);

        foreach ($site_member->surveyingLists as $surveyingList) {
            $surveyingList->surveyingData()->delete();
        }

        $site_member->surveyingLists()->delete();
        $site_member->delete();

        $data = DB::table('site_members')
            ->join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_id', '=', $site_id)
            ->select(
                'site_members.id',
                'users.name',
                'users.email',
                'site_members.authority',
            )
            ->orderBy('site_members.id', 'asc')
            ->get();

        if ($data->isEmpty()) {
            // 空の結果を返す
            return response()->json([]);
        } else {
            $result = $data->map(function ($item) {
                return [
                    'siteMemberId' => $item->id,
                    'userName' => $item->name,
                    'userEmail' => $item->email,
                    'authority' => $item->authority,
                ];
            });

            return response()->json($result);
        }
    }
}
