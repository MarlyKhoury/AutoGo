import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';
import { styles } from "../Styles";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
const LoginScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const[errorMessage, setErrorMessage] = React.useState("");
  const login = async ()=>{

    axios
    .post('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/auth/login',{
      email: email,
      password: password,
  })
    .then(async function (response) {
      // handle success
      let token = response.data.access_token;
      save('token',token)   
        navigation.navigate('HomeScreen')
      
      })
      
   
    .catch(function (error) {
      setErrorMessage(error.response.data.error)
    })
  
  }
  return (
  <SafeAreaView>
    <Text style={[tw`font-bold text-center mt-20 pt-5`,{color:"#58BD29",fontSize:30}]}>AutoGo.</Text>
    <Text style={[tw`text-center font-semibold mt-5`,{color:"#58BD29"}]}>Where You Can Split A Ride</Text>
  <View>
  <View style={styles.TriangleCorner} />
  <View>
  <Text style={tw`text-center`}>{errorMessage && <Text className="error">{errorMessage}</Text >}</Text></View>
    <TextInput
     style={[tw`items-center max-w-md p-2 mx-auto bg-gray-200 rounded-lg`,{width:300,height: 60, marginTop:230,zIndex:1}]}
     placeholder="Email"
     value={email}
     onChangeText={email => setEmail(email)}
    />
    <TextInput
     style={[tw`items-center max-w-md p-2 mx-auto bg-gray-200 rounded-lg`,{width:300,height: 60,zIndex:1,marginTop:10}]}
     placeholder="Password"
     secureTextEntry
     value={password}
     onChangeText={password => setPassword(password)}
    />
    <Button 
    onPress={
      login
    }
    style={[tw`items-center rounded-md mt-4 max-w-md mx-auto`,{zIndex:1, width:300, backgroundColor:'#454545'}]} mode="contained">
        Log In
    </Button>

  <View style={styles.square}/>
  <View style={tw`items-center max-w-md mx-auto flex-row`}>
  <Text style={styles.acctext}>Don't have an account?</Text>
  <TouchableOpacity onPress={() =>
    navigation.navigate('SignupScreen')}><Text style={[tw`pt-2 font-bold`,{color:"#454545"}]}> Sign Up</Text></TouchableOpacity>

</View>
  </View>
 
  </SafeAreaView>
  )
  };


export default LoginScreen

