<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Car;
use App\Models\Ride;
use App\Models\Book;
use App\Models\Profile;
use App\Models\User_Type;
use App\Models\Review;
use Carbon\Carbon;
use Validator;

class AdminController extends Controller
{
      //Get all Users for Admin
      public function getUsers(){
        $user_type = auth()->user()->user_types_id;
        $admin_id=User_Type::findOrFail($user_type)->id;
        if ($admin_id!=0 && $user_type==$admin_id){
            $users=User::all();
        return response()->json([
                'user' => $users
            ], 200);
    }
}  


    // Ban User
    public function ban(Request $request)
{
      // Get id from token

      $user_type = auth()->user()->user_types_id;
      $admin_id=User_Type::findOrFail($user_type)->id;
      if ($admin_id!=0 && $user_type==$admin_id){

      // ban for days
      $ban_for_next_7_days = Carbon::now()->addDays(7);
      $ban_for_next_14_days = Carbon::now()->addDays(14);
      $ban_permanently = 0;

      // ban user
      $user_id = $request->input('id');
      $user = User::find($user_id);
      $user->banned_till = $ban_for_next_7_days;
      $user->save();
      return response()->json(['message' => 'User banned successfully']);
    
}

      return response()->json(['error' => 'Unauthorized'], 401);
}
    

    // Check Banned Status

    public function bannedStatus($id)
{
    $user_type = auth()->user()->user_types_id;
    $admin_id=User_Type::findOrFail($user_type)->id;
    if ($admin_id!=0 && $user_type==$admin_id){
    $user_id = $id;
    $user = User::findOrFail($user_id);

    
    $message = "0";
    if ($user->banned_till != null) {
        if ($user->banned_till == 0) {
            $message = "1";
        }

        if (now()->lessThan($user->banned_till)) { 

            $banned_days = now()->diffInDays($user->banned_till) + 1;
            $message = "1";
        }
        
        if( now()->lessThan($user->banned_till)==0){
            $this->unban($id);
        }
    }
    return response()->json(['message' => $message]);


}
}

    // Unban a User

    public function unban($id)
{
    //  Get id from token
    $user_type = auth()->user()->user_types_id;
    $admin_id=User_Type::findOrFail($user_type)->id;
    if ($admin_id!=0 && $user_type==$admin_id){

    $user_id =$id;
    $user = User::findOrFail($user_id);
    $user->banned_till = null;
    $user->save();
    return response()->json(['message' => "user unbanned successfully"]);
}

}


}
