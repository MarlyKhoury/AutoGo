import * as React from 'react';
import { Searchbar, Button } from 'react-native-paper';
import Header from '../components/Header';
import { View, SafeAreaView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useEffect, useState } from 'react';
import axios from 'react-native-axios';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {

  useEffect(()=>{
    console.log("I am here");
    
    fetchUsers(); 
    //men 7ot hone banUser? no ha y awal ma t2ali3 nsafha bt3mle functioneh sa7 sorry:p...
    
}, [])

const [selected, setSelected] = useState("");
const [data, setData] = React.useState("");
// const navigation = useNavigation();

const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMDo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NDk0NjYxLCJleHAiOjE2NDg0OTgyNjEsIm5iZiI6MTY0ODQ5NDY2MSwianRpIjoiNFJWcldYZFRBRVNnWVVYTiIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.eXoerpr7dILaoye3ILFhlxX3zX48xR68NsFwXmbJRao'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
    const fetchUsers=()=>{
        axios.get('http://192.168.16.101:8000/api/auth/getUsers/',
        {headers:headers},
        )
        .then((response) => {
            setData(response.data.user)
            // console.log(response.data.user)
            
        })
        .catch((error) =>{
            console.log(error)
            console.log(error.message=='Request failed with status code 401')
        }                
    )}
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const onChangeSearch = query => setSearchQuery(query);

  const banUser=()=>{
    axios.post('http://192.168.16.101:8000/api/auth/ban',{id:selected},
    {headers:headers}
    )
    .then((response) => {
        console.log(response.data)
        console.log(selected)
      })
      .catch((error) =>{
        console.log("i am ban")
        console.log(selected)
        // console.log(error.response.data)
    })
  
}

const unbanUser=()=>{
  axios.get('http://192.168.16.101:8000/api/auth/unban/'+selected, //akid yala naked lap dance akidd :p
  {headers:headers},
  )
  .then((response) => {
      // setData(response.data.user)
      
      // console.log(response.data.user)
      
  })
  .catch((error) =>{
      console.log(error)
      console.log(error.message=='Request failed with status code 401')
  }                
)}
  return (

    <View>
      <Header />
       <FlatList 
          data = {data}
          keyExtractor = {(item) => item.id}
          renderItem={({item: {id,first_name, last_name}, item}) =>(
              <TouchableOpacity
              // onPress={() =>{
              //     // setSelected(item)
              //     // fetchUsers()
              //     // banUser()
              // }
                // console.log(item.id)
                
                // }
              style ={tw`flex-row justify-between items-center px-10 ${id===selected?.id && "bg-gray-200"}`}>
                  {/* <Image
                  style={{
                      width:100,
                      height:100,
                      resizeMode: "contain",
                  }}
                  source = {{uri: "https://links.papareact.com/7pf"}}
                  /> */}
                  <View style={tw`flex flex-row justify-evenly `}>
                    <Text>{selected.id}</Text>
                      <Text style={tw`text-xl font-semibold`}>{first_name}  {last_name}</Text>
                      <Button onPress={()=>{setSelected(id),banUser()}}>Block</Button>
                      <Button onPress={()=>{setSelected(id),unbanUser()}}>Unblock</Button>
                     
                  </View>
              </TouchableOpacity>
          )}
          />
    </View>










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