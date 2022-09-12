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
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { BottomView, ButtonStyle, DisableButton } from '../Custom/CustomView';
import Login2 from './Login2';
import { Api, LocalStorage } from '../services/Api';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import { _SetAuthToken } from '../services/ApiSauce';
import messaging from '@react-native-firebase/messaging';

const { height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [clicked, setClicked] = useState(false)
  // const [userType, setUserType] = useState('Customer');
  const [hasEmailErrors, setEmailErrors] = useState(false);
  // const [otpS, setOtpS] = useState('');
  const [state, setState] = useState({
    mobile: '',
    user_type: 1,
    device_token: '',
    isLoading: false
  })
  const [selectJob, setSelectJob] = useState([
    { value: 'Customer' },
    { value: 'Project Exporter' },
    { value: 'Foreign Recruiting' },
    { value: 'Recruiting Agent' },
  ]);

  useEffect(() => {
    // deviceInfo();
    requestUserPermission();
    const unsubscribe = navigation.addListener('focus', () => {
      requestUserPermission();
    });
    return unsubscribe;
  }, [])


  async function requestUserPermission() {
    setTimeout(() => {
      let deviceName = DeviceInfo.getDeviceName();
      console.log('----deviceName: ', deviceName);
    }, 1000);

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
        console.log('++ fcmToken logn:  ' + JSON.stringify(fcmToken));
        LocalStorage.setFcmToken(fcmToken)
        setState({ ...state, device_token: fcmToken })
      }
    } catch (error) {
      console.log(error, '-------------error');
    }
  };

  // const deviceInfo = async () => {
  //   setTimeout(() => {
  //     LocalStorage.getFcmToken('fcmToken').then((fcmToken) => {
  //       console.log('------fcmToken: ', fcmToken);
  //       setState({ ...state, device_token: fcmToken })
  //     })
  //   }, 700);
  // }

   
  const loginSubmit = async () => {
    let newOtp
    setEmailErrors(!hasEmailErrors)
    let deviceId = DeviceInfo.getDeviceId();
    let deviceName = DeviceInfo.getDeviceName();
    console.log('----deviceName: ', deviceName);
    const {
      mobile = '',
      user_type = '',
      device_token = '',
    } = state
    
    if (!mobile) {
      Toast.show('Please enter your valid phone number');
      return;
    }
    
    if (mobile.length !== 10) {
      Toast.show('Mobile number must be in 10 digits');
      return;
    }
    
    setClicked(true)
    const body = {
      mobile: mobile,
      user_type: user_type,
      device_id: deviceId,
      device_token: device_token,
      model_name: deviceName,
      device_type: Platform.OS === 'ios' ? "IOS" : 'Android'
    };
    console.log('-----body: ', body);
    // return
    setState({ ...state, isLoading: true });
    const response = await Api.login(body);
    console.log("===========response from api", response)
    const { status = false, msg, otp, step, userId, token } = response;
    // console.log(token)
    if(status){
      // Toast.show(msg)
      alert(otp)
      // console.log(step)
    //   LocalStorage.setToken(token);
    // _SetAuthToken(token);
      navigation.replace('Otp', { getDetails: response, mobile: mobile });
      setClicked(false)
    }else{
      setState({ ...state, isLoading: false });
      Toast.show(msg);
      setClicked(false)
    }

    // if (status) {
    //   console.log('-----response login: ', response);
    //   setState({ ...state, isLoading: false });
    //   Toast.show(msg);
    //   if (step == 1) {
    //     navigation.replace('Register1', { userDetail: userId })
    //     Toast.show(msg);
    //     return;
    //   }
    //   if (step == 2) {
    //     navigation.replace('Register2', { userDetail: userId })
    //     Toast.show(msg);
    //     return;
    //   }
    //   if (step == 3) {
    //     navigation.replace('Register3', { userDetail: userId })
    //     Toast.show(msg);
    //     return;
    //   } else {
    //     Toast.show(response.message);
    //     // LocalStorage.setToken(token);
    //     // _SetAuthToken(token);
    //     navigation.replace('Otp', { getDetails: response, mobile: mobile });
    //   }
    // } else {
    //   // const {
    //   //   data: { msg },
    //   // } = response;
    //   setState({ ...state, isLoading: false });
    //   Toast.show(msg);
    // }
  }

  const onChangeDropdownUserType = (value, index, data) => {
    // setUserType(data[index].value);
    if (data[index].value == 'Customer') {
      setState({ ...state, user_type: 1 });
    } else if (data[index].value == 'Project Exporter') {
      setState({ ...state, user_type: 2 });
    } else if (data[index].value == 'Foreign Recruiting') {
      setState({ ...state, user_type: 3 });
    } else if (data[index].value == 'Recruiting Agent') {
      setState({ ...state, user_type: 4 });
    }
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarDark />
      <ScrollView>
        <Image style={styles.image} source={require('../images/logo.png')} />
        <View style={styles.container}>
          <Text style={styles.text}>Welcome Back</Text>
          <TextLabel title={'Select User Type'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value="Customer"
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%', marginTop: 20 }}
              dropdownPosition={-4.5}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={selectJob}
              onChangeText={(value, index, data) => {
                onChangeDropdownUserType(value, index, data);
              }}
            />
          </View>
          {/* {userType === 'Customer' ? (
            <> */}
          <TextLabel title={'Mobile Number'} />
          <TextInput
            value={state.mobile}
            onChangeText={text => setState({ ...state, mobile: text.replace(/[^0-9]/g, '') })}
            style={styles.textInput}
            placeholder={'Mobile No.'}
            keyboardType={'number-pad'}
            error={hasEmailErrors}
            maxLength={10}
          />
          {clicked ? 
            <View style={{ width: '100%', marginTop: 30 }}>
              <DisableButton title={'SUBMIT'}
                height={50}
                fontSize={16}
                bgColor={'#cccccc'}
                loader={state.isLoading}
                txtcolor={'#fff'} />
            </View> : 
          <View style={{ width: '100%', marginTop: 30 }}>
            <ButtonStyle
              title={'SUBMIT'}
              loader={state.isLoading}
              onPress={() => {
                loginSubmit();
              }}
            />
          </View>}
          <BottomView />
          {/* </>
          ) : userType === 'Project Exporter' ? (
            <Login2 />
          ) : userType === 'Foreign Recruiting' ? (
            <Login2 />
          ) : userType === 'Recruiting Agent' ? (
            <Login2 />
          ) : null} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
const TextLabel = ({ title }) => <Text style={styles.textLabel}>{title}</Text>;
const styles = StyleSheet.create({
  image: {
    marginTop: 70,
    width: 100,
    height: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Muli',
    fontSize: 19,
    fontWeight: '700',
    color: '#222B45',
    textAlign: 'center',
  },
  drops: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 15,
    // elevation: 2,
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 0,
    fontSize: 16,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    color:'#000'
  },
  textLabel: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 14,
    color: '#8F9BB3',
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 0,
  },
});
