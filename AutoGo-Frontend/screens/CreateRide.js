import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { StyleSheet, Text, View} from 'react-native'
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



const CreateRide = () => {
  const [Name, setName] = useState("Parent");
  const [gender, setGender] = useState("Parent");
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
      travel_date: travel_date,
      travel_time: travel_time,
      origin_city: origin.description,
      destination_city: destination.description,
      fees: fees,
      gender_preferences:gender
    } ,
    {headers:headers} 

    )
    .then((response) => {
         navigation.navigate('HomeScreen')
         console.log(response.data.ride)
    })
    .catch((error) =>{
        console.log(error.response.data)
        console.log(error) 
      })
      
      
  }

  return (
    <View>
        <Header title="                 Create Ride"/>
        <DropBtn  Changedata={(Name) => setName(Name)}/> 
        {/* <Text>{gender}</Text> */}
        <GooglePlacesAutocomplete
              placeholder='Where From?'
              styles={toInputBoxStyles}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                }))
                // console.log(details);

                // dispatch(setDestination(null))
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
        style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336,height:46}]}
        label="Travel Date"
        value={travel_date}
        onChangeText={travel_date => setTravel_date(travel_date)}
        />

        

        <TextInput
        style={[tw`mt-5 justify-center rounded-xl`,{marginLeft:20,width:336,height:46}]}
        label="Travel Time"
        value={travel_time}
        onChangeText={travel_time => setTravel_time(travel_time)}
        />
        <TextInput
        style={[tw`mt-5 mb-8 justify-center rounded-xl`,{marginLeft:20,width:336,height:46}]}
        label="Fees"
        value={fees}
        onChangeText={fees => setFees(fees)}
        />
       <RadioBtn Changedata={(gender) => setGender(gender)} />
       <Button style={styles.button} mode="contained" onPress={() =>
        fetchCars()
        }>
          Create Ride
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
    }
})

const toInputBoxStyles = StyleSheet.create({
  container: {
      // backgroundColor: "white",
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

  }
})