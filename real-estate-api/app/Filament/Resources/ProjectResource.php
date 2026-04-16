<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('city_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('area_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('developer_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('title_en')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('title_ar')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('short_description_en')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('short_description_ar')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('full_description_en')
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('full_description_ar')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('project_type')
                    ->required(),
                Forms\Components\TextInput::make('unit_type')
                    ->required(),
                Forms\Components\TextInput::make('price_from')
                    ->numeric(),
                Forms\Components\TextInput::make('price_to')
                    ->numeric(),
                Forms\Components\TextInput::make('installment_years')
                    ->numeric(),
                Forms\Components\TextInput::make('down_payment')
                    ->numeric(),
                Forms\Components\DatePicker::make('delivery_date'),
                Forms\Components\Textarea::make('location_map')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('location_link')
                    ->maxLength(255),
                Forms\Components\TextInput::make('latitude')
                    ->numeric(),
                Forms\Components\TextInput::make('longitude')
                    ->numeric(),
                Forms\Components\Toggle::make('is_featured')
                    ->required(),
                Forms\Components\TextInput::make('status')
                    ->required(),
                Forms\Components\FileUpload::make('cover_image')
                    ->image(),
                Forms\Components\TextInput::make('amenities'),
                Forms\Components\TextInput::make('total_units')
                    ->numeric(),
                Forms\Components\TextInput::make('available_units')
                    ->numeric(),
                Forms\Components\TextInput::make('area_from')
                    ->numeric(),
                Forms\Components\TextInput::make('area_to')
                    ->numeric(),
                Forms\Components\TextInput::make('bedrooms')
                    ->numeric(),
                Forms\Components\TextInput::make('bathrooms')
                    ->numeric(),
                Forms\Components\TextInput::make('gallery'),
                Forms\Components\TextInput::make('floor_plans'),
                Forms\Components\TextInput::make('views_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Forms\Components\TextInput::make('meta'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('city_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('area_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('developer_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('title_en')
                    ->searchable(),
                Tables\Columns\TextColumn::make('title_ar')
                    ->searchable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),
                Tables\Columns\TextColumn::make('project_type'),
                Tables\Columns\TextColumn::make('unit_type'),
                Tables\Columns\TextColumn::make('price_from')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price_to')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('installment_years')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('down_payment')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('delivery_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('location_link')
                    ->searchable(),
                Tables\Columns\TextColumn::make('latitude')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('longitude')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
                Tables\Columns\TextColumn::make('status'),
                Tables\Columns\ImageColumn::make('cover_image'),
                Tables\Columns\TextColumn::make('total_units')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('available_units')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('area_from')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('area_to')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('bedrooms')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('bathrooms')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('views_count')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
