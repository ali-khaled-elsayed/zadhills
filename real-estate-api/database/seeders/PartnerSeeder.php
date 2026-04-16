<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = [
            [
                'name_en' => 'Emaar Properties',
                'name_ar' => 'إعمار العقارية',
                'slug' => 'emaar-properties',
                'logo' => null,
            ],
            [
                'name_en' => 'DAMAC Properties',
                'name_ar' => 'داماك العقارية',
                'slug' => 'damac-properties',
                'logo' => null,
            ],
            [
                'name_en' => 'Nakheel Properties',
                'name_ar' => 'نخيل العقارية',
                'slug' => 'nakheel-properties',
                'logo' => null,
            ],
            [
                'name_en' => 'Aldar Properties',
                'name_ar' => 'الدار العقارية',
                'slug' => 'aldar-properties',
                'logo' => null,
            ],
            [
                'name_en' => 'Meraas Holding',
                'name_ar' => 'ميراس القابضة',
                'slug' => 'meraas-holding',
                'logo' => null,
            ],
        ];

        foreach ($partners as $partner) {
            Partner::create($partner);
        }
    }
}
