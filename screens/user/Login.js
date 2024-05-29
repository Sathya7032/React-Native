import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../../context/AuthContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const handleLogin = () => {
    // Validate email and password
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    // Perform login operation
    loginUser(email, password);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title}>Login Now</Text>
      </View>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="black"
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <Button title='Login' color='tomato' onPress={handleLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an Account? Register Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flex: 1,
  },
  container1: {
    textAlign: 'center',
    marginTop: 120,
  },
  container2: {
    marginHorizontal: 50,
    marginTop: 50,
  },
  title: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderBottomColor: 'tomato',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderBottomColor: 'tomato',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 20,
    marginTop: 20,
  },
  eyeIcon: {
    marginLeft: 10,
    marginTop: 20,
  },
  signupText: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
});
