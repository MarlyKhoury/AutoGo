import * as React from 'react';
import { TextInput, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="First Name"
      value={first_name}
      onChangeText={first_name => setFirst_name(first_name)}
      />
      <TextInput
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="Last Name"
      value={last_name}
      onChangeText={last_name => setLast_name(last_name)}
      />
      <TextInput
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="Gender"
      value={gender}
      onChangeText={gender => setGender(gender)}
      />
      <TextInput
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="Phone Number"
      value={phone_number}
      onChangeText={phone_number => setPhone_number(phone_number)}
      />
      <TextInput
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="Email"
      value={email}
      onChangeText={email => setEmail(email)}
      />
      <TextInput
      style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
      label="Password"
      secureTextEntry
      value={password}
      onChangeText={password => setPassword(password)}
      />
      <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Sign Up
      </Button>
      <Text style={styles.acctext}>Already have an account?<TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} ><Text style={[tw`font-bold`,{color:"#58BD29"}]}> Log In</Text></TouchableOpacity></Text>
      </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  button:{
     backgroundColor: "#454545",
     marginTop:20,
     width:336,
     marginLeft:20,
  },
  acctext:{
    color: "#58BD29",
    textAlign:"center",
    marginTop:8,
  }
})