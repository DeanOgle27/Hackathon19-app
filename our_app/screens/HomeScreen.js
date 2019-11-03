import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/Colors.js';
import ServiceButton from '../components/ServiceButton.js';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <ServiceButton value="Add Fit" color={Colors.primary} function={props.pickClothing} />
      <ServiceButton value="My Wardrobe" color={Colors.secondary} function={props.openWardrobe} />
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

export default HomeScreen;
