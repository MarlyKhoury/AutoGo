import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react'
import axios from 'react-native-axios';
import  { useState } from 'react'

const ProfilePic = () => {
  useEffect(()=>{
    console.log("I am here");
    
    fetchUserInfo(); 
    
}, [])
  const [data, setData] = useState("");
  // const [extra_data, setExtra_data] = React.useState(true);
  // const [profile_data, setProfile_data] = React.useState("");
  const [selected, setSelected] = useState("");

  

  const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMDo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NDc3NjY0LCJleHAiOjE2NDg0ODEyNjQsIm5iZiI6MTY0ODQ3NzY2NCwianRpIjoiam5oSndmRnNxaW9BWEdlZyIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.hhH55UUC4VsKblgLMV2UWIqeJZF3uH4m7pz3wMzTnHU'
  const headers = {
    'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
      }

  const fetchUserInfo=()=>{
    axios.get('http://192.168.16.100:8000/api/auth/getuserInfo',
    {headers:headers},
    )
    .then(function (response) {
      let test=response.data
      setData(response.data)
      console.log(data)
      
      
    }
    
    )
    .catch((error) =>{
        console.log(error)
        
    },
    )
    
  } 

  return (
    <SafeAreaView style={tw`flex-row justify-evenly`}>
      
      {/* <Text>{data.user.first_name}</Text> */}
      {/* <Text>{profile_data.workplace}</Text> */}
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
          data = {data.review}
          // extra_data = {extra_data}
          keyExtractor = {(item) => item.id}
          renderItem={({item: {id, address,first_name, last_name, rating, comment}, item}) =>(
            <TouchableOpacity
            onPress={() =>{
              setSelected(item)
              fetchUserInfo()
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
                      {/* <Text style={tw`text-xl font-semibold`}>{user}</Text> */}
                  
                  {/* <Text>{profile_data.workplace}</Text> */}
                      {/* <Text style={tw`text-xl font-semibold`}>{first_name}</Text>
                      <Text style={tw`text-xl font-semibold`}>{last_name}</Text> */}
                      <Text style={tw`text-xl font-semibold`}>{comment}</Text>
                      <Text style={tw`text-xl font-semibold`}>{rating}</Text>
                      {/* <Text style={tw`text-xl font-semibold`}>{address}</Text> */}
                    
                  </View>
              </TouchableOpacity>
          )}
        />
    </SafeAreaView>
  )
}

export default ProfilePic

const styles = StyleSheet.create({})