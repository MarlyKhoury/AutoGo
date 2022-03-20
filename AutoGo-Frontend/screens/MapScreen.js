import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

const MapSreen = () => {
  const Stack = createStackNavigator();
  return (
    <View>
      <TouchableOpacity>
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen 
             name = "NavigateCard"
             component={NavigateCard}
             options = {{
               headerShown: false,
             }}  
          />
          <Stack.Screen 
             name = "RideOptionsCard"
             component={RideOptionsCard}
             options = {{
               headerShown: false,
             }}  
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapSreen

const styles = StyleSheet.create({})