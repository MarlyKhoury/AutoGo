import * as React from 'react';
import { TextInput, Text, Button} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import axios from 'react-native-axios';


const CreateCar = () => {
  const navigation = useNavigation();
  const [car_model, setCar_model] = React.useState("");
  const [license_plate, setLicense_plate] = React.useState("");
  const [seats_available, setSeats_available] = React.useState("");

  const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjcwLjI4OjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NDgzOTY4OTUsImV4cCI6MTY0ODQwMDQ5NSwibmJmIjoxNjQ4Mzk2ODk1LCJqdGkiOiJvOTh5d0M1UXZaTVBoQjRBIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FNTS6QEHdSBf1RTI35iKBZ153Rh0kI30bqoN0gCjLek'
  const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
  const fetchCars=()=>{
  axios.post('http://192.168.70.28:8000/api/auth/createCar',{
    model: car_model,
    license_plate: license_plate,
    seats_available:seats_available
}, {headers:headers}
)
  .then( function (response) {
    // handle success
     console.log(response.data)
     navigation.navigate('CreateRide')
     
     
    })
    .catch(function (error) {
      console.log(error.response.data)
      navigation.navigate('CreateRide')//for testing
  })
}


  return (
      <View>
      <Header />
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
      
      <Button style={styles.btn} mode="contained" onPress={() => 
        
          fetchCars()}>
        {/* // navigation.navigate('CreateRide')}> */}
          Create Car
      </Button>
      </View>
  );
};

const styles= StyleSheet.create({
  btn:{
    backgroundColor: '#58BD29',
    marginTop:10,
    width:336,
    marginLeft:20,
  }
})
  export default CreateCar;