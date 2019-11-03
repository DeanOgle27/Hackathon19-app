import React from 'react';
import Header from '../components/Header.js';
import Clothing from '../models/clothing.js';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listData = [
    { id: '0', image: require('../assets/blue_shirt.jpg') },
    { id: '1', image: require('../assets/icon.png') },
    { id: '2', image: require('../assets/splash.png') },
]


const WardrobeScreen = props => {


    const renderGridItem = itemData => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: 10, width: 300, borderWidth: 2 }}>
                <Image style={styles.image} source={itemData.item.image} />
            </View >
        );
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                contentContainerStyle={{ justfiyContent: 'center' }}
                keyExtractor={(item, index) => item.id}
                data={listData}
                renderItem={renderGridItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    flatList: {
        borderWidth: 4,
        borderColor: 'red',
        height: '100%',
        width: '100%',
        alignContent: 'center'
    },
    image: {
        height: 250,
        width: 250,
    }
});

export default WardrobeScreen;