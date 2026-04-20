<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'city_id',
        'area_id',
        'developer_id',
        'title_en',
        'title_ar',
        'slug',
        'short_description_en',
        'short_description_ar',
        'full_description_en',
        'full_description_ar',
        'project_type',
        'unit_type',
        'price_from',
        'price_to',
        'installment_years',
        'down_payment',
        'delivery_date',
        'location_map',
        'location_link',
        'latitude',
        'longitude',
        'is_featured',
        'status',
        'cover_image',
        'amenities',
        'total_units',
        'available_units',
        'area_from',
        'area_to',
        'bedrooms',
        'bathrooms',
        'gallery',
        'floor_plans',
        'meta',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price_from' => 'decimal:2',
        'price_to' => 'decimal:2',
        'down_payment' => 'decimal:2',
        'delivery_date' => 'date',
        'is_featured' => 'boolean',
        'amenities' => 'array',
        'gallery' => 'array',
        'floor_plans' => 'array',
        'meta' => 'array',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title_en);
            }
        });
    }

    /**
     * Get the city that owns the project.
     */
    public function city()
    {
        return $this->belongsTo(City::class);
    }

    /**
     * Get the area that owns the project.
     */
    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    /**
     * Get the developer that owns the project.
     */
    public function developer()
    {
        return $this->belongsTo(Developer::class);
    }

    /**
     * Get the project images.
     */
    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }

    /**
     * Get the project features.
     */
    public function features()
    {
        return $this->hasMany(ProjectFeature::class);
    }

    /**
     * Get the title based on locale.
     */
    public function getTitleAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->title_ar : $this->title_en;
    }

    /**
     * Get the short description based on locale.
     */
    public function getShortDescriptionAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->short_description_ar : $this->short_description_en;
    }

    /**
     * Get the full description based on locale.
     */
    public function getFullDescriptionAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->full_description_ar : $this->full_description_en;
    }

    /**
     * Scope a query to only include active projects.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include featured projects.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to filter by city.
     */
    public function scopeByCity($query, $cityId)
    {
        return $query->where('city_id', $cityId);
    }

    /**
     * Scope a query to filter by area.
     */
    public function scopeByArea($query, $areaId)
    {
        return $query->where('area_id', $areaId);
    }

    /**
     * Scope a query to filter by developer.
     */
    public function scopeByDeveloper($query, $developerId)
    {
        return $query->where('developer_id', $developerId);
    }

    /**
     * Scope a query to filter by project type.
     */
    public function scopeByProjectType($query, $type)
    {
        return $query->where('project_type', $type);
    }

    /**
     * Scope a query to filter by unit type.
     */
    public function scopeByUnitType($query, $type)
    {
        return $query->where('unit_type', $type);
    }

    /**
     * Scope a query to filter by price range.
     */
    public function scopeByPriceRange($query, $min, $max)
    {
        return $query->when($min, function ($q) use ($min) {
            $q->where('price_from', '>=', $min);
        })->when($max, function ($q) use ($max) {
            $q->where('price_to', '<=', $max);
        });
    }
}
