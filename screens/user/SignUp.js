import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../../context/AuthContext';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { registerUser } = useContext(AuthContext);

    const handleLogin = () => {
        // Validate email and password
        if (!email || !password) {
            Alert.alert('Validation Error', 'Please enter both email and password.');
            return;
        }

        // Perform login operation
        console.log('Email:', email);
        console.log('Password:', password);
        registerUser(email, username, password, confirmPassword);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.title}>Register Now</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={username}
                    onChangeText={text => setUsername(text)}
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
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password"
                        secureTextEntry={!showPassword}
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                    <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                        size={24}
                        color="black"
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                </View>
                <Button title='Register' color='tomato' onPress={handleLogin} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'blue', marginTop: 20 }}>Already have an account? Login here</Text>
                </TouchableOpacity>

            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flex: 1,
    },
    container1: {
        textAlign: 'center',
        marginTop: 50
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
        borderBottomColor: "tomato",
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: "orange",
        fontSize: 20,
        marginTop: 20
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0
    },
    passwordInput: {
        flex: 1,
        height: 40,
        borderBottomColor: "tomato",
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: "orange",
        fontSize: 20,
        marginTop: 20
    },
    eyeIcon: {
        marginLeft: 10,
    }
});
