import Colors from '../constants/Colors.js';
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Touchable, TouchableOpacity } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';
//import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';



const ServiceButton = props => {
    return (
        <TouchableOpacity onPress = {props.function} activeOpacity = {0.7} style={styles.buttonContainer} >
            {/* <Text style={styles.fieldText}>{props.field.concat(':')}</Text> */}
            <Text style={styles.valueText}>{props.value}</Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 80,
        width: 200,
        borderRadius: 10,
        borderWidth: 0,
        borderColor: Colors.primary,
        backgroundColor: Colors.secondary,
        //overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: .7,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fieldText: {
        fontFamily: 'blackjack',
    },
    valueText: {
        fontFamily: 'fira-sans-bold',
    }

});

export default ServiceButton;