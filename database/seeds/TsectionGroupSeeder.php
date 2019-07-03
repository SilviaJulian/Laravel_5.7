<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\Tsection_group;

class TsectionGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Tsection_group::create([
            'fk_cgroups' => 2,
            'section' => 'Gestión de usuarios',
            'order' => '1',
            'description' => 'Configuración gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
        Tsection_group::create([
            'fk_cgroups' => 2,
            'section' => 'Configuración de sistema',
            'order' => '2',
            'description' => 'Configuración gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
        Tsection_group::create([
            'fk_cgroups' => 3,
            'section' => 'Administración del menú',
            'order' => '1',
            'description' => 'Configuración gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
        Tsection_group::create([
            'fk_cgroups' => 3,
            'section' => 'Comandas',
            'order' => '2',
            'description' => 'Configuración gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
    }
}
