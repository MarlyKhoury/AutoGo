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
    //keep track of what is selected
    const [selected, setSelected] = useState("");
    const [data, setData] = React.useState("");
    const dispatch = useDispatch();

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
   
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjcwLjI4OjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDgzODk2NzEsImV4cCI6MTY0ODM5MzI3MSwibmJmIjoxNjQ4Mzg5NjcxLCJqdGkiOiJTSFdhVWRlSXU5ZDlQT2JvIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.gCNB4ROAuj_ma0oH8Qs3bU3u_uHfKD-sERTqXlrVg7Q'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
    const fetchCars=()=>{
        axios.get('http://192.168.70.28:8000/api/auth/getRides/'+origin.description+'/'+destination.description,
        {headers:headers},
        )
        .then((response) => {
            setData(response.data.rides)
            console.log(origin.description)
            console.log(destination.description)
        }
        
        )
        .catch((error) =>{
            console.log(error)
            console.log(error.message=='Request failed with status code 401')
        }            // setErrorMessage(error.response.data.error)     
    )
        // useEffect(fetchCars, [])
    }
    const bookRide=()=>{
        axios.post('http://192.168.70.28:8000/api/auth/bookRide',{ride_id:selected.id},
        {headers:headers}
        )
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) =>{
            console.log(error.response.data)
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
          renderItem={({item: {id,title, fees,travel_date,travel_time}, item}) =>(
              <TouchableOpacity
              onPress={() =>{
                  setSelected(item)
                  bookRide()
              }
                // console.log(item.id)
                
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
                      {/* <Text style={tw`text-xl font-semibold`}>{title}</Text> */}
                      <Text style={tw`text-xl font-semibold`}>  Fees/person: {fees}</Text>
                      <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                  </View>
              </TouchableOpacity>
          )}
        />
        <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity disabled={!selected} 
            style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
            </TouchableOpacity>

        </View>
            {/* <Button mode="contained" onPress={()=>fetchCars()}> */}
        {/* Sign Up
      </Button> */}
    </SafeAreaView>
  );
};

export default RideOptionsCard;

