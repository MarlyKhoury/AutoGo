import React, { useState } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


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
      console.log(result.uri);//test hay chway ma3am tbayen l picker aslan 
    }
  }

  
  const handleUpload = () => {
    let Image = {
      uri: pickedImagePath,
      type: `${pickedImagePath.split('.')[1]}`,
      name: `${pickedImagePath.split('.')[1]}`,
    };
    const data = new FormData(); 
    data.append('file', Image);
    console.log(data);
    data.append('upload_preset', 'e0bwupcg');
    data.append('cloud_name', 'dnqrcc1h6');
    fetch('https://api.cloudinary.com/v1_1/dnqrcc1h6/mark/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileImageURL(data.secure_url);

        console.log(data.secure_url)
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={handleUpload} title="Open camera" />
        
      </View>

      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />
        }
      </View>
    </View>
  );
}

export default ImageUpload;


// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  }
});