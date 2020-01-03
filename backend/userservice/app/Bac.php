<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bac extends Model
{
    protected $table = "bacs" ;

    protected $fillable = ["etudiant_id" , "region" , "filiere" , "moyenne" , "attestation" , "relevai"] ;

    protected $hidden = [] ;
}
