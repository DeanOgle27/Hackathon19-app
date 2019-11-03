import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Button } from 'react-native';
import Colors from '../constants/Colors.js';
import ServiceButton from '../components/ServiceButton.js';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = props => {
  const printReq = () => {
    console.log()
  }
  return (

    <View style={styles.container}>
      <View style={styles.envelope}>

        <ImageBackground source={require('../assets/add_clothing.jpg')} style={styles.envelope} resizeMode='cover'>
          <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={props.toClothing}>
            <LinearGradient
              colors={['#13808688', '#138086ff']}
              style={styles.loginGradient}
              start={[0, -1]}
              end={[1, 2]}
              locations={[0.1, 0.9]}
            >
              <Text style={styles.loginText}>Add Clothing</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground source={require('../assets/wardrobe.jpg')} style={styles.envelope} resizeMode='cover'>
          <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={props.toWardrobe}>
            <LinearGradient
              colors={['#EEB46288', '#EEB462ff']}
              style={styles.loginGradient}
              start={[0, -1]}
              end={[1, 2]}
              locations={[0.1, 0.9]}
            >
              <Text style={styles.loginText}>View Wardrobe</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>

        <ImageBackground source={require('../assets/recommendation.jpeg')} style={styles.envelope} resizeMode='cover'>
          <TouchableOpacity activeOpacity={0.8} style={styles.loginButton} onPress={props.toRecommend}>
            <LinearGradient
              colors={['#CD767288', '#CD7672FF']}
              style={styles.loginGradient}
              start={[0, -1]}
              end={[1, 2]}
              locations={[0.1, 0.9]}
            >
              <Text style={styles.loginText}>Get Recommendation</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
        <Button title="Log In" onPress={props.toLogin} />
        <Button title="Sign Up" onPress={props.toSignUp} />

      </View>
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

  envelope: {
    flex: 1,
    width: '100%',
  },

  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  loginGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default HomeScreen;
