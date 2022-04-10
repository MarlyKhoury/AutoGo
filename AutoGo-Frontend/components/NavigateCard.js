import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { selectOrigin, setOrigin, setDestination } from '../slices/navSlice';



const NavigateCard = () => {
  let [disabled, setDisabled] = React.useState(true);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    const getDataUsingSimpleGetCall = () => {

    }

  return (
      getDataUsingSimpleGetCall(),
    <SafeAreaView style={tw`bg-white flex-1`}>
     
      <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View >
          <GooglePlacesAutocomplete
              placeholder='Where From?'
              styles={toInputBoxStyles}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                  
                }))
                console.log(details.description!=""),

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
           />
             <GooglePlacesAutocomplete 
                placeholder='Where To?'
                styles={toInputBoxStyles}
                fetchDetails={true}
                returnKeyType={"search"}
                minLength={2}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }));

                    let is_disabled=(JSON.stringify(origin.description)!="" && JSON.stringify(details.formatted_address)!="")?false:true
                    setDisabled(is_disabled)
                  

                }}
                enablePoweredByContainer={false}
                query= {{
                    key: GOOGLE_MAPS_APIKEY,
                    language:'en'
                  }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}             
             />
          </View>
         
      </View>
      <View style={tw`mt-auto border-t border-gray-100`}>

          <TouchableOpacity 
          disabled={disabled}
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={[tw` flex-row justify-center  m-4 py-2`,{backgroundColor:"#58BD29"}]}>
              <Icon name="car" type="font-awesome" color="white" size={20}/>
              <Text style={tw`text-white text-base ml-2`}>Search Rides</Text>

          </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 15,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})