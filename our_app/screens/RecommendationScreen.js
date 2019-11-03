import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors.js';

const RecommendationScreen = props => {
    const [gotRecommendation, setGotRecommendation] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [tempInfo, setTempInfo] = useState();

    const averageTemp = () => {
        if (!tempInfo) {
            console.log("ERROR CODE 1");
            return;
        } else {
            let avg_temp = 0;
            let num_temps = 0;
            tempInfo.list.forEach(
                (item) => {
                    if (item.main.temp) {
                        console.log(item.main.temp);
                        avg_temp += item.main.temp;
                        num_temps++;
                    }
                }
            )
            console.log(avg_temp / num_temps);
            const fahrenheit = Math.round(((avg_temp / num_temps) - 273.15) * 9 / 5 + 32)
            console.log(`Fahrenheit: ${fahrenheit}`)
        }
    }
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
        } catch (err) {
            Alert.alert(
                'Could Not Fetch Location',
                'Make sure you give this app permissions to access your location',
                [{ text: 'Okay' }]
            );
        }
        fetch('http://api.openweathermap.org/data/2.5/forecast?id=4509177&APPID=3e9aa70a180dcbcb04df1224f84ee61b')
            .then(
                (response) => {
                    return response.json();
                }
            ).then(
                (response) => {
                    //console.log(response);
                    setTempInfo(response);
                }
            )
        setIsFetching(false);
    };

    return (
        <View style={styles.container}>
            <View>
                {isFetching ? <ActivityIndicator size='large' color={Colors.primary} /> : <Text>No Location Picked Yet</Text>}
            </View>
            <Button title="Get Location" color={Colors.primary} onPress={getLocationHandler} />
            <Button title="Show Stuff" color={Colors.primary} onPress={averageTemp} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RecommendationScreen;
