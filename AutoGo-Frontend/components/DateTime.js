import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';


const DateTime = (props)  => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState("2022-01-02T09:01:01.000Z");
  const [trav_date, setTrav_date] = useState("");
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = ( event,value) => {
    // const travel_date = value.toISOString().split('T')[0]
    // const travel_time = value.toString().split(' ')[4]
    
    // console.log(typeof(travel_date))
    // console.log(typeof(travel_time))

    // setTrav_date(travel_date)
    // console.log(trav_date)
    // console.log(value)
    
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
    console.log(value)
    setDate(value)
    props.Changedata(value)
  };

  

        


  return (
    <View style={styles.container}>
      {/* Display the selected date */}
      {/* <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>{date.toUTCString()}</Text>
      </View> */}

      {/* The button that used to trigger the date picker */}
      {!isPickerShow && (
        <View style={styles.btnContainer}>
          <Button title="Date/Time Picker" color="black" onPress={showPicker} />
        </View>
      )}

      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          value={date}

          mode='datetime'
          display={Platform.OS === 'ios' ? 'calendar' : 'default'}
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
         
        />
      )}
    </View>
  );
       
};

// Kindacode.com
// just add some styles to make our app look more beautiful
// This is not the focus of this article
const styles = StyleSheet.create({
  container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//     padding: 50,
    // marginTop: -60,
   
  },
  pickedDateContainer: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop:5,
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
  btnContainer: {
    marginLeft: -195,
    marginTop:20,
  },
  // This only works on iOS
  datePicker: {
    width: 235,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    
   
  },
});

export default DateTime;