<?php

namespace App\Filament\Widgets;

use App\Models\Project;
use App\Models\Lead;
use App\Models\ContactMessage;
use App\Models\City;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Projects', Project::count())
                ->description('Active real estate projects')
                ->descriptionIcon('heroicon-m-building-office')
                ->color('success'),

            Stat::make('Total Leads', Lead::count())
                ->description('Customer inquiries')
                ->descriptionIcon('heroicon-m-user-plus')
                ->color('warning'),

            Stat::make('New Leads', Lead::where('status', 'new')->count())
                ->description('Pending follow-up')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger'),

            Stat::make('Cities', City::count())
                ->description('Active locations')
                ->descriptionIcon('heroicon-m-map-pin')
                ->color('info'),

            Stat::make('Contact Messages', ContactMessage::where('status', 'unread')->count())
                ->description('Unread messages')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('danger'),
        ];
    }
}
