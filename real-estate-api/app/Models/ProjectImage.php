<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectImage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'project_id',
        'image',
        'sort_order',
        'is_cover',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_cover' => 'boolean',
    ];

    /**
     * Get the project that owns the image.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Scope a query to order by sort order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    /**
     * Scope a query to only include cover images.
     */
    public function scopeCover($query)
    {
        return $query->where('is_cover', true);
    }
}
