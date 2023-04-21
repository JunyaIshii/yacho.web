<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SurveyingData extends Model
{
    use HasFactory;

    protected $table = 'surveying_data';


    protected $fillable = ['surveying_data_name', 'surveying_list_id', 'bs', 'ih', 'fs', 'gh'];

    public function surveyingList(): BelongsTo
    {
        return $this->belongsTo(SurveyingList::class);
    }
}
