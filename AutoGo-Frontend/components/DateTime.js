import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';


const DateTime = () => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
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
          mode={'datetime'}
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