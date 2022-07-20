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

import moment from 'moment';

const screenWidth = Dimensions.get("window").width;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function DrowsyMonth({ data }) {
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
        return month + '-' + year;
    }

    const [currentData, setCurrentData] = useState([]);
    const dataArray = () => {
        const objectsArray = [];
        drowsyVals.forEach((val) => {
            if ((val.split(',')[0].split('-')[1] + '-' + val.split(',')[0].split('-')[2]) == getCurrentDate()) {
                objectsArray.push(val);
            }
        });
        setCurrentData(objectsArray);
    }

    const [monday, setMonday] = useState(0);
    const [tuesday, setTuesday] = useState(0);
    const [wednesday, setWednesday] = useState(0);
    const [thursday, setThursday] = useState(0);
    const [friday, setFriday] = useState(0);
    const [saturday, setSaturday] = useState(0);
    const [sunday, setSunday] = useState(0);

    const setTime = () => {
        let mondayCount = 0;
        let tuesdayCount = 0;
        let wednesdayCount = 0;
        let thursdayCount = 0;
        let fridayCount = 0;
        let saturdayCount = 0;
        let sundayCount = 0;
        currentData.forEach((val) => {
            if (moment(val.split(',')[0], 'DD-MM-YYYY').format('dddd') == 'Monday') {
                mondayCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('dddd') == 'Tuesday') {
                tuesdayCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('dddd') == 'Wednesday') {
                wednesdayCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('dddd') == 'Thursday') {
                thursdayCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('dddd') == 'Friday') {
                fridayCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('dddd') == 'Saturday') {
                saturdayCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('dddd') == 'Sunday') {
                sundayCount++;
            } else { null }
        });
        setMonday(mondayCount);
        setTuesday(tuesdayCount);
        setWednesday(wednesdayCount);
        setThursday(thursdayCount);
        setFriday(fridayCount);
        setSaturday(saturdayCount);
        setSunday(sundayCount);
    }

    const renderPage = () => {
        return (
            <View>
                <View style={styles.barChart}>
                    <Text style={styles.text}>{moment().format('MMMM')}</Text>
                    <BarChart
                        data={{
                            labels: [
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thu',
                                'Fri',
                                'Sat',
                                'Sun',
                            ],
                            datasets: [
                                {
                                    data: [
                                        monday,
                                        tuesday,
                                        wednesday,
                                        thursday,
                                        friday,
                                        saturday,
                                        sunday,
                                    ],
                                },
                            ],
                        }}
                        width={screenWidth / 1.05}
                        height={220}
                        withInnerLines={false}
                        showBarTops={
                            monday == 0 &&
                                tuesday == 0 &&
                                wednesday == 0 &&
                                thursday == 0 &&
                                friday == 0 &&
                                saturday == 0 &&
                                sunday == 0 ?
                                true : false
                        }
                        withHorizontalLabels={
                            monday == 0 &&
                                tuesday == 0 &&
                                wednesday == 0 &&
                                thursday == 0 &&
                                friday == 0 &&
                                saturday == 0 &&
                                sunday == 0 ?
                                false : true
                        }
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

                    <Text style={styles.subHeading}>Monday</Text>
                    <Text>You were drowsy {monday} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>Tuesday</Text>
                    <Text>You were drowsy {tuesday} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>Wednesday</Text>
                    <Text>You were drowsy {wednesday} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>Thursday</Text>
                    <Text>You were drowsy {thursday} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>Friday</Text>
                    <Text>You were drowsy {friday} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>Saturday</Text>
                    <Text>You were drowsy {saturday} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>Sunday</Text>
                    <Text>You were drowsy {sunday} times.</Text>
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