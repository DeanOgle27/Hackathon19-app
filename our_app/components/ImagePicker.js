import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            console.log("NO PERMISSION")
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        setPickedImage(image.uri);
        props.onImageTake(image.uri);
    };



    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>No image picked yet.</Text>
                ) : (
                        <Image style={styles.image} source={{ uri: pickedImage }} />
                    )}
            </View>
            <Button
                title="Take Image"
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width * 0.5,
        height: '100%'
    }
});

export default ImgPicker;
