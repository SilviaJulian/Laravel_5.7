<?php

namespace HomeMadrid\Models\Tables;

use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\Tsection_group;

class Cgroup extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cgroups';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Función que regresa el objeto de las secciones de un prupo.
     *
     * @return Object
     */
    public function sections()
    {
        return $this->hasOne(Tsection_group::class, 'fk_cgroups');
    }
}
