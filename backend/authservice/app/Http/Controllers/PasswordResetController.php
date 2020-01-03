<?php
namespace App\Http\Controllers;

use App\Admin;
use App\Enseignant;
use App\Etudiant;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\User;
use App\PasswordReset;
use Illuminate\Support\Carbon as IlluminateCarbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @group Reset Password Process
 *
 * APIs for reset password process
 */

class PasswordResetController extends Controller
{

    /**
     * Create token password reset
     * @bodyParam email string required The email of the user. Example: admin@esi.dz
     *
     * @response {
     *  'result' => true ,
     *  'message' => Nous avons vous envoyé votre lien de récupération par mail , vérifier votre boite email .,
     * }
     * @response 404 {
     *  "result": false,
     *  "message": 'Votre email est introuvable .',
     * }
     * @param  [string] email
     * @return [string] message
     */
    public function create(Request $request)
    {
        $this->validate( $request ,[
            'email' => 'required|string|email',
        ]);
        $type = 'etudiant' ;
        $user = Etudiant::where('email', $request->email)->first();
        if (!$user){
            $type = 'enseignant' ;
            $user = Enseignant::where('email', $request->email)->first();
            if (!$user) {
                $type = 'admin' ;
                $user = Admin::where('email', $request->email)->first();
                if (!$user) {
                    $type = null ;
                    return response()->json([
                        'result' => false ,
                        'message' => 'Votre email est introuvable.'
                    ], 404);
                }


            }
        }
        $token_this = Str::random(60).str_replace(array("." ,"@") , "" , $user->email) ;
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'type' => $type ,
                'token' => $token_this
             ]
        );
        if ($user && $passwordReset)
            $user->notify(
                new PasswordResetRequest($passwordReset->token)
            );
        return response()->json([
            'result' => true ,
            'message' => 'Nous avons vous envoyé votre lien de récupération par mail , vérifier votre boite email .'
        ]);
    }


    /**
     * Find token password reset
     * @queryParam token string required The token of the request. Example: mdhhqgjslseoukjlsdlkj
     *
     * @response {
     *  'result' => true ,
     * }
     * @response 404 {
     *  "result": false,
     *  "message": 'aucune demande de récupération avec ce lien  .',
     * }
     * @param  [string] $token
     * @return [string] message
     * @return [json] passwordReset object
     */
    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)
            ->first();
        if (!$passwordReset)
            return response()->json([
                'result' => false ,
                'message' => 'aucune demande de récupération avec ce lien .'
            ], 404);
        if (IlluminateCarbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'result' => false ,
                'message' => 'aucune demande de récupération avec ce lien .'
            ], 404);
        }
        return response()->json([
            'result' => true
        ] , 201);
    }
     /**
     * Reset password
     * @bodyParam password string required The password of the user. Example: 123456
     * @bodyParam password_confirmation string required The password of the user. Example: 123456
     * @bodyParam token string required The token of the request. Example: mdhhqgjslseoukjlsdlkj
     *
     * @response {
     *  'result' => true ,
     * }
     * @response 404 {
     *  "result": false,
     *  "message": 'email introuvable.',
     * }
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {
        $this->validate( $request ,[
            'password' => 'required|string|confirmed',
            'token' => 'required|string'
        ]);
        $passwordReset = PasswordReset::where([
            ['token', $request->token]
        ])->first();
        if (!$passwordReset)
            return response()->json([
                'result' => false ,
                'message' => 'aucune demande de récupération avec ce lien .'
            ], 404);
        switch ($passwordReset->type) {
            case 'etudiant':
                $user = Etudiant::where('email', $passwordReset->email)->first();
                break;
            case 'enseignant':
                $user = Enseignant::where('email', $passwordReset->email)->first();
                break;
            case 'admin':
                $user = Admin::where('email', $passwordReset->email)->first();
                break;

            default:
                # code...
                break;
        }
        if (!$user)
            return response()->json([
                'result' => false ,
                'message' => 'email introuvable.'
            ], 404);
        $user->password = Hash::make($request->password);
        $user->save();
        $passwordReset->delete();
        $user->notify(new PasswordResetSuccess($passwordReset));
        return response()->json([
            'result' => true
        ] , 201);
    }
}
