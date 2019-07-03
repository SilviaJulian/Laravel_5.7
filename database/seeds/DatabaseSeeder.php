<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $this->call([
            CgroupSeeder::class,
            TsectionGroupSeeder::class,
            TfunctionalitiesSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            TpeopleSeeder::class,
            UserSeeder::class
        ]);
        Model::reguard();
    }
}
