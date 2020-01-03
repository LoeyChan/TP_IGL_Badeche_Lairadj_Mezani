<?php

namespace App\Http\Middleware;

use Closure;

class AcceptedRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $accepted_token = explode(',' , env("ACCEPTED_TOKEN")) ;
        if (in_array($request->header("Authorization") , $accepted_token)) {
            # code...
            return $next($request);
        }

        return response()->json("UNAUTHORIZED" , 401) ;
    }
}
