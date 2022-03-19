import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'



const RideOptionsCard = () => {
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
            <TouchableOpacity>
                <Icon name="chevron-left" type="fontawesome" />

            </TouchableOpacity>
      <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})