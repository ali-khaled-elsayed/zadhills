<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectFeature extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'name_en',
        'name_ar',
        'icon',
        'sort_order',
    ];

    /**
     * Get the project that owns the feature.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the name based on locale.
     */
    public function getNameAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->name_ar : $this->name_en;
    }

    /**
     * Scope a query to order by sort order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderByDesc('created_at');
    }
}
