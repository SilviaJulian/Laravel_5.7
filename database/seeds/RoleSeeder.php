<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $rol = Role::create([
            'name' => 'Root',
            'created_by' => 'DefaultSystem'
        ]);
        $rol->givePermissionTo(['create','update','read']);
        $rol->assignfunctionality('Configuración');
        Role::create([
            'name' => 'Cliente',
            'created_by' => 'DefaultSystem'
        ]);
        Role::create([
            'name' => 'Empleado',
            'created_by' => 'DefaultSystem'
        ]);
    }
}
