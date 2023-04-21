<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyingDataRequest;
use App\Http\Requests\UpdateSurveyingDataRequest;
use App\Models\SurveyingData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class SurveyingDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function surveyingData(Request $request)
    {
        $surveying_list_id = $request->input('surveying_list_id');

        $data = DB::table('surveying_data')
            ->where('surveying_list_id', '=', $surveying_list_id)
            ->select(
                'id',
                'surveying_data_name',
                'bs',
                'fs',
                'gh'
            )
            ->orderBy('id', 'asc')
            ->get();

        $lastItem = $data->last();

        // 最後の要素に入力がある場合、新しいレコードを作成します
        // また、データが1件もなかった場合にも新しい空のレコードを作成します
        if (!$lastItem || $lastItem->surveying_data_name || $lastItem->bs || $lastItem->fs || $lastItem->gh) {
            $newItemId = DB::table('surveying_data')->insertGetId([
                'surveying_list_id' => $surveying_list_id,
                'surveying_data_name' => null,
                'bs' => null,
                'fs' => null,
                'gh' => null,
            ]);

            $data->push((object)[
                'id' => $newItemId,
                'surveying_data_name' => null,
                'bs' => null,
                'fs' => null,
                'gh' => null,
            ]);
        }
        $result = $data->map(function ($item) {
            return [
                'surveyingDataId' => $item->id,
                'surveyingDataName' => $item->surveying_data_name,
                'bs' => $item->bs,
                'fs' => $item->fs,
                'gh' => $item->gh
            ];
        });
        return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyingDataRequest $request, SurveyingData $surveyingData)
    {
        $id = $request->input('id');
        $surveying_data_name = $request->input('surveying_data_name');
        $bs = $request->input('bs');
        $fs = $request->input('fs');
        $gh = $request->input('gh');

        $surveying_data = SurveyingData::findOrFail($id);
        $surveying_data->surveying_data_name = $surveying_data_name;
        $surveying_data->bs = $bs;
        $surveying_data->fs = $fs;
        $surveying_data->gh = $gh;
        $surveying_data->save();

        $surveying_list_id = $surveying_data->surveying_list_id;

        $data = DB::table('surveying_data')
            ->where('surveying_list_id', '=', $surveying_list_id)
            ->select(
                'id',
                'surveying_data_name',
                'bs',
                'fs',
                'gh'
            )
            ->orderBy('id', 'asc')
            ->get();

        $lastItem = $data->last();

        // 最後の要素に入力がある場合、新しいレコードを作成します
        if ($lastItem && ($lastItem->surveying_data_name || $lastItem->bs || $lastItem->fs || $lastItem->gh)) {
            $newItemId = DB::table('surveying_data')->insertGetId([
                'surveying_list_id' => $surveying_list_id,
                'surveying_data_name' => null,
                'bs' => null,
                'fs' => null,
                'gh' => null,
            ]);

            $data->push((object)[
                'id' => $newItemId,
                'surveying_data_name' => null,
                'bs' => null,
                'fs' => null,
                'gh' => null,
            ]);
        }

        $result = $data->map(function ($item) {
            return [
                'surveyingDataId' => $item->id,
                'surveyingDataName' => $item->surveying_data_name,
                'bs' => $item->bs,
                'fs' => $item->fs,
                'gh' => $item->gh
            ];
        });
        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SurveyingData $surveyingData)
    {
        //
    }
}
