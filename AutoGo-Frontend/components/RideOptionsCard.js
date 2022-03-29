import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { selectTravelTimeInformation } from '../slices/navSlice'
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setOrigin } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { TextInput,  Button } from 'react-native-paper';
import { useEffect } from 'react'

const RideOptionsCard = () => {

    useEffect(()=>{
        console.log("I am here");
        fetchCars();
    }, [])

    const navigation = useNavigation();
    const [selected, setSelected] = useState("");
    const [data, setData] = React.useState("");
    const [cancel, setCancel] = React.useState();
    const dispatch = useDispatch();

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
   
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMTo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NTczNzA0LCJleHAiOjE2NDg1NzczMDQsIm5iZiI6MTY0ODU3MzcwNCwianRpIjoibFdOWGpIcElKYmZoTXRJeiIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.xZkvn5AvxfjCwtWX9KFy1FK7pObsCwsm1WJSTZ44c7I'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
    const fetchCars=()=>{
        axios.get('http://192.168.16.101:8000/api/auth/getRides/'+origin.description+'/'+destination.description,
        {headers:headers},
        )
        .then((response) => {
            setData(response.data.rides)
            console.log(response.data.rides)
            console.log(origin.description)
            console.log(destination.description)
        }
        
        )
        .catch((error) =>{
            console.log(error)
            console.log(error.message =='Request failed with status code 401')
        }                
    )
    
    }
    const bookRide=(id)=>{
        axios.post('http://192.168.16.101:8000/api/auth/bookRide',{ride_id:id},
        {headers:headers} 
        
        )
        .then((response) => {
            console.log(response.data)
            console.log("im  booking")
            console.log(id)
            setCancel(id)
        })
        .catch((error) =>{
            console.log(error.response.data)
            console.log("error book")
            console.log(id)
        })
      
    }


    const cancelBooking = ()=>{
        axios.post('http://192.168.16.101:8000/api/auth/cancelBooking',{ride_id:cancel},
        {headers:headers}
        )
        .then((response) => {
            console.log("im cancel booking")
            console.log(cancel)
            

        })
        .catch((error) =>{
            console.log(error.response.data)
            console.log("error")
            console.log(cancel)
        })
      
    }


  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
            <TouchableOpacity 
            onPress={() => navigation.navigate("NavigateCard")}
            style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
            >
            <Icon name="chevron-left" type="fontawesome" />
            </TouchableOpacity>
      <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
        </View>
        <FlatList 
          data = {data}
          keyExtractor = {(item) => item.id}
          renderItem={({item: {id,fees,travel_date,travel_time}, item}) =>(
              <TouchableOpacity
              onPress={() =>{
                  setSelected(item)
                  bookRide(item.id)
              }
                
                }
              style ={tw`flex-row justify-between items-center px-10 ${id===selected?.id && "bg-gray-200"}`}>
                  <Image
                  style={{
                      width:100,
                      height:100,
                      resizeMode: "contain",
                  }}
                  source = {{uri: "https://links.papareact.com/7pf"}}
                  />
                  <View style={tw`-ml-6`}>
                      <Text style={tw`text-xl font-semibold`}>{travel_date}   {travel_time}</Text>
                      <Text style={tw`text-xl font-semibold`}>  Fees/person: {fees}</Text>
                      <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                  </View>
              </TouchableOpacity>
          )}
        />
        <TouchableOpacity 
            onPress={() => navigation.navigate("ProfilePic")}
            style={tw`mb-20 ml-6`}>
            <Text>Marly Khoury</Text>
        </TouchableOpacity>
        <View style={tw`mt-auto border-t border-gray-200`}>

            <TouchableOpacity
            onPress={
                
                cancelBooking
            }
              
              
             disabled={!selected} 
            style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
            >
                <Text style={tw`text-center text-white text-xl`}>Delete {selected?.title}</Text>
            </TouchableOpacity>
        </View>
        
            {/* <Button mode="contained" onPress={()=>fetchCars()}> */}
        {/* Sign Up
      </Button> */}
    </SafeAreaView>
  );
};

export default RideOptionsCard;

