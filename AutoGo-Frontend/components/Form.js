import * as React from 'react';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from "react-native"; 

const MyForm = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
      <>
    <TextInput style={styles.container}
      label="First Name"
      value={firstname}
      onChangeText={firstname => setFirstname(firstname)}
    />

    <TextInput style={styles.container}
      label="Last Name"
      value={lastname}
      onChangeText={lastname => setLastname(lastname)}
    />

    <TextInput style={styles.container}
      label="Email"
      value={email}
      onChangeText={email => setEmail(email)}
    />

    <TextInput style={styles.container}
      label="Password"
      secureTextEntry={true}
      value={password}
      onChangeText={password => setPassword(password)}
  />
{/*  */}
    {/* <TextInput style={styles.container.pass}
      label="Password"
      secureTextEntry
      right={<TextInput.Icon name="eye" />}
    /> */}

    <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
      Log In
    </Button>
</>
    
  );
}
const styles = StyleSheet.create({
  container: {
    height:35,
    paddingTop:1,
    paddingBottom:1,
    padding: 15,
    marginTop:10,
    borderRadius:5,
    backgroundColor: "#eaeaea",
  },

});

export default MyForm;