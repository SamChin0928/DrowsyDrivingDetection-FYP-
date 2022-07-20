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

export default function DrowsyMonthPrediction({ data }) {
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
        getCurrentDate();
    }, []);

    //Loading user data (Drowsiness) from firebase and using split function to transform the data from the results
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
        // var day = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        return month + '-' + year;
    }

    //Get the date from the transformed data in the drowsyVals array
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
    //Counting the number of times the app detects the user's drowsiness in specific days 
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

        mean(mondayCount + tuesdayCount + wednesdayCount + thursdayCount + fridayCount + saturdayCount + sundayCount);
        variance(mondayCount, tuesdayCount, wednesdayCount, thursdayCount, fridayCount, saturdayCount, sundayCount);
    }

    //Get the average number of times the user becomes drowsy in a day
    const [meanValue, setMeanValue] = useState(0);
    const mean = (val) => {
        let sum = val;
        let count = 7;
        let meanVal = sum / count;

        setMeanValue(meanVal);
        return meanVal;
    }

    //Getting the population variance to determine the variability of the population data with respect to the mean
    const variance = (mondayCount, tuesdayCount, wednesdayCount, thursdayCount, fridayCount, saturdayCount, sundayCount) => {
        let monDiff = meanValue - mondayCount;
        let tueDiff = meanValue - tuesdayCount;
        let wedDiff = meanValue - wednesdayCount;
        let thuDiff = meanValue - thursdayCount;
        let friDiff = meanValue - fridayCount;
        let satDiff = meanValue - saturdayCount;
        let sunDiff = meanValue - sundayCount;

        let count = 7;

        let varianceVal = ((monDiff ** 2) + (tueDiff ** 2) + (wedDiff ** 2) + (thuDiff ** 2) + (friDiff ** 2) + (satDiff ** 2) + (sunDiff ** 2)) / count;

        standardDeviation(varianceVal);
        return varianceVal;
    }

    //Finding the standard deviation to as an indication of how far the drowsiness number in a day
    //varies or "deviates" from the average number of times a person gets drowsy in a day
    const [standardDeviationValue, setStandardDeviationValue] = useState(0);
    const standardDeviation = (val) => {
        let standardDeviationVal = Math.sqrt(val);

        setStandardDeviationValue(standardDeviationVal);
        return standardDeviationVal;
    }

    const monDriveOrNo = () => {
        if (monday > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you do not drive on this day.';
        } else if (monday <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && monday >= Number((meanValue).toFixed(0))) {
            return 'You may drive, but it is better if you took other modes of transport.';
        } else if (monday < Number((meanValue).toFixed(0))) {
            return 'You should drive on this day.';
        }
    }

    const tueDriveOrNo = () => {
        if (tuesday > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you do not drive on this day.';
        } else if (tuesday <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && tuesday >= Number((meanValue).toFixed(0))) {
            return 'You may drive, but it is better if you took other modes of transport.';
        } else if (tuesday < Number((meanValue).toFixed(0))) {
            return 'You should drive on this day.';
        }
    }

    const wedDriveOrNo = () => {
        if (wednesday > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you do not drive on this day.';
        } else if (wednesday <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && wednesday >= Number((meanValue).toFixed(0))) {
            return 'You may drive, but it is better if you took other modes of transport.';
        } else if (wednesday < Number((meanValue).toFixed(0))) {
            return 'You should drive on this day.';
        }
    }

    const thuDriveOrNo = () => {
        if (thursday > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you do not drive on this day.';
        } else if (thursday <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && thursday >= Number((meanValue).toFixed(0))) {
            return 'You may drive, but it is better if you took other modes of transport.';
        } else if (thursday < Number((meanValue).toFixed(0))) {
            return 'You should drive on this day.';
        }
    }

    const friDriveOrNo = () => {
        if (friday > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you do not drive on this day.';
        } else if (friday <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && friday >= Number((meanValue).toFixed(0))) {
            return 'You may drive, but it is better if you took other modes of transport.';
        } else if (friday < Number((meanValue).toFixed(0))) {
            return 'You should drive on this day.';
        }
    }

    const satDriveOrNo = () => {
        if (saturday > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you do not drive on this day.';
        } else if (saturday <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && saturday >= Number((meanValue).toFixed(0))) {
            return 'You may drive, but it is better if you took other modes of transport.';
        } else if (saturday < Number((meanValue).toFixed(0))) {
            return 'You should drive on this day.';
        }
    }

    const sunDriveOrNo = () => {
        if (sunday > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you do not drive on this day.';
        } else if (sunday <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && saturday >= Number((meanValue).toFixed(0))) {
            return 'You may drive, but it is better if you took other modes of transport.';
        } else if (sunday < Number((meanValue).toFixed(0))) {
            return 'You should drive on this day.';
        }
    }

    const renderPage = () => {
        return (
            <View>
                <View style={styles.barChart}>
                    <Text style={styles.text}>{moment().format('MMMM')}</Text>
                    <LineChart
                        bezier
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
                        withVerticalLines={false}
                        withHorizontalLines={false}
                        withDots={false}
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
                            paddingRight: 55,
                            paddingTop: 22,
                            marginTop: -15,
                        }}
                    />
                </View>

                <View style={styles.analysis}>
                    <Text style={styles.text}>Analysis of Results</Text>

                    <Text>On average, you are drowsy {Number((meanValue).toFixed(0))} times a day.</Text>
                    <Text />
                    <Text>You can still drive if you aren't drowsy for more than {Number((meanValue).toFixed(0))} times, within a day.
                        However if you are drowsy for more than {Number((meanValue).toFixed(0))} times in that day, you should be careful.
                        If you are drowsy {Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))} times or more,
                        you really should not be driving.
                    </Text>
                    <Text />
                    <Text />

                    <Text style={styles.subHeading}>Monday</Text>
                    <Text>You were drowsy {monday} times. {monDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>Tuesday</Text>
                    <Text>You were drowsy {tuesday} times. {tueDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>Wednesday</Text>
                    <Text>You were drowsy {wednesday} times. {wedDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>Thursday</Text>
                    <Text>You were drowsy {thursday} times. {thuDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>Friday</Text>
                    <Text>You were drowsy {friday} times. {friDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>Saturday</Text>
                    <Text>You were drowsy {saturday} times. {satDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>Sunday</Text>
                    <Text>You were drowsy {sunday} times. {sunDriveOrNo()}</Text>
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