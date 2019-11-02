import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


// Imports all screens
import WelcomeScreen from './screens/WelcomeScreen.js'

// Declares content variables
let content;
let headerContent;
let footerContent;

export default function App() {

  // Keeps track of current screen
  const [currScreen, setCurrScreen] = useState('home');

  if (currScreen == 'home') {
    content = (
      <WelcomeScreen />
    );
    //headerContent = <Header />;
    //footerContent = <EmptyFooter />;
  }

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
