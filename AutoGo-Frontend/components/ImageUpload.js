import React, { useState } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';


function ImageUpload() {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');
  const[profileImageURL,setProfileImageURL] = useState('');
  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  }

  const uploadimg = async (uri_img) => {
    
    const data_url = new FormData(); 
    data_url.append('picture_path', uri_img);
    const token = await SecureStore.getItemAsync('token');

    fetch('http://ec2-3-89-74-59.compute-1.amazonaws.com:3000/api/user/uploadImg', {
      method: 'post',
      body: data_url,
      headers : {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token,
    }
    })
      .then((res) => res.json())
      .then((dataa) => {
      
      });
  };

  
  const handleUpload =  () => {
    let Image = {
      uri: pickedImagePath,
      type: `${pickedImagePath.split('.')[1]}`,
      name: `${pickedImagePath.split('.')[1]}`,
    };
    const data = new FormData(); 
    data.append('file', Image);
    data.append('upload_preset', 'e0bwupcg');
    data.append('cloud_name', 'dnqrcc1h6');
    fetch('https://api.cloudinary.com/v1_1/dnqrcc1h6/image/upload', {
      method: 'post',
      body: data,
       
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileImageURL(data.secure_url);
      
        console.log(data.secure_url)
        uploadimg(data.secure_url)
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={handleUpload} title="Upload Image" />
        
      </View>
    </View>
  );
}

export default ImageUpload;



const styles = StyleSheet.create({
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