<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'project_id',
        'preferred_location',
        'budget_range',
        'notes',
        'status',
        'assigned_to',
        'source',
        'follow_up_date',
        'meta',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'follow_up_date' => 'datetime',
        'meta' => 'array',
    ];

    /**
     * Get the project that the lead is interested in.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the user assigned to this lead.
     */
    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to only include new leads.
     */
    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    /**
     * Scope a query to order by latest.
     */
    public function scopeLatest($query)
    {
        return $query->orderByDesc('created_at');
    }
}
