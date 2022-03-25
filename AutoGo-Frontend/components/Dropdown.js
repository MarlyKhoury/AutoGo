import * as React from 'react';
import { List } from 'react-native-paper';

const DropBtn = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
  
      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="BMW" />
        <List.Item title="Mercedes" />
      </List.Accordion>
    
  );
};

export default DropBtn;