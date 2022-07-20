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

import DrowsyDayPrediction from './DrowsyDayPrediction';
import DrowsyMonthPrediction from './DrowsyMonthPrediction';
import DrowsyYearPrediction from './DrowsyYearPrediction';

const screenWidth = Dimensions.get("window").width;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function DrowsyPredict({ data }) {
    const [active, setActive] = useState(0);
    const [page, setPage] = useState(1);
    let transformX = useRef(new Animated.Value(0)).current

    const rotationX = transformX.interpolate({
        inputRange: [0, 1],
        outputRange: [3, Dimensions.get('screen').width / 3]
    });

    useEffect(() => {
        if (active == 2) {
            Animated.timing(transformX, {
                toValue: 2,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else if (active == 1) {
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

    const renderPage = () => {
        if (page == 1) {
            return <DrowsyDayPrediction />
        } else if (page == 2) {
            return <DrowsyMonthPrediction />
        } else if (page == 3) {
            //Months
            return <DrowsyYearPrediction />
        } else {
            return null;
        }
    }

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
                        width: Dimensions.get('screen').width / 3 - 3 - 5 * 2,
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
                }} onPress={() => { setActive(0), setPage(1) }}>
                    <Text>
                        Hours
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setActive(1), setPage(2) }}>
                    <Text>
                        Days
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={() => { setActive(2), setPage(3) }}>
                    <Text>
                        Months
                    </Text>
                </TouchableOpacity>
            </View>
            {renderPage()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
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