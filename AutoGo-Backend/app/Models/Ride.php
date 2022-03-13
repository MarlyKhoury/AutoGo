<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;
    public $fillable = ['user_car_id','travel_date','travel_time','origin_city','destination_city','fees','gender_preferences','remaining_seats'];
}
