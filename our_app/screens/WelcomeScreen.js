import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import Header from '../components/Header.js';
import * as Font from 'expo-font';
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/Colors.js';

const WelcomeScreen  = propos => {
    return (
        <View style = {style.container}>
            <ServiceButton />
        </View>
    )
}
// 
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