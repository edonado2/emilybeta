import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper'
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('hasSeenOnboarding').then((value) => {
            if (value !== null) {
                setHasSeenOnboarding(JSON.parse(value));
            }
        });
    }, []);

    const finishOnboarding = () => {
        setHasSeenOnboarding(true);
        AsyncStorage.setItem('hasSeenOnboarding', JSON.stringify(true));
        navigation.navigate('Login')
    }

    return (
        hasSeenOnboarding ? null : (
            <Onboarding
                onSkip={() => navigation.replace("Login")}
                pages={[
                    {
                        backgroundColor: '#e8eae6',
                        image: <Image source={require('../assets/onb2.png')} />,
                        title: '¿Empezamos?',
                        subtitle: 'Explora, Descubre, Aprende sin limites',
                    },
                    {
                        backgroundColor: '#eaf4fc',
                        image: <Image source={require('../assets/onb1.png')} />,
                        title: '¿Ocupado? tu asistente personal esta aqui',
                        subtitle: 'El tiempo es un recurso valioso, aprovechemoslo.',
                    },
                ]}
                onDone={finishOnboarding}
            />
        )
    );
};

export default OnboardingScreen;