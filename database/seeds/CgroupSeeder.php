<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\Cgroup;

class CgroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Cgroup::create([
            'group' => 'Inicio',
            'order' => '1',
            'description' => 'Primara opción del menú',
            'created_by' => 'DefaultSystem'
        ]);
        Cgroup::create([
            'group' => 'Administrador',
            'order' => '2',
            'description' => 'Segunda opción del menú',
            'created_by' => 'DefaultSystem'
        ]);
        Cgroup::create([
            'group' => 'Cliente',
            'order' => '3',
            'description' => 'Segunda opción del menú',
            'created_by' => 'DefaultSystem'
        ]);
    }
}
