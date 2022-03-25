import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const data = [
//     {
//         id: "Uber-X-123",
//         title: "UberX",
//         multiplier: 1,
//         image: "https://links.papareact.com/3pn",

//     },
//     {
//         id: "Uber-XL-456",
//         title: "Uber XL",
//         multiplier: 1.2,
//         image: "https://links.papareact.com/5w8",

//     },
//     {
//         id: "Uber-LUX-789",
//         title: "Uber LUX",
//         multiplier: 1.75,
//         image: "https://links.papareact.com/7pf",

//     },
//     {
//         id: "Uber-LUX-7",
//         title: "Uber LUX",
//         multiplier: 1.75,
//         image: "https://links.papareact.com/7pf",

//     },

// ]
const RideOptionsCard = () => {
    const data = [
        // {
        //     id: "Uber-X-123",
        //     title: "UberX",
        //     multiplier: 1,
        //     image: "https://links.papareact.com/3pn",
    
        // },
        // {
        //     id: "Uber-XL-456",
        //     title: "Uber XL",
        //     multiplier: 1.2,
        //     image: "https://links.papareact.com/5w8",
    
        // },
        // {
        //     id: "Uber-LUX-789",
        //     title: "Uber LUX",
        //     multiplier: 1.75,
        //     image: "https://links.papareact.com/7pf",
    
        // },  
        {
            id: "1",
            user_car_id: "2",
            travel_date: "2022-12-03",
            travel_time:"12:00:00",
            origin_city:"jbeil",
            destination_city:"dbayeh",
            fees:"700000LBP",
            gender_prefrences:"female",
            remaining_seats:"3",
    
        },  
    ]

    
    const navigation = useNavigation();
    //keep track of what is selected
    const [selected, setSelected] = useState(null);
    const [setdata, setData] = React.useState("");

    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMjo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4MjMyOTM2LCJleHAiOjE2NDgyMzY1MzYsIm5iZiI6MTY0ODIzMjkzNiwianRpIjoiYkgyN08ydDVVNE5WcTJ3byIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.iqU3SgKzg_nYhAmZBKW98slqU5pvVevc9vELxiQZXIE'
      }
    axios
    .get('http://192.168.16.102:8000/api/auth/getRides',
    {headers:headers})
    .then(function (response) {
      // handle success
      console.log(JSON.stringify(response.data.rides[0]))
      setData(JSON.stringify(response.data.rides[0]))
    })
    .catch(function (error) {
        // setErrorMessage(error.response.data.error)
        console.log(error)
        console.log(error.message=='Request failed with status code 401')

    })

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
          renderItem={({item: {id, title, multiplyer, image}, item}) =>(
              <TouchableOpacity
              onPress={() => setSelected(item)}
              style ={tw`flex-row justify-between items-center px-10 ${id===selected?.id && "bg-gray-200"}`}>
                  <Image
                  style={{
                      width:100,
                      height:100,
                      resizeMode: "contain",
                  }}
                  source = {{uri: image}}
                  />
                  <View style={tw`-ml-6`}>
                      <Text style={tw`text-xl font-semibold`}>{title}</Text>
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
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});