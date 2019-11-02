import React from 'react';
import Header from '../components/Header.js';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import ImgPicker from '../components/ImagePicker.js';

const WelcomeScreen = props => {
    return (

        <View style={styles.container}>
            <ImgPicker onImageTaken={props.onImageTaken} />
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
