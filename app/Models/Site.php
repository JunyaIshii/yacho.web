<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Site extends Model
{
    use HasFactory;

    protected $table = 'sites';


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = ['site_name'];

    public function siteMmbers(): HasMany
    {
        return $this->hasMany(SiteMember::class);
    }
}
