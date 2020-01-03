<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtudiantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('etudiants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('pic')->nullable() ;
            $table->string('name')->nullable() ;
            $table->string('lastname')->nullable() ;
            $table->char('sex')->nullable() ;
            $table->date('naissance')->nullable() ;
            $table->string('lieu')->nullable() ;
            $table->integer('currentYear')->nullable() ;
            $table->integer('bacYear')->nullable() ;
            $table->string('adresse')->nullable() ;
            $table->string('phone')->nullable() ;
            $table->string('email')->unique() ;
            $table->string('password')->nullable() ;
            $table->string('role')->default('ROLE_USER_ETUDIANT') ;
            $table->rememberToken();
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
        Schema::dropIfExists('etudiants');
    }
}
