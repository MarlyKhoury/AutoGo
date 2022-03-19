import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';


const data = [
{
    id: "123",
    title: "Get a Ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
},
{
    id: "456",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "EatScreen",
},
];

const NavOptions = () => {
  return (
    <FlatList 
       data={data}
       keyExtractor={(item) => item.id}
       horizontal
       renderItem={({ item }) => (
           <TouchableOpacity>
               <Text>{item.title}</Text>
           </TouchableOpacity>
       )}
       
    
    />
  )
}

export default NavOptions

const styles = StyleSheet.create({})