<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\User_Car;
use Carbon\Carbon;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => 'Please enter a valid Email and Password'], 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->createNewToken($token);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|between:2,100',
            'last_name' => 'required|string|between:2,100',
            'phone_number' => 'required|integer',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string',
            'gender' => 'required|string',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }


    // Create a Ride
    public function createRide(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100|unique:users',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
    }
    

    // Ban User
    public function ban()
{
    // Get id from token
    $id = auth()->user()->id;
    if ($id->user_types_id){

    // ban for days
    $ban_for_next_7_days = Carbon::now()->addDays(7);
    $ban_for_next_14_days = Carbon::now()->addDays(14);
    $ban_permanently = 0;

    // ban user
    $user_id = $id;
    $user = User::find($user_id);
    $user->banned_till = $ban_for_next_7_days;
    $user->save();
    return response()->json(['message' => 'User banned successfully']);
    
}

    return response()->json(['error' => 'Unauthorized'], 401);
}
    
    // Check Banned Status

    public function bannedStatus()
{
    $user_id = $id;
    $user = User::find($user_id);

    $message = "The user is not banned";
    if ($user->banned_till != null) {
        if ($user->banned_till == 0) {
            $message = "Banned Permanently";
        }

        if (now()->lessThan($user->banned_till)) { 

            $banned_days = now()->diffInDays($user->banned_till) + 1;
            $message = "Suspended for " . $banned_days . ' ' . Str::plural('day', $banned_days);
        }
    }

    $this->unban();
    return response()->json(['message' => $message]);

}


    // Unban a User

    public function unban()
{
    //  Get id from token
    $id = auth()->user()->id;
    if ($id->user_types_id){

    $user_id = $id;
    $user = User::find($user_id);
    $user->banned_till = null;
    $user->save();
}
}

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
