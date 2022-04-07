import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Image } from 'react-native'
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
import { Button } from 'react-native-paper';

const ProfilePic = (props) => {
console.log("props ", props.userId2 )
  useEffect(()=>{
    // console.log("I am here");
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
    // gettoken()
  const token = await SecureStore.getItemAsync('token');

     const headers = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+token,
     }
    axios.get('http://192.168.16.101:8000/api/auth/getownInfo',
    {headers:headers},
    )
    .then(function (response) {
      // setData((response.data.profile[0].picture_path))
      setData((response.data))
      setFullResponse(response);
      // console.log("data user --------------------------------> ", data)
      setUserId(response.data?.user?.id);
    })
    .catch((error) =>{
        console.log(error) 
       
    },
    )} 
if (!data){
  return <Text>is loading</Text>
}

// console.log(" datra state ", userId)
  return (    
    <View >

      <Header title="                     Profile"/>

      
          {/* <ImageUpload /> */}

          <Image
                  style={{
                      width:400,
                      height:400,
                      resizeMode: "contain",
                      marginTop: -70,
                      marginLeft: -10
                      
                  }}
                  source = {{uri: `${data.profile[0].picture_path}`}}
                  />






          {/* <Image source = {{uri:{data}}} style = {{height: 20, resizeMode : 'stretch', margin: 5 }} /> */}
      {/* <View style={tw`justify-center max-w-md`}>{data?.profile?.picture_path}</View> */}
      <Text style={tw`items-center max-w-md pt-10 pb-10 mx-auto text-lg font-bold`}>{data?.user?.first_name} {data?.user?.last_name}</Text> 
      <Text style={[tw`font-semibold ml-4`,{marginTop:-10}]}>
        
        Feedback

      </Text>
   <View>
      <TextInput style={[tw`bg-gray-200 ml-4`,{height:50,width:250,borderRadius:10, marginTop:10}]} multiline={true} />
      <Button style={styles.button} mode="contained" >
        post
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

                  <View style={tw`mb-1 ml-4`}>
                      <Text style={tw`text-base font-normal`}>{comment}</Text>
                      
                  </View>

{/* <View>
  <Text> Name </Text>

  { this.state.isEditing ?
    <TextInput
      value={this.state.txt}
      onChangeText={(value) => this.setState({ txt: value })}
      autoFocus
      onBlur={() => this.setState({ isEditing: false })}
    /> :
    <Text
      // style={styles.t2}
      onPress={() => this.setState({ isEditing: true })}
    >
      {this.state.txt}
    </Text> 
  }
</View> */}



                  
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
  },
  button:{
    backgroundColor: "#58BD29",
    marginTop:12,
    width:60,
    marginLeft:20,
 }
})