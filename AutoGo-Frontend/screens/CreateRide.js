import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { TextInput, Button } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import RadioBtn from '../components/RadioBtn';
import { useNavigation } from '@react-navigation/native';
import DropBtn from '../components/Dropdown';
import { useDispatch } from 'react-redux';
import { selectDestination, setDestination } from '../slices/navSlice';
import { setOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
import axios from 'react-native-axios';
import { useEffect } from 'react'
import { useState } from 'react'



const CreateRide = () => {
  const [Name, setName] = useState("Parent");

  const navigation = useNavigation();
  const [travel_date, setTravel_date] = React.useState("");
  const [travel_time, setTravel_time] = React.useState("");
  const [fees, setFees] = React.useState("");
  const [gender_preferences, setGender_preferences] = React.useState("");
  const [car, setCar] = React.useState("");
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
 
  

  const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjcwLjI4OjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDgzOTc2NTEsImV4cCI6MTY0ODQwMTI1MSwibmJmIjoxNjQ4Mzk3NjUxLCJqdGkiOiJ0cFdodTg5eEViNmZrWDFDIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ZvRIvCyxtEj6ubqgwgpLqNErHarojdGV2EZTcgxTC18'
  const headers = {
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer '+token,
             }

  console.log(car)

  const fetchCars=()=>{
    axios.post('http://192.168.70.28:8000/api/auth/createRide',
    {
      
      user_car_id :Name,//car id from Dropdown component child
      travel_date: travel_date,
      travel_time: travel_time,
      origin_city: origin.description,
      destination_city: destination.description,
      fees: fees,
      gender_preferences:"M"

    } ,
    {headers:headers}

    )
    .then((response) => {
         console.log(response.data.ride)
        // setData(response.data.rides)
        // console.log(origin.description)
        // console.log(destination.description)
    })
    .catch((error) =>{
        console.log(error.response.data)
      })
      
      
  }

  return (
    <View>
        <Header />
        <DropBtn  Changedata={(Name) => setName(Name)}/>
        <Text>{Name}</Text>
        <GooglePlacesAutocomplete
              placeholder='Where From?'
              styles={{
                container: {
                  flex:0,
                },
                textInput:{
                  fontSize:18,
                }

              }}
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
              styles={{
                container: {
                  flex:0,
                },
                textInput:{
                  fontSize:18,
                }

              }}
              onPress={(data, details = null) => {
                dispatch(setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }))
                //  console.log(details.formatted_address);
                // console.log(origin);

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
        style={[tw`mt-20 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Travel Date"
        value={travel_date}
        onChangeText={travel_date => setTravel_date(travel_date)}
        />
        <TextInput
        style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Travel Time"
        value={travel_time}
        onChangeText={travel_time => setTravel_time(travel_time)}
        />
        <TextInput
        style={[tw`mt-3 mb-5 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Fees"
        value={fees}
        onChangeText={fees => setFees(fees)}
        />
       <RadioBtn />
       <Button style={styles.button} mode="contained" onPress={() =>
        
        fetchCars()
        // navigation.navigate('HomeScreen')
        
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