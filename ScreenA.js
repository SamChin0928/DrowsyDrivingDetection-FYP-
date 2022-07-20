//Loading in react to use react
import React from 'react';

//Loading in react-native features to help with producing visible outputs
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Pressable,
} from 'react-native';

//Loading the react native camera which is an important feature for recognising the face and marking landmarks
import { RNCamera } from 'react-native-camera';

//Loading react native sound player so that the app can play the alarm sound when the driver gets drowsy
import SoundPlayer from 'react-native-sound-player'

import firestore from '@react-native-firebase/firestore';

//import DeviceInfo which will help us to get UniqueId
import DeviceInfo from 'react-native-device-info';

import moment from 'moment';

//Initialising size of the landwmark that will be placed on the recognised face
const landmarkSize = 2;

export default class ScreenA extends React.Component {

    //Declaring the of all the values needed by the react native application
    state = {
        zoom: 0,
        autoFocus: 'on',
        autoFocusPoint: {
            normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
            drawRectPosition: {
                x: Dimensions.get('window').width * 0.5 - 32,
                y: Dimensions.get('window').height * 0.5 - 32,
            },
        },
        depth: 0,
        type: 'front', // Camera Front or Back
        whiteBalance: 'auto',
        ratio: '16:9',
        canDetectFaces: false,
        canDetectText: false,
        canDetectBarcode: false,
        faces: [],
        blinkDetected: false,
        drowsy: 0,
        inPipMode: false,
        deviceId: 'deviceID',
        drowsyVals: [],
        threshold: 0
    };

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    //Initialising a decrement function to help decrease the drowsy points(Points that help indicate if the driver is drowsy or not)
    decrement() {
        if (this.state.drowsy === 0) {
            this.setState({
                drowsy: 0
            });
        } else {
            this.setState(prevState => ({
                drowsy: prevState.drowsy - 1
            }));
        }
    }

    //Create function that detects the face picked up by the camera, and states the probability of a facial feature
    facesDetected = ({ faces }) => {
        const rightEye = faces[0].rightEyeOpenProbability;
        const leftEye = faces[0].leftEyeOpenProbability;
        const bothEyes = (rightEye + leftEye) / 2;

        if (bothEyes <= 0.3) {
            console.log("Closed");
            this.setState({ blinkDetected: true, drowsy: this.state.drowsy + 1 });
            console.log("Drowsiness" + this.state.drowsy);
        }
        if (bothEyes >= 0.9) {
            console.log("Open");
            this.setState({ blinkDetected: false });
            this.decrement();
            console.log("Drowsiness" + this.state.drowsy);
        }
        this.setState({ faces });
    };

    //Create function that renders the box which helps to indicate where the face is
    renderFace = ({
        bounds,
        faceID,
        rollAngle,
        yawAngle,
        leftEyeOpenProbability,
        rightEyeOpenProbability,
    }) => (
        <View
            key={faceID}
            transform={[
                { perspective: 600 },
                { rotateZ: `${rollAngle.toFixed(0)}deg` },
                { rotateY: `${yawAngle.toFixed(0)}deg` },
            ]}
            style={[
                styles.face,
                {
                    ...bounds.size,
                    left: bounds.origin.x,
                    top: bounds.origin.y,
                },
            ]}>
            <Text style={styles.faceText}>ID: {faceID}</Text>
            <Text style={styles.faceText}>
                eyeOpenProbability:
                {leftEyeOpenProbability + rightEyeOpenProbability / 2}
            </Text>
        </View>
    );

    //Create function that renders landmarks in the created box above that indicates certain facial features
    renderLandmarksOfFace(face) {
        const renderLandmark = position =>
            position && (
                <View
                    style={[
                        styles.landmark,
                        {
                            left: position.x - landmarkSize / 2,
                            top: position.y - landmarkSize / 2,
                        },
                    ]}
                />
            );
        return (
            <View key={`landmarks-${face.faceID}`}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
                {renderLandmark(face.leftEarPosition)}
                {renderLandmark(face.rightEarPosition)}
                {renderLandmark(face.leftCheekPosition)}
                {renderLandmark(face.rightCheekPosition)}
                {renderLandmark(face.leftMouthPosition)}
                {renderLandmark(face.mouthPosition)}
                {renderLandmark(face.rightMouthPosition)}
                {renderLandmark(face.noseBasePosition)}
                {renderLandmark(face.bottomMouthPosition)}
            </View>
        );
    }

