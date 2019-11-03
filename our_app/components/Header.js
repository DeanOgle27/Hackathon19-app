import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors.js';
import ServiceButton from './ServiceButton.js';
//import { LinearGradient } from 'expo-linear-gradient';
//import TitleText from './TitleText';
import Colors from '../constants/Colors.js';
import HeaderBackButton from '../components/HeaderBackButton.js';

const Header = props => {
        return (
                <View style={styles.header}>
                        <View style={styles.leftContainer}>
                                {(props.onPress != null) && <HeaderBackButton onPress={props.onPress} />}
                        </View>
                        <View style={styles.centerContainer}>
                                <View style={styles.textContainer}>
                                        <Text style={styles.headerTitle}>PickFit</Text>
                                </View>
                        </View>
                        <View style={styles.rightContainer}>

                        </View>
                </View>
        );
};

const styles = StyleSheet.create({
        header: {
                width: '100%',
                height: 90,
                backgroundColor: Colors.tertiary,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
        },
        headerTitle: {
                color: 'white',
                fontSize: 30,
                fontFamily: 'blackjack'
        },
        leftContainer: {
                flex: 1,
                height: '100%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: 25
        },
        centerContainer: {
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
        },
        rightContainer: {
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
        },
        textContainer: {
                paddingTop: 35,
        }
});

export default Header
