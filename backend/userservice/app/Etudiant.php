<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Etudiant extends Model
{

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

}
