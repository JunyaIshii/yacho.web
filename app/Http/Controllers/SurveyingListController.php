<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyingListRequest;
use App\Http\Requests\UpdateSurveyingListRequest;
use App\Models\SurveyingList;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;



class SurveyingListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $site_id = $request->input('site_id');

        // 測量リストをJSONレスポンスで返す
        $data = DB::table('site_members')
            ->Join('surveying_lists', 'site_members.id', '=', 'surveying_lists.site_member_id')
            ->join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_members.site_id', '=', $site_id)
            ->select(
                'surveying_lists.id as surveying_list_id',
                'surveying_lists.surveying_name',
                'surveying_lists.weather',
                'surveying_lists.site_member_id',
                'users.name',
                'surveying_lists.created_at'
            )
            ->orderBy('surveying_lists.created_at', 'desc')
            ->get();

        $result = $data->map(function ($item) {
            $createdAt = Carbon::parse($item->created_at)->format('Y/m/d');
            return [
                'surveyingListId' => $item->surveying_list_id,
                'surveyingName' => $item->surveying_name,
                'weather' => $item->weather,
                'author' => $item->site_member_id,
                'authorName' => $item->name,
                'createdAt' => $createdAt,
            ];
        });

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyingListRequest $request)
    {
        // リクエストから必要な情報を取得する
        $site_member_id = $request->input('site_member_id');

        SurveyingList::create([
            'site_member_id' => $site_member_id,
            'surveying_name' => '',
            'weather' => 1,
        ]);

        $site_member = DB::table('site_members')->where('id', '=', $site_member_id)->select('site_id')->first();
        $site_id = $site_member->site_id;

        // 測量リストをJSONレスポンスで返す
        $data = DB::table('site_members')
            ->Join('surveying_lists', 'site_members.id', '=', 'surveying_lists.site_member_id')
            ->Join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_members.site_id', '=', $site_id)
            ->select(
                'surveying_lists.id as surveying_list_id',
                'surveying_lists.surveying_name',
                'surveying_lists.weather',
                'surveying_lists.site_member_id',
                'users.name',
                'surveying_lists.created_at'
            )
            ->orderBy('surveying_lists.created_at', 'desc')
            ->get();

        $result = $data->map(function ($item) {
            $createdAt = Carbon::parse($item->created_at)->format('Y/m/d');
            return [
                'surveyingListId' => $item->surveying_list_id,
                'surveyingName' => $item->surveying_name,
                'weather' => $item->weather,
                'author' => $item->site_member_id,
                'authorName' => $item->name,
                'createdAt' => $createdAt,
            ];
        });

        return response()->json($result);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyingListRequest $request)
    {
        $id = $request->input('id');
        $surveying_name = $request->input('surveying_name');
        $weather = $request->input('weather');

        $surveyingList = SurveyingList::findOrFail($id);

        if (!$surveying_name) {
            $surveying_name = '';
        }
        $surveyingList->surveying_name = $surveying_name;
        $surveyingList->weather = $weather;
        $surveyingList->save();

        $site_member_id = $surveyingList->site_member_id;

        $site_member = DB::table('site_members')->where('id', '=', $site_member_id)->select('site_id')->first();
        $site_id = $site_member->site_id;

        // 測量リストをJSONレスポンスで返す
        $data = DB::table('site_members')
            ->Join('surveying_lists', 'site_members.id', '=', 'surveying_lists.site_member_id')
            ->Join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_members.site_id', '=', $site_id)
            ->select(
                'surveying_lists.id as surveying_list_id',
                'surveying_lists.surveying_name',
                'surveying_lists.weather',
                'surveying_lists.site_member_id',
                'users.name',
                'surveying_lists.created_at'
            )
            ->orderBy('surveying_lists.created_at', 'desc')
            ->get();

        $result = $data->map(function ($item) {
            $createdAt = Carbon::parse($item->created_at)->format('Y/m/d');
            return [
                'surveyingListId' => $item->surveying_list_id,
                'surveyingName' => $item->surveying_name,
                'weather' => $item->weather,
                'author' => $item->site_member_id,
                'authorName' => $item->name,
                'createdAt' => $createdAt,
            ];
        });

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $site_id = $request->input('site_id');

        $surveyingList = SurveyingList::find($id);
        $surveyingList->surveyingData()->delete();
        $surveyingList->delete();

        // 測量リストをJSONレスポンスで返す
        $data = DB::table('site_members')
            ->Join('surveying_lists', 'site_members.id', '=', 'surveying_lists.site_member_id')
            ->join('users', 'site_members.user_id', '=', 'users.id')
            ->where('site_members.site_id', '=', $site_id)
            ->select(
                'surveying_lists.id as surveying_list_id',
                'surveying_lists.surveying_name',
                'surveying_lists.weather',
                'surveying_lists.site_member_id',
                'users.name',
                'surveying_lists.created_at'
            )
            ->orderBy('surveying_lists.created_at', 'desc')
            ->get();

        $result = $data->map(function ($item) {
            $createdAt = Carbon::parse($item->created_at)->format('Y/m/d');
            return [
                'surveyingListId' => $item->surveying_list_id,
                'surveyingName' => $item->surveying_name,
                'weather' => $item->weather,
                'author' => $item->site_member_id,
                'authorName' => $item->name,
                'createdAt' => $createdAt,
            ];
        });

        return response()->json($result);
    }
}