    //Function used to render the box that indicates a face is recognised
    renderFaces = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderFace)}
        </View>
    );

    //Function used to render the landmarks used to indicate facial features on the detected face
    renderLandmarks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderLandmarksOfFace)}
        </View>
    );

    getCurrentTime() {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes + ':' + seconds;
    }

    getCurrentDate() {
        var day = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        return day + '-' + month + '-' + year;
    }

    addDrowsiness() {
        firestore()
            .collection(DeviceInfo.getUniqueId().toString())
            .doc(this.getCurrentDate().toString() + ',' + this.getCurrentTime().toString())
            .set({})
            .then(() => {
                console.log('Drowsiness Detected!');
            });
    }

    loadUserData() {
        firestore()
            .collection(DeviceInfo.getUniqueId().toString())
            .get()
            .then(querySnapshot => {
                const objectsArray = [];
                querySnapshot.forEach(documentSnapshot => {
                    objectsArray.push(documentSnapshot.id.split(',')[0]);
                });
                this.setState({
                    drowsyVals: objectsArray
                });
            });

    };

    weekDate() {
        let sunOfWeek = parseInt(moment().subtract(1, 'weeks').startOf('week').format('DD/MM/YYYY').split('/')[0]);
        let monOfWeek = parseInt(moment().subtract(1, 'weeks').startOf('week').format('DD/MM/YYYY').split('/')[0]) + 1;
        let tueOfWeek = parseInt(moment().subtract(1, 'weeks').startOf('week').format('DD/MM/YYYY').split('/')[0]) + 2;
        let wedOfWeek = parseInt(moment().subtract(1, 'weeks').startOf('week').format('DD/MM/YYYY').split('/')[0]) + 3;
        let thuOfWeek = parseInt(moment().subtract(1, 'weeks').startOf('week').format('DD/MM/YYYY').split('/')[0]) + 4;
        let friOfWeek = parseInt(moment().subtract(1, 'weeks').startOf('week').format('DD/MM/YYYY').split('/')[0]) + 5;
        let satOfWeek = parseInt(moment().subtract(1, 'weeks').endOf('week').format('DD/MM/YYYY').split('/')[0]);

        let total = this.thresholdCount(sunOfWeek, monOfWeek, tueOfWeek, wedOfWeek, thuOfWeek, friOfWeek, satOfWeek);

        return total;
    }

    thresholdCount = (sunOfWeek, monOfWeek, tueOfWeek, wedOfWeek, thuOfWeek, friOfWeek, satOfWeek) => {
        let sunWeekCount = 0;
        let monWeekCount = 0;
        let tueWeekCount = 0;
        let wedWeekCount = 0;
        let thuWeekCount = 0;
        let friWeekCount = 0;
        let satWeekCount = 0;

        // console.log(this.state.drowsyVals);
        this.state.drowsyVals.forEach((val) => {
            if (parseInt(val.split('-')[0]) == sunOfWeek) {
                sunWeekCount++;
            } else if (parseInt(val.split('-')[0]) == monOfWeek) {
                monWeekCount++;
            } else if (parseInt(val.split('-')[0]) == tueOfWeek) {
                tueWeekCount++;
            } else if (parseInt(val.split('-')[0]) == wedOfWeek) {
                wedWeekCount++;
            } else if (parseInt(val.split('-')[0]) == thuOfWeek) {
                thuWeekCount++;
            } else if (parseInt(val.split('-')[0]) == friOfWeek) {
                friWeekCount++;
            } else if (parseInt(val.split('-')[0]) == satOfWeek) {
                satWeekCount++;
            } else { null }
        });

        return [sunWeekCount, monWeekCount, tueWeekCount, wedWeekCount, thuWeekCount, friWeekCount, satWeekCount];
    }

    //Create function that plays the alarm when the driver has reached a certain drowsy point
    drowsyWarning(totalDrowsyLastWeek) {
        let sundayCount = totalDrowsyLastWeek[0];
        let mondayCount = totalDrowsyLastWeek[1];
        let tuesdayCount = totalDrowsyLastWeek[2];
        let wednesdayCount = totalDrowsyLastWeek[3];
        let thursdayCount = totalDrowsyLastWeek[4];
        let fridayCount = totalDrowsyLastWeek[5];
        let saturdayCount = totalDrowsyLastWeek[6];

        let total = sundayCount + mondayCount + tuesdayCount + wednesdayCount + thursdayCount + fridayCount + saturdayCount;

        //Get mean value of last week
        let sum = total;
        let count = 7;
        let meanVal = sum / count;

        //Get variance of last week counts
        let monDiff = meanVal - mondayCount;
        let tueDiff = meanVal - tuesdayCount;
        let wedDiff = meanVal - wednesdayCount;
        let thuDiff = meanVal - thursdayCount;
        let friDiff = meanVal - fridayCount;
        let satDiff = meanVal - saturdayCount;
        let sunDiff = meanVal - sundayCount;

        let varianceVal = ((monDiff ** 2) + (tueDiff ** 2) + (wedDiff ** 2) + (thuDiff ** 2) + (friDiff ** 2) + (satDiff ** 2) + (sunDiff ** 2)) / count;

        //Get standard deviation of last week counts
        let standardDeviationVal = Number((Math.sqrt(varianceVal)).toFixed(0));

        if (total > Number((Math.sqrt(meanVal))).toFixed(0) + standardDeviationVal) {
            if (this.state.drowsy == 5) {
                try {
                    this.addDrowsiness();
                    // play the file
                    SoundPlayer.playSoundFile('alarm', 'mp3');
                } catch (e) {
                    console.log(`cannot play the sound file`, e);
                }
            } else {
                null;
            }
        } else if (total <= Number((meanVal).toFixed(0)) + standardDeviationVal && total >= Number((meanVal).toFixed(0))) {
            if (this.state.drowsy == 7) {
                try {
                    this.addDrowsiness();
                    // play the file
                    SoundPlayer.playSoundFile('alarm', 'mp3');
                } catch (e) {
                    console.log(`cannot play the sound file`, e);
                }
            } else {
                null;
            }
        } else if (total < Number((meanVal).toFixed(0))) {
            if (this.state.drowsy == 10) {
                try {
                    this.addDrowsiness();
                    // play the file
                    SoundPlayer.playSoundFile('alarm', 'mp3');
                } catch (e) {
                    console.log(`cannot play the sound file`, e);
                }
            } else {
                null;
            }
        }  
    }

    //Function that creates the camera component which encompasses setting up the react native camera so that it works as a face detector
    renderCamera() {
        const { canDetectFaces } = this.state;

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={this.state.type}
                zoom={this.state.zoom}
                ratio={this.state.ratio}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                faceDetectionLandmarks={
                    RNCamera.Constants.FaceDetection.Landmarks
                        ? RNCamera.Constants.FaceDetection.Landmarks.all
                        : undefined
                }
                faceDetectionClassifications={
                    RNCamera.Constants.FaceDetection.Classifications.all
                        ? RNCamera.Constants.FaceDetection.Classifications.all
                        : undefined
                }
                onCameraReady={() => {
                    console.log('onCameraReady');
                    this.setState({ canDetectFaces: true });
                }}
                onFacesDetected={this.state.canDetectFaces ? this.facesDetected : null}
                onFaceDetectionError={error => console.log('FDError', error)} // This is never triggered
            >
                {this.loadUserData()}
                {this.drowsyWarning(this.weekDate())}
                {this.renderFaces()}
                {canDetectFaces && this.renderLandmarks()}
            </RNCamera >
        );
    }

    //Render function that is imperative to render the entire camera function and its components
    render() {
        return (
            <View style={styles.container}>
                {this.renderCamera()}
            </View>
        );
    }
}

//Styling values to help make the application look better
const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10
    },
    container: {
        flex: 1,
        paddingTop: 10,
        // backgroundColor: '#000',
    },
    pipButton: {
        flex: 0.3,
        height: 100,
        marginHorizontal: 2,
        marginBottom: 100,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 0.4,
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});

