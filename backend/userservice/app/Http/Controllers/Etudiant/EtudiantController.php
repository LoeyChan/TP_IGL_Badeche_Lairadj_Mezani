<?php

namespace App\Http\Controllers\Etudiant;

use App\Etudiant;
use App\Bac ;
use App\EtudiantDocument;
use App\Http\Controllers\Controller;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse ;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use phpDocumentor\Reflection\Types\Integer;

class EtudiantController extends Controller
{
    //
    public function __construct()
    {
        //auth()->shouldUse('api_user');
    }

    public function signup(Request $request){
        $this->validate($request ,
            [
                'name' => "required" ,
                'lastname' => "required" ,
                'sex' => "required" ,
                'date' => "required" ,
                'bacYear' => "required" ,
                'currentYear' => "required" ,
                'lieu' => "required" ,

                'adresse' => "required" ,
                "phone" => "required" ,


                'email' => 'required | email  | unique:etudiants',
                'password' => 'min:6|required_with:password_confirmation|same:password_confirmation',
                'password_confirmation' => 'min:6' ,

                "bacFiliere" => "required" ,
                "bacMoyenne" => "required" ,
                "bacRegion" => "required" ,
                "bacAttestation" =>"required|file" ,
                "bacRelevai" =>"required|file" ,

            ]
        );

        $this->validate($request ,['email' => 'unique:enseignants']);
        $this->validate($request ,['email' => 'unique:admins']);



        if($request->hasFile("img")) {
            $fileExtention = $request->file("img")->getClientOriginalExtension() ;
            $etudiantPicPath = time().$fileExtention ;
            $path = $request->file('img')->storeAs('public/img' , $etudiantPicPath) ;
            $etudiantPicPath = 'http://'.$request->getHttpHost()."/storage/img/".$etudiantPicPath ;

        }else{
            $etudiantPicPath = null ;
        }
        $date_this = null ;
        if($request->input("date")) {
            $date_this = (DateTime::createFromFormat('d/m/Y' , $request->input("date") ))->format('Y-m-d') ;
        }
        $etudiant = new Etudiant([
            'name' => $request->input('name') ,
            'lastname' => $request->input('lastname') ,
            'pic' => $etudiantPicPath ,
            'sex' => $request->input('sex') ,
            'naissance' => $date_this ,
            'lieu' => $request->input('lieu') ,
            'currentYear' => $request->input('currentYear') ,
            'bacYear' => $request->input('bacYear') ,
            'adresse' => (String)$request->input('adresse') ,
            'phone' => $request->input('phone') ,
            'email' => $request->input('email') ,
            'password' => Hash::make($request->input('password'))
        ]) ;
        $etudiant->save() ;

        if($request->hasFile("bacAttestation")) {
            $fileExtention = $request->file("bacAttestation")->getClientOriginalExtension() ;
            $BacAttestationPath = time().$fileExtention ;
            $path = $request->file('bacAttestation')->storeAs('public/bac/attestation' , $BacAttestationPath) ;
            $BacAttestationPath = 'http://'.$request->getHttpHost()."/storage/bac/attestation/".$BacAttestationPath ;

        }else{
            $BacAttestationPath = null ;
        }

        if($request->hasFile("bacRelevai")) {
            $fileExtention = $request->file("bacRelevai")->getClientOriginalExtension() ;
            $BacRelevaiPath = time().$fileExtention ;
            $path = $request->file('bacRelevai')->storeAs('public/bac/relevai' , $BacRelevaiPath) ;
            $BacRelevaiPath = 'http://'.$request->getHttpHost()."/storage/bac/relevai/".$BacRelevaiPath ;

        }else{
            $BacRelevaiPath = null ;
        }

        $bac = new Bac([
            "etudiant_id" => $etudiant->id ,
            "region" => $request->input("bacRegion") ,
            "filiere" => $request->input("bacFiliere") ,
            "moyenne" => $request->input("bacMoyenne") ,
            "attestation" => $BacAttestationPath ,
            "relevai" => $BacRelevaiPath
        ]);

        $bac->save() ;

        $nbrOldYears = (int)$request->input("number_oldYears") ;

        for ($i=0; $i < $nbrOldYears ; $i++) {
            $file_name = "year_certificat".$i ;
            if($request->hasFile($file_name)) {
                $fileExtention = $request->file($file_name)->getClientOriginalExtension() ;
                $YearCertPath = time().$fileExtention ;
                $path = $request->file($file_name)->storeAs('public/year/certificat' , $YearCertPath) ;
                $YearCertPath = 'http://'.$request->getHttpHost()."/storage/year/certificat/".$YearCertPath ;

            }else{
                $YearCertPath = null ;
            }

            $file_name = "year_relevai".$i ;
            if($request->hasFile($file_name)) {
                $fileExtention = $request->file($file_name)->getClientOriginalExtension() ;
                $YearRelevaiPath = time().$fileExtention ;
                $path = $request->file($file_name)->storeAs('public/year/relevai' , $YearRelevaiPath) ;
                $YearRelevaiPath = 'http://'.$request->getHttpHost()."/storage/year/relevai/".$YearRelevaiPath ;

            }else{
                $YearCertPath = null ;
            }

            $year = new EtudiantDocument([
                'etudiant_id' => $etudiant->id ,
                'title' =>  $request->input("year_title".$i),
                'year' =>  $request->input("year_year".$i),
                'univ'  => $request->input("year_univ".$i) ,
                'moyenne' => $request->input("year_avg".$i) ,
                'resultat' => $request->input("year_result".$i) ,
                'attestation' => $YearCertPath ,
                'relevai' => $YearRelevaiPath
            ]);

            $year->save() ;
        }


        return response()->json([
            'result' => true ,
            'id' => $etudiant->id ,
            'adresse' => $request->input('adresse') ,
            'img' => $etudiantPicPath ,
            "etudiant" => $etudiant ,
            'message' => 'Inscription réussi ,  Nous avons vous envoyé votre lien de validation par mail , vérifier votre boite email .'
        ] , 201) ;

    }

    public function index() {
        $etudiantList = Etudiant::all() ;
        return response()->json([$etudiantList] , 201) ;
    }

    public function find($etudiant_id) {
        try {
            $etudiant = Etudiant::findOrFail($etudiant_id) ;
            $bac = $etudiant->bac ;
            $oldYears = $etudiant->documents ;
        } catch (Exception $e) {
            return response()->json(['result' => false ] , 401) ;
        }


        return response()->json([
            'result' => true ,
            "etudiant" => $etudiant ,
            "bac" => $bac ,
            "oldYears" =>$oldYears
            ] , 201) ;
    }

    public function home (){
        return response()->json(['message' => "i am a student ;) " , 'me' => auth()->user() ] , 201 ) ;
    }

}
