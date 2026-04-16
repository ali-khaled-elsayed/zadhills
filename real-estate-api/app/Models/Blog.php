<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title_en',
        'title_ar',
        'slug',
        'excerpt_en',
        'excerpt_ar',
        'content_en',
        'content_ar',
        'image',
        'author_id',
        'tags',
        'status',
        'published_at',
        'views_count',
        'sort_order',
        'meta',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'published_at' => 'datetime',
        'tags' => 'array',
        'meta' => 'array',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {
            if (empty($blog->slug)) {
                $blog->slug = Str::slug($blog->title_en);
            }
        });
    }

    /**
     * Get the author of the blog.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Get the title based on locale.
     */
    public function getTitleAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->title_ar : $this->title_en;
    }

    /**
     * Get the excerpt based on locale.
     */
    public function getExcerptAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->excerpt_ar : $this->excerpt_en;
    }

    /**
     * Get the content based on locale.
     */
    public function getContentAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->content_ar : $this->content_en;
    }

    /**
     * Scope a query to only include published blogs.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    /**
     * Scope a query to order by sort order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    /**
     * Increment views count.
     */
    public function incrementViewsCount()
    {
        $this->increment('views_count');
    }
}
