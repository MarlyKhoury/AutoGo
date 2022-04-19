import * as React from 'react';
import { List } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { Text, View, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler'
import  { useState,useEffect } from 'react'
import axios from 'react-native-axios';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

const DropBtn = (props) => {

  useEffect(()=>{
         
          getCar();
    
        }, [])  

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [selected, setSelected] = useState("");
  const [data, setData] = React.useState("");
  const [token, setToken] = React.useState("");
  const dispatch = useDispatch();

  async function getToken(){
    
    setToken(result)
  } 

  
  
  
  const getCar=async()=>{
    const token = await SecureStore.getItemAsync('token');
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
        axios.get('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/user/getCar',
         {headers:headers},  
          )
          .then((response) => {
         
              setData(response.data.cars)

          } )
          .catch((error) =>{
              console.log(error)
          })
         
       }
  return (
      <List.Accordion
      style={tw`p-1 bg-gray-200`}
        title="Cars"
        left={props => <List.Icon {...props} icon="folder" />}
        onPress={handlePress}>

        <FlatList 
          data = {data}
          keyExtractor = {(item) => item.id}
          renderItem={({item: {id,model, fees}, item}) =>(
              <TouchableOpacity
              onPress={() =>{
               
                props.Changedata(item.id)
                
              }

                }
              style ={tw`flex-row justify-between items-center px-10 ${id===selected?.id && "bg-gray-200"}`}>
                
                  <View style={tw`ml-6`}>
                      <Text style={tw`text-base font-semibold`}>{model}</Text>
                     
                  </View>
              </TouchableOpacity>
          )}
        />

      </List.Accordion>
      

  );
};

export default DropBtn;