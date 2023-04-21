<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SiteMember extends Model
{
    use HasFactory;

    protected $table = 'site_members';

    protected $fillable = ['authority', 'user_id', 'site_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    public function surveyingLists(): HasMany
    {
        return $this->hasMany(SurveyingList::class);
    }
}
