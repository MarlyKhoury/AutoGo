import * as React from 'react';
import { Searchbar, Button, Divider } from 'react-native-paper';
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
    axios.get('http://192.168.16.102:8000/api/auth/getUsers/',
      { headers: headers },
    )
      .then((response) => {
        setData(response.data.user);
        setFilteredData(response.data.user);
        // console.log("data ", data)


      })
      .catch((error) => {
        console.log(error)
        console.log(error.message == 'Request failed with status code 401')
      }
      )
  }

  const banUser = async (id) => {
    const token = await SecureStore.getItemAsync('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    axios.post('http://192.168.16.102:8000/api/auth/ban', { id },
      { headers: headers }
    )
      .then((response) => {
        console.log(response.data)
        console.log(selected)
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
    axios.get('http://192.168.16.102:8000/api/auth/unban/' + id,
      { headers: headers },
    )
      .then((response) => {

        console.log(response.data)
        console.log(id)

      })
      .catch((error) => {
        console.log(error)
        console.log('iam ' + id)
      }
      )
  }






  const onChangeSearch = (query) => {
   
    console.log("data ", data)
    let filteredData = [];
    console.log("query ", query);
    setSearchQuery(query)
    if(data && data!==undefined)
    data?.filter((item) => {
      // console.log("item ", JSON.stringify(item.first_name));
      // console.log("search query ", searchQuery)
      console.log("-------------------------------")
      if(item.first_name.toString().toLowerCase().includes(searchQuery?.toString().toLowerCase())){
        // console.log("item ---> ", JSON.stringify(item));
        filteredData.push(item);
        console.log("-------------------------------2")

        
      }
      
    });
    console.log(" fil data ----> ", filteredData && JSON.stringify(filteredData))
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
      title="Admin"
      />
      <Searchbar
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
            // onPress={() =>{
            //     // setSelected(item)
            //     // fetchUsers()
            //     // banUser()
            // }
            // console.log(item.id)

            // }
            style={tw`flex-row items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
            {/* <Icon 
                  style={[tw` p-2 rounded-full w-8 mt-10`,{backgroundColor:"#58BD29"}]}
                  name="user" type="feather" color="white" size={16}/>  */}

            <View style={tw`mt-10 flex-row `}>

              {/* <Text>{selected.id}</Text> */}

              <Text style={[tw`text-lg font-medium`, { flexGrow: 1 }]}>{first_name}  {last_name}</Text>

              {/* <Button style={styles.button} mode="contained" onPress={() => { banUser(id) }}>Block</Button>

              <TouchableOpacity onPress={() => { setSelected(id), unbanUser(id) }}><Text style={[tw`text-base font-semibold`, { color: '#58BD29' }]}>Unblock</Text></TouchableOpacity> */}

            {isBanned === 0 ? (
            <Button
            style={styles.button}
              title="Block"
              onPress={() => { banUser(id) }}
            />
          ) : (
            <Button 
            style={styles.button}
              title="Unblock" 
              onPress={() => { setSelected(id), unbanUser(id) }} />
          )
    }
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
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#58BD29",
    //  marginTop:20,
    width: 90,
    marginLeft: 80,
    borderRadius: 20,
    
  },
})