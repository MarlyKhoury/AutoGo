import * as React from 'react';
import { TextInput, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';


const SignUpScreen = () => {
  const navigation = useNavigation();


  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
      <View>
      <Header />
      <TextInput
      style={tw`mt-5`}
      label="First Name"
      value={first_name}
      onChangeText={first_name => setFirst_name(first_name)}
      />
      <TextInput
      style={tw`mt-3`}
      label="Last Name"
      value={last_name}
      onChangeText={last_name => setLast_name(last_name)}
      />
      <TextInput
      style={tw`mt-3`}
      label="Gender"
      value={gender}
      onChangeText={gender => setGender(gender)}
      />
      <TextInput
      style={tw`mt-3`}
      label="Phone Number"
      value={phone_number}
      onChangeText={phone_number => setPhone_number(phone_number)}
      />
      <TextInput
      style={tw`mt-3`}
      label="Email"
      value={email}
      onChangeText={email => setEmail(email)}
      />
      <TextInput
      style={tw`mt-3`}
      label="Password"
      secureTextEntry
      value={password}
      onChangeText={password => setPassword(password)}
      />
       <Button style={styles.button} icon="camera" mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Sign Up
      </Button>
      <Text style={styles.acctext}>Already have an account?<Text>Log In</Text></Text>
      </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  button:{
     backgroundColor: "#454545",
     marginTop:12,
  },
  acctext:{
    color: "#58BD29",
    textAlign:"center"
  }
})