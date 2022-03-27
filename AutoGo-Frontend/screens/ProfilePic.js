import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react'
import axios from 'react-native-axios';
import  { useState } from 'react'

const ProfilePic = () => {
  const [data, setData] = React.useState("");
  const [selected, setSelected] = useState("");

  useEffect(()=>{
    console.log("I am here");
    fetchUserInfo();
}, [])

  const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjcwLjI4OjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDgzOTk4MzcsImV4cCI6MTY0ODQwMzQzNywibmJmIjoxNjQ4Mzk5ODM3LCJqdGkiOiJqZVFsSE54TUJQZFAzcE05Iiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.KSAV69OoQvHKVvpXDoJ4zoTpf4PolcB_1adi2T7iGlU'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }

  const fetchUserInfo=()=>{
    axios.get('http://192.168.70.28:8000/api/auth/getuserInfo/',
    {headers:headers},
    )
    .then((response) => {
      setData(response.data.review)
        console.log(response.data.review)
        
    }
    
    )
    .catch((error) =>{
        console.log(error)
        
    }            // setErrorMessage(error.response.data.error)     
)
    // useEffect(fetchCars, [])
}
  return (
    <SafeAreaView style={tw`flex-row justify-evenly`}>
      <Icon 
      style={tw`p-2 bg-black rounded-full w-10 mt-40`}
      name="briefcase" type="entypo" color="white" size={16}/>
      <Icon 
      style={tw`p-2 bg-black rounded-full w-10 mt-40`}
      name="graduation-cap" type="entypo" color="white" size={16}/>
      <Icon 
      style={tw`p-2 bg-black rounded-full w-10 mt-40`}
      name="home" type="entypo" color="white" size={16}/>

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
                      {/* <Text style={tw`text-xl font-semibold`}>{travel_date}   {travel_time}</Text> */}
                      {/* <Text style={tw`text-xl font-semibold`}>{title}</Text> */}
                      {/* <Text style={tw`text-xl font-semibold`}>  Fees/person: {fees}</Text> */}
                      {/* <Text>{travelTimeInformation?.duration?.text} Travel Time</Text> */}
                  </View>
              </TouchableOpacity>
          )}
        />
    </SafeAreaView>
  )
}

export default ProfilePic

const styles = StyleSheet.create({})