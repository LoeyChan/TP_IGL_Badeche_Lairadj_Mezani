<?php
namespace App\Traits ;

use GuzzleHttp\Client ;

trait ConsumesExternalService {
    public function performRequest($method , $requestUrl , $form_params = [] , $headers = [] ) {
     $client = new Client([
         'base_uri' => $this->baseUri ,
     ]);

     if(isset($this->token)){
        $headers["Authorization"] = $this->token ;
     }

     if(!isset($this->files) || empty($this->files)) {
        $response = $client->request($method , $requestUrl , ['form_params' => $form_params , 'headers' => $headers ]) ;
        return json_decode($response->getBody()->getContents()) ;
     }

     $multipart = [] ;

     foreach ($form_params as $key => $value) {
         # code...
         $new_data = [
             "name" => $key ,
             "contents" => $value
         ] ;
         array_push($multipart , $new_data) ;
     }

     foreach ($this->files as $key => $value) {
         # code...
         $new_file = [
             "name" => $key ,
             "contents" => fopen($value->getRealPath() , "r")
         ] ;
         array_push($multipart , $new_file) ;
     }

     $response = $client->request($method , $requestUrl , ['multipart' => $multipart , 'headers' => $headers ]) ;
     return json_decode($response->getBody()->getContents()) ;


    }
}
