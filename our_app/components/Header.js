import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
//import TitleText from './TitleText';
//import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={styles.imageContainer}>
            <Text>Whatever we want</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default Header;