<?php

namespace HomeMadrid\Models\Tables;

use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\Cgroup;
use HomeMadrid\Models\Tables\Tfunctionalities;

class Tsection_group extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tsection_groups';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Función que regresa el objeto del grupo al que pertenece la sección.
     *
     * @return Object
     */
    public function group()
    {
        return $this->belongsTo(Cgroup::class, 'fk_cgroups');
    }

    /**
     * Función que regresa el objeto del grupo al que pertenece la sección.
     *
     * @return Object
     */
    public function functionalities()
    {
        return $this->hasMany(Tfunctionalities::class, 'fk_tsection_groups');
    }
}
