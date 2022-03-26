import * as React from 'react';
import { List } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const DropBtn = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
      <List.Accordion
      style={tw`p-1 bg-gray-200`}
        title="Cars"
        left={props => <List.Icon {...props} icon="folder" />}
        // expanded={expanded}
        onPress={handlePress}>
        <List.Item title="BMW" />
        <List.Item title="MERCEDES" />
      </List.Accordion>

  );
};

export default DropBtn;