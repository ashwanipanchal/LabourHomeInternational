import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import { LocalStorage } from '../services/Api';
import messaging from '@react-native-firebase/messaging';
import { _SetAuthToken } from '../services/ApiSauce';

const { height } = Dimensions.get('window');

const Splash = ({ navigation }) => {
  useEffect(() => {
    navigationHandler();
    requestUserPermission();
  }, [navigation]);

  const navigationHandler = async () => {
    const token = (await LocalStorage.getToken()) || '';
    const type = (await LocalStorage.getUserDetail()) || '{}';
    const approval = (await LocalStorage.getApproval()) || '';
    // console.log("check user token =======",token)
    // console.log("check user type =======",type)
    // console.log("check user approval =======",approval)
    // return
    if (token.length !== 0) {
      console.log("Token here o splash=======",{ token });
      console.log('----if')
      _SetAuthToken(token);
      const user = JSON.parse(type)
      console.log(user, "from splash checking getUserDetail()")

      const btoken = `Bearer ${token}`;
      const response = await fetch('http://139.59.67.166/Labour-Home-Job/public/api/homepage_agent',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
        "Authorization": btoken,
      }
    })
    const userApprovedData = await response.json()
    const {status, msg} = userApprovedData;

      setTimeout(() => {
        if(user.user_type === 1){

          navigation.replace('DrawerNavigator')
        }else{
          if(status){
            navigation.replace('ProjectorHome');
          }else{
            navigation.replace('Approval');
          }
          
        }
        

        // navigation.replace('DrawerNavigator')


        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'DrawerNavigator' }], // DrawerNavigator
        // });
      }, 3000);
    } else {
      console.log('----else')
      setTimeout(() => {
        navigation.replace('OnBoarding');
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'OnBoarding' }],
        // });
      }, 3000);
    }
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  }

  const getFcmToken = async () => {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        LocalStorage.setFcmToken(fcmToken)
        console.log('-------------fcmToken : ', fcmToken);
      }
    } catch (error) {
      console.log(error, '-------------error');
    }
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarDark />
      <Image style={styles.image} source={require('../images/logo.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    marginTop: height / 3,
    width: 219,
    height: 232,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
