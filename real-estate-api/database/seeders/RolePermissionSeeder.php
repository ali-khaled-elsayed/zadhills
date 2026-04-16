<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for each resource
        $permissions = [
            // User permissions
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'restore_users',
            'force_delete_users',

            // City permissions
            'view_cities',
            'create_cities',
            'edit_cities',
            'delete_cities',
            'restore_cities',
            'force_delete_cities',

            // Area permissions
            'view_areas',
            'create_areas',
            'edit_areas',
            'delete_areas',
            'restore_areas',
            'force_delete_areas',

            // Developer permissions
            'view_developers',
            'create_developers',
            'edit_developers',
            'delete_developers',
            'restore_developers',
            'force_delete_developers',

            // Project permissions
            'view_projects',
            'create_projects',
            'edit_projects',
            'delete_projects',
            'restore_projects',
            'force_delete_projects',

            // Project Image permissions
            'view_project_images',
            'create_project_images',
            'edit_project_images',
            'delete_project_images',

            // Project Feature permissions
            'view_project_features',
            'create_project_features',
            'edit_project_features',
            'delete_project_features',

            // Blog permissions
            'view_blogs',
            'create_blogs',
            'edit_blogs',
            'delete_blogs',
            'restore_blogs',
            'force_delete_blogs',

            // Lead permissions
            'view_leads',
            'create_leads',
            'edit_leads',
            'delete_leads',
            'restore_leads',
            'force_delete_leads',

            // Contact Message permissions
            'view_contact_messages',
            'create_contact_messages',
            'edit_contact_messages',
            'delete_contact_messages',
            'restore_contact_messages',
            'force_delete_contact_messages',

            // Role and permission management
            'view_roles',
            'create_roles',
            'edit_roles',
            'delete_roles',

            'view_permissions',
            'create_permissions',
            'edit_permissions',
            'delete_permissions',

            // Dashboard access
            'access_admin_panel',
            'view_dashboard',
        ];

        // Create all permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create admin role and assign all permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Create super admin role with all permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
        $superAdminRole->givePermissionTo(Permission::all());

        // Create editor role with content management permissions
        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $editorRole->givePermissionTo([
            'view_blogs',
            'create_blogs',
            'edit_blogs',
            'delete_blogs',
            'view_projects',
            'create_projects',
            'edit_projects',
            'view_project_images',
            'create_project_images',
            'edit_project_images',
            'delete_project_images',
            'access_admin_panel',
            'view_dashboard',
        ]);

        // Create sales role with CRM permissions
        $salesRole = Role::firstOrCreate(['name' => 'sales']);
        $salesRole->givePermissionTo([
            'view_leads',
            'create_leads',
            'edit_leads',
            'view_contact_messages',
            'edit_contact_messages',
            'view_projects',
            'access_admin_panel',
            'view_dashboard',
        ]);

        // Assign admin role to the first user if exists
        $user = User::first();
        if ($user) {
            $user->assignRole('admin');
        }

        $this->command->info('Roles and permissions created successfully!');
        $this->command->info('Available roles: admin, super_admin, editor, sales');
        $this->command->info('All permissions have been assigned to admin and super_admin roles.');
    }
}
