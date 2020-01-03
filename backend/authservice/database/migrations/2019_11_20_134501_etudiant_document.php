<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EtudiantDocument extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('etudiantDocuments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('etudiant_id')->unsigned()->index() ;
            $table->float('moyenne') ;
            $table->string("univ")->nullable() ;
            $table->string("resultat") ;
            $table->string("title") ;
            $table->string("year") ;
            $table->string("attestation") ;
            $table->string("relevai") ;

            $table->foreign("etudiant_id")->references("id")->on("etudiants")->onDelete("cascade") ;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('etudiantDocuments');
    }
}
