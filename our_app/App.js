import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";

// Imports constants
import Colors from "./constants/Colors.js";

// Imports all screens
import ConfirmationScreen from "./screens/ConfirmationScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import AddClothingScreen from "./screens/AddClothingScreen.js";
import WardrobeScreen from "./screens/WardrobeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RecommendationScreen from "./screens/RecommendationScreen";

import SignupScreen from "./screens/SignupScreen.js";
// Imports Components
import Header from "./components/Header.js";

// Gets Model Data
import CLOTHING from "./data/clothing.js";

const SERVERURL = "172.20.10.3";
const PORTNUMBER = "8080";

const fetchFonts = () => {
  return Font.loadAsync({
    blackjack: require("./assets/fonts/blackjack.otf"),
    "fira-sans-bold": require("./assets/fonts/FiraSans-Bold.otf"),
    "fira-sans-bold": require("./assets/fonts/FiraSans-BoldItalic.otf")
  });
};

// Declares content variable
let content;
let headerContent;

export default function App() {
  // Keeps track of current screen
  const [currScreen, setCurrScreen] = useState("login");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [clothingImage, setClothingImage] = useState();
  const [images, setImages] = useState([]);
  const [loginWorked, setLoginWorked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [recommendedImage, setRecommendedImage] = useState();

  // ######################################UPLOADING TO SERVER STUFF#####################################
  // Creates form data from an image
  const createFormData = photo => {
    const data = new FormData();
    data.append("photo", {
      name: "file",
      type: `.${photo.uri.split(".").pop()}`,
      uri: photo.uri
    });
    return data;
  };

  // Uploads the photo
  const handleUploadPhoto = async photo => {
    console.log("before");
    setIsFetching(true);
    console.log("after");
    const data = createFormData({
      name: "file",
      type: photo.uri.split(".").pop(),
      uri: photo.uri
    });
    console.log(data);
    console.log(`Uploading photo as ${data._parts}`);
    fetch(`http://${SERVERURL}:${PORTNUMBER}/app/upload`, {
      method: "POST",
      body: {}
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload success", response);
        alert("Upload success!");
      })
      .catch(error => {
        console.log(error);
        alert("Whoops! We ran into a problem");
      });
    setIsFetching(false);
  };

  // Uploads the username for sign up
  const handleSignUp = async (username, password) => {
    setIsFetching(true);
    // Fetches stuff from the database
    fetch(`http://${SERVERURL}:${PORTNUMBER}/db/enroll`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        alert(error + "\nWhoops! We ran into a problem.");
      });
    setIsFetching(false);
  };

  // Uploads the username for log in
  const handleLogIn = async (username, password) => {
    setIsFetching(true);
    // Fetches stuff from the database
    try {
      const response = await fetch(
        `http://${SERVERURL}:${PORTNUMBER}/db/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  };

  // Grabs the wardrobe based on recommendation
  const handleRecommendation = async () => {
    setIsFetching(true);
    // These should be replaced with stuff that gets passed into the function
    const temp = "45";
    const style = "casual";
    const user = "1";

    fetch(`http://${SERVERURL}:${PORTNUMBER}/app/recommend`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        temp,
        style,
        user
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        alert("Whoops! Something went wrong on our end.");
      });

    setIsFetching(false);
  };

  // Grabs the wardrobe based on recommendation
  const handleWardrobe = async () => {
    setIsFetching(true);

    fetch(`http://${SERVERURL}:${PORTNUMBER}/db/dump`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        alert("Whoops! Something went wrong on our end.");
      });

    setIsFetching(false);
  };
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
    handleLogIn(username, password);
  };

  const postSignupInfo = (username, password, confirmPassword) => {
    handleSignUp(username, password);
  };

  const toHome = () => {
    setCurrScreen("home");
  };
  const toPickClothing = () => {
    setCurrScreen("add-clothing");
  };
  const toConf = () => {
    setCurrScreen("confirmation");
  };
  const toLogin = () => {
    setCurrScreen("login");
  };
  const toSignup = () => {
    setCurrScreen("signup");
  };
  const toRecommend = () => {
    handleRecommendation();
    setCurrScreen("recommend");
  };
  const toWard = () => {
    setCurrScreen("wardrobe");
    console.log("Cheeks");
  };

  // Image Handler Function
  async function imageTakenHandler(imagePath) {
    handleUploadPhoto(imagePath);
  }

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
        "Error Saving Image",
        "Big Oof",
        [
          {
            text: "OK",
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
      console.log(err);
    }
    setIsFetching(false);
  }

  // This logic sets the current screen
  if (currScreen === "home") {
    content = (
      // eventually pass wardrobe in
      <HomeScreen
        toClothing={toPickClothing}
        toWardrobe={handleWardrobe}
        toRecommend={handleRecommendation}
        toLogin={toLogin}
        toSignUp={toSignup}
      />
    );
  } else if (currScreen === "add-clothing") {
    content = <AddClothingScreen onImageTaken={imageTakenHandler} />;
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === "confirmation") {
    content = <ConfirmationScreen onConfirm={toHome} />;
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen == "wardrobe") {
    content = <WardrobeScreen loadWardrobe={getWardrobe} />;
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === "login") {
    content = (
      <LoginScreen
        postLoginInfo={postLoginInfo}
        toSignup={toSignup}
        toHome={toHome}
      />
    );
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === "recommend") {
    content = <RecommendationScreen />;
    headerContent = <Header onPress={toHome} />;
  } else if (currScreen === "signup") {
    content = <SignupScreen postSignupInfo={postSignupInfo} toHome={toHome} />;
  }

  // Returns App Component
  if (isFetching) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
