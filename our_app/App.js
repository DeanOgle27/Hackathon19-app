import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import Colors from './constants/Colors.js';

// Imports all screens
import ConfirmationScreen from './screens/ConfirmationScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import AddClothingScreen from './screens/AddClothingScreen.js';
import WardrobeScreen from './screens/WardrobeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import SignupScreen from './screens/SignupScreen.js';
// Imports Components
import Header from './components/Header.js';

// Gets Model Data
import CLOTHING from './data/clothing.js';

// In future will get stuff from server
const getWardrobe = () => {
  return CLOTHING;
}

const fetchFonts = () => {
  return Font.loadAsync({
    'blackjack': require('./assets/fonts/blackjack.otf'),
    'fira-sans-bold': require('./assets/fonts/FiraSans-Bold.otf'),
    'fira-sans-bold': require('./assets/fonts/FiraSans-BoldItalic.otf'),
  });
};

// Declares content variable
let content;
let headerContent;

// ######################################UPLOADING TO SERVER STUFF#####################################
// Creates form data from an image
const createFormData = (photo) => {
  const data = new FormData();

  data.append("photo", {
    name: 'file',
    type: photo.uri.split('.').pop(),
    uri:
      photo.uri
  });

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
  const [currScreen, setCurrScreen] = useState('login');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [clothingImage, setClothingImage] = useState();
  const [images, setImages] = useState([]);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  const postLoginInfo = (username, password) => {
    console.log(username);
    console.log(password);
  }

  const postSignupInfo = (username, password, confirmPassword) => {
    console.log(username);
    console.log(password);
    console.log(confirmPassword);
  }

  const toHome = () => {
    setCurrScreen('home');
  }

  const toPickClothing = () => {
    setCurrScreen('add-clothing');
  }
  const toConf = () => {
    setCurrScreen('confirmation');
  }
  const toLogin = () => {
    setCurrScreen('login');
  }
  const toSignup = () => {
    setCurrScreen('signup');
  }

  // Image Handler Function
  async function imageTakenHandler(imagePath) {
    setSelectedImage(imagePath);

    // Grabs the name of the picture (the filename will be something like 'file/foldera/folderb/img/temp/image23452.jpg', this grabs 'image23452.jpg')
    const imageName = imagePath.split('/').pop();
    const newImagePath = FileSystem.documentDirectory + imageName;

    // Tries to move the image into the file system
    try {
      await FileSystem.moveAsync({
        from: clothingImage,
        to: newImagePath
      });
    } catch (err) {
      // If there's a problem, it opens an alert
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
  if (currScreen === 'home') {
    content = (
      // eventually pass wardrobe in
      <HomeScreen pickClothing={toPickClothing} />
    );
  } else if (currScreen === 'add-clothing') {
    content = (
      <AddClothingScreen onImageTaken={imageTakenHandler} />
    );
    headerContent = <Header onPress={() => console.log("Hello")} />;
  } else if (currScreen === 'confirmation') {
    content = (
      <ConfirmationScreen onConfirm={toHome} />
    );
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen == 'wardrobe') {
    content = (
      <WardrobeScreen loadWardrobe={getWardrobe} />
    );
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === 'login') {
    content = (
      <LoginScreen postLoginInfo={postLoginInfo} toSignup = {toSignup} toHome = {toHome}/>
    );
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === 'signup') {
    content = (
      <SignupScreen postSignupInfo = {postSignupInfo} toHome = {toHome}/>
    );
  }

  // Returns App Component
  return (
    <View style={styles.screen}>
      {headerContent}
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
