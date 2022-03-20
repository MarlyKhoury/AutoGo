import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import Header from '../components/Header';

const AdminScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
      <View>
      <Header />
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    </View>
  );
};

export default AdminScreen;