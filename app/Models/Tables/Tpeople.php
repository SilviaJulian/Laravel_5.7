<?php

namespace HomeMadrid\Models\Tables;

use Illuminate\Database\Eloquent\Model;
use HomeMadrid\Models\Tables\User;

class Tpeople extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tpeoples';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'last_name', 'sexo', 'f_nacimiento', 'created_by'
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'created_by' => 'Admin',
    ];
    /**
     * Función que regresa el objeto del usuario.
     *
     * @return Object
     */
    public function people()
    {
        return $this->hasOne(User::class, 'fk_tpeoples');
    }
}
