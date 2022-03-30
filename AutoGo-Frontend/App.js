import React from "react";
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { store } from "./store";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfilePic from "./screens/ProfilePic";
import CreateCar from "./screens/CreateCar";
import AdminScreen from "./screens/AdminScreen";
import CreateRide from "./screens/CreateRide";
import Test from "./components/Test";
import ImgUpload from "./components/ImageUpload";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
        <Stack.Navigator>

        {/* <Stack.Screen 
          name = "Test"
          component={Test} 
          options={{
            headerShown:false,
          }}
          /> */}

          {/* <Stack.Screen 
         name = "AdminScreen"
         component={AdminScreen} 
         options={{
           headerShown:false,
         }}
         /> */}
          <Stack.Screen 
          name = "LoginScreen"
          component={LoginScreen} 
          options={{
            headerShown:false,
          }}
          />
          <Stack.Screen 
          name = "Screen"
          component={ImgUpload} 
          options={{
            headerShown:false,
          }}
          />
          <Stack.Screen 
            name = "SignupScreen"
            component={SignUpScreen} 
            options={{
              headerShown:false,
            }}
          />
           <Stack.Screen 
          name = "CreateCar"
          component={CreateCar} 
          options={{
            headerShown:false,
          }}
        />
          <Stack.Screen 
          name = "CreateRide"
          component={CreateRide} 
          options={{
            headerShown:false,
          }}
          />
        <Stack.Screen 
       name = "ProfilePic"
       component={ProfilePic} 
       options={{
         headerShown:false,
        }}
        
       />
          <Stack.Screen 
          name = "HomeScreen"
          component={HomeScreen} 
          options={{
            headerShown:false,
          }}
          />
          <Stack.Screen 
          name = "MapScreen"
          component={MapScreen} 
          options={{
            headerShown:false,
          }}
          />
        </Stack.Navigator>

        </KeyboardAvoidingView>
      </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


