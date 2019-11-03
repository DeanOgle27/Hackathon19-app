import Colors from '../constants/Colors.js';
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Touchable } from 'react-native';

//import { LinearGradient } from 'expo-linear-gradient';
//import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';



const ServiceButton = props => {
    return (
        <View style={styles.card}>
            {/* <Text style={styles.fieldText}>{props.field.concat(':')}</Text> */}
            <Text style={styles.valueText}>{props.value}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
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