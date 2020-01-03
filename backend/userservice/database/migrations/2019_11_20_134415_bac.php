<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Bac extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bacs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('etudiant_id')->unsigned()->index() ;
            $table->float('moyenne') ;
            $table->string("region")->nullable() ;
            $table->string("filiere") ;
            $table->string("attestation") ;
            $table->string("relevai") ;

            $table->foreign('etudiant_id')->references('id')->on('etudiants')->onDelete('cascade') ;
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
        Schema::dropIfExists('bacs');
    }
}
