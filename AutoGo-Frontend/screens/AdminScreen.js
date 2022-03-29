import * as React from 'react';
import { Searchbar, Button, Divider } from 'react-native-paper';
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


const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMTo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NTcxNTc5LCJleHAiOjE2NDg1NzUxNzksIm5iZiI6MTY0ODU3MTU3OSwianRpIjoiTVFDbXlYdGl4QmYzcmJSaCIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.9CPSCmh2O8ocFichanKmT7ay64NQGLeOMb8UOojqQN8'
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
            
            
        })
        .catch((error) =>{
            console.log(error)
            console.log(error.message=='Request failed with status code 401')
        }                
    )}

  const banUser=(id)=>{
    axios.post('http://192.168.16.101:8000/api/auth/ban',{id},
    {headers:headers}
    )
    .then((response) => {
        console.log(response.data)
        console.log(selected)
      })
      .catch((error) =>{
        console.log("i am ban")
        console.log(selected)
        
    })
  
}

const unbanUser=(id)=>{
  axios.get('http://192.168.16.101:8000/api/auth/unban/'+id,
  {headers:headers},
  )
  .then((response) => {
      
      console.log(response.data)
      console.log(id) 
      
  })
  .catch((error) =>{
      console.log(error)
      console.log('iam '+id)
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
                  <View style={tw`flex flex-row justify-between`}>
                
                    {/* <Text>{selected.id}</Text> */}
                    
                      <Text style={[tw`text-lg font-semibold`,{flexGrow:1}]}>{first_name}  {last_name}</Text>
                    
                      <Button style={tw`ml-auto`}onPress={()=>{banUser(id)}}>Block</Button>
                  
                      <Button onPress={()=>{setSelected(id),unbanUser(id)}}>Unblock</Button>
                     
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