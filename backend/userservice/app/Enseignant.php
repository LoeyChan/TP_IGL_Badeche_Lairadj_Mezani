<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'enseignants';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'email_verified_at' , 'provider' , 'provider_id' ,
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
}
