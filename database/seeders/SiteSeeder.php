<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sites')->insert([[
            'site_name' => '渋谷駅',
            'created_at' => now(),
            'updated_at' => now(),
        ], [
            'site_name' => '代々木駅前ビル',
            'created_at' => now(),
            'updated_at' => now(),
        ], [
            'site_name' => '東海道新幹線',
            'created_at' => now(),
            'updated_at' => now(),
        ], [
            'site_name' => '首都高速道路',
            'created_at' => now(),
            'updated_at' => now(),
        ]]);
    }
}
