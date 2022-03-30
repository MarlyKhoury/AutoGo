import * as React from 'react';
import { TextInput, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import RadioBtn from '../components/RadioBtn';
import {value} from '../components/RadioBtn'




const SignUpScreen = () => {
  const navigation = useNavigation();

  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const signUp =() =>{
    axios 
    .post('http://192.168.16.102:8000/api/auth/register',{

      first_name :first_name,
      last_name: last_name,
      gender: gender,
      phone_number: phone_number,
      email: email,
      password: password,
     
  })
   .then((response) => {
    setErrorMessage('')
     navigation.navigate('LoginScreen')
    
   })
   .catch(function (error) {
    if(error.message=='Request failed with status code 410'){
    let first_name_err= error.response.data.first_name==undefined?'':error.response.data.first_name
    let last_name_err= error.response.data.last_name==undefined?'':error.response.data.last_name
    let phone_number_err= error.response.data.phone_number==undefined?'':error.response.data.phone_number
    let gender_err= error.response.data.gender==undefined?'':error.response.data.gender
    let email_err= error.response.data.email==undefined?'':error.response.data.email
    let password_err= error.response.data.password==undefined?'':error.response.data.password
    setErrorMessage(first_name_err+last_name_err+phone_number_err+gender_err+email_err+password_err) 
    }
    else {
      setErrorMessage('An error occured. Please try again later')
      console.log(error)
    }
  }) 
  }

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
      <RadioBtn />
      <View>
  <Text>{errorMessage && <Text className="error">{errorMessage}</Text >}</Text></View>
      <Button style={styles.button} mode="contained" onPress={signUp}>
        Sign Up
      </Button>
      <Text style={styles.acctext}>Already have an account?<TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} ><Text style={[tw`font-bold`,{color:"#58BD29"}]}> Log In</Text></TouchableOpacity></Text>
      </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  button:{
     backgroundColor: "#58BD29",
     marginTop:20,
     width:336,
     marginLeft:20,
  },
  acctext:{
    color: "#454545",
    textAlign:"center",
    marginTop:8,
  }
})