import React from 'react';
import Header from '../components/Header.js';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import ImgPicker from '../components/ImagePicker.js';

const WelcomeScreen = props => {
    return (
        
        <View style={styles.container}>
            <Text>Something</Text>
            <Button title = "Suggest fit"></Button>
            <Button title = "Wardrobe"></Button>
            <Button title = "Profile"></Button>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
      },
    activeTitle: {
        color: 'red',
      },


});

export default WelcomeScreen;
