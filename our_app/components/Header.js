import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

//import { LinearGradient } from 'expo-linear-gradient';
//import TitleText from './TitleText';
import Colors from '../constants/Colors.js';

const Header = props => {
    return (
        <View style = {styles.header}>
                
                <Text style = {styles.headerTitle}>PickFit</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 35,
        backgroundColor: Colors.tertiary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'blackjack'
    },
    imageContainer: {
        width: 200,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default Header
