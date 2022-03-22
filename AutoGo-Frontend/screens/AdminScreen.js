import * as React from 'react';
import { Searchbar, Button } from 'react-native-paper';
import Header from '../components/Header';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';


const AdminScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);


  return (
   <View>
      <Header />
    <View style={tw`justify-evenly flex-row`}>
      <Button  mode="contained" onPress={() => console.log('Pressed')}>
         Block User
      </Button>

      <Button  mode="contained" onPress={() => console.log('Pressed')}>
         Unblock User
      </Button>

      <Button  mode="contained" onPress={() => console.log('Pressed')}>
         Delete Post
      </Button>
    </View>
    <Searchbar
      style={[tw`mt-4 bg-gray-200 items-center max-w-md mx-auto`,{width:340}]}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  </View>
  );
};

export default AdminScreen;