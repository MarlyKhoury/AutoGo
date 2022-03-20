import * as React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { View } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';


const CreateCar = () => {
  const navigation = useNavigation();


  const [Car_model, setCar_model] = React.useState("");
  const [license_plate, setLicense_plate] = React.useState("");
  const [seats_available, setSeats_available] = React.useState("");

  return (
      <View>
      <Header />
    <TextInput
      label="First Name"
      value={first_name}
      onChangeText={first_name => setFirst_name(first_name)}
      />
      <TextInput
      label="Last Name"
      value={last_name}
      onChangeText={last_name => setLast_name(last_name)}
      />
      <TextInput
      label="Gender"
      value={gender}
      onChangeText={gender => setGender(gender)}
      />
      <TextInput
      label="Phone Number"
      value={phone_number}
      onChangeText={phone_number => setPhone_number(phone_number)}
      />
      <TextInput
      label="Email"
      value={email}
      onChangeText={email => setEmail(email)}
      />
      <TextInput
      label="Password"
      secureTextEntry
      value={password}
      onChangeText={password => setPassword(password)}
      />
      <Button 
       onPress={() => navigation.navigate("LoginScreen")}
      />
      <Text>Already have an account?</Text><Text>Login</Text>
      </View>
  );
};

export default CreateCar;