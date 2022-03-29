import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react'
import axios from 'react-native-axios';
import  { useState } from 'react';
import Header from '../components/Header';

const ProfilePic = () => {
  useEffect(()=>{
    console.log("I am here");
    
    fetchUserInfo(); 
    
}, [])
  const [data, setData] = useState("");
  
  const [selected, setSelected] = useState("");

  

  const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMTo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NTg2NDM0LCJleHAiOjE2NDg1OTAwMzQsIm5iZiI6MTY0ODU4NjQzNCwianRpIjoiN3VZWXcyUDdDaTZ4clRwQiIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.4oDWwpVZbvlRtvpI_0Z65b0zuYU8oiv_kUdt9Gqt6h0'
  const headers = {
    'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
      }

  const fetchUserInfo=()=>{
    axios.get('http://192.168.16.101:8000/api/auth/getuserInfo',
    {headers:headers},
    )
    .then(function (response) {
      let test=response.data
      setData(response.data)
      console.log(data)      
    })
    .catch((error) =>{
        console.log(error)
    },
    )} 

  return (

    
    <View >
      <Header />
      
      <Text style={tw`items-center max-w-md p-20 mx-auto mt-40 text-lg font-bold`}>{data?.user?.first_name} {data?.user?.last_name}</Text> 
      {/* <Text>{data?.user?.last_name}</Text> */}
      
      {/* <Icon 
      style={tw`p-2 bg-black rounded-full w-10 mt-40`}
      name="briefcase" type="entypo" color="white" size={16}/>
      <Icon 
      style={tw`p-2 bg-black rounded-full w-10 mt-40`}
      name="graduation-cap" type="entypo" color="white" size={16}/>
      <Icon 
      style={tw`p-2 bg-black rounded-full w-10 mt-40`}
      name="home" type="entypo" color="white" size={16}/> */}


<FlatList 
          data = {data.review}
          keyExtractor = {(item) => item.id}
          renderItem={({item: {id,rating, comment}, item}) =>(
            <TouchableOpacity
            onPress={() =>{
              setSelected(item)
              fetchUserInfo()
            }
          }
          style ={tw`flex-row mt-2 items-center px-10 ${id===selected?.id && "bg-gray-200"}`}>
                  {/* <Image
                  style={{
                    marginLeft:-12,
                    width:60,
                    height:60,
                    resizeMode: "contain",
                  }}
                  source = {{uri: "https://links.papareact.com/7pf"}}
                  /> */}
                   <Icon 
                   style={[tw`p-2 rounded-full w-10 mt-2`,{backgroundColor:'#58BD29'}]}
                   name="rate-review" type="materialicons" color="white" size={16}
                   />


                  <View style={tw`ml-2`}>
                      <Text style={tw`text-base font-normal`}>{comment}</Text>
                      {/* <Text style={tw`text-base font-normal`}>{rating}</Text>                     */}
                  </View>
              </TouchableOpacity>
          )}
        />
    </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({})