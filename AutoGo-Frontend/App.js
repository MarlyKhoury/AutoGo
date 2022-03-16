import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';

// Set up redux

export default function App() {
  return (
    <Provider store={}>
    <View style={styles.container}>
      <Text>Let's build AutoGo!</Text> 
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
