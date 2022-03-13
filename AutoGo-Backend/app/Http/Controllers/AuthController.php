<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Car;
use App\Models\Ride;
use App\Models\Book;
use App\Models\User_Type;
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
            'message' => 'Your ride was created successfully',
            'car' => $car,
        ], 201);
    }

    
    // Delete API

    // public function deleteCar($id)
    // {
    //     $car = Car::findOrFail($id);
    // if($car)
    //    $car->delete(); 
    // else
    //     return response()->json(error);
    // return response()->json(null); 
    // }

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
            'gender_preferences' => 'required|string|between:2,100',

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

    public function count_bookings($user_id){
        $bookings_count=Book::all()->where('user_id',$user_id)
                                   ->where('is_booked',1)
                                   ->count();
        return $bookings_count;
    }
    //Cancel Booking
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
            echo $ride->remaining_seats;

         return response()->json([
         'message' => 'Book deleted successfully'
], 201);
    }

    // Get all Rides
    public function getRides(){
        $number_of_bookings=0;

        $user_id = auth()->user()->id;
        $user = User::findOrFail($user_id);
        $gender = $user->gender;

        $bookings_count=Book::all()->where('user_id',$user_id)
                                   ->where('is_booked',1)
                                   ->count();
        if($bookings_count){
            $number_of_bookings=$bookings_count;
        }
        
        $rides = Ride::all()->whereIn('gender_preferences',['NA',$gender])
        ->whereNotIn('remaining_seats',0);
        return response()->json([
            'number_bookings'=>$number_of_bookings,
            'rides' => $rides
   ], 200);

    }
   