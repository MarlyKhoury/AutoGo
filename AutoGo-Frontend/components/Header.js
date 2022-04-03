import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Header = ({title=""},{onPress={}}) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={onPress} />
      <Appbar.Content title={title} subtitle="" />
      <Appbar.Action  />
      <Appbar.Action />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  header:{
      backgroundColor: "#58BD29",
  }
})