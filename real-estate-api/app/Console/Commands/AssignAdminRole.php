<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class AssignAdminRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:assign-admin {email?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign admin role to a user';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email');

        if (!$email) {
            $email = $this->ask('Enter the user email');
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error('User not found with email: ' . $email);
            return self::FAILURE;
        }

        // Ensure admin role exists
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Assign all permissions to admin role if not already assigned
        $permissions = [
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'view_cities',
            'create_cities',
            'edit_cities',
            'delete_cities',
            'view_areas',
            'create_areas',
            'edit_areas',
            'delete_areas',
            'view_developers',
            'create_developers',
            'edit_developers',
            'delete_developers',
            'view_projects',
            'create_projects',
            'edit_projects',
            'delete_projects',
            'view_blogs',
            'create_blogs',
            'edit_blogs',
            'delete_blogs',
            'view_leads',
            'create_leads',
            'edit_leads',
            'delete_leads',
            'view_contact_messages',
            'create_contact_messages',
            'edit_contact_messages',
            'delete_contact_messages',
            'access_admin_panel',
            'view_dashboard',
        ];

        foreach ($permissions as $permissionName) {
            $permission = \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permissionName]);
            $adminRole->givePermissionTo($permission);
        }

        // Assign admin role to user
        if (!$user->hasRole('admin')) {
            $user->assignRole('admin');
            $this->info("Admin role assigned to: {$user->name} ({$user->email})");
        } else {
            $this->info("User already has admin role: {$user->name} ({$user->email})");
        }

        // Display user roles
        $this->info('Current roles: ' . implode(', ', $user->getRoleNames()->toArray()));

        return self::SUCCESS;
    }
}
