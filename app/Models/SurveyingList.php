<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SurveyingList extends Model
{
    use HasFactory;

    protected $table = 'surveying_lists';

    protected $fillable = ['surveying_name', 'weather', 'site_member_id'];

    public function siteMember(): BelongsTo
    {
        return $this->belongsTo(SiteMember::class);
    }

    public function surveyingData(): HasMany
    {
        return $this->hasMany(SurveyingData::class);
    }
}
