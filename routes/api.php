<?php

use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\SiteMemberController;
use App\Http\Controllers\SurveyingListController;
use App\Http\Controllers\SurveyingDataController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the 'api' middleware group. Make something great!
|
*/

Route::post('/password-reset', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/me', MeController::class);

    Route::get('/member/{userId}', [SiteMemberController::class, 'userInfo']);

    Route::get('/siteMembers/{siteId}', [SiteMemberController::class, 'siteMembers']);
    Route::post('/siteMember/store', [SiteMemberController::class, 'store']);
    Route::post('/siteMember/destroy', [SiteMemberController::class, 'destroy']);
    Route::post('/siteMember/update', [SiteMemberController::class, 'update']);

    Route::get('/surveyingData/{surveyingListId}', [SurveyingDataController::class, 'surveyingData']);
    Route::post('/surveyingData/update', [SurveyingDataController::class, 'update']);


    Route::post('/site/store', [SiteController::class, 'store']);

    Route::post('/surveyingList/store', [SurveyingListController::class, 'store']);
    Route::get('/surveyingList/index/{siteId}', [SurveyingListController::class, 'index']);
    Route::post('/surveyingList/update', [SurveyingListController::class, 'update']);
    Route::post('/surveyingList/destroy', [SurveyingListController::class, 'destroy']);
});
