<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSiteRequest;
use App\Http\Requests\UpdateSiteRequest;
use App\Models\Site;
use App\Models\SiteMember;
use Illuminate\Support\Facades\DB;



class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiteRequest $request)
    {
        // リクエストから必要な情報を取得する
        $site_name = $request->input('site_name');
        $user_id = $request->input('user_id');

        // サイトを取得する
        $site = Site::where('site_name', $site_name)->first();

        if ($site) {
            //サイトが存在する場合はエラーメッセージを返す
            return response()->json(['message' => '既にこの現場名は存在します'], 422);
        }

        $site = Site::create([
            'site_name' => $site_name,
        ]);

        $site_id = $site->id;



        SiteMember::create([
            'user_id' => $user_id,
            'site_id' => $site_id,
            'authority' => 1,
        ]);

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

    /**
     * Display the specified resource.
     */
    public function show(Site $site)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Site $site)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSiteRequest $request, Site $site)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Site $site)
    {
        //
    }
}
