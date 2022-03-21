import * as React from 'react';
import { TextInput, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';


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
       <Button style={styles.button} icon="camera" mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Sign Up
      </Button>
      <Text>Already have an account?</Text><Text>Login</Text>
      </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  button:{
     backgroundColor: "#454545",
  }
})