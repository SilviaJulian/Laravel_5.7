<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;


class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Permission::create([
            'name' => 'create',
            'tag' => 'Cr',
            'created_by' => 'DefaultSystem'
        ]);
        Permission::create([
            'name' => 'update',
            'tag' => 'Up',
            'created_by' => 'DefaultSystem'
        ]);
        Permission::create([
            'name' => 'read',
            'tag' => 'Rd',
            'created_by' => 'DefaultSystem'
        ]);
        Permission::create([
            'name' => 'delete',
            'tag' => 'Dl',
            'created_by' => 'DefaultSystem'
        ]);
        Permission::create([
            'name' => 'xecute',
            'tag' => 'Xe',
            'created_by' => 'DefaultSystem'
        ]);
    }
}
