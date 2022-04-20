import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({


autogo_text:{
    height:80, 
        marginTop:18,
        marginLeft:5,
         fontSize:30,
         color:'#58BD29',
         fontWeight: '700'
},
button:{
    backgroundColor: "#58BD29",
    marginTop:12,
    width:336,
    marginLeft:20,
 },
 acctext:{
   color: "#454545",
   textAlign:"center",
   marginTop:8,
 },
 error:{
   color:'red'
 },

 TriangleCorner: {
    width: 0,
    height: 0,
    position: 'absolute', 
    zIndex: 0 ,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 375,
    borderTopWidth: 180,    
    marginTop: 40,
    borderRightColor: "transparent",
    borderTopColor: "#58BD29",
    transform: [{ rotate: "180deg" }],
  },
  square: {
  marginTop:220,
    width: 400,
    height: 300,
    backgroundColor: "#58BD29",
    position: 'absolute', 
    zIndex: 0 ,
  },

  button_login:{
    backgroundColor: "#454545",
    marginTop:20,
    width:310,
    marginLeft:20,
    zIndex:1,
    justifyContent:'center',
 },
  acctext:{
    color: "#454545",
    textAlign:"center",
    marginTop:8,
},
post_button:{
        backgroundColor: "#58BD29",
        marginBottom:30,
        width: 90,
        height:39,
        marginTop: 15,
        borderRadius: 8,
        marginLeft:6,   
     
     },

     ride_button:{
        backgroundColor: "#58BD29",
        marginTop:20,
        width:336,
        marginLeft:20,
       },
       error:{
         color:'green',
         alignSelf:'center'
   
       },
       btn:{
        backgroundColor: '#58BD29',
        marginTop:10,
        width:336,
        marginLeft:20,
      },
      acctext:{
        color: "#454545",
        textAlign:"center",
        marginTop:12,
      },
      screen: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      buttonContainer: {
        width: 260,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:250,
        
      },
      imageContainer: {
        padding: 30,
      },
      image: {
        width: 400,
        height: 300,
        resizeMode: 'cover'
      }
});
export { styles }