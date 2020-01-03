<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EtudiantDocument extends Model
{
    protected $table = "etudiantDocuments" ;

    protected $fillable = ['etudiant_id' , 'title' , 'year' , 'univ' , 'moyenne' , 'resultat' , 'attestation' , 'relevai' ] ;

    protected $hidden = [] ;



}
