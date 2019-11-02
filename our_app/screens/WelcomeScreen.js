import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';


const WelcomeScreen = props => {

    return (
        <View style={styles.container}>
            <Text>Something</Text>
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
