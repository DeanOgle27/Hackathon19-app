import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import Header from './components/Header.js';
import * as Font from 'expo-font';
const fetchFonts = () => {
  return Font.loadAsync({
    'blackjack': require('./assets/fonts/blackjack.otf')
  });
};


// Imports all screens
import WelcomeScreen from './screens/WelcomeScreen.js'

// Declares content variables
let content;
let headerContent;
let footerContent;





export default function App() {

  // Keeps track of current screen
  const [currScreen, setCurrScreen] = useState('home');
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync ={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        />
    );
  }

  if (currScreen == 'home') {
    content = (
      <WelcomeScreen />
    );
    //headerContent = <Header />;
    //footerContent = <EmptyFooter />;
  }

  return (
    <View style={styles.screen}>
      <Header/>
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
