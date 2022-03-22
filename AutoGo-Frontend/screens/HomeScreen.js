import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfilePic from './ProfilePic';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
      <View style={tw`flex-row justify-between`}>
          <Text 
             style={{
                //  width:100, 
                 height:80, 
                marginTop:18,
                marginLeft:5,
                 fontSize:30,
                 color:'#58BD29',
                 fontWeight: '700'
             }}
            //  source={{
            //      uri: "https://links.papareact.com/gzs",
            //  }}
          
          > AutoGo</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfilePic')}>
                    <Icon 
                    style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                    name="user" 
                    color="white" 
                    type="entypo" />
            </TouchableOpacity>
</View>
          {/* <GooglePlacesAutocomplete
              placeholder='Where From?'
              styles={{
                container: {
                  flex:0,
                },
                textInput:{
                  fontSize:18,
                }

              }}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                  // console.log(details);
                }))
                // console.log(location),
                dispatch(setDestination(null))
              }}
              fetchDetails={true}
              returnKeyType={"search"}
              enablePoweredByContainer={false}
              minLength={2}
              query= {{
                key: GOOGLE_MAPS_APIKEY,
                language:'en'
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
           /> */}
          <NavOptions />
          <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})