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
    
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
    console.log(value)
    setDate(value)
    props.Changedata(value)
  };



  return (
    <View>

      {!isPickerShow && (
        <View style={styles.btnContainer}>
          <Button title="Date/Time Picker" color="black" onPress={showPicker} />
        </View>
      )}

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


const styles = StyleSheet.create({
  
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
  
  datePicker: {
    width: 235,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    
   
  },
});

export default DateTime;