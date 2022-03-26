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
    const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjAuMTE2OjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDgzMDg1NTUsImV4cCI6MTY0ODMxMjE1NSwibmJmIjoxNjQ4MzA4NTU1LCJqdGkiOiJVNk9rTGY0eVFEaWJvZVNuIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.s3Vd20Q38RM1aooSteNQnc5cZI2MenJh1SLyfCUkfkc'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
    const fetchCars=()=>{
        axios.get('http://192.168.16.103:8000/api/auth/getRides',
        {headers:headers},  
        )
        .then((response) => {
            setData(response.data.rides)
            console.log(origin.description)
            console.log(destination.description)
        }
          // handle success
        //   console.log(JSON.stringify(response.data.rides))
        
    
    
        //   dispatch(setOrigin({
        //     location: details.geometry.location,
        //     description: data.description,
        //     // console.log(details);
        //   }))
          
        )
        .catch((error) =>{
            console.log(error)
            console.log(error.message=='Request failed with status code 401')
        }            // setErrorMessage(error.response.data.error)
           
    
        )
        // useEffect(fetchCars, [])
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
          renderItem={({item: {id,title, fees}, item}) =>(
              <TouchableOpacity
              onPress={() =>
                 setSelected(item)
                // console.log(item)
                
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
                      <Text style={tw`text-xl font-semibold`}>{title}</Text>
                      <Text style={tw`text-xl font-semibold`}>{fees}</Text>
                      <Text style={tw`text-xl font-semibold`}>{selected.id}</Text>
                      <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                  </View>
                  <Text style={tw`text-xl`}>$99</Text>
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

