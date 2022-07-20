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

const screenWidth = Dimensions.get("window").width;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function DrowsyDay({ data }) {
    const [active, setActive] = useState(0);
    const [page, setPage] = useState(1);
    let transformX = useRef(new Animated.Value(0)).current

    const rotationX = transformX.interpolate({
        inputRange: [0, 1],
        outputRange: [3, Dimensions.get('screen').width / 3]
    });

    const [refreshing, setRefreshing] = useState(false);
    const [userData, setUserData] = useState([]);
    const [drowsyVals, setDrowsyVals] = useState([]);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = () => {
        firestore()
            .collection(DeviceInfo.getUniqueId().toString())
            .get()
            .then(querySnapshot => {
                const objectsArray = [];
                querySnapshot.forEach(documentSnapshot => {
                    objectsArray.push(documentSnapshot.id.split(',')[0] + ',' + documentSnapshot.id.split(',')[1].split(':')[0]);
                });
                setDrowsyVals(objectsArray);
            });
        dataArray();
        setTime();
    };

    const getCurrentDate = () => {
        var day = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        return day + '-' + month + '-' + year;
    }


    const [currentData, setCurrentData] = useState([]);
    const dataArray = () => {
        const objectsArray = [];
        drowsyVals.forEach((val) => {
            if (val.split(',')[0] == getCurrentDate()) {
                objectsArray.push(val);
            }
        });
        setCurrentData(objectsArray);
    }

    const [twelveMorning, setTwelveMorning] = useState(0);
    const [oneMorning, setOneMorning] = useState(0);
    const [twoMorning, setTwoMorning] = useState(0);
    const [threeMorning, setThreeMorning] = useState(0);
    const [fourMorning, setFourMorning] = useState(0);
    const [fiveMorning, setFiveMorning] = useState(0);
    const [sixMorning, setSixMorning] = useState(0);
    const [sevenMorning, setSevenMorning] = useState(0);
    const [eightMorning, setEightMorning] = useState(0);
    const [nineMorning, setNineMorning] = useState(0);
    const [tenMorning, setTenMorning] = useState(0);
    const [elevenMorning, setElevenMorning] = useState(0);
    const [twelveAfternoon, setTwelveAfternoon] = useState(0);
    const [oneAfternoon, setOneAfternoon] = useState(0);
    const [twoAfternoon, setTwoAfternoon] = useState(0);
    const [threeAfternoon, setThreeAfternoon] = useState(0);
    const [fourAfternoon, setFourAfternoon] = useState(0);
    const [fiveAfternoon, setFiveAfternoon] = useState(0);
    const [sixEvening, setSixEvening] = useState(0);
    const [sevenEvening, setSevenEvening] = useState(0);
    const [eightEvening, setEightEvening] = useState(0);
    const [nineEvening, setNineEvening] = useState(0);
    const [tenEvening, setTenEvening] = useState(0);
    const [elevenEvening, setElevenEvening] = useState(0);

    const setTime = () => {
        let twelveMorningCount = 0;
        let oneMorningCount = 0;
        let twoMorningCount = 0;
        let threeMorningCount = 0;
        let fourMorningCount = 0;
        let fiveMorningCount = 0;
        let sixMorningCount = 0;
        let sevenMorningCount = 0;
        let eightMorningCount = 0;
        let nineMorningCount = 0;
        let tenMorningCount = 0;
        let elevenMorningCount = 0;
        let twelveAfternoonCount = 0;
        let oneAfternoonCount = 0;
        let twoAfternoonCount = 0;
        let threeAfternoonCount = 0;
        let fourAfternoonCount = 0;
        let fiveAfternoonCount = 0;
        let sixEveningCount = 0;
        let sevenEveningCount = 0;
        let eightEveningCount = 0;
        let nineEveningCount = 0;
        let tenEveningCount = 0;
        let elevenEveningCount = 0;
        currentData.forEach((val) => {
            if (val.split(',')[1] == '00') {
                twelveMorningCount++;
            } else if (val.split(',')[1] == '01') {
                oneMorningCount++;
            } else if (val.split(',')[1] == '02') {
                twoMorningCount++;
            } else if (val.split(',')[1] == '03') {
                threeMorningCount++;
            } else if (val.split(',')[1] == '04') {
                fourMorningCount++;
            } else if (val.split(',')[1] == '05') {
                fiveMorningCount++;
            } else if (val.split(',')[1] == '06') {
                sixMorningCount++;
            } else if (val.split(',')[1] == '07') {
                sevenMorningCount++;
            } else if (val.split(',')[1] == '08') {
                eightMorningCount++;
            } else if (val.split(',')[1] == '09') {
                nineMorningCount++;
            } else if (val.split(',')[1] == '10') {
                tenMorningCount++;
            } else if (val.split(',')[1] == '11') {
                elevenMorningCount++;
            } else if (val.split(',')[1] == '12') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1] == '13') {
                oneAfternoonCount++;
            } else if (val.split(',')[1] == '14') {
                twoAfternoonCount++;
            } else if (val.split(',')[1] == '15') {
                threeAfternoonCount++;
            } else if (val.split(',')[1] == '16') {
                fourAfternoonCount++;
            } else if (val.split(',')[1] == '17') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1] == '18') {
                sixEveningCount++;
            } else if (val.split(',')[1] == '19') {
                sevenEveningCount++;
            } else if (val.split(',')[1] == '20') {
                eightEveningCount++;
            } else if (val.split(',')[1] == '21') {
                nineEveningCount++;
            } else if (val.split(',')[1] == '22') {
                tenEveningCount++;
            } else if (val.split(',')[1] == '23') {
                elevenEveningCount++;
            } else { null }
        });
        setTwelveMorning(twelveMorningCount);
        setOneMorning(oneMorningCount);
        setTwoMorning(twoMorningCount);
        setThreeMorning(threeMorningCount);
        setFourMorning(fourMorningCount);
        setFiveMorning(fiveMorningCount);
        setSixMorning(sixMorningCount);
        setSevenMorning(sevenMorningCount);
        setEightMorning(eightMorningCount);
        setNineMorning(nineMorningCount);
        setTenMorning(tenMorningCount);
        setElevenMorning(elevenMorningCount);
        setTwelveAfternoon(twelveAfternoonCount);
        setOneAfternoon(oneAfternoonCount);
        setTwoAfternoon(twoAfternoonCount);
        setThreeAfternoon(threeAfternoonCount);
        setFourAfternoon(fourAfternoonCount);
        setFiveAfternoon(fiveAfternoonCount);
        setSixEvening(sixEveningCount);
        setSevenEvening(sevenEveningCount);
        setEightEvening(eightEveningCount);
        setNineEvening(nineEveningCount);
        setTenEvening(tenEveningCount);
        setElevenEvening(elevenEveningCount);
    }

    const renderPage = () => {
        return (
            //Hours
            <View>
                <View style={styles.barChart}>
                    <Text style={styles.text}>Midnight • Middle of the Night • Early Morning</Text>
                    <BarChart
                        data={{
                            labels: [
                                '12am',
                                '1am',
                                '2am',
                                '3am',
                                '4am',
                                '5am',
                            ],
                            datasets: [
                                {
                                    data: [
                                        twelveMorning,
                                        oneMorning,
                                        twoMorning,
                                        threeMorning,
                                        fourMorning,
                                        fiveMorning
                                    ],
                                },
                            ],
                        }}
                        width={screenWidth / 1.05}
                        height={220}
                        withInnerLines={false}
                        showBarTops={
                            twelveMorning == 0 &&
                                oneMorning == 0 &&
                                twoMorning == 0 &&
                                threeMorning == 0 &&
                                fourMorning == 0 &&
                                fiveMorning == 0
                                ? true : false}
                        withHorizontalLabels={
                            twelveMorning == 0 &&
                                oneMorning == 0 &&
                                twoMorning == 0 &&
                                threeMorning == 0 &&
                                fourMorning == 0 &&
                                fiveMorning == 0
                                ? false : true}
                        chartConfig={{
                            backgroundColor: '#d4f1ff',
                            backgroundGradientFrom: '#d4f1ff',
                            backgroundGradientTo: '#d4f1ff',
                            decimalPlaces: 0.5,
                            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                            fillShadowGradient: '#001feb',
                            fillShadowGradientOpacity: 1,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 15,
                            paddingRight: 32,
                            paddingTop: 22,
                            marginTop: -15,
                        }}
                    />
                </View>

                <View style={styles.barChart}>
                    <Text style={styles.text}>Morning • Late Morning</Text>
                    <BarChart
                        data={{
                            labels: [
                                '6am',
                                '7am',
                                '8am',
                                '9am',
                                '10am',
                                '11am',
                            ],
                            datasets: [
                                {
                                    data: [
                                        sixMorning,
                                        sevenMorning,
                                        eightMorning,
                                        nineMorning,
                                        tenMorning,
                                        elevenMorning
                                    ],
                                },
                            ],
                        }}
                        width={screenWidth / 1.05}
                        height={220}
                        withInnerLines={false}
                        showBarTops={sixMorning == 0 &&
                            sevenMorning == 0 &&
                            eightMorning == 0 &&
                            nineMorning == 0 &&
                            tenMorning == 0 &&
                            elevenMorning == 0
                            ? true : false}
                        withHorizontalLabels={
                            sixMorning == 0 &&
                                sevenMorning == 0 &&
                                eightMorning == 0 &&
                                nineMorning == 0 &&
                                tenMorning == 0 &&
                                elevenMorning == 0
                                ? false : true}
                        chartConfig={{
                            backgroundColor: '#d4f1ff',
                            backgroundGradientFrom: '#d4f1ff',
                            backgroundGradientTo: '#d4f1ff',
                            decimalPlaces: 0.5,
                            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                            fillShadowGradient: '#001feb',
                            fillShadowGradientOpacity: 1,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 15,
                            paddingRight: 32,
                            paddingTop: 22,
                            marginTop: -15,
                        }}
                    />
                </View>


                <View style={styles.barChart}>
                    <Text style={styles.text}>Afternoon • Late Afternoon / Early Evening</Text>
                    <BarChart
                        data={{
                            labels: [
                                '12pm',
                                '1pm',
                                '2pm',
                                '3pm',
                                '4pm',
                                '5pm',
                            ],
                            datasets: [
                                {
                                    data: [
                                        twelveAfternoon,
                                        oneAfternoon,
                                        twoAfternoon,
                                        threeAfternoon,
                                        fourAfternoon,
                                        fiveAfternoon
                                    ],
                                },
                            ],
                        }}
                        width={screenWidth / 1.05}
                        height={220}
                        withInnerLines={false}
                        showBarTops={
                            twelveAfternoon == 0 &&
                                oneAfternoon == 0 &&
                                twoAfternoon == 0 &&
                                threeAfternoon == 0 &&
                                fourAfternoon == 0 &&
                                fiveAfternoon == 0
                                ? true : false}
                        withHorizontalLabels={
                            twelveAfternoon == 0 &&
                                oneAfternoon == 0 &&
                                twoAfternoon == 0 &&
                                threeAfternoon == 0 &&
                                fourAfternoon == 0 &&
                                fiveAfternoon == 0
                                ? false : true}
                        chartConfig={{
                            backgroundColor: '#d4f1ff',
                            backgroundGradientFrom: '#d4f1ff',
                            backgroundGradientTo: '#d4f1ff',
                            decimalPlaces: 0.5,
                            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                            fillShadowGradient: '#001feb',
                            fillShadowGradientOpacity: 1,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 15,
                            paddingRight: 32,
                            paddingTop: 22,
                            marginTop: -15,
                        }}
                    />
                </View>

                <View style={styles.barChart}>
                    <Text style={styles.text}>Evening • Night</Text>
                    <BarChart
                        data={{
                            labels: [
                                '6pm',
                                '7pm',
                                '8pm',
                                '9pm',
                                '10pm',
                                '11pm',
                            ],
                            datasets: [
                                {
                                    data: [
                                        sixEvening,
                                        sevenEvening,
                                        eightEvening,
                                        nineEvening,
                                        tenEvening,
                                        elevenEvening
                                    ],
                                },
                            ],
                        }}
                        width={screenWidth / 1.05}
                        height={220}
                        withInnerLines={false}
                        showBarTops={
                            sixEvening == 0 &&
                                sevenEvening == 0 &&
                                eightEvening == 0 &&
                                nineEvening == 0 &&
                                tenEvening == 0 &&
                                elevenEvening == 0
                                ? true : false}
                        withHorizontalLabels={
                            sixEvening == 0 &&
                                sevenEvening == 0 &&
                                eightEvening == 0 &&
                                nineEvening == 0 &&
                                tenEvening == 0 &&
                                elevenEvening == 0
                                ? false : true}
                        chartConfig={{
                            backgroundColor: '#d4f1ff',
                            backgroundGradientFrom: '#d4f1ff',
                            backgroundGradientTo: '#d4f1ff',
                            decimalPlaces: 0.5,
                            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                            fillShadowGradient: '#001feb',
                            fillShadowGradientOpacity: 1,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 15,
                            paddingRight: 32,
                            paddingTop: 22,
                            marginTop: -15,
                        }}
                    />
                </View>

                <View style={styles.analysis}>
                    <Text style={styles.text}>Results</Text>
                    <Text />

                    <Text style={styles.subHeading}>12am</Text>
                    <Text>You were drowsy {twelveMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>1am</Text>
                    <Text>You were drowsy {oneMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>2am</Text>
                    <Text>You were drowsy {twoMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>3am</Text>
                    <Text>You were drowsy {threeMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>4am</Text>
                    <Text>You were drowsy {fourMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>5am</Text>
                    <Text>You were drowsy {fiveMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>6am</Text>
                    <Text>You were drowsy {sixMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>7am</Text>
                    <Text>You were drowsy {sevenMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>8am</Text>
                    <Text>You were drowsy {eightMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>9am</Text>
                    <Text>You were drowsy {nineMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>10am</Text>
                    <Text>You were drowsy {tenMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>11am</Text>
                    <Text>You were drowsy {elevenMorning} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>12pm</Text>
                    <Text>You were drowsy {twelveAfternoon} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>1pm</Text>
                    <Text>You were drowsy {oneAfternoon} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>2pm</Text>
                    <Text>You were drowsy {twoAfternoon} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>3pm</Text>
                    <Text>You were drowsy {threeAfternoon} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>4pm</Text>
                    <Text>You were drowsy {fourAfternoon} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>5pm</Text>
                    <Text>You were drowsy {fiveAfternoon} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>6pm</Text>
                    <Text>You were drowsy {sixEvening} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>7pm</Text>
                    <Text>You were drowsy {sevenEvening} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>8pm</Text>
                    <Text>You were drowsy {eightEvening} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>9pm</Text>
                    <Text>You were drowsy {nineEvening} times.</Text>
                    <Text />

                    <Text style={styles.subHeading}>10pm</Text>
                    <Text>You were drowsy {tenEvening} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>11pm</Text>
                    <Text>You were drowsy {elevenEvening} times.</Text>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView style={styles.scrollView} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                        loadUserData();
                    }}
                />
            }>
                {renderPage()}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    subHeading: {
        fontWeight: 'bold',
        fontSize: screenWidth / 20,
    },
    analysis: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 50,
        marginLeft: 10,
        marginRight: 10,
    },
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