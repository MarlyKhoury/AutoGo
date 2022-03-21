import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';

// const LoginScreen = () => {
//   return (
//     <View>
//       <Text>LoginScreen</Text>
//     </View>
//   )
// }

// export default LoginScreen

// const styles = StyleSheet.create({})

const LoginScreen = () => {
 
  return (
  <SafeAreaView>
    <Text style={[tw`font-bold text-center mt-20 pt-5`,{color:"#58BD29",fontSize:30}]}>AutoGo.</Text>
    <Text style={[tw`text-center font-semibold mt-5`,{color:"#58BD29"}]}>Where You Can Split a Ride</Text>
  <View style={[styles.TriangleCorner]} />
  </SafeAreaView>
  )
  };


export default LoginScreen

const styles= StyleSheet.create({
  TriangleCorner: {
    width: 0,
    height: 0,
   
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 375,
    borderTopWidth: 430,
    
    
    marginTop: 50,
    borderRightColor: "transparent",
    borderTopColor: "#58BD29",
    transform: [{ rotate: "180deg" }],
  },
});

