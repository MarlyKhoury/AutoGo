import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
import { setOrigin } from '../slices/navSlice';
import axios from 'react-native-axios';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    // console.log(origin)


    let result = []
    const getSenderRec = (user1, user2) => {
      ride.filter(rides => {
            if (user1 === rides.gender_preferences && user2 === response.data.rides.gender ){
                    result.push(response.data.rides)
                }
            }   
        )
    }

    const getDataUsingSimpleGetCall = () => {
      const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY0Nzk0NTQ3OCwiZXhwIjoxNjQ3OTQ5MDc4LCJuYmYiOjE2NDc5NDU0NzgsImp0aSI6IjFlZUZyZmtpSmF4VW91TE8iLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qBVJWTSjPTr2JFqL7le_EfkdBOe7XmJq5HZA4FKZe2c'); 
      axios
        .get('http://192.168.16.103:8000/api/auth/getRides',{ headers: { Authorization: AuthStr} })
        .then(function (response) {
          // handle success
          console.log("ello")
          console.log(JSON.stringify(response.data.rides));
          let ride= response.data.rides
          ride.filter(ride=>{
            if ("female" === rides.gender_preferences ){
                    console.log(response.data.rides)
                }
            } ) 
          // getSenderRec('female', 'female')
        })
        .catch(function (error) {
          // handle error
          console.log("i am error")
          console.log(JSON.stringify(error.message));
        })
      }

  return (
      getDataUsingSimpleGetCall(),
    <SafeAreaView style={tw`bg-white flex-1`}>
      {/* <Text style={tw`text-center py-5 text-xl`}>Good Morning</Text> */}
      <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View >
          <GooglePlacesAutocomplete
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
                    navigation.navigate("RideOptionsCard");
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
          <NavFavourites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>

          <TouchableOpacity 
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
              <Icon name="car" type="font-awesome" color="white" size={16}/>
              <Text style={tw`text-white text-center`}>Rides</Text>

          </TouchableOpacity>

          <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
              <Icon name="fast-food-outline" type="ionicon" color="black" size={16}/>
              <Text style={tw`text-center`}>Eats</Text>

          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
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