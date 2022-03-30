import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import tw from 'tailwind-react-native-classnames';
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
  let result = await SecureStore.getItemAsync('token');
  console.log(result)
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}
}

export default function App() {
  const [key, onChangeKey] = React.useState('Your key here');
  const [value, onChangeValue] = React.useState('Your value here');

  return (
    <View >
      <Text >Save an item, and grab it later!</Text>
      <Button 
    onPress={
      save('token','123')
      // () => navigation.navigate('HomeScreen')
    }
    style={[tw`items-center rounded-md mt-4 max-w-md mx-auto`,{zIndex:1, width:300, backgroundColor:'#454545'}]} mode="contained">
        'login'
    </Button>

    </View>
  );
}