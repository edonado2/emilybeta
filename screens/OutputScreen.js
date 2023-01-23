import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const OutputScreen = () => {

    const navigation = useNavigation();
    const [, setOutput] = useState('');
    const [interstitialLoaded, setInterstitialLoaded] = useState(false);
    const [interstitial, setInterstitial] = useState(null);

    const route = useRoute();
    const output = route.params.output;

    useEffect(() => {
        if (!interstitial) {
            setInterstitial(InterstitialAd.createForAdRequest('ca-app-pub-8377618663906586/4044276548', {
                requestNonPersonalizedAdsOnly: true
            }));
        } else {
            interstitial.load();
            const unsuscribedLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                setInterstitialLoaded(true);
            });
            const unsuscribedClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
                setInterstitialLoaded(false);
                interstitial.load();
            });
            return () => {
                unsuscribedLoaded();
                unsuscribedClosed();
            };
        }
    }, [interstitial]);

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <BannerAd
                    unitId={'ca-app-pub-8377618663906586/1073895635'}
                    size={BannerAdSize.LARGE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true
                    }}>
                </BannerAd>
            </SafeAreaView>
            <ScrollView>
                <Card>
                    <Text style={styles.outputText}>{output}</Text>
                </Card>
            </ScrollView>
            <View style={styles.buttonContainer}>
                {interstitialLoaded ? <Button title="Volver" onPress={() => {
                    interstitial.show()
                    setOutput('');
                    setInterstitialLoaded(false);
                    navigation.goBack();
                }} /> : <Button title='Volver' onPress={() => navigation.goBack()
                }></Button>}

                <SafeAreaView style={{ paddingTop: 30 }}>
                    <BannerAd
                        unitId={'ca-app-pub-8377618663906586/1073895635'}
                        size={BannerAdSize.LARGE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true
                        }}>
                    </BannerAd>
                </SafeAreaView>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({

    scrollContainer: {
        minHeight: '100%',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outputText: {
        fontSize: 20,
        paddingBottom: 15
    }
    ,
    buttonContainer: {
        marginTop: 20,
    },
});

export default OutputScreen;