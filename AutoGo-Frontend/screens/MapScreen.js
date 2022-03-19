import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const MapSreen = () => {
  return (
    <View>
      <Text>Here is the Map stuff ...</Text>
      <View style={tw`h-1/2`}></View>

      <View style={tw`h-1/2`}></View>
    </View>
  )
}

export default MapSreen

const styles = StyleSheet.create({})