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

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['testImg','login', 'register']]); 
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
        $banned=1;
        $banned_till=auth()->user()->banned_till;
        if ($banned_till ==NULL){
            $banned=0;
        }

        if($banned){
        
            return response()->json(['error' => 'Banned!Please contact your admnistrator'], 401);
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
            return response()->json($validator->errors(), 410);
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

    // Create a Car
    public function createCar(Request $request) {
        $validator = Validator::make($request->all(), [
            'model' => 'required|string|between:2,100',
            'license_plate' => 'required|string|between:2,100',
            'seats_available' => 'required|integer',
            
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        
        $car = Car::create(array_merge(
            $validator->validated(),
            ['user_id' => auth()->user()->id],
            // ['user_id' => User::where('id', $request->id)->get()]
            // [$car['user_id '] = $request->user()->id],
            
            
        ));
        return response()->json([
            'message' => 'Your car was created successfully',
            'car' => $car,
        ], 201);
    }


    //get all cars by user
    public function getCar(){
        $user_id = auth()->user()->id;
        $cars = Car::all()->where('user_id',$user_id);

        // ->whereNotIn('remaining_seats',0);
        // $user = Car::findOrFail('user_id',$user_id);
        // $gender = $user->gender;

        // $bookings_count=Book::all()->where('user_id',$user_id)
        //                            ->where('is_booked',1)
        //                            ->count();
        
        // $rides = Ride::all()->whereIn('gender_preferences',['OTHER',$gender])
        // ->whereNotIn('remaining_seats',0);
       
        return response()->json([
            // 'number_bookings'=>$number_of_bookings,
            'cars' => array_values($cars->toArray())
   ], 200);

    }

    
    // Delete a Car API

    public function deleteCar(Request $request){

      //  Get id mn token
      $id = auth()->car()->id;
      $car= Car::findOrFail($id);
      if ($car)
      $car->delete();
      else
      return response()->json(error);
      return response()->json(null);
    }



    // Create a Ride
    public function createRide(Request $request){
        $validator = Validator::make($request->all(), [
            'user_car_id' => 'required|integer',
            'travel_date' => 'required|date|between:2,100',
            'travel_time' => 'required',
            'origin_city' => 'required|string|between:2,100',
            'destination_city' => 'required|string|between:2,100',
            'fees' => 'required|string|between:2,100',
            'gender_preferences' => 'required|string',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
    
        $car= Car::findOrFail($validator->validated()['user_car_id']);
        $seats_available=  $car->seats_available;

        $ride = Ride::create(array_merge(
            $validator->validated(),
            ['remaining_seats'=>$seats_available]

        ));
         return response()->json([
         'message' => 'Ride successfully created',
         'ride' => $ride
], 201);
    }
    


    // Cancel a Ride


    // Book a Ride
    public function bookRide(Request $request){
        $validator = Validator::make($request->all(), [
            'ride_id' => 'required|integer',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }


        $user_id = auth()->user()->id;

        $bookings_count=$this->count_bookings($user_id);
        if( $bookings_count){
            return response()->json([
                'message' => 'You already booked a ride!!'
       ], 400);
        }

    
        $ride= Ride::findOrFail($validator->validated()['ride_id']);
         $ride->remaining_seats=$ride->remaining_seats-1;
         $ride->save();

        $booked = Book::create(array_merge(
            $validator->validated(),
            ['user_id' =>$user_id],
            ['is_booked' => 1],

        ));
         return response()->json([
         'message' => 'Ride booked successfully',
         'booked_ride' => $booked
], 201);
    }

    // Count Bookings
    public function count_bookings($user_id){
        $bookings_count=Book::all()->where('user_id',$user_id)
                                   ->where('is_booked',1)
                                   ->count();
        return $bookings_count;
    }


    // Cancel Booking
    public function cancelBooking(Request $request){
        $validator = Validator::make($request->all(), [
            'ride_id' => 'required|integer',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
       
        $user_id = auth()->user()->id;

        $booked= Book::where('ride_id',$validator->validated()['ride_id'])
                      ->where('user_id',$user_id)
                      ->get()->first();
        
         $ride= Ride::findOrFail($validator->validated()['ride_id']);
    
         if( $booked){ 
            $booked->delete();
             $ride->remaining_seats=$ride->remaining_seats+1;
             $ride->save();
            }
            // echo $ride->remaining_seats;

         return response()->json([
         'message' => 'Book deleted successfully'
], 201);
    }

    // Get all Rides
    public function getRides($from,$to){
        $orig=$from;
        $dest=$to;
        $number_of_bookings=0;
        $user_id = auth()->user()->id;
        $user = User::findOrFail($user_id);
        
        $gender = $user->gender;
        $origin_city = $from;
        $destination_city = $to;

        $bookings_count=Book::all()->where('user_id',$user_id)
                                   ->where('is_booked',1)
                                   ->count();
        if($bookings_count){
            $number_of_bookings=$bookings_count;
        }
        
        $rides = Ride::all()->whereIn('gender_preferences',['OTHER',$gender])
                            ->whereIn('origin_city',[$origin_city])
                            ->whereIn('destination_city',[$destination_city])
        ->whereNotIn('remaining_seats',0);

        // $rides = Ride::join('cars','user_car_id','=','cars.user_id')->whereIn('gender_preferences',['OTHER',$gender])
        //                     ->whereIn('origin_city',[$origin_city])
        //                     ->whereIn('destination_city',[$destination_city])->get();
        // ->whereNotIn('remaining_seats',[0]);


        // $car=Car::all()->whereIn('user_id',2);
        // $test=$rides->user_car_id;

        //  join('posts', 'users.id', '=', 'posts.user_id')
        //        ->get(['users.*', 'posts.descrption']);

        
        return response()->json([
            // 'car' => $car,
            // 'rides'=> $rides,
            'rides' => array_values($rides->toArray()),
   ], 200);

//         $creator_id = Car::where('user_id',$user_id)->get(['user_id']);

//         return response()->json([
//             // 'number_bookings'=>$number_of_bookings,
//             'rides' => array_values($rides->toArray()),
//             'from'=>$orig,
//             'to'=>$dest,
//             'creator_id'=>$creator_id,
//    ], 200);

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

    $message = "The user is not banned";
    if ($user->banned_till != null) {
        if ($user->banned_till == 0) {
            $message = "Banned Permanently";
        }

        if (now()->lessThan($user->banned_till)) { 

            $banned_days = now()->diffInDays($user->banned_till) + 1;
            $message = "Suspended for " . $banned_days . ' ' . Str::plural('day', $banned_days);
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
    $user->save();//jrbe mn ostman
}
}


    // Edit User Info
    public function updateInfo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
       
        //  Get id mn token
        $id = auth()->user()->id;
    
        $user = $request->isMethod('post') ? User::findOrFail($id) : new User;
 
        $user->name = $request->input('name');
        $user->email = $request->input('email');
      
        // save the changes   
        $user->save();

        //Return message + the new user info
       
        return response()->json([
           'message' => 'User successfully updated',
           'user' => $user
    ], 200);
    }

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


     // image test
     public function testImg() {
         echo('start');
    //  $image = $request->image;  // your base64 encoded
     $image = "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";  // your base64 encoded
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = 'marly'.'.jpg';
        \File::put(storage_path(). '/' . $imageName, base64_decode($image));
        echo('done');
     }
  
    // Upload Image
    public function uploadImg(Request $request) 
    { 
         $parametre =$request->all();

        if ($request->hasFile('picture_path')) {
            if($request->file('picture_path')->isValid()) {
                try {
                    $file = $request->file('picture_path');
                    $image = base64_encode(file_get_contents($request->file('picture_path')));
                    echo $image;
    
                    
                } catch (FileNotFoundException $e) {
                    echo "catch";
    
                }
            }
   
        }
    }
  

    // Get User Info
    public function getuserInfo($id){
        $user_id = auth()->user()->id;
        $user= User::find($id, ['first_name','last_name']);
        $profile=Profile::where('user_id',$id)->get(['address','education','workplace']);
        $review= Review::where('to_id',$id)->get(['rating','comment']);
        return response()->json([
            'user'=> $user,
            'profile'=> $profile,
            'review'=> $review        
   ], 200);
    }

    // Get own Info
    public function getownInfo(){
        $user_id = auth()->user()->id;
        $user= User::find($user_id, ['first_name','last_name']);
        $profile= Profile::where('user_id',$user_id)->get(['address','education','workplace']);
        $review= Review::where('to_id',$user_id)->get(['id','rating','comment']);
        $user_name= User::where('id',$user_id)->get(['id','first_name','last_name']);
        // $user_name = User::where('user_id',$user_id)->get(['first_name','last_name']);
        return response()->json([
            'user'=> $user,
            'profile'=> $profile,
            'review'=> $review,
            // 'user_name'=>$user_name,
   ], 200);
    }


    // Post Review
    public function postReview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'from_id' => 'required|integer',
            'to_id' => 'required|integer',
            'rating' => 'required|integer',
            'comment' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $from_id = auth()->user()->id;
        $to_id = User::findOrFail($validator->validated()['to_id']);
        $input = $request->all();
        // $input['from_id'] = auth()->user()->id;
    
        Review::create($input);
   
        return response()->json([
            'message' => 'Your review is posted successfully',
            'input' => $input
        ], 200);
    }


    // Get all Reviews by Id
    public function getallReviews($id){

    $to_id = auth()->user()->id;
    $user=User::find($id);
    $reviews=Review::where('to_id','=',$id)->get();

        return response()->json([
                'review' => $reviews
            ], 200);

    }


    // Delete Review
    public function deleteReview($id){

        $review= Review::findOrFail($id);
        if (Auth::user() && (Auth::user()->id == $review->from_id)) {
           $review->delete();
           return response()->json([
            'message' => 'Your review was deleted successfully',
        ], 200);
        
        }else
        return 'you dont have permission';
       } 
    

    // Edit Review
    public function editReview(Request $request){

        $validator = Validator::make($request->all(), [
            'rating' => 'integer',
            'comment' => 'required|string',
            'post_id' =>'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $id= auth()->user()->id;
         $post_id = $validator->validated()['post_id'];
        // $review= Review::findOrFail($id);
        // if (Auth::user() && (Auth::user()->id == $review->from_id)) {
           
           $review= $request->isMethod('post')? Review::findOrFail($post_id): new Review;
           $review->rating = $request ->input('rating');
           $review->comment = $request ->input('comment');
           $review->save();
           return response()->json([
            'message' => 'Your review was updated successfully',
        ], 200);
        
    
        return 'you dont have permission'; 
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
