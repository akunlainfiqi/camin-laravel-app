<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RolesLevel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->permission_level >= 3) {
            return $next($request);
        }

        return redirect('home')->with('error','no access');
    }
}
