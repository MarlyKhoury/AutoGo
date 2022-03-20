import * as React from 'react';

import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import Header from '../components/Header';

const SignUpScreen = () => {
  const [text, setText] = React.useState("");

  return (
      <View>
      <Header />
    <TextInput
      label="First Name"
      value={text}
      onChangeText={text => setText(text)}
      />
      <TextInput
      label="Last Name"
      value={text}
      onChangeText={text => setText(text)}
      />
      <TextInput
      label="Gender"
      value={text}
      onChangeText={text => setText(text)}
      />
      <TextInput
      label="Phone Number"
      value={text}
      onChangeText={text => setText(text)}
      />
      <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
      />
      <TextInput
      label="Password"
      value={text}
      onChangeText={text => setText(text)}
      />
      </View>
  );
};

export default SignUpScreen;