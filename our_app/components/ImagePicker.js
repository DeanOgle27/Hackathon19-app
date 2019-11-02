import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImgPicker = props => {

    const takeImageHandler = () => {
        ImagePicker.launchCameraAsync();
    }

    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            <Text>No Image Picked Yet</Text>
            <Image style={styles.image} />
        </View>
        <Button title="Take Image" onPress={takeImageHandler} />
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default ImgPicker;