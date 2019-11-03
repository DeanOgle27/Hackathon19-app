import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import Colors from '../constants/Colors.js';

const SignupScreen = props => {

  // Stores Entered Credentials
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const enterHandler = () => {
    props.postSignupInfo(username, pass, confirmPass);
    props.toHome();
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.promptText}>Username:</Text>
        <TextInput
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setUsername}
          value={username}
          placeholder="6140005555"
        />
        <Text style={styles.promptText}>Password:</Text>
        <TextInput
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPass}
          value={pass}
          secureTextEntry={true}
        />
        <Text style={styles.promptText}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setConfirmPass}
          value={confirmPass}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={enterHandler} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonStyle: {
    height: 40,
    width: 100,
    backgroundColor: Colors.navyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 3,
    borderRadius: 3,
    borderColor: Colors.black,
  },
  textStyle: {
    fontSize: 24,
    color: Colors.white,
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    height: 200,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 3,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.4,
    elevation: 8,
  },
  input: {
    backgroundColor: Colors.white,
    width: '80%',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.black,
  },
  promptText: {
  }
});

export default SignupScreen;
