import * as React from 'react';
import { List } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import { StyleSheet, Text, View, SafeAreaView, TextInput ,TouchableOpacity,Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler'
import  { useState,useEffect } from 'react'
import axios from 'react-native-axios';
import { useDispatch } from 'react-redux';

const DropBtn = (props) => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [selected, setSelected] = useState("");
  const [data, setData] = React.useState("");
  const dispatch = useDispatch();

  const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjcwLjI4OjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDgzOTY4OTUsImV4cCI6MTY0ODQwMDQ5NSwibmJmIjoxNjQ4Mzk2ODk1LCJqdGkiOiJvOTh5d0M1UXZaTVBoQjRBIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FNTS6QEHdSBf1RTI35iKBZ153Rh0kI30bqoN0gCjLek'
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }


  useEffect(()=>{
         console.log("I am here");
          getCar();
    
        }, [])  
        
  const getCar=()=>{
        axios.get('http://192.168.70.28:8000/api/auth/getCar',
         {headers:headers},  
          )
          .then((response) => {
         
              console.log(response.data.cars)
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
        // expanded={expanded}
        onPress={handlePress}>

        <FlatList 
          data = {data}
          keyExtractor = {(item) => item.id}
          renderItem={({item: {id,model, fees}, item}) =>(
              <TouchableOpacity
              onPress={() =>{
                //  setSelected(item)
                // console.log(item)
                props.Changedata(item.id)
                // setExpanded(expanded)
              }

                }
              style ={tw`flex-row justify-between items-center px-10 ${id===selected?.id && "bg-gray-200"}`}>
                
                  <View style={tw`-ml-6`}>
                      <Text style={tw`text-xl font-semibold`}>{model}</Text>
                      {/* <Text style={tw`text-xl font-semibold`}>{selected.id}</Text> */}
                  </View>
              </TouchableOpacity>
          )}
        />

      </List.Accordion>
      

  );
};

export default DropBtn;