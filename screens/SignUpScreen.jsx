import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Card } from 'react-native-elements';

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const auth = getAuth(app)
    const app = initializeApp(firebaseConfig)

    const handleRegistration = () => {
        // validate form inputs
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Intenta nuevamente', 'Por favor llene todos los campos requeridos.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Intenta nuevamente', 'Las contraseñas no coinciden ');
            return;
        }
        // send registration data to server
        // navigate to login screen
        Alert.alert(
            'Tu cuenta ha sido creada',
            'Inicia sesión para comenzar a utilizar la App',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
        navigation.navigate('Login');
    }

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const user = userCredential.user;
                console.log(user)
                navigation.navigate('Login')
            }).catch(err => {
                setError(err.message);
            })
    }

    return (
        <View style={styles.container}>
            <Card>
                <Text style={styles.label}>Nombre Completo</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Ingrese su nombre"
                    autoCapitalize="words"
                />
                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Ingrese su correo electrónico"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Ingrese su contraseña"
                    secureTextEntry={true}
                />
                <Text style={styles.label}>Confirma tu Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme su contraseña"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleRegistration()
                    handleCreateAccount()
                }}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </Card>
        </View >
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 18,
        color: '#333',
        paddingHorizontal: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 35,
        margin: 10
    },
    button: {
        backgroundColor: '#710193',
        padding: 15,
        borderRadius: 15,
        elevation: 2,
        alignSelf: 'stretch',
        marginHorizontal: 30,
        marginVertical: 20
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default RegisterScreen;