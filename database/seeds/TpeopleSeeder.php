<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\Tpeople;

class TpeopleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Tpeople::create([
            'name' => 'Silvia',
            'last_name' => 'Julian Mendoza',
            'gender' => 'Fem',
            'created_by' => 'name_user',
        ]);
    }
}
