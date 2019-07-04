<?php

namespace HomeMadrid\Models\Tables;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use HomeMadrid\Models\Tables\Tpeople;
use HomeMadrid\Notifications\ResetPasswordNotification;
use HomeMadrid\Notifications\VerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
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

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new \HomeMadrid\Notifications\VerifyEmail);
        // $this->notify(new \Illuminate\Auth\Notifications\VerifyEmail);
    }
}
