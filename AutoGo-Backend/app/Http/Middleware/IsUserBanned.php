<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class IsUserBanned
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
        if (auth()->check() && auth()->user()->banned_till != null) {

            if (auth()->user()->banned_till == 0) {
                $message = 'Your account has been banned permanently.';
            }
            if (now()->lessThan(auth()->user()->banned_till)) {
                $banned_days = now()->diffInDays(auth()->user()->banned_till) + 1;
                $message = 'Your account has been suspended for ' . $banned_days . ' ' . Str::plural('day', $banned_days);
            }

            auth()->logout();
            return redirect()->route('login')->with('message', $message);
        }
        return $next($request);
    }
}
