<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
       $user=  User::create([
            'fk_tpeoples' => 1,
            'name_user' => 'Julian',
            'email' => 'silvia.julian.sj28@gmail.com',
            'password' => Hash::make('julian123'),
            'created_by' => 'DefaultSystem'
        ]);
         $user->assignRole('root');
         $user->givePermissionTo('create');
    }
}
