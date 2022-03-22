import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// const LoginScreen = () => {
//   return (
//     <View>
//       <Text>LoginScreen</Text>
//     </View>
//   )
// }

// export default LoginScreen

// const styles = StyleSheet.create({})

const LoginScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
 
  return (
  <SafeAreaView>
    <Text style={[tw`font-bold text-center mt-20 pt-5`,{color:"#58BD29",fontSize:30}]}>AutoGo.</Text>
    <Text style={[tw`text-center font-semibold mt-5`,{color:"#58BD29"}]}>Where You Can Split a Ride</Text>
  
  <View>
  <View style={styles.TriangleCorner} />
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
    onPress={() => navigation.navigate('HomeScreen')}
    style={[tw`items-center rounded-md mt-4 max-w-md mx-auto`,{zIndex:1, width:300, backgroundColor:'#454545'}]} mode="contained">
        Log In
    </Button>
  <View style={styles.square}/>
  <Text style={styles.acctext}>Don't have an account?<TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}><Text style={[tw`font-bold`,{color:"#454545"}]}> Sign Up</Text></TouchableOpacity></Text>
  </View>
 
  </SafeAreaView>
  )
  };


export default LoginScreen

const styles= StyleSheet.create({
  TriangleCorner: {
    width: 0,
    height: 0,
    position: 'absolute', 
    zIndex: 0 ,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 375,
    borderTopWidth: 180,    
    marginTop: 40,
    borderRightColor: "transparent",
    borderTopColor: "#58BD29",
    transform: [{ rotate: "180deg" }],
  },
  square: {
  marginTop:220,
    width: 400,
    height: 300,
    backgroundColor: "#58BD29",
    position: 'absolute', 
    zIndex: 0 ,
  },

  button:{
    backgroundColor: "#454545",
    marginTop:20,
    width:310,
    marginLeft:20,
    zIndex:1,
    justifyContent:'center',
 },
 acctext:{
  color: "#454545",
  textAlign:"center",
  marginTop:8,
}
});

