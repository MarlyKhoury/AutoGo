<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
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

class UserController extends Controller
{
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
       
        return response()->json([
            'cars' => array_values($cars->toArray())
   ], 200);

    }

    
    // Delete a Car API

    public function deleteCar(Request $request){

      //  Get id from token
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
        
        return response()->json([
            'rides' => array_values($rides->toArray()),
   ], 200);


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
        
         //  Get id from token
         $id = auth()->user()->id;
     
         $user = $request->isMethod('post') ? User::findOrFail($id) : new User;
  
         $user->name = $request->input('name');
         $user->email = $request->input('email');
       
         // save the changes   
         $user->save();
        
         return response()->json([
            'message' => 'User successfully updated',
            'user' => $user
     ], 200);
     }

     // Upload Image
    public function uploadImg(Request $request) 
    { 
        $picture_path = $request->input('picture_path');
        $user_id = auth()->user()->id;
        //  $user_id =2;
        $profile = Profile::create(array_merge(
            ['picture_path' =>$picture_path],
            ['user_id' =>$user_id],
        ));

        $profile->save();
        return response()->json([
            'message'=> 'Image uploaded successfully',
                   
   ], 200);

    }

    // Get Image
    public function getImage(){
        $user_id = auth()->user()->id;
    }

  

    // Get User Info
    public function getuserInfo($id){
        $user_id = auth()->user()->id;
        $user= User::find($id, ['first_name','last_name']);
        $profile=Profile::where('user_id',$id)->get(['picture_path']);
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
        $user= User::find($user_id, ['id','first_name','last_name']);
        $profile= Profile::where('user_id',$user_id)->get(['picture_path'])->last();
        $review= Review::where('to_id',$user_id)->get(['id','rating','comment']);
        $user_name= User::where('id',$user_id)->get(['id','first_name','last_name']);
        return response()->json([
            'user'=> $user,
            'profile'=> $profile,
            'review'=> $review,
            
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
           
           $review= $request->isMethod('post')? Review::findOrFail($post_id): new Review;
           $review->rating = $request ->input('rating');
           $review->comment = $request ->input('comment');
           $review->save();
           return response()->json([
            'message' => 'Your review was updated successfully',
        ], 200);
        
    
        return 'you dont have permission'; 
       } 
    
       // User Profile
       public function userProfile() {
        return response()->json(auth()->user());
    }

}
