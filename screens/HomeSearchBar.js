import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';


const HomeSearchBar = ({ navigation }) => {


    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [buttonPressed, setButtonPressed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => {
            setInput('');
            setOutput('');
            setIsLoading(false);
        };
    }, [output]);

    const handleInputChange = (text) => {
        setInput(text);
    };

    const getResponse = () => {
        if (input === '') {
            setOutput('Hola, ¿en qué te puedo ayudar?');
            return;
        }
        // Send the input text to the Chat GPT model using the fetch function
        setButtonPressed(true);
        setIsLoading(true);
        if (buttonPressed) {
            setButtonPressed(true);
            fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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',
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: input,
                    max_tokens: 256,
                    temperature: 0.5,
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.choices && responseJson.choices.length > 0) {
                        // Parse the JSON response and extract the output text
                        setOutput(responseJson.choices[0].text);

                    }
                    console.log(responseJson)
                    navigation.navigate('Output', { output: responseJson.choices[0].text });
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });


        }

    };

    useEffect(() => {
        if (buttonPressed) {
            getResponse();
        }
    }, [buttonPressed]);

    return (
        <LinearGradient colors={['#ffb6c1', '#ffffff', '#87ceeb']} style={styles.container}>
            <Text style={{ fontSize: 40, color: '#414A4C', fontWeight: 'bold' }}>
                My name is Emily ask me anything you like.
            </Text>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={handleInputChange}
                placeholder=" What can I do for you today?"
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button
                    style={styles.button}
                    title="Send"
                    onPress={getResponse}
                    disabled={isLoading}
                />
            )}
        </LinearGradient>
    );
};

export default HomeSearchBar;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#f5f5f5',
    },
    input: {
        margin: 50,
        width: '80%',
        height: 40,
        width: 350,
        borderColor: 'white',
        borderWidth: 0,
        borderRadius: 50,
        padding: 10,
        color: 'black',
        backgroundColor: 'white',

    },
    button: {
        marginTop: 10,
        width: '30%',
        height: 40,
        backgroundColor: '#00b5ec',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    output: {
        margin: 50,
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 15,
        padding: 10,
        textAlign: 'center',
        color: '#C0C0C0',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

