<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SurveyingData;

class SurveyingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "surveying_data_name" => "A1",
                "surveying_list_id" => 2,
                "bs" => 1000,
                "fs" => null,
                "gh" => 3000,
            ],
            [
                "surveying_data_name" => "A2",
                "surveying_list_id" => 2,
                "bs" => null,
                "fs" => 2000,
                "gh" => 2000,
            ],
            [
                "surveying_data_name" => "A3",
                "surveying_list_id" => 2,
                "bs" => null,
                "fs" => 500,
                "gh" => 3500,
            ],
            [
                "surveying_data_name" => "A4",
                "surveying_list_id" => 2,
                "bs" => null,
                "fs" => 1000,
                "gh" => 3000,
            ],
            [
                "surveying_data_name" => "B1",
                "surveying_list_id" => 2,
                "bs" => 500,
                "fs" => null,
                "gh" => 6000,
            ],
            [
                "surveying_data_name" => "B2",
                "surveying_list_id" => 2,
                "bs" => null,
                "fs" => 1500,
                "gh" => 5000,
            ],
            [
                "surveying_data_name" => "B1",
                "surveying_list_id" => 9,
                "bs" => 500,
                "fs" => null,
                "gh" => 6000,
            ],
            [
                "surveying_data_name" => "A1",
                "surveying_list_id" => 9,
                "bs" => null,
                "fs" => 1500,
                "gh" => 5000,
            ],

        ];
        SurveyingData::insert($data);
    }
}
