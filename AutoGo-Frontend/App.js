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
import ImageUpload from "./components/ImageUpload";
// import registerNNPushToken from 'native-notify';
import { useEffect } from "react";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useState } from "react";
import axios from 'react-native-axios';
import * as SecureStore from 'expo-secure-store';




export default function App() {

  const [userId, setUserId] = useState();

  useEffect(()=>{
    fetchUserInfo(); 
    
}, [])


  async function getToken(){
    
    setToken(result)
  } 


  const fetchUserInfo=async ()=>{
    // gettoken()
  const token = await SecureStore.getItemAsync('token');

     const headers = {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+token,
     }
    axios.get('http://192.168.16.102:8000/api/auth/getownInfo',
    {headers:headers},
    )
    .then(function (response) {
      // setData((response.data.profile[0].picture_path))
      // console.log("data user --------------------------------> ", response)
      setUserId(response.data?.user?.id);
    })
    .catch((error) =>{
        console.log(error) 
       
    },
    )} 


  // registerNNPushToken(2413, 'GdsxWIl5a5Mrg3L2iP5Ldw');


  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }



  const Stack = createStackNavigator();
  console.log("user idd app ", userId)

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
          {/* <Stack.Screen 
            name = "Test"
            component={Test} 
            options={{
              headerShown:false,
            }}
            <Stack.Screen 
            name = "Screen"
            component={ImageUpload} 
            options={{
              headerShown:false,
            }}
            />
          /> */}
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
        {/* <Stack.Screen
        // initialParams={{'key':'value'}} 
        userId2={userId}
        
       name = "ProfilePic"
       component={ProfilePic} 
       options={{
         headerShown:false,
        }}
        
       /> */}

<Stack.Screen   name = "ProfilePic"
       options={{
         headerShown:false,
        }}
        >
  {(props) => <ProfilePic {...props}  userId2={userId} />}
</Stack.Screen>



       
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


