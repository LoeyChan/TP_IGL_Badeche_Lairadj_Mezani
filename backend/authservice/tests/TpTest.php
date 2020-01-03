<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;
use Faker\Factory as Faker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local;

class TpTest extends TestCase
{

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetStudentsList()
    {
        $this->actingAs(factory(App\Admin::class)->create()) ;
        $response = $this->get('/api/etudiant');
        $response->assertResponseOk() ;
    }

    public function testAddStudent()
    {
        Storage::fake("imgs") ;

        $faker = Faker::create() ;
        $this->actingAs(factory(App\Admin::class)->create()) ;
        $attestation = UploadedFile::fake()->image("attestation.jpg") ;
        $relevai = UploadedFile::fake()->image("relevai.jpg") ;
        $data = [
            "name" => $faker->name ,
            "lastname" => $faker->name ,
            "sex" => $faker->randomElement(array('m' , 'f')) ,
            "date" => "03/04/2001" ,
            "lieu" => $faker->city ,
            "bacYear" => 2019 ,
            "currentYear" => 1 ,
            "phone" => "0664360682" ,
            "adresse" => $faker->city ,
            "email" => $faker->unique()->email ,
            "password" => "123456" ,
            "password_confirmation" => "123456" ,
            "bacFiliere" => "Math" ,
            "bacMoyenne" => 15.15 ,
            "bacRegion" => $faker->city  ,
            "number_oldYears" => 0 ,
            "bacAttestation" => $attestation ,
            "bacRelevai" => $relevai
        ] ;

        $files = [
            "bacAttestation" => $attestation ,
            "bacRelevai" => $relevai ,
        ] ;


        $response = $this->call('POST' , '/api/etudiant/ajouter' , $data , [] , $files);

        $this->assertResponseStatus(200) ;
    }
}
