import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Header from './components/Header.js';


// Imports constants
import Colors from './constants/Colors.js';


// Imports all screens
import WelcomeScreen from './screens/WelcomeScreen.js';

// Declares content variable
let content;

// ######################################UPLOADING TO SERVER STUFF#####################################
// Creates form data from an image
const createFormData = (photo) => {
  const data = new FormData();

  data.append("photo", {
    name: 'file',
    type: 'image',
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  // Object.keys(body).forEach(key => {
  //   data.append(key, body[key]);
  // });

  return data;
};

// Uploads the photo
handleUploadPhoto = (photo) => {
  fetch("http://localhost:3000/api/upload", {
    method: "POST",
    body: createFormData(photo, { userId: "123" })
  })
    .then(response => response.json())
    .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
};
// ######################################END UPLOADING TO SERVER STUFF#####################################


export default function App() {

  // Keeps track of current screen
  const [currScreen, setCurrScreen] = useState('home');
  const [clothingImage, setClothingImage] = useState();

  // Image Handler Function
  async function imageTakenHandler(imagePath) {
    setSelectedImage(imagePath);

    // Grabs the name of the picture (the filename will be something like 'file/foldera/folderb/img/temp/image23452.jpg', this grabs 'image23452.jpg')
    const imageName = imagePath.split('/').pop();
    const newImagePath = FileSystem.documentDirectory + imageName;

    try {
      await FileSystem.moveAsync({
        from: clothingImage,
        to: newImagePath
      });
    } catch (err) {
      Alert.alert(
        'Error Saving Image',
        'Big Oof',
        [
          {
            text: 'OK',
            style: 'cancel'
          },
        ],
        { cancelable: false },
      );
      console.log(err);
    }
  };


  // This logic sets the current screen
  if (currScreen == 'home') {
    content = (
      <WelcomeScreen onImageTaken={imageTakenHandler} />
    );
    headerContent = <Header />;
    //footerContent = <EmptyFooter />;
  }


  // Returns App Component
  return (
    <View style={styles.screen}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
