<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnseignantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enseignants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom')->nullable() ;
            $table->string('prenom')->nullable() ;
            $table->integer('age')->nullable() ;
            $table->string('adresse')->nullable() ;
            $table->string('telephone')->nullable() ;
            $table->string('email')->unique() ;
            $table->string('password')->nullable() ;
            $table->string('provider')->nullable() ;
            $table->string('provider_id')->nullable() ;
            $table->string('role')->default('ROLE_USER_ENGEIGNANT') ;
            $table->string('photo')->nullable() ;
            $table->string('video')->nullable() ;
            $table->string('cv')->nullable() ;
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
        Schema::dropIfExists('enseignants');
    }
}
