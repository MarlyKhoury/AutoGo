import * as React from 'react';
import { TextInput, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import Header from '../components/Header';

import { useNavigation } from '@react-navigation/native';


const CreateCar = () => {
  const navigation = useNavigation();


  const [car_model, setCar_model] = React.useState("");
  const [license_plate, setLicense_plate] = React.useState("");
  const [seats_available, setSeats_available] = React.useState("");

  return (
      <View>
      <Header />
    <TextInput
      label="Car Model"
      value={car_model}
      onChangeText={car_model => setCar_model(car_model)}
      />
      <TextInput
      label="License Plate"
      value={license_plate}
      onChangeText={license_plate => setLicense_plate(license_plate)}
      />
      <TextInput
      label="Seats Available"
      value={seats_available}
      onChangeText={seats_available => setSeats_available(seats_available)}
      />
      
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Create Car
      </Button>
      </View>
  );
};

export default CreateCar;