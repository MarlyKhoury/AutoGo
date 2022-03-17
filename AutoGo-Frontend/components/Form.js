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


export default MyForm;