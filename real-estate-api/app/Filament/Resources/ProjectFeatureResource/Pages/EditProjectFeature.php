<?php

namespace App\Filament\Resources\ProjectFeatureResource\Pages;

use App\Filament\Resources\ProjectFeatureResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProjectFeature extends EditRecord
{
    protected static string $resource = ProjectFeatureResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
