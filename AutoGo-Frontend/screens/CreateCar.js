import * as React from 'react';
import { TextInput, Text, Button} from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';
// import * as Notifications from "expo-notifications"
// import * as Permissions from "expo-permissions"
import * as Location from 'expo-location';



// import registerNNPushToken, { getPushDataObject } from 'native-notify';
import { useEffect } from 'react';


const CreateCar = () => {

// Show notifications when the app is in the foreground
// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldShowAlert: true,
//     }
//   },
// })





// const triggerLocalNotificationHandler = async () => {

//   // Permission for iOS
//   try{
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       console.log('Permission to access location was denied');
//       return;
//   }
// }
// catch(e){}
//   Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Local Notification",
//       body: "Hello this is a local notification!",
//     },
//     trigger: { seconds: 5 },
//   })
// }





  // registerNNPushToken(2413, 'GdsxWIl5a5Mrg3L2iP5Ldw');


  const navigation = useNavigation();
  const [car_model, setCar_model] = React.useState("");
  const [license_plate, setLicense_plate] = React.useState("");
  const [seats_available, setSeats_available] = React.useState("");
  const [token, setToken] = React.useState("");
  
  async function getToken(){
    let result = await SecureStore.getItemAsync('token');
    setToken(result)
    // return result
  }
getToken()
  // let token= await getToken()
  console.log(token)
  // const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjE2LjEwMTo4MDAwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQ4NTg2NDM0LCJleHAiOjE2NDg1OTAwMzQsIm5iZiI6MTY0ODU4NjQzNCwianRpIjoiN3VZWXcyUDdDaTZ4clRwQiIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.4oDWwpVZbvlRtvpI_0Z65b0zuYU8oiv_kUdt9Gqt6h0'
  const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
  const fetchCars=()=>{
  axios.post('http://192.168.16.102:8000/api/auth/createCar',{
    model: car_model,
    license_plate: license_plate,
    seats_available:seats_available
},  {headers:headers}
)
  .then( function (response) {
    // handle success
     console.log(response.data)
     navigation.navigate('CreateRide')
     
     
    })
    .catch(function (error) {
      console.log(error.response.data)
      console.log(error)
      
  })
}


  return (
      <View>
      <Header
      />
      <TextInput
      style={[tw`mt-5 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="Car Model"
      value={car_model}
      onChangeText={car_model => setCar_model(car_model)}
      />
      <TextInput
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="License Plate"
      value={license_plate}
      onChangeText={license_plate => setLicense_plate(license_plate)}
      />
      <TextInput
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="Seats Available"
      value={seats_available}
      onChangeText={seats_available => setSeats_available(seats_available)}
      />


{/* <Button style={styles.btn} mode="contained" onPress={triggerLocalNotificationHandler}> */}
      
        {/* Send Push
    </Button> */}

      
      <Button style={styles.btn} mode="contained" onPress={() => 
        
          fetchCars()}>
        
          Create Car
      </Button>
      <View style={tw`items-center max-w-md mx-auto flex-row`}>
      <Text style={styles.acctext}>Already have a car?</Text>
      <TouchableOpacity onPress={() =>
    navigation.navigate('CreateRide')}><Text style={[tw`pt-3 font-semibold`,{color:"#58BD29"}]}> Create Ride</Text>
    </TouchableOpacity>
    </View>
      </View>
  );
};

const styles= StyleSheet.create({
  btn:{
    backgroundColor: '#58BD29',
    marginTop:10,
    width:336,
    marginLeft:20,
  },
  acctext:{
    color: "#454545",
    textAlign:"center",
    marginTop:12,
  }
})
  export default CreateCar;