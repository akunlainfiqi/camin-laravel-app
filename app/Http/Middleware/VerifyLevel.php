<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;

class VerifyLevel
{
    /**
     * @var \Illuminate\Contracts\Auth\Guard
     */
    protected $auth;

    public function __construct(Guard $auth){
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

    public function handle(Request $request, Closure $next, $level)
    {
        if($this->auth->check() && $this->auth->user()->permission_level >= $level) {
            return $next($request);
        }

        return redirect('/')->with('error','no access');
    }
}
