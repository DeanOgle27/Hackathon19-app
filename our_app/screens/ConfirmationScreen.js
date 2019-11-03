import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableHighlight
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors.js';

const ConfirmationScreen = props => {

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.logoContainer} underlayColor={"#AAAAAAE0"} activeOpacity={0.85} onPress={props.onConfirm}>
                <MaterialIcons name="check" size={250} color={Colors.tertiary} />
            </TouchableHighlight>
            <Text style={styles.confirmTextStyle}>Clothing Item Added!</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#3c4f65'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        borderRadius: Dimensions.get("window").width * 0.35,
        borderWidth: 7,
        borderColor: Colors.tertiary,
        backgroundColor: '#FFFFFFBB',

    },
    confirmTextStyle: {
        fontFamily: 'fira-sans-bold',
        color: Colors.primary,
        fontSize: 42,
        marginTop: 20,
        textAlign: 'center',

        // Shadow Stuff
        textShadowColor: 'white',
        textShadowRadius: 1,
        textShadowOffset: { width: .5, height: .5 },
    }
});

export default ConfirmationScreen;

