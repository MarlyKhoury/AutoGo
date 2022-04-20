import * as React from 'react';
import { Searchbar, Button } from 'react-native-paper';
import Header from '../components/Header';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useEffect, useState } from 'react';
import axios from 'react-native-axios';
import { Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import SearchBarComponent from '../components/SearchBar'


const AdminScreen = () => {

  useEffect(() => {
    console.log("I am here");

    fetchUsers();
  }, [])

  useEffect(()=>{
    onChangeSearch
  }, [searchQuery, filteredData])

  const [selected, setSelected] = useState("");
  const [data, setData] = React.useState([]);
  const [token, setToken] = React.useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const [isBanned, setBan] = useState(0);


  async function getToken() {
    console.log("result ", result)
    setToken(result)
  }


  const fetchUsers = async () => {
    const token = await SecureStore.getItemAsync('token');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    axios.get('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/admin/getUsers/',
      { headers: headers },
    )
      .then((response) => {
        setData(response.data.user);
        setFilteredData(response.data.user);

      })
      .catch((error) => {
      }
      )
  }

  const banUser = async (id) => {
    const token = await SecureStore.getItemAsync('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    getBannedStatus(id)
    axios.post('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/admin/ban', { id },
      { headers: headers }
    )
      .then((response) => {
        console.log(response.data)
        console.log(selected)
        setBan(1)
      })
      .catch((error) => {
        console.log("i am ban")
        console.log(selected)
        
      })
      
    }
    
    const unbanUser = async (id) => {
      const token = await SecureStore.getItemAsync('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
      axios.get('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/admin/unban/' + id,
      { headers: headers },
      )
      .then((response) => {
        setBan(0)
        
      })
      .catch((error) => {
        
      }
      )
  }


const getBannedStatus =async(id) =>{
  const token = await SecureStore.getItemAsync('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  }
  axios.get('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/admin/bannedStatus/' + id,
  { headers: headers },
  )
  .then((response) => {   
    
    
  })
  .catch((error) => {    
  }
  )
}



  const onChangeSearch = (query) => {
   
    let filteredData = [];
    console.log("query ", query);
    setSearchQuery(query)
    if(data && data!==undefined)
    data?.filter((item) => {
      
      if(item.first_name.toString().toLowerCase().includes(searchQuery?.toString().toLowerCase())){
        
        filteredData.push(item);
        

        
      }
      
    });
    
    if(filteredData && filteredData !=undefined){
      if(searchQuery?.length<1){
        setFilteredData(data);
      } else {
        setFilteredData(filteredData);

      }
    }

    
  };

  return (

    <View>
      <Header 
      title="                   Admin"
      />
      <Searchbar
      style={[tw`mt-4 bg-gray-200`,{borderRadius:10, width:350,alignSelf:"center"}]}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={[tw`bg-gray-200`, { height: 0.8 }]}
          />
        )}
        renderItem={({ item: { id, first_name, last_name }, item }) => (

          <TouchableOpacity
            style={tw`flex-row items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
            

            <View style={tw`mt-10 flex-row `}>


              <Text style={[tw`text-lg font-medium`, { flexGrow: 1 }]}>{first_name}  {last_name}</Text>

            {isBanned === 0 ? (
            <Button
            style={styles.button}
              title="Block"
              onPress={() => { banUser(id) }}
              
            ><Text style={{color:"white",fontSize:10}}>Block</Text></Button>
          ): (
            <Button 
            style={styles.button}
              title="Unblock" 
              onPress={() => { setSelected(id), unbanUser(id) }}><Text style={{color:"white",fontSize:10}}>Unblock</Text></Button>
          )
    }

            </View>
          </TouchableOpacity>
        )}
      />
    </View>


  );
};

export default AdminScreen;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#58BD29",
     marginBottom:30,
    width: 90,
    borderRadius: 20,
     
  }
  
});