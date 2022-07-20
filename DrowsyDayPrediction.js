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

export default function DrowsyDayPrediction({ data }) {
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
                    objectsArray.push(documentSnapshot.id.split(',')[0] + ',' + documentSnapshot.id.split(',')[1]);
                });
                setDrowsyVals(objectsArray);
            });
        dataArray();
        setTime();
        mean();
        variance();
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
            if (val.split(',')[1].split(':')[0] == '00') {
                twelveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '01') {
                oneMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '02') {
                twoMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '03') {
                threeMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '04') {
                fourMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '05') {
                fiveMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '06') {
                sixMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '07') {
                sevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '08') {
                eightMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '09') {
                nineMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '10') {
                tenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '11') {
                elevenMorningCount++;
            } else if (val.split(',')[1].split(':')[0] == '12') {
                twelveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '13') {
                oneAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '14') {
                twoAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '15') {
                threeAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '16') {
                fourAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '17') {
                fiveAfternoonCount++;
            } else if (val.split(',')[1].split(':')[0] == '18') {
                sixEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '19') {
                sevenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '20') {
                eightEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '21') {
                nineEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '22') {
                tenEveningCount++;
            } else if (val.split(',')[1].split(':')[0] == '23') {
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

        hourLabel();
    }

    const [twelveMorningDataLabel, setTwelveMorningDataLabel] = useState([]);
    const [oneMorningDataLabel, setOneMorningDataLabel] = useState([]);
    const [twoMorningDataLabel, setTwoMorningDataLabel] = useState([]);
    const [threeMorningDataLabel, setThreeMorningDataLabel] = useState([]);
    const [fourMorningDataLabel, setFourMorningDataLabel] = useState([]);
    const [fiveMorningDataLabel, setFiveMorningDataLabel] = useState([]);
    const [sixMorningDataLabel, setSixMorningDataLabel] = useState([]);
    const [sevenMorningDataLabel, setSevenMorningDataLabel] = useState([]);
    const [eightMorningDataLabel, setEightMorningDataLabel] = useState([]);
    const [nineMorningDataLabel, setNineMorningDataLabel] = useState([]);
    const [tenMorningDataLabel, setTenMorningDataLabel] = useState([]);
    const [elevenMorningDataLabel, setElevenMorningDataLabel] = useState([]);
    const [twelveAfternoonDataLabel, setTwelveAfternoonDataLabel] = useState([]);
    const [oneAfternoonDataLabel, setOneAfternoonDataLabel] = useState([]);
    const [twoAfternoonDataLabel, setTwoAfternoonDataLabel] = useState([]);
    const [threeAfternoonDataLabel, setThreeAfternoonDataLabel] = useState([]);
    const [fourAfternoonDataLabel, setFourAfternoonDataLabel] = useState([]);
    const [fiveAfternoonDataLabel, setFiveAfternoonDataLabel] = useState([]);
    const [sixEveningDataLabel, setSixEveningDataLabel] = useState([]);
    const [sevenEveningDataLabel, setSevenEveningDataLabel] = useState([]);
    const [eightEveningDataLabel, setEightEveningDataLabel] = useState([]);
    const [nineEveningDataLabel, setNineEveningDataLabel] = useState([]);
    const [tenEveningDataLabel, setTenEveningDataLabel] = useState([]);
    const [elevenEveningDataLabel, setElevenEveningDataLabel] = useState([]);
    const hourLabel = () => {
        const obj1 = [];
        const obj2 = [];
        const obj3 = [];
        const obj4 = [];
        const obj5 = [];
        const obj6 = [];
        const obj7 = [];
        const obj8 = [];
        const obj9 = [];
        const obj10 = [];
        const obj11 = [];
        const obj12 = [];
        const obj13 = [];
        const obj14 = [];
        const obj15 = [];
        const obj16 = [];
        const obj17 = [];
        const obj18 = [];
        const obj19 = [];
        const obj20 = [];
        const obj21 = [];
        const obj22 = [];
        const obj23 = [];
        const obj24 = [];

        currentData.forEach((val) => {
            if (val.split(',')[1].split(':')[0] == '00') {
                obj1.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '01') {
                obj2.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '02') {
                obj3.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '03') {
                obj4.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '04') {
                obj5.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '05') {
                obj6.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '06') {
                obj7.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '07') {
                obj8.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '08') {
                obj9.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '09') {
                obj10.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '10') {
                obj11.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '11') {
                obj12.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '12') {
                obj13.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '13') {
                obj14.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '14') {
                obj15.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '15') {
                obj16.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '16') {
                obj17.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '17') {
                obj18.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '18') {
                obj19.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '19') {
                obj20.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '20') {
                obj21.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '21') {
                obj22.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '22') {
                obj23.push(val.split(',')[1].split(':')[1]);
            } else if (val.split(',')[1].split(':')[0] == '23') {
                obj24.push(val.split(',')[1].split(':')[1]);
            } else { null }
        });

        valuesInHour0(obj1);
        valuesInHour1(obj2);
        valuesInHour2(obj3);
        valuesInHour3(obj4);
        valuesInHour4(obj5);
        valuesInHour5(obj6);
        valuesInHour6(obj7);
        valuesInHour7(obj8);
        valuesInHour8(obj9);
        valuesInHour9(obj10);
        valuesInHour10(obj11);
        valuesInHour11(obj12);
        valuesInHour12(obj13);
        valuesInHour13(obj14);
        valuesInHour14(obj15);
        valuesInHour15(obj16);
        valuesInHour16(obj17);
        valuesInHour17(obj18);
        valuesInHour18(obj19);
        valuesInHour19(obj20);
        valuesInHour20(obj21);
        valuesInHour21(obj22);
        valuesInHour22(obj23);
        valuesInHour23(obj24);

        let twelveMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let oneMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let twoMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let threeMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let fourMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let fiveMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let sixMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let sevenMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let eightMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let nineMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let tenMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let elevenMorningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let twelveAfternoonArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let oneAfternoonArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let twoAfternoonArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let threeAfternoonArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let fourAfternoonArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let fiveAfternoonArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let sixEveningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let sevenEveningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let eightEveningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let nineEveningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let tenEveningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let elevenEveningArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

        let arr1 = obj1.filter((val, id, array) => array.indexOf(val) == id);
        arr1.forEach((element) => {
            twelveMorningArray[element] = element;
        });

        let arr2 = obj2.filter((val, id, array) => array.indexOf(val) == id);
        arr2.forEach((element) => {
            oneMorningArray[element] = element;
        });

        let arr3 = obj3.filter((val, id, array) => array.indexOf(val) == id);
        arr3.forEach((element) => {
            twoMorningArray[element] = element;
        });

        let arr4 = obj4.filter((val, id, array) => array.indexOf(val) == id);
        arr4.forEach((element) => {
            threeMorningArray[element] = element;
        });

        let arr5 = obj5.filter((val, id, array) => array.indexOf(val) == id);
        arr5.forEach((element) => {
            fourMorningArray[element] = element;
        });

        let arr6 = obj6.filter((val, id, array) => array.indexOf(val) == id);
        arr6.forEach((element) => {
            fiveMorningArray[element] = element;
        });

        let arr7 = obj7.filter((val, id, array) => array.indexOf(val) == id);
        arr7.forEach((element) => {
            sixMorningArray[element] = element;
        });

        let arr8 = obj8.filter((val, id, array) => array.indexOf(val) == id);
        arr8.forEach((element) => {
            sevenMorningArray[element] = element;
        });

        let arr9 = obj9.filter((val, id, array) => array.indexOf(val) == id);
        arr9.forEach((element) => {
            eightMorningArray[element] = element;
        });

        let arr10 = obj10.filter((val, id, array) => array.indexOf(val) == id);
        arr10.forEach((element) => {
            nineMorningArray[element] = element;
        });

        let arr11 = obj11.filter((val, id, array) => array.indexOf(val) == id);
        arr11.forEach((element) => {
            tenMorningArray[element] = element;
        });

        let arr12 = obj12.filter((val, id, array) => array.indexOf(val) == id);
        arr12.forEach((element) => {
            elevenMorningArray[element] = element;
        });

        let arr13 = obj13.filter((val, id, array) => array.indexOf(val) == id);
        arr13.forEach((element) => {
            twelveAfternoonArray[element] = element;
        });

        let arr14 = obj14.filter((val, id, array) => array.indexOf(val) == id);
        arr14.forEach((element) => {
            oneAfternoonArray[element] = element;
        });

        let arr15 = obj15.filter((val, id, array) => array.indexOf(val) == id);
        arr15.forEach((element) => {
            twoAfternoonArray[element] = element;
        });

        let arr16 = obj16.filter((val, id, array) => array.indexOf(val) == id);
        arr16.forEach((element) => {
            threeAfternoonArray[element] = element;
        });

        let arr17 = obj17.filter((val, id, array) => array.indexOf(val) == id);
        arr17.forEach((element) => {
            fourAfternoonArray[element] = element;
        });

        let arr18 = obj18.filter((val, id, array) => array.indexOf(val) == id);
        arr18.forEach((element) => {
            fiveAfternoonArray[element] = element;
        });

        let arr19 = obj19.filter((val, id, array) => array.indexOf(val) == id);
        arr19.forEach((element) => {
            sixEveningArray[element] = element;
        });

        let arr20 = obj20.filter((val, id, array) => array.indexOf(val) == id);
        arr20.forEach((element) => {
            sevenEveningArray[element] = element;
        });

        let arr21 = obj21.filter((val, id, array) => array.indexOf(val) == id);
        arr21.forEach((element) => {
            eightEveningArray[element] = element;
        });

        let arr22 = obj22.filter((val, id, array) => array.indexOf(val) == id);
        arr22.forEach((element) => {
            nineEveningArray[element] = element;
        });

        let arr23 = obj23.filter((val, id, array) => array.indexOf(val) == id);
        arr23.forEach((element) => {
            tenEveningArray[element] = element;
        });

        let arr24 = obj24.filter((val, id, array) => array.indexOf(val) == id);
        arr24.forEach((element) => {
            elevenEveningArray[element] = element;
        });


        setTwelveMorningDataLabel(twelveMorningArray);
        setOneMorningDataLabel(oneMorningArray);
        setTwoMorningDataLabel(twoMorningArray);
        setThreeMorningDataLabel(threeMorningArray);
        setFourMorningDataLabel(fourMorningArray);
        setFiveMorningDataLabel(fiveMorningArray);
        setSixMorningDataLabel(sixMorningArray);
        setSevenMorningDataLabel(sevenMorningArray);
        setEightMorningDataLabel(eightMorningArray);
        setNineMorningDataLabel(nineMorningArray);
        setTenMorningDataLabel(tenMorningArray);
        setElevenMorningDataLabel(elevenMorningArray);
        setTwelveAfternoonDataLabel(twelveAfternoonArray);
        setOneAfternoonDataLabel(oneAfternoonArray);
        setTwoAfternoonDataLabel(twoAfternoonArray);
        setThreeAfternoonDataLabel(threeAfternoonArray);
        setFourAfternoonDataLabel(fourAfternoonArray);
        setFiveAfternoonDataLabel(fiveAfternoonArray);
        setSixEveningDataLabel(sixEveningArray);
        setSevenEveningDataLabel(sevenEveningArray);
        setEightEveningDataLabel(eightEveningArray);
        setNineEveningDataLabel(nineEveningArray);
        setTenEveningDataLabel(tenEveningArray);
        setElevenEveningDataLabel(elevenEveningArray);
    }


    const [twelveMorningData, setTwelveMorningData] = useState([]);
    const [oneMorningData, setOneMorningData] = useState([]);
    const [twoMorningData, setTwoMorningData] = useState([]);
    const [threeMorningData, setThreeMorningData] = useState([]);
    const [fourMorningData, setFourMorningData] = useState([]);
    const [fiveMorningData, setFiveMorningData] = useState([]);
    const [sixMorningData, setSixMorningData] = useState([]);
    const [sevenMorningData, setSevenMorningData] = useState([]);
    const [eightMorningData, setEightMorningData] = useState([]);
    const [nineMorningData, setNineMorningData] = useState([]);
    const [tenMorningData, setTenMorningData] = useState([]);
    const [elevenMorningData, setElevenMorningData] = useState([]);
    const [twelveAfternoonData, setTwelveAfternoonData] = useState([]);
    const [oneAfternoonData, setOneAfternoonData] = useState([]);
    const [twoAfternoonData, setTwoAfternoonData] = useState([]);
    const [threeAfternoonData, setThreeAfternoonData] = useState([]);
    const [fourAfternoonData, setFourAfternoonData] = useState([]);
    const [fiveAfternoonData, setFiveAfternoonData] = useState([]);
    const [sixEveningData, setSixEveningData] = useState([]);
    const [sevenEveningData, setSevenEveningData] = useState([]);
    const [eightEveningData, setEightEveningData] = useState([]);
    const [nineEveningData, setNineEveningData] = useState([]);
    const [tenEveningData, setTenEveningData] = useState([]);
    const [elevenEveningData, setElevenEveningData] = useState([]);
    const valuesInHour0 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setTwelveMorningData(allTimes);
    }

    const valuesInHour1 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setOneMorningData(allTimes);
    }

    const valuesInHour2 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setTwoMorningData(allTimes);
    }

    const valuesInHour3 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setThreeMorningData(allTimes);
    }

    const valuesInHour4 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setFourMorningData(allTimes);
    }

    const valuesInHour5 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setFiveMorningData(allTimes);
    }

    const valuesInHour6 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setSixMorningData(allTimes);
    }

    const valuesInHour7 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setSevenMorningData(allTimes);
    }

    const valuesInHour8 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setEightMorningData(allTimes);
    }

    const valuesInHour9 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setNineMorningData(allTimes);
    }

    const valuesInHour10 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setTenMorningData(allTimes);
    }

    const valuesInHour11 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setElevenMorningData(allTimes);
    }

    const valuesInHour12 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setTwelveAfternoonData(allTimes);
    }

    const valuesInHour13 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setOneAfternoonData(allTimes);
    }

    const valuesInHour14 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setTwoAfternoonData(allTimes);
    }

    const valuesInHour15 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setThreeAfternoonData(allTimes);
    }

    const valuesInHour16 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setFourAfternoonData(allTimes);
    }

    const valuesInHour17 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setFiveAfternoonData(allTimes);
    }

    const valuesInHour18 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setSixEveningData(allTimes);
    }

    const valuesInHour19 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setSevenEveningData(allTimes);
    }

    const valuesInHour20 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setEightEveningData(allTimes);
    }

    const valuesInHour21 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setNineEveningData(allTimes);
    }

    const valuesInHour22 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setTenEveningData(allTimes);
    }

    const valuesInHour23 = (val) => {
        let zero = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let six = 0;
        let seven = 0;
        let eight = 0;
        let nine = 0;
        let ten = 0;
        let eleven = 0;
        let twelve = 0;
        let thirteen = 0;
        let fourteen = 0;
        let fifteen = 0;
        let sixteen = 0;
        let seventeen = 0;
        let eighteen = 0;
        let nineteen = 0;
        let twenty = 0;
        let twentyone = 0;
        let twentytwo = 0;
        let twentythree = 0;
        let twentyfour = 0;
        let twentyfive = 0;
        let twentysix = 0;
        let twentyseven = 0;
        let twentyeight = 0;
        let twentynine = 0;
        let thirty = 0;
        let thirtyone = 0;
        let thirtytwo = 0;
        let thirtythree = 0;
        let thirtyfour = 0;
        let thirtyfive = 0;
        let thirtysix = 0;
        let thirtyseven = 0;
        let thirtyeight = 0;
        let thirtynine = 0;
        let fourty = 0;
        let fourtyone = 0;
        let fourtytwo = 0;
        let fourtythree = 0;
        let fourtyfour = 0;
        let fourtyfive = 0;
        let fourtysix = 0;
        let fourtyseven = 0;
        let fourtyeight = 0;
        let fourtynine = 0;
        let fifty = 0;
        let fiftyone = 0;
        let fiftytwo = 0;
        let fiftythree = 0;
        let fiftyfour = 0;
        let fiftyfive = 0;
        let fiftysix = 0;
        let fiftyseven = 0;
        let fiftyeight = 0;
        let fiftynine = 0;

        val.forEach((val) => {
            if (val == "00") {
                zero++;
            } else if (val == "01") {
                one++;
            } else if (val == "02") {
                two++;
            } else if (val == "03") {
                three++;
            } else if (val == "04") {
                four++;
            } else if (val == "05") {
                five++;
            } else if (val == "06") {
                six++;
            } else if (val == "07") {
                seven++;
            } else if (val == "08") {
                eight++;
            } else if (val == "09") {
                nine++;
            } else if (val == "10") {
                ten++;
            } else if (val == "11") {
                eleven++;
            } else if (val == "12") {
                twelve++;
            } else if (val == "13") {
                thirteen++;
            } else if (val == "14") {
                fourteen++;
            } else if (val == "15") {
                fifteen++;
            } else if (val == "16") {
                sixteen++;
            } else if (val == "17") {
                seventeen++;
            } else if (val == "18") {
                eighteen++;
            } else if (val == "19") {
                nineteen++;
            } else if (val == "20") {
                twenty++;
            } else if (val == "21") {
                twentyone++;
            } else if (val == "22") {
                twentytwo++;
            } else if (val == "23") {
                twentythree++;
            } else if (val == "24") {
                twentyfour++;
            } else if (val == "25") {
                twentyfive++;
            } else if (val == "26") {
                twentysix++;
            } else if (val == "27") {
                twentyseven++;
            } else if (val == "28") {
                twentyeight++;
            } else if (val == "29") {
                twentynine++;
            } else if (val == "30") {
                thirty++;
            } else if (val == "31") {
                thirtyone++;
            } else if (val == "32") {
                thirtytwo++;
            } else if (val == "33") {
                thirtythree++;
            } else if (val == "34") {
                thirtyfour++;
            } else if (val == "35") {
                thirtyfive++;
            } else if (val == "36") {
                thirtysix++;
            } else if (val == "37") {
                thirtyseven++;
            } else if (val == "38") {
                thirtyeight++;
            } else if (val == "39") {
                thirtynine++;
            } else if (val == "40") {
                fourty++;
            } else if (val == "41") {
                fourtyone++;
            } else if (val == "42") {
                fourtytwo++;
            } else if (val == "43") {
                fourtythree++;
            } else if (val == "44") {
                fourtyfour++;
            } else if (val == "45") {
                fourtyfive++;
            } else if (val == "46") {
                fourtysix++;
            } else if (val == "47") {
                fourtyseven++;
            } else if (val == "48") {
                fourtyeight++;
            } else if (val == "49") {
                fourtynine++;
            } else if (val == "50") {
                fifty++;
            } else if (val == "51") {
                fiftyone++;
            } else if (val == "52") {
                fiftytwo++;
            } else if (val == "53") {
                fiftythree++;
            } else if (val == "54") {
                fiftyfour++;
            } else if (val == "55") {
                fiftyfive++;
            } else if (val == "56") {
                fiftysix++;
            } else if (val == "57") {
                fiftyseven++;
            } else if (val == "58") {
                fiftyeight++;
            } else if (val == "59") {
                fiftynine++;
            } else {
                null;
            }
        });

        const allTimes = [];

        allTimes.push(
            zero,
            one,
            two,
            three,
            four,
            five,
            six,
            seven,
            eight,
            nine,
            ten,
            eleven,
            twelve,
            thirteen,
            fourteen,
            fifteen,
            sixteen,
            seventeen,
            eighteen,
            nineteen,
            twenty,
            twentyone,
            twentytwo,
            twentythree,
            twentyfour,
            twentyfive,
            twentysix,
            twentyseven,
            twentyeight,
            twentynine,
            thirty,
            thirtyone,
            thirtytwo,
            thirtythree,
            thirtyfour,
            thirtyfive,
            thirtysix,
            thirtyseven,
            thirtyeight,
            thirtynine,
            fourty,
            fourtyone,
            fourtytwo,
            fourtythree,
            fourtyfour,
            fourtyfive,
            fourtysix,
            fourtyseven,
            fourtyeight,
            fourtynine,
            fifty,
            fiftyone,
            fiftytwo,
            fiftythree,
            fiftyfour,
            fiftyfive,
            fiftysix,
            fiftyseven,
            fiftyeight,
            fiftynine
        );
        setElevenEveningData(allTimes);
    }

    const [meanValue, setMeanValue] = useState(0);
    const mean = () => {
        let sum =
            twelveMorning +
            oneMorning +
            twoMorning +
            threeMorning +
            fourMorning +
            fiveMorning +
            sixMorning +
            sevenMorning +
            eightMorning +
            nineMorning +
            tenMorning +
            elevenMorning +
            twelveAfternoon +
            oneAfternoon +
            twoAfternoon +
            threeAfternoon +
            fourAfternoon +
            fiveAfternoon +
            sixEvening +
            sevenEvening +
            eightEvening +
            nineEvening +
            tenEvening +
            elevenEvening;
        let count = 24;
        let meanVal = sum / count;

        setMeanValue(Number((meanVal).toFixed(0)));
        return meanVal;
    }

    //Population Variance
    const variance = () => {
        let twelveMorningDiff = meanValue - twelveMorning;
        let oneMorningDiff = meanValue - oneMorning;
        let twoMorningDiff = meanValue - twoMorning;
        let threeMorningDiff = meanValue - threeMorning;
        let fourMorningDiff = meanValue - fourMorning;
        let fiveMorningDiff = meanValue - fiveMorning;
        let sixMorningDiff = meanValue - sixMorning;
        let sevenMorningDiff = meanValue - sevenMorning;
        let eightMorningDiff = meanValue - eightMorning;
        let nineMorningDiff = meanValue - nineMorning;
        let tenMorningDiff = meanValue - tenMorning;
        let elevenMorningDiff = meanValue - elevenMorning;
        let twelveAfternoonDiff = meanValue - twelveAfternoon;
        let oneAfternoonDiff = meanValue - oneAfternoon;
        let twoAfternoonDiff = meanValue - twoAfternoon;
        let threeAfternoonDiff = meanValue - threeAfternoon;
        let fourAfternoonDiff = meanValue - fourAfternoon;
        let fiveAfternoonDiff = meanValue - fiveAfternoon;
        let sixEveningDiff = meanValue - sixEvening;
        let sevenEveningDiff = meanValue - sevenEvening;
        let eightEveningDiff = meanValue - eightEvening;
        let nineEveningDiff = meanValue - nineEvening;
        let tenEveningDiff = meanValue - tenEvening;
        let elevenEveningDiff = meanValue - elevenEvening;

        let count = 24;

        let varianceVal = (
            (twelveMorningDiff ** 2) +
            (oneMorningDiff ** 2) +
            (twoMorningDiff ** 2) +
            (threeMorningDiff ** 2) +
            (fourMorningDiff ** 2) +
            (fiveMorningDiff ** 2) +
            (sixMorningDiff ** 2) +
            (sevenMorningDiff ** 2) +
            (eightMorningDiff ** 2) +
            (nineMorningDiff ** 2) +
            (tenMorningDiff ** 2) +
            (elevenMorningDiff ** 2) +
            (twelveAfternoonDiff ** 2) +
            (oneAfternoonDiff ** 2) +
            (twoAfternoonDiff ** 2) +
            (threeAfternoonDiff ** 2) +
            (fourAfternoonDiff ** 2) +
            (fiveAfternoonDiff ** 2) +
            (sixEveningDiff ** 2) +
            (sevenEveningDiff ** 2) +
            (eightEveningDiff ** 2) +
            (nineEveningDiff ** 2) +
            (tenEveningDiff ** 2) +
            (elevenEveningDiff ** 2)
        ) / count;

        standardDeviation(varianceVal);
        return varianceVal;
    }

    const [standardDeviationValue, setStandardDeviationValue] = useState(0);
    const standardDeviation = (val) => {
        let standardDeviationVal = Number((Math.sqrt(val)).toFixed(0));

        setStandardDeviationValue(standardDeviationVal);
        return standardDeviationVal;
    }

    const twelMorDriveOrNo = () => {
        if (twelveMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (twelveMorning <= meanValue + standardDeviationValue && twelveMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (twelveMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const oneMorDriveOrNo = () => {
        if (oneMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (oneMorning <= meanValue + standardDeviationValue && oneMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (oneMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const twoMorDriveOrNo = () => {
        if (twoMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (twoMorning <= meanValue + standardDeviationValue && twoMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (twoMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const threeMorDriveOrNo = () => {
        if (threeMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (threeMorning <= meanValue + standardDeviationValue && threeMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (threeMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const fourMorDriveOrNo = () => {
        if (fourMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (fourMorning <= meanValue + standardDeviationValue && fourMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (fourMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const fiveMorDriveOrNo = () => {
        if (fiveMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (fiveMorning <= meanValue + standardDeviationValue && fiveMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (fiveMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const sixMorDriveOrNo = () => {
        if (sixMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (sixMorning <= meanValue + standardDeviationValue && sixMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (sixMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const sevenMorDriveOrNo = () => {
        if (sevenMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (sevenMorning <= meanValue + standardDeviationValue && sevenMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (sevenMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const eightMorDriveOrNo = () => {
        if (eightMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (eightMorning <= meanValue + standardDeviationValue && eightMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (eightMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const nineMorDriveOrNo = () => {
        if (nineMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (nineMorning <= meanValue + standardDeviationValue && nineMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (nineMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const tenMorDriveOrNo = () => {
        if (tenMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (tenMorning <= meanValue + standardDeviationValue && tenMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (tenMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const elevenMorDriveOrNo = () => {
        if (elevenMorning > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (elevenMorning <= meanValue + standardDeviationValue && elevenMorning >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (elevenMorning < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const twelveAftDriveOrNo = () => {
        if (twelveAfternoon > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (twelveAfternoon <= meanValue + standardDeviationValue && twelveAfternoon >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (twelveAfternoon < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const oneAftDriveOrNo = () => {
        if (oneAfternoon > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (oneAfternoon <= meanValue + standardDeviationValue && oneAfternoon >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (oneAfternoon < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const twoAftDriveOrNo = () => {
        if (twoAfternoon > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (twoAfternoon <= meanValue + standardDeviationValue && twoAfternoon >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (twoAfternoon < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const threeAftDriveOrNo = () => {
        if (threeAfternoon > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (threeAfternoon <= meanValue + standardDeviationValue && threeAfternoon >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (threeAfternoon < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const fourAftDriveOrNo = () => {
        if (fourAfternoon > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (fourAfternoon <= meanValue + standardDeviationValue && fourAfternoon >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (fourAfternoon < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const fiveAftDriveOrNo = () => {
        if (fiveAfternoon > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (fiveAfternoon <= meanValue + standardDeviationValue && fiveAfternoon >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (fiveAfternoon < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const sixEveDriveOrNo = () => {
        if (sixEvening > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (sixEvening <= meanValue + standardDeviationValue && sixEvening >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (sixEvening < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const sevenEveDriveOrNo = () => {
        if (sevenEvening > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (sevenEvening <= meanValue + standardDeviationValue && sevenEvening >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (sevenEvening < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const eightEveDriveOrNo = () => {
        if (eightEvening > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (eightEvening <= meanValue + standardDeviationValue && eightEvening >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (eightEvening < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const nineEveDriveOrNo = () => {
        if (nineEvening > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (nineEvening <= meanValue + standardDeviationValue && nineEvening >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (nineEvening < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const tenEveDriveOrNo = () => {
        if (tenEvening > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (tenEvening <= meanValue + standardDeviationValue && tenEvening >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (tenEvening < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const elevenEveDriveOrNo = () => {
        if (elevenEvening > meanValue + standardDeviationValue) {
            return 'It is advisable that you drive less during this hour.';
        } else if (elevenEvening <= meanValue + standardDeviationValue && elevenEvening >= meanValue) {
            return 'You should take precautions while driving during this hour.';
        } else if (elevenEvening < meanValue) {
            return 'It is alright to drive during this hour.';
        }
    }

    const renderPage = () => {
        return (
            //Hours
            <View>
                {
                    twelveMorning == 0 &&
                        oneMorning == 0 &&
                        twoMorning == 0 &&
                        threeMorning == 0 &&
                        fourMorning == 0 &&
                        fiveMorning == 0 &&
                        sixMorning == 0 &&
                        sevenMorning == 0 &&
                        eightMorning == 0 &&
                        nineMorning == 0 &&
                        tenMorning == 0 &&
                        elevenMorning == 0 &&
                        twelveAfternoon == 0 &&
                        oneAfternoon == 0 &&
                        twoAfternoon == 0 &&
                        threeAfternoon == 0 &&
                        fourAfternoon == 0 &&
                        fiveAfternoon == 0 &&
                        sixEvening == 0 &&
                        sevenEvening == 0 &&
                        eightEvening == 0 &&
                        nineEvening == 0 &&
                        tenEvening == 0 &&
                        elevenEvening == 0 ?

                        <View style={styles.barChart}>
                            <Text style={styles.text}>Morning • Late Morning</Text>
                            <BarChart
                                data={{
                                    labels: ['null'],
                                    datasets: [
                                        {
                                            data: [
                                                0,
                                            ],
                                        },
                                    ],
                                }}
                                width={screenWidth / 1.05}
                                height={220}
                                withInnerLines={false}
                                showBarTops={true}
                                withHorizontalLabels={false}
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

                        :

                        <View>
                            <View style={{ flexDirection: "row" }}>
                                {twelveMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>12am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [twelveMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: twelveMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {oneMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>1am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [oneMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: oneMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {twoMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>2am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [twoMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: twoMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {threeMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>3am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [threeMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: threeMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {fourMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>4am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [fourMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: fourMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                            paddingRight: 30,
                                            paddingTop: 22,
                                            marginTop: -15,
                                        }}
                                    />
                                </View>}

                                {fiveMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>5am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [fiveMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: fiveMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {sixMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>6am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [sixMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: sixMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {sevenMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>7am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [sevenMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: sevenMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {eightMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>12am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [eightMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: eightMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {nineMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>9am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [nineMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: nineMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {tenMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>10am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [tenMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: tenMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {elevenMorning == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>11am</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [elevenMorningDataLabel],
                                            datasets: [
                                                {
                                                    data: elevenMorningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}


                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {twelveAfternoon == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>12pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [twelveAfternoonDataLabel],
                                            datasets: [
                                                {
                                                    data: twelveAfternoonData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {oneAfternoon == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>1pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [oneAfternoonDataLabel],
                                            datasets: [
                                                {
                                                    data: oneAfternoonData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {twoAfternoon == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>2pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [twoAfternoonDataLabel],
                                            datasets: [
                                                {
                                                    data: twoAfternoonData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {threeAfternoon == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>3pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [threeAfternoonDataLabel],
                                            datasets: [
                                                {
                                                    data: threeAfternoonData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {fourAfternoon == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>4pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [fourAfternoonDataLabel],
                                            datasets: [
                                                {
                                                    data: fourAfternoonData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {fiveAfternoon == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>5pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [fiveAfternoonDataLabel],
                                            datasets: [
                                                {
                                                    data: fiveAfternoonData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {sixEvening == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>6pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [sixEveningDataLabel],
                                            datasets: [
                                                {
                                                    data: sixEveningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {sevenEvening == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>7pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [sevenEveningDataLabel],
                                            datasets: [
                                                {
                                                    data: sevenEveningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {eightEvening == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>8pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [eightEveningDataLabel],
                                            datasets: [
                                                {
                                                    data: eightEveningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {nineEvening == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>9pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [nineEveningDataLabel],
                                            datasets: [
                                                {
                                                    data: nineEveningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                {tenEvening == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>10pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [tenEveningDataLabel],
                                            datasets: [
                                                {
                                                    data: tenEveningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}

                                {elevenEvening == 0 ? null : <View style={styles.barChart}>
                                    <Text style={styles.text}>11pm</Text>
                                    <LineChart
                                        bezier
                                        data={{
                                            labels: [elevenEveningDataLabel],
                                            datasets: [
                                                {
                                                    data: elevenEveningData
                                                },
                                            ],
                                        }}
                                        width={screenWidth / 2.3}
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
                                </View>}
                            </View>
                        </View>
                }


                <View style={styles.analysis}>
                    <Text style={styles.text}>Results</Text>
                    <Text>Today, you were drowsy on an average of {meanValue == 0 ? 'less than 1' : meanValue} time(s).</Text>
                    <Text />
                    <Text>If you are not drowsy for more than {meanValue == 0 ? '1' : meanValue} time(s) today, you have a higher chance at reaching your destination safely.
                        If you are drowsy for more than {meanValue == 0 ? '1' : meanValue} time(s) today, you should drive less and find other modes of transportation.
                        If your drowsy score is {meanValue + standardDeviationValue} times and above,
                        you should not be driving today, instead it is advisable to carpool or taxi to your destination.
                    </Text>
                    <Text />
                    <Text />

                    <Text style={styles.subHeading}>12am</Text>
                    <Text>You were drowsy {twelveMorning} times. {twelMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>1am</Text>
                    <Text>You were drowsy {oneMorning} times. {oneMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>2am</Text>
                    <Text>You were drowsy {twoMorning} times. {twoMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>3am</Text>
                    <Text>You were drowsy {threeMorning} times. {threeMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>4am</Text>
                    <Text>You were drowsy {fourMorning} times. {fourMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>5am</Text>
                    <Text>You were drowsy {fiveMorning} times. {fiveMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>6am</Text>
                    <Text>You were drowsy {sixMorning} times. {sixMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>7am</Text>
                    <Text>You were drowsy {sevenMorning} times. {sevenMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>8am</Text>
                    <Text>You were drowsy {eightMorning} times. {eightMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>9am</Text>
                    <Text>You were drowsy {nineMorning} times. {nineMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>10am</Text>
                    <Text>You were drowsy {tenMorning} times. {tenMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>11am</Text>
                    <Text>You were drowsy {elevenMorning} times. {elevenMorDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>12pm</Text>
                    <Text>You were drowsy {twelveAfternoon} times. {twelveAftDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>1pm</Text>
                    <Text>You were drowsy {oneAfternoon} times. {oneAftDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>2pm</Text>
                    <Text>You were drowsy {twoAfternoon} times. {twoAftDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>3pm</Text>
                    <Text>You were drowsy {threeAfternoon} times. {threeAftDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>4pm</Text>
                    <Text>You were drowsy {fourAfternoon} times. {fourAftDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>5pm</Text>
                    <Text>You were drowsy {fiveAfternoon} times. {fiveAftDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>6pm</Text>
                    <Text>You were drowsy {sixEvening} times. {sixEveDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>7pm</Text>
                    <Text>You were drowsy {sevenEvening} times. {sevenEveDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>8pm</Text>
                    <Text>You were drowsy {eightEvening} times. {eightEveDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>9pm</Text>
                    <Text>You were drowsy {nineEvening} times. {nineEveDriveOrNo()}</Text>
                    <Text />

                    <Text style={styles.subHeading}>10pm</Text>
                    <Text>You were drowsy {tenEvening} times. {tenEveDriveOrNo()}</Text>

                    <Text />

                    <Text style={styles.subHeading}>11pm</Text>
                    <Text>You were drowsy {elevenEvening} times. {elevenEveDriveOrNo()}</Text>
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
        width: screenWidth,
        marginTop: 10,
        paddingBottom: 50,
        marginLeft: 10,
        paddingRight: 20,
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
        flex: 1,
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