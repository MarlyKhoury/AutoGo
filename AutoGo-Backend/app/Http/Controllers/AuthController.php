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
