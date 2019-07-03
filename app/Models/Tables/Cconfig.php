<?php

namespace HomeMadrid\Models\Tables;

use Illuminate\Database\Eloquent\Model;

class Cconfig extends Model
{
   /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cconfigs';

     /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';
}
