import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import Header from '../components/Header.js';
import ImgPicker from '../components/ImagePicker.js';

const WelcomeScreen = props => {
    return (
        <View style={styles.container}>
            <Header />
            <ImgPicker onImageTaken={props.onImageTaken} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default WelcomeScreen;
