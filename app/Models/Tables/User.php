<?php

namespace HomeMadrid\Models\Tables;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Contracts\Permission as SpatiePermission;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use HomeMadrid\Models\Tables\Tpeople;
use HomeMadrid\Notifications\ResetPasswordNotification;

class User extends Authenticatable
{

    use  Notifiable;
    use HasRoles;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $guard_name = 'web';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tusers';

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
        'fk_tpeoples', 'name_user', 'email', 'password', 'created_by'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
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
     * Función que regresa el objeto de la persona.
     *
     * @return Object
     */
    public function people()
    {
        return $this->belongsTo(Tpeople::class, 'fk_tpeoples');
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
