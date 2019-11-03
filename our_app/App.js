import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';

// Imports constants
import Colors from './constants/Colors.js';

// Imports all screens
import ConfirmationScreen from './screens/ConfirmationScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import AddClothingScreen from './screens/AddClothingScreen.js';
import WardrobeScreen from './screens/WardrobeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RecommendationScreen from './screens/RecommendationScreen';

import SignupScreen from './screens/SignupScreen.js';
// Imports Components
import Header from './components/Header.js';

// Gets Model Data
import CLOTHING from './data/clothing.js';

const PORTNUMBER = '8080';

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


export default function App() {

  // Keeps track of current screen
  const [currScreen, setCurrScreen] = useState('login');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [clothingImage, setClothingImage] = useState();
  const [images, setImages] = useState([]);
  const [loginWorked, setLoginWorked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [recommendedImage, setRecommendedImage] = useState();


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
  const handleUploadPhoto = async (photo) => {
    setIsFetching(true);
    fetch(`http://localhost:${PORTNUMBER}/app/upload`, {
      method: "POST",
      body: createFormData({
        name: 'file',
        type: photo.uri.split('.').pop(),
        uri:
          photo.uri
      })
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
    setIsFetching(false);
  };

  // Uploads the username for sign up
  const handleSignUp = async (entered_username, entered_password) => {
    setIsFetching(true);
    // Fetches stuff from the database
    fetch(`http://localhost:${PORTNUMBER}/index/db/enroll`, {
      method: "POST",
      body: JSON.stringify({
        username: entered_username,
        password: entered_password
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
    setIsFetching(false);
  };

  // Uploads the username for log in
  const handleLogIn = async (entered_username, entered_password) => {
    setIsFetching(true);
    const bdy = JSON.stringify({
      username: entered_username,
      password: entered_password
    });
    console.log(JSON.parse(bdy));
    // Fetches stuff from the database
    fetch(`http://localhost:${PORTNUMBER}/index/db/login`, {
      method: "POST",
      body: bdy
    })
      .then((response) => {
        console.log("YO");
        console.log(response);
        return response;
      })
      .then(response => {
        console.log("GOT RESPONSE");
        console.log(response);
        console.log(response.JSON());
        // Check For Invalid Login Here
        if (true) {
          setLoginWorked(true)
        } else {
          setLoginWorked(false)
        }
        // End Check for Valid Login
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
    setIsFetching(false);
  };

  // Grabs the wardrobe
  const handleRecommendation = async () => {
    setIsFetching(true);
    // These should be replaced with stuff that gets passed into the function
    const temperature = 45;
    const type_cloth = 'casual';

    fetch(`http://localhost:${PORTNUMBER}/app/recommend`, {
      method: "POST",
      body: {
        temp: temperature,
        type: type_cloth
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });

    setIsFetching(false);
  }
  // ######################################END UPLOADING TO SERVER STUFF#####################################




  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  const postLoginInfo = async (username, password) => {
    console.log(username);
    console.log(password);
    handleLogIn(username, password);
  }

  const postSignupInfo = (username, password, confirmPassword) => {
    console.log(username);
    console.log(password);
    handleSignUp(username, password);
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
  const toRecommend = () => {
    handleRecommendation();
    setCurrScreen('recommend');
  }
  const toWard = () => {
    setCurrScreen('wardrobe');
    console.log("Cheeks");
  }

  // Image Handler Function
  async function imageTakenHandler(imagePath) {
    setIsFetching(true);
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
    setIsFetching(false);
    handleUploadPhoto(imagePath);
  };

  // Image Handler Function
  async function sendUsername() {
    setIsFetching(true);
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
    setIsFetching(false);
  };


  // This logic sets the current screen
  if (currScreen === 'home') {
    content = (
      // eventually pass wardrobe in
      <HomeScreen toClothing={toPickClothing} toWardrobe={toWard} toRecommend={toRecommend} toLogin={toLogin} toSignUp={toSignup} />
    );
  } else if (currScreen === 'add-clothing') {
    content = (
      <AddClothingScreen onImageTaken={imageTakenHandler} />
    );
    headerContent = <Header onPress={toHome} />;
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
      <LoginScreen postLoginInfo={postLoginInfo} toSignup={toSignup} toHome={toHome} />
    );
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === 'recommend') {
    content = (
      <RecommendationScreen />
    );
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === 'signup') {
    content = (
      <SignupScreen postSignupInfo={postSignupInfo} toHome={toHome} />
    );
  }

  // Returns App Component
  if (isFetching) {
    return <ActivityIndicator size='large' color={Colors.primary} />;
  }
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
