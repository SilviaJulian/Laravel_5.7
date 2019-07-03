<?php

namespace HomeMadrid\Traints\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

interface Functionalities
{
     /**
     * A role may be given various permissions.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles(): BelongsToMany;



    /**
     * Find a functionality by its name and guard name.
     *
     * @param string $name
     * @param string|null $guardName
     *
     * @return \HomeMadrid\Traints\Contracts\Functionalities
     *
     * @throws \Spatie\Permission\Exceptions\RoleDoesNotExist
     */
    public static function findByName(string $name, $guardName): self;

    /**
     * Find a functionality by its id and guard name.
     *
     * @param int $id
     * @param string|null $guardName
     *
     * @return \HomeMadrid\Traints\Contracts\Functionalities
     *
     * @throws \Spatie\Permission\Exceptions\RoleDoesNotExist
     */
    public static function findById(int $id, $guardName): self;

    /**
     * Find or create a role by its name and guard name.
     *
     * @param string $name
     * @param string|null $guardName
     *
     * @return \HomeMadrid\Traints\Contracts\Functionalities
     */
    public static function findOrCreate(string $name, $guardName): self;
}
