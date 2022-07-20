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

export default function DrowsyYear({ data }) {
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
        var day = new Date().getDate(); 
        var month = new Date().getMonth() + 1; 
        var year = new Date().getFullYear(); 
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

    const [jan, setJan] = useState(0);
    const [feb, setFeb] = useState(0);
    const [mar, setMar] = useState(0);
    const [apr, setApr] = useState(0);
    const [may, setMay] = useState(0);
    const [jun, setJun] = useState(0);
    const [jul, setJul] = useState(0);
    const [aug, setAug] = useState(0);
    const [sep, setSep] = useState(0);
    const [oct, setOct] = useState(0);
    const [nov, setNov] = useState(0);
    const [dec, setDec] = useState(0);

    const setTime = () => {
        let janCount = 0;
        let febCount = 0;
        let marCount = 0;
        let aprCount = 0;
        let mayCount = 0;
        let junCount = 0;
        let julCount = 0;
        let augCount = 0;
        let sepCount = 0;
        let octCount = 0;
        let novCount = 0;
        let decCount = 0;

        currentData.forEach((val) => {
            if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                janCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                febCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                marCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                aprCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                mayCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                junCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                julCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                augCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                sepCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                octCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                novCount++;
            } else if (moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                decCount++;
            } else { null }
        });
        setJan(janCount);
        setFeb(febCount);
        setMar(marCount);
        setApr(aprCount);
        setMay(mayCount);
        setJun(junCount);
        setJul(julCount);
        setAug(augCount);
        setSep(sepCount);
        setOct(octCount);
        setNov(novCount);
        setDec(decCount);
    }

    const renderPage = () => {
        return (
            <View>
                <View style={styles.barChart}>
                    <Text style={styles.text}>Jan - Jun, {moment().format('YYYY')}</Text>
                    <BarChart
                        data={{
                            labels: [
                                'Jan',
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                            ],
                            datasets: [
                                {
                                    data: [
                                        jan,
                                        feb,
                                        mar,
                                        apr,
                                        may,
                                        jun,
                                    ],
                                },
                            ],
                        }}
                        width={screenWidth / 1.05}
                        height={220}
                        withInnerLines={false}
                        showBarTops={
                            jan == 0 &&
                                feb == 0 &&
                                mar == 0 &&
                                apr == 0 &&
                                may == 0 &&
                                jun == 0
                                ? true :
                                false}
                        withHorizontalLabels={
                            jan == 0 &&
                                feb == 0 &&
                                mar == 0 &&
                                apr == 0 &&
                                may == 0 &&
                                jun == 0
                                ? false :
                                true}
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
                    <Text style={styles.text}>Jul - Dec, {moment().format('YYYY')}</Text>
                    <BarChart
                        data={{
                            labels: [
                                'Jul',
                                'Aug',
                                'Sep',
                                'Oct',
                                'Nov',
                                'Dec',
                            ],
                            datasets: [
                                {
                                    data: [
                                        jul,
                                        aug,
                                        sep,
                                        oct,
                                        nov,
                                        dec,
                                    ],
                                },
                            ],
                        }}
                        width={screenWidth / 1.05}
                        height={220}
                        withInnerLines={false}
                        showBarTops={
                            jul == 0 &&
                                aug == 0 &&
                                sep == 0 &&
                                oct == 0 &&
                                nov == 0 &&
                                dec == 0
                                ? true :
                                false}
                        withHorizontalLabels={
                            jul == 0 &&
                                aug == 0 &&
                                sep == 0 &&
                                oct == 0 &&
                                nov == 0 &&
                                dec == 0
                                ? false :
                                true}
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

                    <Text style={styles.subHeading}>January</Text>
                    <Text>You were drowsy {jan} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>February</Text>
                    <Text>You were drowsy {feb} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>March</Text>
                    <Text>You were drowsy {mar} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>April</Text>
                    <Text>You were drowsy {apr} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>May</Text>
                    <Text>You were drowsy {may} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>June</Text>
                    <Text>You were drowsy {jun} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>July</Text>
                    <Text>You were drowsy {jul} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>August</Text>
                    <Text>You were drowsy {aug} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>September</Text>
                    <Text>You were drowsy {sep} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>October</Text>
                    <Text>You were drowsy {oct} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>November</Text>
                    <Text>You were drowsy {nov} times.</Text>

                    <Text />

                    <Text style={styles.subHeading}>December</Text>
                    <Text>You were drowsy {dec} times.</Text>

                    <Text />
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
                        console.log(getCurrentDate2())
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