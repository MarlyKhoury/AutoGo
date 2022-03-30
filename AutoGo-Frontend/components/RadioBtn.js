import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const RadioBtn = (props) => {
  const [value, setValue] = React.useState('first');

  return (
    <RadioButton.Group onValueChange={newValue => {setValue(newValue),props.Changedata(newValue)}} value={value}>
      <View style={tw`flex-row justify-evenly`}>
        <Text>Female</Text>
        <RadioButton.Android value="F" />
        <Text>Male</Text>
        <RadioButton.Android value="M" />

        <Text>Other</Text>
        <RadioButton.Android value="OTHER" />

      </View>
    </RadioButton.Group>
  );
};

export default RadioBtn;