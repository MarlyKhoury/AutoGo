import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';


const data = [
    {
        id: "123",
        icon: "user",
        location: "Profile",
        destination: "Press to go to your profile page",
        screen:"ProfilePic",
    },
    {
        id: "456",
        icon: "logout",
        location: "Logout",
        destination: "Press to logout from the application",
        screen:"LoginScreen",

        }

];

const NavFavourites = () => {
    const navigation = useNavigation();
  return <FlatList 
  data = {data} 
  keyExtractor={(item) => item.id} 
  ItemSeparatorComponent={() =>(
      <View 
        style={[tw`bg-gray-200`, {height: 0.5}]}
      />
  )}
  renderItem={({item: { location, destination, icon },item}) =>(
      <TouchableOpacity 
          onPress={() => navigation.navigate(item.screen)}
      style={tw`flex-row items-center p-5`}>
          <Icon 
             style={tw`mr-4 rounded-full bg-gray-300 p-3`}
             name={icon}
             type="antdesign"
             color="white"
             size={18}
           
          
             />
          <View>
              <Text 
              style={tw`font-semibold text-lg`}>{location}</Text>
              
              <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>

      </TouchableOpacity>
  ) } />;
};

export default NavFavourites

const styles = StyleSheet.create({})