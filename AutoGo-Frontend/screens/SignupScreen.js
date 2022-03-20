import * as React from 'react';

import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import Header from '../components/Header';

const SignUpScreen = () => {
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
      </View>
  );
};

export default SignUpScreen;