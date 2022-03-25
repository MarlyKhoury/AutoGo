import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { TextInput, Button } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import RadioBtn from '../components/RadioBtn';
import { useNavigation } from '@react-navigation/native';
import DropBtn from '../components/Dropdown';





const CreateRide = () => {
  const navigation = useNavigation();
  const [origin_city, setOrigin_city] = React.useState("");
  const [destination_city, setDestination_city] = React.useState("");
  const [travel_date, setTravel_date] = React.useState("");
  const [travel_time, setTravel_time] = React.useState("");
  const [fees, setFees] = React.useState("");
  const [gender_preferences, setGender_preferences] = React.useState("");
 

  return (
    <View>
        <Header />
        <DropBtn />
        <TextInput
        style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Origin City"
        value={origin_city}
        onChangeText={origin_city => setOrigin_city(origin_city)}
        />
        <TextInput
        style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Destination City"
        value={destination_city}
        onChangeText={destination_city => setDestination_city(destination_city)}
        />
        <TextInput
        style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Travel Date"
        value={travel_date}
        onChangeText={travel_date => setTravel_date(travel_date)}
        />
        <TextInput
        style={[tw`mt-3 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Travel Time"
        value={travel_time}
        onChangeText={travel_time => setTravel_time(travel_time)}
        />
        <TextInput
        style={[tw`mt-3 mb-5 justify-center rounded-xl`,{marginLeft:20,width:336}]}
        label="Fees"
        value={fees}
        onChangeText={fees => setFees(fees)}
        />
       <RadioBtn />
       <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('HomeScreen')}>
        Create Ride
      </Button>

      
    </View>
  )
}

export default CreateRide

const styles = StyleSheet.create({
    button:{
     backgroundColor: "#58BD29",
     marginTop:20,
     width:336,
     marginLeft:20,
    }
})