import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const RadioBtn = () => {
  const [value, setValue] = React.useState('first');

  return (
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={tw`flex-row justify-evenly`}>
        <Text>Female</Text>
        <RadioButton.Android value="first" />
     
        <Text>Male</Text>
        <RadioButton.Android value="second" />

        <Text>Other</Text>
        <RadioButton.Android value="third" />

      </View>
    </RadioButton.Group>
  );
};

export default RadioBtn;