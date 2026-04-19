<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use App\Models\City;
use App\Models\Area;
use App\Models\Developer;
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
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('title_en')
                            ->required()
                            ->maxLength(255)
                            ->label('Title (English)'),
                        Forms\Components\TextInput::make('title_ar')
                            ->required()
                            ->maxLength(255)
                            ->label('Title (Arabic)'),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Location & Relations')
                    ->schema([
                        Forms\Components\Select::make('city_id')
                            ->label('City')
                            ->required()
                            ->relationship('city', 'name_en')
                            ->searchable()
                            ->preload(),
                        Forms\Components\Select::make('area_id')
                            ->label('Area')
                            ->required()
                            ->relationship('area', 'name_en')
                            ->searchable()
                            ->preload(),
                        Forms\Components\Select::make('developer_id')
                            ->label('Developer')
                            ->required()
                            ->relationship('developer', 'name_en')
                            ->searchable()
                            ->preload(),
                    ])->columns(3),

                Forms\Components\Section::make('Descriptions')
                    ->schema([
                        Forms\Components\Textarea::make('short_description_en')
                            ->columnSpanFull()
                            ->label('Short Description (English)'),
                        Forms\Components\Textarea::make('short_description_ar')
                            ->columnSpanFull()
                            ->label('Short Description (Arabic)'),
                        Forms\Components\Textarea::make('full_description_en')
                            ->columnSpanFull()
                            ->label('Full Description (English)'),
                        Forms\Components\Textarea::make('full_description_ar')
                            ->columnSpanFull()
                            ->label('Full Description (Arabic)'),
                    ]),

                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\Select::make('project_type')
                            ->required()
                            ->options([
                                'residential' => 'Residential',
                                'commercial' => 'Commercial',
                                'administrative' => 'Administrative',
                                'mixed' => 'Mixed',
                                'compound' => 'Compound',
                            ]),
                        Forms\Components\Select::make('unit_type')
                            ->required()
                            ->options([
                                'apartment' => 'Apartment',
                                'villa' => 'Villa',
                                'townhouse' => 'Townhouse',
                                'twin_house' => 'Twin House',
                                'penthouse' => 'Penthouse',
                                'studio' => 'Studio',
                                'office' => 'Office',
                                'shop' => 'Shop',
                                'warehouse' => 'Warehouse',
                            ]),
                        Forms\Components\Select::make('status')
                            ->required()
                            ->options([
                                'active' => 'Active',
                                'inactive' => 'Inactive',
                                'sold_out' => 'Sold Out',
                                'coming_soon' => 'Coming Soon',
                            ]),
                    ])->columns(3),

                Forms\Components\Section::make('Pricing & Payment')
                    ->schema([
                        Forms\Components\TextInput::make('price_from')
                            ->numeric()
                            ->label('Price From'),
                        Forms\Components\TextInput::make('price_to')
                            ->numeric()
                            ->label('Price To'),
                        Forms\Components\TextInput::make('down_payment')
                            ->numeric()
                            ->label('Down Payment (%)'),
                        Forms\Components\TextInput::make('installment_years')
                            ->numeric()
                            ->label('Installment Years'),
                    ])->columns(4),

                Forms\Components\Section::make('Specifications')
                    ->schema([
                        Forms\Components\TextInput::make('total_units')
                            ->numeric()
                            ->label('Total Units'),
                        Forms\Components\TextInput::make('available_units')
                            ->numeric()
                            ->label('Available Units'),
                        Forms\Components\TextInput::make('area_from')
                            ->numeric()
                            ->label('Area From (m²)'),
                        Forms\Components\TextInput::make('area_to')
                            ->numeric()
                            ->label('Area To (m²)'),
                        Forms\Components\TextInput::make('bedrooms')
                            ->numeric()
                            ->label('Bedrooms'),
                        Forms\Components\TextInput::make('bathrooms')
                            ->numeric()
                            ->label('Bathrooms'),
                    ])->columns(3),

                Forms\Components\Section::make('Location & Dates')
                    ->schema([
                        Forms\Components\Textarea::make('location_map')
                            ->columnSpanFull()
                            ->label('Location Map (Embed code)'),
                        Forms\Components\TextInput::make('location_link')
                            ->maxLength(255)
                            ->label('Location Link'),
                        Forms\Components\TextInput::make('latitude')
                            ->numeric(),
                        Forms\Components\TextInput::make('longitude')
                            ->numeric(),
                        Forms\Components\DatePicker::make('delivery_date')
                            ->label('Delivery Date'),
                    ])->columns(3),

                Forms\Components\Section::make('Media')
                    ->schema([
                        Forms\Components\FileUpload::make('cover_image')
                            ->image()
                            ->label('Cover Image'),
                        Forms\Components\FileUpload::make('gallery')
                            ->multiple()
                            ->image()
                            ->label('Gallery Images'),
                        Forms\Components\FileUpload::make('floor_plans')
                            ->multiple()
                            ->image()
                            ->label('Floor Plans'),
                    ]),

                Forms\Components\Section::make('Additional Information')
                    ->schema([
                        Forms\Components\Toggle::make('is_featured')
                            ->required()
                            ->label('Featured Project?'),
                        Forms\Components\Textarea::make('amenities')
                            ->columnSpanFull()
                            ->label('Amenities (one per line)'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title_en')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('city.name_en')
                    ->label('City')
                    ->sortable(),
                Tables\Columns\TextColumn::make('area.name_en')
                    ->label('Area')
                    ->sortable(),
                Tables\Columns\TextColumn::make('developer.name_en')
                    ->label('Developer')
                    ->sortable(),
                Tables\Columns\TextColumn::make('project_type')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('unit_type')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price_from')
                    ->money()
                    ->sortable(),
                Tables\Columns\ImageColumn::make('cover_image'),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
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
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                        'sold_out' => 'Sold Out',
                        'coming_soon' => 'Coming Soon',
                    ]),
                Tables\Filters\SelectFilter::make('project_type')
                    ->options([
                        'residential' => 'Residential',
                        'commercial' => 'Commercial',
                        'administrative' => 'Administrative',
                        'mixed' => 'Mixed',
                        'compound' => 'Compound',
                    ]),
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
