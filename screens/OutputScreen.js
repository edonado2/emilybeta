import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { BannerAd, TestIds, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { SafeAreaView } from 'react-native-safe-area-context';


const OutputScreen = (props) => {
    const [output, setOutput] = useState('');

    useEffect(() => {
        const outputValue = props.navigation.getParam('output');
        setOutput(outputValue);
    }, []);

    const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-8377618663906586/4044276548', {
        requestNonPersonalizedAdsOnly: true
    })

    const [interstitialLoaded, setinterstitialLoaded] = useState(false);

    const loadInterstitial = () => {
        const unsuscribedLoaded = interstitial.addAdEventListener(AdEventType.LOADED,
            () => {
                setinterstitialLoaded(true)
            })
        const unsuscribedClosed = interstitial.addAdEventListener(AdEventType.CLOSED,
            () => {
                setinterstitialLoaded(true)
                interstitial.load();
            }
        )

        interstitial.load();

        return () => {
            unsuscribedClosed();
            unsuscribedLoaded();
        }
    };

    useEffect(() => {
        const unsuscribeinterstitialEvents = loadInterstitial();
        return unsuscribeinterstitialEvents
    })


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
                {interstitialLoaded ? <Button title="Go back" onPress={() => {
                    interstitial.show()
                    setOutput('');
                    props.navigation.goBack();
                }} /> : <Button title='Go back' onPress={() => props.navigation.goBack()
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