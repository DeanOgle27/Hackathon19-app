import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors.js';

const HeaderBackButton = props => {

    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.exitButton} onPress={props.onPress}>
            <Ionicons name="ios-menu" size={35} color={'white'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 0,
        borderColor: 'white',
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: .7,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    exitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
});

export default HeaderBackButton
