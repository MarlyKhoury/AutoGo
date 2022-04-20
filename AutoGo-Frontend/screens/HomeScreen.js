import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { styles } from "../Styles";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
      <View style={tw`flex-row justify-between`}>
          <Text 
          style ={styles.autogo_text}
          
          > AutoGo</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfilePic')}>
                    <Icon 
                    style={[tw`p-2 rounded-full w-10 mt-4`,{backgroundColor:"#58BD29"}]}
                    name="user" 
                    color="white" 
                    type="entypo" />
            </TouchableOpacity>
</View>
          
          <NavOptions />
          <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

