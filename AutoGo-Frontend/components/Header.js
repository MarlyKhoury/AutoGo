import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View } from "react-native"; 

const MyComponent = () => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Logout');

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content style={styles.account} title="" subtitle="Create Account" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor:"#454545",
    },
    account: {
      color:"#58BD29",
    },
});

export default MyComponent;