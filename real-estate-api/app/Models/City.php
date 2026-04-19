<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class City extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name_en',
        'name_ar',
        'slug',
        'image',
        'description_en',
        'description_ar',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($city) {
            if (empty($city->slug)) {
                $city->slug = Str::slug($city->name_en);
            }
        });
    }

    /**
     * Get the areas for the city.
     */
    public function areas()
    {
        return $this->hasMany(Area::class);
    }

    /**
     * Get the projects for the city.
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Get the name based on locale.
     */
    public function getNameAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->name_ar : $this->name_en;
    }

    /**
     * Get the description based on locale.
     */
    public function getDescriptionAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->description_ar : $this->description_en;
    }

    /**
     * Get the image with a default fallback.
     */
    public function getImageAttribute($value): string
    {
        return $value ?: 'cities/default-city.avif';
    }

    /**
     * Scope a query to only include active cities.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order by created date (newest first).
     */
    public function scopeOrdered($query)
    {
        return $query->orderByDesc('created_at');
    }
}
