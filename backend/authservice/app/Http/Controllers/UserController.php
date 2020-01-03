<?php

namespace App\Http\Controllers;

use App\UserService;
use Illuminate\Http\Request;

/**
 * @group Students Manager
 *
 * APIs for managing students
 */

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public $userService ;

    public function __construct(UserService $userService)
    {
        //
        $this->userService = $userService;
    }

    /**
     * @response {
     *  [Etudiant][] ,
     * }
     * @response 404 {
     *  "result": false,
     *  "message": 'error[]',
     * }
     */

    public function index() {
        return response()->json($this->userService->showStudentsList()) ;
    }


    /**
     * @queryParam id required The id of the user. Example: 1
     * @response {
     *  'result' => true ,
     *  "etudiant" => [Etudiant] ,
     * }
     * @response 404 {
     *  "result": false,
     *  "message": 'error[]',
     * }
     */

    public function show($id) {
        return response()->json($this->userService->showStudent($id)) ;
    }

    /**
     * @bodyParam name string required The name of the student. Example: nameStudent
     * @bodyParam lastname string required The lastname of the student. Example: lastnameStudent
     * @bodyParam sex string required The gender of the student. Example: m
     * @bodyParam img string required The profile pic of the student. Example: image
     * @bodyParam date string required The birth date of the student. Example: 04/03/2001
     * @bodyParam lieu string required The birth place of the student. Example: constantine
     * @bodyParam bacYear string required The bac year of the student. Example: 2019
     * @bodyParam currentYear string required The current year of the student. Example: 1
     * @bodyParam phone string required The phone number of the student. Example: 0664360682
     * @bodyParam adresse string required The adresse of the student. Example: constantine
     * @bodyParam email string required The email of the student. Example: student@esi.dz
     * @bodyParam password string required The password of the student. Example: 123456
     * @bodyParam password_confirmation string required The password of the student. Example: 123456
     * @bodyParam bacFiliere string required The bac filere of the student. Example: Math
     * @bodyParam bacMoyenne string required The bac moyenne of the student. Example: 17.17
     * @bodyParam bacRegion string required The bac region of the student. Example: constantine
     * @bodyParam bacAttestation string required The bac attestation of the student. Example: file
     * @bodyParam bacRelevai string required The bac relevai file of the student. Example: file
     * @bodyParam number_oldYears string required The number of student old years . Example: 0
     *
     * @response {
     *  'result' => true ,
     *  "etudiant" => [Etudiant] ,
     *  'message' => 'Inscription réussi ,  Nous avons vous envoyé votre lien de validation par mail , vérifier votre boite email .'

     * }
     * @response 404 {
     *  "result": false,
     *  "message": 'error[]',
     * }
     */

    public function store(Request $request) {
        return response()->json($this->userService->addStudent($request->all() , $request->allFiles())) ;
    }

    //
}
