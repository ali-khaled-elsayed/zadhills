<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
    ];

    /**
     * Get the leads assigned to this user.
     */
    public function assignedLeads()
    {
        return $this->hasMany(Lead::class, 'assigned_to');
    }

    /**
     * Get the contact messages assigned to this user.
     */
    public function assignedContactMessages()
    {
        return $this->hasMany(ContactMessage::class, 'assigned_to');
    }

    /**
     * Get the blogs authored by this user.
     */
    public function blogs()
    {
        return $this->hasMany(Blog::class, 'author_id');
    }

    /**
     * Check if user is active.
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin') || $this->hasRole('super_admin');
    }

    /**
     * Check if user has any admin role.
     */
    public function canAccessPanel(): bool
    {
        return $this->hasAnyRole(['admin', 'super_admin', 'editor', 'sales']);
    }

    /**
     * Get the user's role names.
     */
    public function getRoleNamesAttribute(): array
    {
        return $this->getRoleNames()->toArray();
    }
}
