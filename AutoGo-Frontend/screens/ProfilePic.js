import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react'
import axios from 'react-native-axios';
import  { useState } from 'react';
import Header from '../components/Header';
import * as SecureStore from 'expo-secure-store';
import ImageUpload from '../components/ImageUpload';


const ProfilePic = () => {

  useEffect(()=>{
    console.log("I am here");
    
    fetchUserInfo(); 
    
}, [])
  const [data, setData] = useState("");
  const [selected, setSelected] = useState("");
  const [token, setToken] = React.useState("");

  async function getToken(){
    
    setToken(result)
  } 
  
  const fetchUserInfo=async ()=>{
    // getToken()
  const token = await SecureStore.getItemAsync('token');

     const headers = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+token,
     }
    axios.get('http://192.168.16.101:8000/api/auth/getuserInfo',
    {headers:headers},
    )
    .then(function (response) {
      setData(response.data)
      console.log(data)      
    })
    .catch((error) =>{
        console.log(error)
    },
    )} 

  return (

    
    <View >

      <Header/>


      <ImageUpload />
    

      <Text style={tw`items-center max-w-md pt-20 pb-10 mx-auto mt-40 text-lg font-bold`}>{data?.user?.first_name} {data?.user?.last_name}</Text> 


<FlatList 
          data = {data.review}
          keyExtractor = {(item) => item.id}
          ItemSeparatorComponent={() =>(
            <View 
              style={[tw`bg-gray-200`, {height: 0.7}]}
            />
        )}
          renderItem={({item: {id,rating, comment}, item}) =>(
            <TouchableOpacity
            onPress={() =>{
              setSelected(item)
              fetchUserInfo()
            }
          }
          
          style ={tw`flex-row  items-center px-10 ${id===selected?.id && "bg-gray-200"}`}>
            
                   <Icon 
                   style={[tw`p-2 rounded-full w-8 mb-2 mt-2`,{backgroundColor:'#58BD29'}]}
                   name="rate-review" type="materialicons" color="white" size={16}
                   />

                  <View style={tw`mb-1 ml-4`}>
                      <Text style={tw`text-base font-normal`}>{comment}</Text>
                      {/* <Text style={tw`text-base font-normal`}>{rating}</Text>*/}
                  </View>
              </TouchableOpacity>
          )}
        />
    </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({
  acctext:{
    color: "#454545",
    textAlign:"center",
    marginTop:8,
  }
})