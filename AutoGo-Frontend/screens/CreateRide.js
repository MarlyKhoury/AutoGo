import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React,{useState} from 'react'
import Header from '../components/Header'
import { TextInput, Button } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import RadioBtn from '../components/RadioBtn';
import { useNavigation } from '@react-navigation/native';
import DropBtn from '../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, setDestination, setOrigin, selectOrigin } from '../slices/navSlice';
import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';
import DateTime from '../components/DateTime';


const CreateRide = () => {
  const [Name, setName] = useState("Parent");
  const [gender, setGender] = useState("Parent");
  const [date, setDate] = useState("Parent");
  const [response, setResponse]= React.useState("");
  const navigation = useNavigation();
  const [travel_date, setTravel_date] = React.useState("");
  const [travel_time, setTravel_time] = React.useState("");
  const [fees, setFees] = React.useState("");
  const [gender_preferences, setGender_preferences] = React.useState("");
  const [car, setCar] = React.useState("");
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination); 
  const [token, setToken] = React.useState("");
  
  async function getToken(){
    let result = await SecureStore.getItemAsync('token');
    setToken (result)
  }
  
 getToken()
  
  const fetchCars=()=>{
    const headers = {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+token,
               }
    axios.post('http://192.168.16.101:8000/api/auth/createRide',
    {
      
      user_car_id: Name,//car id from Dropdown component child
      travel_date: date.toISOString().split('T')[0],
      travel_time: date.toString().split(' ')[4],
      origin_city: origin.description,
      destination_city: destination.description,
      fees: fees,
      gender_preferences:gender
    } ,
    {headers:headers} 

    )
    .then((response) => {
         setResponse("Success! People can now book your ride.")
    })
    .catch((error) =>{
         
      })
      
      
  }

  return (
    <View>
        <Header title="                 Create A Ride"/>
        <DropBtn  Changedata={(Name) => setName(Name)}/> 
        
        
        <GooglePlacesAutocomplete
              placeholder='Where From?'
              styles={toInputBoxStyles}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                }))
                
              }}
              fetchDetails={true}
              returnKeyType={"search"}
              enablePoweredByContainer={false}
              minLength={2}
              query= {{
                key: GOOGLE_MAPS_APIKEY,
                language:'en'
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
           />
              <GooglePlacesAutocomplete
              placeholder='Where To?'
              styles={toInputBoxStyles}
              onPress={(data, details = null) => {
                dispatch(setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }))

              }}
              fetchDetails={true}
              returnKeyType={"search"}
              enablePoweredByContainer={false}
              minLength={2}
              query= {{
                key: GOOGLE_MAPS_APIKEY,
                language:'en'
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
           />
       <TextInput
       style={[tw`mt-4 mb-8 justify-center rounded-xl`,{marginLeft:20,width:336,height:46}]}
       label="Fees"
       value={fees}
       onChangeText={fees => setFees(fees)}
       />
       <RadioBtn Changedata={(gender) => setGender(gender)} />
       <DateTime Changedata={(date) => setDate(date)} />

       <Text style={styles.error}>{response}</Text >
       <Button style={styles.button} mode="contained" onPress={() =>
        fetchCars()
        }>
          Create a Ride
      </Button>
      
    </View>
  )
}

export default CreateRide


const styles = StyleSheet.create({
    button:{
     backgroundColor: "#58BD29",
     marginTop:20,
     width:336,
     marginLeft:20,
    },
    error:{
      color:'green',
      alignSelf:'center'

    }
})

const toInputBoxStyles = StyleSheet.create({
  container: {
      paddingTop: 15,
      flex: 0,
  },
  textInput: {
      backgroundColor: "#DDDDDF",
      borderRadius: 10,
      fontSize: 16,
      
  },
  textInputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 0,

  },

})