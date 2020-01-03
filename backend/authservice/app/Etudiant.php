<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Notifications\Notifiable;


use Tymon\JWTAuth\Contracts\JWTSubject;

class Etudiant extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;
    use Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'etudiants';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       "name" , "lastname" , "pic" , "sex" , "naissance" , "lieu" ,"currentYear" , "bacYear" ,"adresse" , 'phone' , 'email', 'password'
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

    public function documents () {
        return $this->hasMany('App\EtudiantDocument');
    }

    public function bac() {
        return $this->hasOne('App\Bac');
    }


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ["role"=>"etudiant"];
    }

}
