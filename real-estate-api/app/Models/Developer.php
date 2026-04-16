<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Developer extends Model
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
        'logo',
        'description_en',
        'description_ar',
        'website',
        'phone',
        'email',
        'address_en',
        'address_ar',
        'social_media',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'social_media' => 'array',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($developer) {
            if (empty($developer->slug)) {
                $developer->slug = Str::slug($developer->name_en);
            }
        });
    }

    /**
     * Get the projects for the developer.
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
     * Get the address based on locale.
     */
    public function getAddressAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->address_ar : $this->address_en;
    }

    /**
     * Scope a query to only include active developers.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order by sort order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
