<?php

namespace App\Http\Controllers;

use App\Etudiant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\Switch_;
/**
 * @group Login Process
 *
 * APIs for login process
 */

class authController extends Controller
{

    /**
     * @bodyParam email string required The email of the user. Example: admin@esi.dz
     * @bodyParam password string required The password of the user. Example: abcdefgh
     *
     * @response {
     *  'result' => true ,
     *  'token' => asqlfmjdsfksjdmqlvnsdmqhf,
     *  'type' => "admin"
     * }
     * @response 404 {
     *  "result": false,
     *  "message": 'email/password incorrect .',
     * }
     */

    public function login(Request $request)
    {
        //validate the request (email , password)
        $this->validate($request ,
            [
                'email' => 'required | email' ,
                "password" => 'required | min:6'
            ]
        ) ;
        $email_user = $request->input('email') ;

        //get the type of this user and the guard of the auth


       $table_user = "admins" ;
        $is_admin = DB::table('admins')->where("email" , $email_user)->first() ;
        if ($is_admin != null) {
            Auth::shouldUse('api_admin') ;
        }else{
            $table_user = "etudiants" ;
            $is_etudiant = DB::table('etudiants')->where("email" , $email_user)->first() ;
            if ($is_etudiant != null) {
                Auth::shouldUse('api_etudiant') ;
            }else{
                $table_user = "enseignants" ;
                $is_enseignat = DB::table('enseignants')->where("email" , $email_user)->first() ;
                if($is_enseignat != null){
                    Auth::shouldUse('api_enseignant') ;
                }else{
                            return response()->json([
                                'result' => false ,
                                'message' => 'email/password incorrect .'
                            ], 404);


                }

            }
        }
        try {
            $credentials = $request->only('email', 'password');

            if(!$token = Auth::attempt([
                'email' => $request->input('email'),
                'password' => $request->input('password')
            ])) {

                return response()->json([
                    'result' => false ,
                    'message' => 'email/password incorrect .'
                ], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'error!'], 401);
        }

        return $this->respondWithToken($token);
     }


    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'result' => true ,
            'token' => $token,
            'email' => Auth::user()->email,
            'type' => Auth::user()->role
        ]);
    }
}
