import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Animated,
    TouchableOpacity,
    RefreshControl,
    FlatList
} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import firestore from '@react-native-firebase/firestore';

//import DeviceInfo which will help us to get UniqueId
import DeviceInfo from 'react-native-device-info';

import DrowsyDetected from './DrowsyDetected';
import DrowsyPredict from './DrowsyPredict';

const screenWidth = Dimensions.get("window").width;

export default function ScreenB({ navigation }) {
    const [active, setActive] = useState(false);
    const [page, setPage] = useState(false);
    let transformX = useRef(new Animated.Value(0)).current

    const rotationX = transformX.interpolate({
        inputRange: [0, 1],
        outputRange: [2, Dimensions.get('screen').width / 2]
    });

    const [refreshing, setRefreshing] = useState(true);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (active) {
            Animated.timing(transformX, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(transformX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        }
    }, [active]);

    return (
        <SafeAreaView style={styles.body}>
            <View style={{
                flexDirection: 'row',
                position: 'relative',
                height: 50,
                borderRadius: 10,
                backgroundColor: '#efebf0',
                marginHorizontal: 5,
                marginTop: 10,
            }}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 50 - 2 * 2,
                        top: 2,
                        bottom: 2,
                        borderRadius: 10,
                        width: Dimensions.get('screen').width / 2 - 2 - 5 * 2,
                        transform: [
                            {
                                translateX: rotationX
                            }
                        ],
                        backgroundColor: 'white',
                    }}
                >
                </Animated.View>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setActive(false), setPage(false) }}>
                    <Text>
                        Drowsiness Detected
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setActive(true), setPage(true) }}>
                    <Text>
                        Drowsiness Prediction
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollView}>
                {page == false ? <DrowsyDetected /> : <DrowsyPredict />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        marginHorizontal: 0,
    },
    barChart: {
        marginTop: 20,
        marginLeft: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: screenWidth / 25,
    },
    headText: {
        fontWeight: 'bold',
        fontSize: screenWidth / 20,
        color: 'black',
        margin: 10,
        textDecorationLine: 'underline',
    },
})