import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const app = initializeApp(firebaseConfig)

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('Home');
            })
            .catch(err => {
                setError("Correo o contraseña incorrecto, intente de nuevo.");
                //setError("El correo o la contraseña ingresada no es valido");
            });
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Ingrese su Correo Electrónico"
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

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                {error && <Text>{error}</Text>}

                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>¿No tienes una cuenta? Registrate</Text>
                </TouchableOpacity>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    card: {

        width: '90%',
        height: '70%',
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
        fontSize: 22,
        color: '#333',
        paddingHorizontal: 19
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        fontSize: 17,
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
    link: {
        marginTop: 20,
    },
    linkText: {
        color: '#3498db',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default LoginScreen;