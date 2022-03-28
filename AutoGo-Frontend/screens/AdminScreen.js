import * as React from 'react';
import { Searchbar, Button } from 'react-native-paper';
import Header from '../components/Header';
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useEffect, useState } from 'react';
import axios from 'react-native-axios';


const AdminScreen = () => {

  useEffect(()=>{
    console.log("I am here");
    
    fetchUsers(); 
    
}, [])

const [selected, setSelected] = useState("");
const [data, setData] = React.useState("");

const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMDo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NDg3MjA1LCJleHAiOjE2NDg0OTA4MDUsIm5iZiI6MTY0ODQ4NzIwNSwianRpIjoiVjNYZ0VNb3VZMFR4UjRzZCIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.FgFm4qaTs2iStEySw_OVGcUpu8E6Wo8fJXtqt9qAVr0'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
    const fetchUsers=()=>{
        axios.get('http://192.168.16.100:8000/api/auth/getUsers/',
        {headers:headers},
        )
        .then((response) => {
            setData(response.data.user)
            
        }
        
        )
        .catch((error) =>{
            console.log(error)
            console.log(error.message=='Request failed with status code 401')
        }                
    )

    }
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const onChangeSearch = query => setSearchQuery(query);


  return (

    <SafeAreaView>
       <FlatList 
          data = {data}
          keyExtractor = {(item) => item.id}
          renderItem={({item: {id,first_name, last_name}, item}) =>(
              <TouchableOpacity
              onPress={() =>{
                  setSelected(item)
                  fetchUsers()
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
                      <Text style={tw`text-xl font-semibold`}>{first_name}   {last_name}</Text>
                      {/* <Text style={tw`text-xl font-semibold`}>{title}</Text> */}
                      {/* <Text style={tw`text-xl font-semibold`}>  Fees/person: {fees}</Text>
                      <Text>{travelTimeInformation?.duration?.text} Travel Time</Text> */}
                  </View>
              </TouchableOpacity>
          )}
        />
    </SafeAreaView>










  //  <View>
  //     <Header />
  //   <View style={tw`justify-evenly flex-row`}>
  //     <Button  mode="contained" onPress={() => console.log('Pressed')}>
  //        Block User
  //     </Button>

  //     <Button  mode="contained" onPress={() => console.log('Pressed')}>
  //        Unblock User
  //     </Button>

  //     <Button  mode="contained" onPress={() => console.log('Pressed')}>
  //        Delete Post
  //     </Button>
  //   </View>
  //   <Searchbar
  //     style={[tw`mt-4 bg-gray-200 items-center max-w-md mx-auto`,{width:340}]}
  //     placeholder="Search"
  //     onChangeText={onChangeSearch}
  //     value={searchQuery}
  //   />
  // </View>
  );
};

export default AdminScreen;