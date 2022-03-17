import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import { store } from './store';
import MyComponent from './components/Header';
import MyForm from './components/Form';
// Set up redux

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <MyComponent />
      <MyForm />
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
