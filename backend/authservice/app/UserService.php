<?php
namespace App ;
use App\Traits\ConsumesExternalService;

Class UserService {
    use ConsumesExternalService ;
    public $baseUri ;
    public $token ;
    public $files ;

    public function __construct(){
        $this->baseUri = config('services.users.base_uri').":8001" ;
        $this->token =  config('services.users.token') ;
        $this->files = [] ;
    }

    public function addStudent($data , $files) {
        $this->files = $files ;
        $response = $this->performRequest('POST' , '/api/etudiant/ajouter' , $data) ;
        $this->files = [] ;
        return $response ;
    }

    public function showStudent($id) {
        return $this->performRequest('GET' , '/api/etudiant/'.$id) ;
    }

    public function showStudentsList() {
        return $this->performRequest('GET' , '/api/etudiant') ;
    }
}
