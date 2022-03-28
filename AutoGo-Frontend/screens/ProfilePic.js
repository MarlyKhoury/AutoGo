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

  const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwNDo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NDU1NzAwLCJleHAiOjE2NDg0NTkzMDAsIm5iZiI6MTY0ODQ1NTcwMCwianRpIjoiTjQwaFdPM2k5clVka2JzMyIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.1SpHQJHKqGugdmSpjPwZtXTg1v5jXWlcb6cAPXyH1Z4'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }

  const fetchUserInfo=()=>{
    axios.get('http://192.168.16.104:8000/api/auth/getuserInfo/',
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
          renderItem={({item: {id,user, rating,comment}, item}) =>(
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
                      {/* <Text style={tw`text-xl font-semibold`}>{profile}</Text> */}
                      <Text style={tw`text-xl font-semibold`}>{comment}</Text>
                      <Text style={tw`text-xl font-semibold`}>{rating}</Text>
                    
                  </View>
              </TouchableOpacity>
          )}
        />
    </SafeAreaView>
  )
}

export default ProfilePic

const styles = StyleSheet.create({})