import { StyleSheet, Text, TextInput, View, FlatList,KeyboardAvoidingView,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useEffect } from 'react'
import axios from 'react-native-axios';
import  { useState } from 'react';
import Header from '../components/Header';
import * as SecureStore from 'expo-secure-store';
import ImageUpload from '../components/ImageUpload';
import { Button } from 'react-native-paper';
import { styles } from "../Styles";
const ProfilePic = (props) => {
  
  useEffect(()=>{
    
    fetchUserInfo(); 
    
  }, [])
  const [data, setData] = useState("");
  const [selected, setSelected] = useState("");
  const [token, setToken] = React.useState("");
  const [fullResponse, setFullResponse] = useState([]);
  const [userId, setUserId] = useState();
  
  async function getToken(){
    
    setToken(result)
  } 
  
  const fetchUserInfo=async ()=>{
    const token = await SecureStore.getItemAsync('token');
    
    const headers = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+token,
     }
    axios.get('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/user/getownInfo',
    {headers:headers},
    )
    .then(function (response) {
    
      setData((response.data))
    
      setFullResponse(response);
     
      setUserId(response.data?.user?.id);
    })
    .catch((error) =>{
      
    },
    )} 
    if (!data){
      return <Text>is loading</Text>
    }
    
  
    const postReviews = async()=>{
      const token = await SecureStore.getItemAsync('token');
          const headers = {
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer '+token,
          }
      axios.post('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/user/postReview',{from_id},
      {headers:headers},
      
      )
      .then((response) => {         

      })
      .catch((error) =>{
          
      })
    
  }


    return (    
      <View >
      <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >

      <Header title="                     Profile"/>

          <Image
                  style={{
                    width:400,
                    height:400,
                    resizeMode: "contain",
                    marginTop: -50,
                    marginLeft: -10,
                    
                  }}
                  source = {{uri: `${data?.profile?.picture_path}`}}
                  />

      <Text style={[tw`items-center max-w-md pb-10 mx-auto text-xl font-bold`,{marginTop:-70}]}>
        {data?.user?.first_name} {data?.user?.last_name}
      </Text> 
      <Text style={[tw`ml-4 pb-5 text-lg font-semibold`,{marginTop:-10}]}>
        Feedback
      </Text>

   <View style={tw`flex-row`}>
      <TextInput 
      style={[tw`bg-gray-200 ml-4`,{height:40,width:250,borderRadius:10, marginTop:15}]} multiline={true}
      placeholder='  Write a review'
      
      />
      <Button onPress={postReviews} style={styles.post_button} mode="contained" >
       <Text style={{fontSize:15}}>Post</Text>
      </Button>
</View>
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

                  <View style={[tw`pb-10 text-lg font-bold`,{marginTop:-110}]}>
                      <Text style={tw`text-base font-normal`}>{comment}</Text>
                      
                  </View>
                  
              </TouchableOpacity>
          )}
        />
        </KeyboardAvoidingView>
          <ImageUpload />
        

    </View>
  )
}

export default ProfilePic

