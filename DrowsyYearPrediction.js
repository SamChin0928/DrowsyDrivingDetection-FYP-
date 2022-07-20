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

export default function DrowsyYearPrediction({ data }) {
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

    const [janToJuneTwelveMorn, setjanToJuneTwelveMorn] = useState(false);
    const [janToJuneOneMorn, setjanToJuneOneMorn] = useState(false);
    const [janToJuneTwoMorn, setjanToJuneTwoMorn] = useState(false);
    const [janToJuneThreeMorn, setjanToJuneThreeMorn] = useState(false);
    const [janToJuneFourMorn, setjanToJuneFourMorn] = useState(false);
    const [janToJuneFiveMorn, setjanToJuneFiveMorn] = useState(false);
    const [janToJuneSixMorn, setjanToJuneSixMorn] = useState(false);
    const [janToJuneSevenMorn, setjanToJuneSevenMorn] = useState(false);
    const [janToJuneEightMorn, setjanToJuneEightMorn] = useState(false);
    const [janToJuneNineMorn, setjanToJuneNineMorn] = useState(false);
    const [janToJuneTenMorn, setjanToJuneTenMorn] = useState(false);
    const [janToJuneElevenMorn, setjanToJuneElevenMorn] = useState(false);
    const [janToJuneTwelveAft, setjanToJuneTwelveAft] = useState(false);
    const [janToJuneOneAft, setjanToJuneOneAft] = useState(false);
    const [janToJuneTwoAft, setjanToJuneTwoAft] = useState(false);
    const [janToJuneThreeAft, setjanToJuneThreeAft] = useState(false);
    const [janToJuneFourAft, setjanToJuneFourAft] = useState(false);
    const [janToJuneFiveAft, setjanToJuneFiveAft] = useState(false);
    const [janToJuneSixEve, setjanToJuneSixEve] = useState(false);
    const [janToJuneSevenEve, setjanToJuneSevenEve] = useState(false);
    const [janToJuneEightEve, setjanToJuneEightEve] = useState(false);
    const [janToJuneNineEve, setjanToJuneNineEve] = useState(false);
    const [janToJuneTenEve, setjanToJuneTenEve] = useState(false);
    const [janToJuneElevenEve, setjanToJuneElevenEve] = useState(false);

    const [julToDecTwelveMorn, setjulToDecTwelveMorn] = useState(false);
    const [julToDecOneMorn, setjulToDecOneMorn] = useState(false);
    const [julToDecTwoMorn, setjulToDecTwoMorn] = useState(false);
    const [julToDecThreeMorn, setjulToDecThreeMorn] = useState(false);
    const [julToDecFourMorn, setjulToDecFourMorn] = useState(false);
    const [julToDecFiveMorn, setjulToDecFiveMorn] = useState(false);
    const [julToDecSixMorn, setjulToDecSixMorn] = useState(false);
    const [julToDecSevenMorn, setjulToDecSevenMorn] = useState(false);
    const [julToDecEightMorn, setjulToDecEightMorn] = useState(false);
    const [julToDecNineMorn, setjulToDecNineMorn] = useState(false);
    const [julToDecTenMorn, setjulToDecTenMorn] = useState(false);
    const [julToDecElevenMorn, setjulToDecElevenMorn] = useState(false);
    const [julToDecTwelveAft, setjulToDecTwelveAft] = useState(false);
    const [julToDecOneAft, setjulToDecOneAft] = useState(false);
    const [julToDecTwoAft, setjulToDecTwoAft] = useState(false);
    const [julToDecThreeAft, setjulToDecThreeAft] = useState(false);
    const [julToDecFourAft, setjulToDecFourAft] = useState(false);
    const [julToDecFiveAft, setjulToDecFiveAft] = useState(false);
    const [julToDecSixEve, setjulToDecSixEve] = useState(false);
    const [julToDecSevenEve, setjulToDecSevenEve] = useState(false);
    const [julToDecEightEve, setjulToDecEightEve] = useState(false);
    const [julToDecNineEve, setjulToDecNineEve] = useState(false);
    const [julToDecTenEve, setjulToDecTenEve] = useState(false);
    const [julToDecElevenEve, setjulToDecElevenEve] = useState(false);

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
        setHourTime();
        setHourTimeFeb();
        setHourTimeMar();
        setHourTimeApr();
        setHourTimeMay();
        setHourTimeJun();
        setHourTimeJul();
        setHourTimeAug();
        setHourTimeSep();
        setHourTimeOct();
        setHourTimeNov();
        setHourTimeDec();
        checkHourTrue();
        mean();
        variance();
    };

    const getCurrentDate = () => {
        var day = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        return month + '-' + year;
    }


    const getCurrentYear = () => {
        var year = new Date().getFullYear(); //Current Year
        return year;
    }

    const [currentData, setCurrentData] = useState([]);
    const dataArray = () => {
        const objectsArray = [];
        drowsyVals.forEach((val) => {
            if ((val.split(',')[0].split('-')[2]) == getCurrentYear()) {
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

    const [hourTimeArray, setHourTimeArray] = useState([]);
    const setHourTime = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'January') {
                elevenEveningCount++;
            } else { null }
        });


        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjanToJuneTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjanToJuneOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjanToJuneTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjanToJuneThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjanToJuneFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjanToJuneFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjanToJuneSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjanToJuneSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjanToJuneEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjanToJuneNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjanToJuneTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjanToJuneElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjanToJuneTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjanToJuneOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjanToJuneTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjanToJuneThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjanToJuneFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjanToJuneFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjanToJuneSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjanToJuneSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjanToJuneEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjanToJuneNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjanToJuneTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjanToJuneElevenEve(true);
        }

        setHourTimeArray(objArray);
    }

    const [hourTimeFebArray, setHourTimeFebArray] = useState([]);
    const setHourTimeFeb = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'February') {
                elevenEveningCount++;
            } else { null }
        });


        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjanToJuneTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjanToJuneOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjanToJuneTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjanToJuneThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjanToJuneFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjanToJuneFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjanToJuneSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjanToJuneSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjanToJuneEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjanToJuneNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjanToJuneTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjanToJuneElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjanToJuneTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjanToJuneOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjanToJuneTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjanToJuneThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjanToJuneFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjanToJuneFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjanToJuneSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjanToJuneSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjanToJuneEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjanToJuneNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjanToJuneTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjanToJuneElevenEve(true);
        }

        setHourTimeFebArray(objArray);
    }

    const [hourTimeMarArray, setHourTimeMarArray] = useState([]);
    const setHourTimeMar = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'March') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjanToJuneTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjanToJuneOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjanToJuneTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjanToJuneThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjanToJuneFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjanToJuneFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjanToJuneSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjanToJuneSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjanToJuneEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjanToJuneNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjanToJuneTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjanToJuneElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjanToJuneTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjanToJuneOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjanToJuneTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjanToJuneThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjanToJuneFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjanToJuneFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjanToJuneSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjanToJuneSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjanToJuneEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjanToJuneNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjanToJuneTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjanToJuneElevenEve(true);
        }

        setHourTimeMarArray(objArray);
    }

    const [hourTimeAprArray, setHourTimeAprArray] = useState([]);
    const setHourTimeApr = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'April') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjanToJuneTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjanToJuneOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjanToJuneTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjanToJuneThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjanToJuneFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjanToJuneFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjanToJuneSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjanToJuneSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjanToJuneEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjanToJuneNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjanToJuneTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjanToJuneElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjanToJuneTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjanToJuneOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjanToJuneTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjanToJuneThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjanToJuneFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjanToJuneFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjanToJuneSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjanToJuneSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjanToJuneEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjanToJuneNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjanToJuneTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjanToJuneElevenEve(true);
        }

        setHourTimeAprArray(objArray);
    }

    const [hourTimeMayArray, setHourTimeMayArray] = useState([]);
    const setHourTimeMay = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'May') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjanToJuneTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjanToJuneOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjanToJuneTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjanToJuneThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjanToJuneFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjanToJuneFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjanToJuneSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjanToJuneSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjanToJuneEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjanToJuneNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjanToJuneTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjanToJuneElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjanToJuneTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjanToJuneOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjanToJuneTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjanToJuneThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjanToJuneFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjanToJuneFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjanToJuneSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjanToJuneSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjanToJuneEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjanToJuneNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjanToJuneTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjanToJuneElevenEve(true);
        }

        setHourTimeMayArray(objArray);
    }

    const [hourTimeJunArray, setHourTimeJunArray] = useState([]);
    const setHourTimeJun = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'June') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjanToJuneTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjanToJuneOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjanToJuneTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjanToJuneThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjanToJuneFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjanToJuneFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjanToJuneSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjanToJuneSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjanToJuneEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjanToJuneNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjanToJuneTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjanToJuneElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjanToJuneTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjanToJuneOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjanToJuneTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjanToJuneThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjanToJuneFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjanToJuneFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjanToJuneSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjanToJuneSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjanToJuneEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjanToJuneNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjanToJuneTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjanToJuneElevenEve(true);
        }

        setHourTimeJunArray(objArray);
    }

    const [hourTimeJulArray, setHourTimeJulArray] = useState([]);
    const setHourTimeJul = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'July') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjulToDecTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjulToDecOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjulToDecTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjulToDecThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjulToDecFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjulToDecFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjulToDecSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjulToDecSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjulToDecEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjulToDecNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjulToDecTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjulToDecElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjulToDecTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjulToDecOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjulToDecTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjulToDecThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjulToDecFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjulToDecFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjulToDecSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjulToDecSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjulToDecEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjulToDecNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjulToDecTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjulToDecElevenEve(true);
        }

        setHourTimeJulArray(objArray);
    }

    const [hourTimeAugArray, setHourTimeAugArray] = useState([]);
    const setHourTimeAug = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'August') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjulToDecTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjulToDecOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjulToDecTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjulToDecThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjulToDecFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjulToDecFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjulToDecSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjulToDecSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjulToDecEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjulToDecNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjulToDecTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjulToDecElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjulToDecTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjulToDecOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjulToDecTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjulToDecThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjulToDecFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjulToDecFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjulToDecSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjulToDecSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjulToDecEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjulToDecNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjulToDecTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjulToDecElevenEve(true);
        }

        setHourTimeAugArray(objArray);
    }

    const [hourTimeSepArray, setHourTimeSepArray] = useState([]);
    const setHourTimeSep = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'September') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjulToDecTwelveMorn(true);
        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjulToDecOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjulToDecTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjulToDecThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjulToDecFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjulToDecFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjulToDecSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjulToDecSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjulToDecEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjulToDecNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjulToDecTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjulToDecElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjulToDecTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjulToDecOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjulToDecTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjulToDecThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjulToDecFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjulToDecFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjulToDecSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjulToDecSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjulToDecEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjulToDecNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjulToDecTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjulToDecElevenEve(true);
        }

        setHourTimeSepArray(objArray);
    }

    const [hourTimeOctArray, setHourTimeOctArray] = useState([]);
    const setHourTimeOct = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'October') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjulToDecTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjulToDecOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjulToDecTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjulToDecThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjulToDecFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjulToDecFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjulToDecSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjulToDecSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjulToDecEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjulToDecNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjulToDecTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjulToDecElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjulToDecTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjulToDecOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjulToDecTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjulToDecThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjulToDecFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjulToDecFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjulToDecSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjulToDecSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjulToDecEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjulToDecNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjulToDecTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjulToDecElevenEve(true);
        }

        setHourTimeOctArray(objArray);
    }

    const [hourTimeNovArray, setHourTimeNovArray] = useState([]);
    const setHourTimeNov = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'November') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjulToDecTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjulToDecOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjulToDecTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjulToDecThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjulToDecFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjulToDecFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjulToDecSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjulToDecSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjulToDecEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjulToDecNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjulToDecTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjulToDecElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjulToDecTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjulToDecOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjulToDecTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjulToDecThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjulToDecFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjulToDecFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjulToDecSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjulToDecSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjulToDecEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjulToDecNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjulToDecTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjulToDecElevenEve(true);
        }

        setHourTimeNovArray(objArray);
    }

    const [hourTimeDecArray, setHourTimeDecArray] = useState([]);
    const setHourTimeDec = () => {
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

        let objArray = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23' && moment(val.split(',')[0], 'DD-MM-YYYY').format('MMMM') == 'December') {
                elevenEveningCount++;
            } else { null }
        });

        if (twelveMorningCount != 0) {
            objArray.push(twelveMorningCount);
            setjulToDecTwelveMorn(true);

        }

        if (oneMorningCount != 0) {
            objArray.push(oneMorningCount);
            setjulToDecOneMorn(true);
        }

        if (twoMorningCount != 0) {
            objArray.push(twoMorningCount);
            setjulToDecTwoMorn(true);
        }

        if (threeMorningCount != 0) {
            objArray.push(threeMorningCount);
            setjulToDecThreeMorn(true);
        }

        if (fourMorningCount != 0) {
            objArray.push(fourMorningCount);
            setjulToDecFourMorn(true);
        }

        if (fiveMorningCount != 0) {
            objArray.push(fiveMorningCount);
            setjulToDecFiveMorn(true);
        }

        if (sixMorningCount != 0) {
            objArray.push(sixMorningCount);
            setjulToDecSixMorn(true);
        }

        if (sevenMorningCount != 0) {
            objArray.push(sevenMorningCount);
            setjulToDecSevenMorn(true);
        }

        if (eightMorningCount != 0) {
            objArray.push(eightMorningCount);
            setjulToDecEightMorn(true);
        }

        if (nineMorningCount != 0) {
            objArray.push(nineMorningCount);
            setjulToDecNineMorn(true);
        }

        if (tenMorningCount != 0) {
            objArray.push(tenMorningCount);
            setjulToDecTenMorn(true);
        }

        if (elevenMorningCount != 0) {
            objArray.push(elevenMorningCount);
            setjulToDecElevenMorn(true);
        }

        if (twelveAfternoonCount != 0) {
            objArray.push(twelveAfternoonCount);
            setjulToDecTwelveAft(true);
        }

        if (oneAfternoonCount != 0) {
            objArray.push(oneAfternoonCount);
            setjulToDecOneAft(true);
        }

        if (twoAfternoonCount != 0) {
            objArray.push(twoAfternoonCount);
            setjulToDecTwoAft(true);
        }

        if (threeAfternoonCount != 0) {
            objArray.push(threeAfternoonCount);
            setjulToDecThreeAft(true);
        }

        if (fourAfternoonCount != 0) {
            objArray.push(fourAfternoonCount);
            setjulToDecFourAft(true);
        }

        if (fiveAfternoonCount != 0) {
            objArray.push(fiveAfternoonCount);
            setjulToDecFiveAft(true);
        }

        if (sixEveningCount != 0) {
            objArray.push(sixEveningCount);
            setjulToDecSixEve(true);
        }

        if (sevenEveningCount != 0) {
            objArray.push(sevenEveningCount);
            setjulToDecSevenEve(true);
        }

        if (eightEveningCount != 0) {
            objArray.push(eightEveningCount);
            setjulToDecEightEve(true);
        }

        if (nineEveningCount != 0) {
            objArray.push(nineEveningCount);
            setjulToDecNineEve(true);
        }

        if (tenEveningCount != 0) {
            objArray.push(tenEveningCount);
            setjulToDecTenEve(true);
        }

        if (elevenEveningCount != 0) {
            objArray.push(elevenEveningCount);
            setjulToDecElevenEve(true);
        }

        setHourTimeDecArray(objArray);
    }


    const [trueHours, setTrueHours] = useState([]);
    const [trueColors, setTrueColors] = useState([]);
    const [trueHoursJulToDec, setTrueHoursJulToDec] = useState([]);
    const [trueColorsJulToDec, setTrueColorsJulToDec] = useState([]);
    const checkHourTrue = () => {
        let obj = [];
        let objColor = [];

        janToJuneTwelveMorn == true ? obj.push("12am") : null;
        janToJuneOneMorn == true ? obj.push("1am") : null;
        janToJuneTwoMorn == true ? obj.push("2am") : null;
        janToJuneThreeMorn == true ? obj.push('3am') : null;
        janToJuneFourMorn == true ? obj.push("4am") : null;
        janToJuneFiveMorn == true ? obj.push("5am") : null;
        janToJuneSixMorn == true ? obj.push("6am") : null;
        janToJuneSevenMorn == true ? obj.push('7am') : null;
        janToJuneEightMorn == true ? obj.push("8am") : null;
        janToJuneNineMorn == true ? obj.push("9am") : null;
        janToJuneTenMorn == true ? obj.push("10am") : null;
        janToJuneElevenMorn == true ? obj.push('11am') : null;
        janToJuneTwelveAft == true ? obj.push("12pm") : null;
        janToJuneOneAft == true ? obj.push("1pm") : null;
        janToJuneTwoAft == true ? obj.push("2pm") : null;
        janToJuneThreeAft == true ? obj.push('3pm') : null;
        janToJuneFourAft == true ? obj.push("4pm") : null;
        janToJuneFiveAft == true ? obj.push("5pm") : null;
        janToJuneSixEve == true ? obj.push('6pm') : null;
        janToJuneSevenEve == true ? obj.push("7pm") : null;
        janToJuneEightEve == true ? obj.push("8pm") : null;
        janToJuneNineEve == true ? obj.push('9pm') : null;
        janToJuneTenEve == true ? obj.push("10pm") : null;
        janToJuneElevenEve == true ? obj.push("11pm") : null;

        janToJuneTwelveMorn == true ? objColor.push("#FE0000") : null;
        janToJuneOneMorn == true ? objColor.push("#307CFC") : null;
        janToJuneTwoMorn == true ? objColor.push("#B32821") : null;
        janToJuneThreeMorn == true ? objColor.push("#8F8B66") : null;
        janToJuneFourMorn == true ? objColor.push("#924E7D") : null;
        janToJuneFiveMorn == true ? objColor.push("#C6B158") : null;
        janToJuneSixMorn == true ? objColor.push("#ED760E") : null;
        janToJuneSevenMorn == true ? objColor.push("#781F19") : null;
        janToJuneEightMorn == true ? objColor.push("#F75E25") : null;
        janToJuneNineMorn == true ? objColor.push("#F7C57D") : null;
        janToJuneTenMorn == true ? objColor.push("#1D1E33") : null;
        janToJuneElevenMorn == true ? objColor.push("#C48404") : null;
        janToJuneTwelveAft == true ? objColor.push("#FF988D") : null;
        janToJuneOneAft == true ? objColor.push("#89AC76") : null;
        janToJuneTwoAft == true ? objColor.push("#CA0EF2") : null;
        janToJuneThreeAft == true ? objColor.push("#E1CC4F") : null;
        janToJuneFourAft == true ? objColor.push("#D95030") : null;
        janToJuneFiveAft == true ? objColor.push("#B5B8B1") : null;
        janToJuneSixEve == true ? objColor.push('#CFD3CD') : null;
        janToJuneSevenEve == true ? objColor.push('#640BE8') : null;
        janToJuneEightEve == true ? objColor.push('#B32821') : null;
        janToJuneNineEve == true ? objColor.push('#606E8C') : null;
        janToJuneTenEve == true ? objColor.push('#7ACAEB') : null;
        janToJuneElevenEve == true ? objColor.push('#BDECB6') : null;

        setTrueHours(obj);
        setTrueColors(objColor);

        let objJulToDec = [];
        let objColorJulToDec = [];

        julToDecTwelveMorn == true ? objJulToDec.push("12am") : null;
        julToDecOneMorn == true ? objJulToDec.push("1am") : null;
        julToDecTwoMorn == true ? objJulToDec.push("2am") : null;
        julToDecThreeMorn == true ? objJulToDec.push('3am') : null;
        julToDecFourMorn == true ? objJulToDec.push("4am") : null;
        julToDecFiveMorn == true ? objJulToDec.push("5am") : null;
        julToDecSixMorn == true ? objJulToDec.push("6am") : null;
        julToDecSevenMorn == true ? objJulToDec.push('7am') : null;
        julToDecEightMorn == true ? objJulToDec.push("8am") : null;
        julToDecNineMorn == true ? objJulToDec.push("9am") : null;
        julToDecTenMorn == true ? objJulToDec.push("10am") : null;
        julToDecElevenMorn == true ? objJulToDec.push('11am') : null;
        julToDecTwelveAft == true ? objJulToDec.push("12pm") : null;
        julToDecOneAft == true ? objJulToDec.push("1pm") : null;
        julToDecTwoAft == true ? objJulToDec.push("2pm") : null;
        julToDecThreeAft == true ? objJulToDec.push('3pm') : null;
        julToDecFourAft == true ? objJulToDec.push("4pm") : null;
        julToDecFiveAft == true ? objJulToDec.push("5pm") : null;
        julToDecSixEve == true ? objJulToDec.push('6pm') : null;
        julToDecSevenEve == true ? objJulToDec.push("7pm") : null;
        julToDecEightEve == true ? objJulToDec.push("8pm") : null;
        julToDecNineEve == true ? objJulToDec.push('9pm') : null;
        julToDecTenEve == true ? objJulToDec.push("10pm") : null;
        julToDecElevenEve == true ? objJulToDec.push("11pm") : null;

        julToDecTwelveMorn == true ? objColorJulToDec.push("#FE0000") : null;
        julToDecOneMorn == true ? objColorJulToDec.push("#307CFC") : null;
        julToDecTwoMorn == true ? objColorJulToDec.push("#31B66A") : null;
        julToDecThreeMorn == true ? objColorJulToDec.push("#8F8B66") : null;
        julToDecFourMorn == true ? objColorJulToDec.push("#924E7D") : null;
        julToDecFiveMorn == true ? objColorJulToDec.push("#C6B158") : null;
        julToDecSixMorn == true ? objColorJulToDec.push("#ED760E") : null;
        julToDecSevenMorn == true ? objColorJulToDec.push("#781F19") : null;
        julToDecEightMorn == true ? objColorJulToDec.push("#1E1DA9") : null;
        julToDecNineMorn == true ? objColorJulToDec.push("#F7C57D") : null;
        julToDecTenMorn == true ? objColorJulToDec.push("#1D1E33") : null;
        julToDecElevenMorn == true ? objColorJulToDec.push("#C48404") : null;
        julToDecTwelveAft == true ? objColorJulToDec.push("#FF988D") : null;
        julToDecOneAft == true ? objColorJulToDec.push("#89AC76") : null;
        julToDecTwoAft == true ? objColorJulToDec.push("#CA0EF2") : null;
        julToDecThreeAft == true ? objColorJulToDec.push("#E1CC4F") : null;
        julToDecFourAft == true ? objColorJulToDec.push("#D95030") : null;
        julToDecFiveAft == true ? objColorJulToDec.push("#B5B8B1") : null;
        julToDecSixEve == true ? objColorJulToDec.push('#CFD3CD') : null;
        julToDecSevenEve == true ? objColorJulToDec.push('#640BE8') : null;
        julToDecEightEve == true ? objColorJulToDec.push('#B32821') : null;
        julToDecNineEve == true ? objColorJulToDec.push('#606E8C') : null;
        julToDecTenEve == true ? objColorJulToDec.push('#7ACAEB') : null;
        julToDecElevenEve == true ? objColorJulToDec.push('#BDECB6') : null;

        setTrueHoursJulToDec(objJulToDec);
        setTrueColorsJulToDec(objColorJulToDec);
    }

    const [meanValue, setMeanValue] = useState(0);
    const mean = () => {
        let sum = jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec;
        let count = 12;
        let meanVal = sum / count;

        setMeanValue(meanVal);
        return meanVal;
    }

    //Population Variance
    const variance = () => {
        let janDiff = meanValue - jan;
        let febDiff = meanValue - feb;
        let marDiff = meanValue - mar;
        let aprDiff = meanValue - apr;
        let mayDiff = meanValue - may;
        let junDiff = meanValue - jun;
        let julDiff = meanValue - jul;
        let augDiff = meanValue - aug;
        let sepDiff = meanValue - sep;
        let octDiff = meanValue - oct;
        let novDiff = meanValue - nov;
        let decDiff = meanValue - dec;

        let count = 12;

        let varianceVal = ((janDiff ** 2) + (febDiff ** 2) + (marDiff ** 2) + (aprDiff ** 2) + (mayDiff ** 2) + (junDiff ** 2) + (julDiff ** 2) + (augDiff ** 2) + (sepDiff ** 2) + (octDiff ** 2) + (novDiff ** 2) + (decDiff ** 2)) / count;

        standardDeviation(varianceVal);
        return varianceVal;
    }

    const [standardDeviationValue, setStandardDeviationValue] = useState(0);
    const standardDeviation = (val) => {
        let standardDeviationVal = Math.sqrt(val);

        setStandardDeviationValue(standardDeviationVal);
        return standardDeviationVal;
    }

    const janDriveOrNo = () => {
        if (jan > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (jan <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && jan >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (jan < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const febDriveOrNo = () => {
        if (feb > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (feb <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && feb >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (feb < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const marDriveOrNo = () => {
        if (mar > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (mar <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && mar >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (mar < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const aprDriveOrNo = () => {
        if (apr > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (apr <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && apr >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (apr < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const mayDriveOrNo = () => {
        if (may > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (may <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && may >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (may < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const junDriveOrNo = () => {
        if (jun > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (jun <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && jun >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (jun < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const julDriveOrNo = () => {
        if (jul > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (jul <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && jul >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (jul < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const augDriveOrNo = () => {
        if (aug > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (aug <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && aug >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (aug < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const sepDriveOrNo = () => {
        if (sep > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (sep <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && sep >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (sep < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const octDriveOrNo = () => {
        if (oct > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (oct <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && oct >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (oct < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const novDriveOrNo = () => {
        if (nov > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (nov <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && nov >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (nov < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const decDriveOrNo = () => {
        if (dec > Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))) {
            return 'It is advisable that you drive less during this month.';
        } else if (dec <= Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0)) && dec >= Number((meanValue).toFixed(0))) {
            return 'You should take precautions while driving during this month.';
        } else if (dec < Number((meanValue).toFixed(0))) {
            return 'It is alright to drive during this month.';
        }
    }

    const renderPage = () => {
        return (
            <View>
                {/* <View>
                    <Text style={{ marginTop: 10, fontWeight: 'bold', marginBottom: 10 }}>
                        Color Legend
                    </Text>
                    <View style={{ flexDirection: 'row', height: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#FE0000' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                12am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#307CFC' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                1am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#31B66A' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                2am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#8F8B66' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                3am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#924E7D' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                4am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#C6B158' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                5am
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', height: 20, marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#ED760E' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                6am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#781F19' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                7am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#1E1DA9' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                8am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#F7C57D' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                9am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#1D1E33' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                10am
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#C48404' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                11am
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', height: 20, marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#FF988D' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                12pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#89AC76' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                1pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#CA0EF2' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                2pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#E1CC4F' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                3pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#D95030' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                4pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#B5B8B1' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                5pm
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', height: 20, marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#CFD3CD' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                6pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#640BE8' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                7pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#B32821' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                8pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#606E8C' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                9pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#7ACAEB' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                10pm
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1, backgroundColor: '#BDECB6' }} />
                            <Text style={{ flex: 2, marginLeft: 5 }}>
                                11pm
                            </Text>
                        </View>
                    </View>
                </View> */}
                {/* <View style={styles.barChart}>
                    <Text style={styles.text}>Jan - Jun, {moment().format('YYYY')}</Text>
                    {hourTimeArray.every(item => item === 0) && hourTimeFebArray.every(item => item === 0) && hourTimeMarArray.every(item => item === 0) && hourTimeAprArray.every(item => item === 0) && hourTimeMayArray.every(item => item === 0) && hourTimeJunArray.every(item => item === 0) ?
                        <StackedBarChart
                            data={
                                {
                                    labels: [null],
                                    legend: [null],
                                    data: [
                                        [1],
                                    ],
                                    barColors: ["#dfe4ea"]
                                }
                            }
                            width={screenWidth / 1.05}
                            height={200}
                            chartConfig={{
                                backgroundColor: '#d4f1ff',
                                backgroundGradientFrom: '#d4f1ff',
                                backgroundGradientTo: '#d4f1ff',
                                decimalPlaces: 0.5,
                                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                                fillShadowGradient: '#001feb',
                                fillShadowGradientOpacity: 1,
                            }}
                            style={{
                                borderRadius: 16,
                                marginLeft: -4,
                            }}
                        />
                        :
                        <StackedBarChart
                            data={
                                {
                                    labels: ["Jan", "Feb", 'Mar', 'Apr', 'May', 'Jun'],
                                    legend: trueHours,
                                    data: [
                                        hourTimeArray,
                                        hourTimeFebArray,
                                        hourTimeMarArray,
                                        hourTimeAprArray,
                                        hourTimeMayArray,
                                        hourTimeJunArray,
                                    ],
                                    barColors: trueColors
                                }
                            }
                            width={screenWidth / 1.05}
                            height={700}
                            withHorizontalLabels={false}
                            chartConfig={{
                                backgroundColor: '#d4f1ff',
                                backgroundGradientFrom: '#d4f1ff',
                                backgroundGradientTo: '#d4f1ff',
                                decimalPlaces: 10,
                                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                                fillShadowGradient: '#001feb',
                                fillShadowGradientOpacity: 1,
                            }}
                            style={{
                                borderRadius: 16,
                                marginLeft: -4,
                            }}
                        />
                    }
                </View>

                <View style={styles.barChart}>
                    <Text style={styles.text}>Jul - Dec, {moment().format('YYYY')}</Text>
                    {hourTimeJulArray.every(item => item === 0) && hourTimeAugArray.every(item => item === 0) && hourTimeSepArray.every(item => item === 0) && hourTimeOctArray.every(item => item === 0) && hourTimeNovArray.every(item => item === 0) && hourTimeDecArray.every(item => item === 0) ?
                        <StackedBarChart
                            data={
                                {
                                    labels: [null],
                                    legend: [null],
                                    data: [
                                        [1],
                                    ],
                                    barColors: ["#dfe4ea"]
                                }
                            }
                            width={screenWidth / 1.05}
                            height={200}
                            chartConfig={{
                                backgroundColor: '#d4f1ff',
                                backgroundGradientFrom: '#d4f1ff',
                                backgroundGradientTo: '#d4f1ff',
                                decimalPlaces: 0.5,
                                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                                fillShadowGradient: '#001feb',
                                fillShadowGradientOpacity: 1,
                            }}
                            style={{
                                borderRadius: 16,
                                marginLeft: -4,
                            }}
                        />
                        :
                        <StackedBarChart
                            data={
                                {
                                    labels: ["Jul", "Aug", 'Sep', 'Oct', 'Nov', 'Dec'],
                                    legend: trueHoursJulToDec,
                                    data: [
                                        hourTimeJulArray,
                                        hourTimeAugArray,
                                        hourTimeSepArray,
                                        hourTimeOctArray,
                                        hourTimeNovArray,
                                        hourTimeDecArray,
                                    ],
                                    barColors: trueColorsJulToDec
                                }
                            }
                            width={screenWidth / 1.05}
                            height={700}
                            withHorizontalLabels={false}
                            chartConfig={{
                                backgroundColor: '#d4f1ff',
                                backgroundGradientFrom: '#d4f1ff',
                                backgroundGradientTo: '#d4f1ff',
                                decimalPlaces: 10,
                                color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                                fillShadowGradient: '#001feb',
                                fillShadowGradientOpacity: 1,
                            }}
                            style={{
                                borderRadius: 16,
                                marginLeft: -4,
                            }}
                        />
                    }
                </View> */}

                <View>
                    <PieChart
                        data={[
                            {
                                name: "January",
                                drowsy: jan,
                                color: "#FE0000",
                                legendFontColor: "#FE0000",
                                legendFontSize: 15
                            },
                            {
                                name: "February",
                                drowsy: feb,
                                color: "#307CFC",
                                legendFontColor: "#307CFC",
                                legendFontSize: 15
                            },
                            {
                                name: "March",
                                drowsy: mar,
                                color: "#31B66A",
                                legendFontColor: "#31B66A",
                                legendFontSize: 15
                            },
                            {
                                name: "April",
                                drowsy: apr,
                                color: "#8F8B66",
                                legendFontColor: "#8F8B66",
                                legendFontSize: 15
                            },
                            {
                                name: "May",
                                drowsy: may,
                                color: "#924E7D",
                                legendFontColor: "#924E7D",
                                legendFontSize: 15
                            },
                            {
                                name: "June",
                                drowsy: jun,
                                color: "#C6B158",
                                legendFontColor: "#C6B158",
                                legendFontSize: 15
                            },
                            {
                                name: "July",
                                drowsy: jul,
                                color: "#ED760E",
                                legendFontColor: "#ED760E",
                                legendFontSize: 15
                            },
                            {
                                name: "August",
                                drowsy: aug,
                                color: "#781F19",
                                legendFontColor: "#781F19",
                                legendFontSize: 15
                            },
                            {
                                name: "September",
                                drowsy: sep,
                                color: "#1E1DA9",
                                legendFontColor: "#1E1DA9",
                                legendFontSize: 15
                            },
                            {
                                name: "October",
                                drowsy: oct,
                                color: "#F7C57D",
                                legendFontColor: "#F7C57D",
                                legendFontSize: 15
                            },
                            {
                                name: "November",
                                drowsy: nov,
                                color: "#1D1E33",
                                legendFontColor: "#1D1E33",
                                legendFontSize: 15
                            },
                            {
                                name: "December",
                                drowsy: dec,
                                color: "#C48404",
                                legendFontColor: "#C48404",
                                legendFontSize: 15
                            }

                        ]}

                        chartConfig={{
                            backgroundColor: '#d4f1ff',
                            backgroundGradientFrom: '#d4f1ff',
                            backgroundGradientTo: '#d4f1ff',
                            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                        }}

                        width={screenWidth}
                        height={300}
                        accessor={"drowsy"}
                        backgroundColor={"transparent"}
                        paddingLeft={"35"}
                        center={[0, 5]}
                        absolute
                    />
                </View>

                <View style={styles.analysis}>
                    <Text style={styles.text}>Analysis of Results</Text>
                    <Text>In a month, you are drowsy on an average of {Number((meanValue).toFixed(0))} times.</Text>
                    <Text />
                    <Text>If you are not drowsy for more than {Number((meanValue).toFixed(0))} times in that month, driving will be safer.
                        If you are drowsy for more than {Number((meanValue).toFixed(0))} times during that month, you should drive less and find other modes of transportation.
                        If your drowsy score is {Number((meanValue).toFixed(0)) + Number((standardDeviationValue).toFixed(0))} times and above,
                        you really should not be driving during that month or at least you should cut down driving to a minimum.
                    </Text>
                    <Text />

                    <Text style={styles.subHeading}>January</Text>
                    <Text>You were drowsy {jan} times. {janDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>February</Text>
                    <Text>You were drowsy {feb} times. {febDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>March</Text>
                    <Text>You were drowsy {mar} times. {marDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>April</Text>
                    <Text>You were drowsy {apr} times. {aprDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>May</Text>
                    <Text>You were drowsy {may} times. {mayDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>June</Text>
                    <Text>You were drowsy {jun} times. {junDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>July</Text>
                    <Text>You were drowsy {jul} times. {julDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>August</Text>
                    <Text>You were drowsy {aug} times. {augDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>September</Text>
                    <Text>You were drowsy {sep} times. {sepDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>October</Text>
                    <Text>You were drowsy {oct} times. {octDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>November</Text>
                    <Text>You were drowsy {nov} times. {novDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>December</Text>
                    <Text>You were drowsy {dec} times. {decDriveOrNo()}</Text>

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