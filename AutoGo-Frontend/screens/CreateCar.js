import * as React from 'react';
import { TextInput, Text, Button} from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { useEffect } from 'react';


const CreateCar = () => {

  const navigation = useNavigation();
  const [car_model, setCar_model] = React.useState("");
  const [license_plate, setLicense_plate] = React.useState("");
  const [seats_available, setSeats_available] = React.useState("");
  const [token, setToken] = React.useState("");
  
  async function getToken(){
    let result = await SecureStore.getItemAsync('token');
    setToken(result)
    
  }
getToken()
 
  console.log(token)
  
  const headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
  const fetchCars=()=>{
  axios.post('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/user/createCar',{
    model: car_model,
    license_plate: license_plate,
    seats_available:seats_available
},  {headers:headers}
)
  .then( function (response) {
     navigation.navigate('CreateRide')
     
     
    })
    .catch(function (error) {      
  })
}


  return (
      <View>
      <Header title="                   Save A Car"
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
      
      <Button style={styles.btn} mode="contained" onPress={() => 
        
          fetchCars()}>
        
          Save A Car
      </Button>
      <View style={tw`items-center max-w-md mx-auto flex-row`}>
      <Text style={styles.acctext}>Already have a car?</Text>
      <TouchableOpacity onPress={() =>
    navigation.navigate('CreateRide')}><Text style={[tw`pt-3 font-semibold`,{color:"#58BD29"}]}> Create a Ride</Text>
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