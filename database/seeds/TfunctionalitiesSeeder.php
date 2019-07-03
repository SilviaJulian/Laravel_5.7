<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\Tfunctionalities;

class TfunctionalitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Tfunctionalities::create([
            'fk_tsection_groups' => 1,
            'functionality' => 'Usuario',
            'link' => 'inicio',
            'icon' => 'fa-calendar',
            'order' => '1',
            'description' => 'Configuracion gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
        Tfunctionalities::create([
            'fk_tsection_groups' => 2,
            'functionality' => 'Configuración',
            'link' => 'home',
            'icon' => 'fa-calendar',
            'order' => '2',
            'description' => 'Configuracion gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
        Tfunctionalities::create([
            'fk_tsection_groups' => 3,
            'functionality' => 'Menú',
            'link' => 'dashboart',
            'icon' => 'fa-calendar',
            'order' => '1',
            'description' => 'Configuracion gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
        Tfunctionalities::create([
            'fk_tsection_groups' => 4,
            'functionality' => 'Comandas',
            'link' => 'demo',
            'icon' => 'fa-pencil-square-o',
            'order' => '2',
            'description' => 'Configuracion gral. del sistema',
            'created_by' => 'DefaultSystem'
        ]);
    }
}
