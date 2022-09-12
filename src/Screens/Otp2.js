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
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { BottomView, ButtonStyle } from '../Custom/CustomView';
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../services/Api';
import { _SetAuthToken } from '../services/ApiSauce';
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';

const STATIC_TIME = 60 * 2;
const { height } = Dimensions.get('window');

const Otp2 = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [veriryOtp, setVeriryOtp] = useState(route.params?.getDetails.otp);
  const [token, setToken] = useState(route.params?.getDetails.token);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(STATIC_TIME);

  useEffect(() => {
    console.log('------getDetails: ', route.params?.getDetails);
  }, [])

  /* Countdown Handle */
  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);


  const dispatch = useDispatch();
  const verifyHandler = async () => {
    // navigation.navigate('PostJob'); //DrawerNavigator
    if (!otp) {
      Toast.show('Please enter your OTP');
      return;
    }
    if (otp != veriryOtp) {
      Toast.show('Please enter your invalid OTP');
      return;
    }
    const body = {
      mobile: route.params?.mobile,
    };
    console.log('-----body: ', body);
    setIsLoading({ isLoading: true });
    const response = await Api.verfiyOtp(body);
    console.log('-----response after OTP SCREEN : ', response);
    const { status = false, message, token, user = {} } = response;
    if (status) {
      LocalStorage.setToken(token);
      _SetAuthToken(token);
      dispatch(actions.SetUserDetail(user));
      LocalStorage.setUserDetail(JSON.stringify(user));
      Toast.show(message);
      console.log("user is here ===== ",user)
      console.log("user is here ===== ",token)
      navigation.replace('DrawerNavigator', {
        user:user,
        token
      });
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'DrawerNavigator' }],
      // });
      setIsLoading({ isLoading: false });
    }
  }

  const resendHandler = async () => {
    setSeconds(STATIC_TIME)
  }

  /* Handle time */
  var tempMinutes = Math.floor(seconds / 60);
  var tempSeconds = seconds - tempMinutes * 60;
  let countDown = `${tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes}:${tempSeconds < 10 ? `0${tempSeconds}` : tempSeconds}`;

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarDark />
      <ScrollView>
        <Image style={styles.image} source={require('../images/logo.png')} />
        <View style={styles.container}>
          <Text style={styles.text}>OTP Verification</Text>
          <TextLabel title={'Code from SMS'} />
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            // code={state.otp}
            onCodeChanged={text => {
              setOtp(text.replace(/[^0-9]/g, ''));
              console.log('--------otp: ', +text);
            }}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
          <Text style={styles.bottomText}>Didn’t you receive any code?</Text>
          <Text style={styles.bottomSubtext}>
            {/* Resend a new code.{' '} */}
            <Text onPress={() => { resendHandler() }} style={{ color: '#2574FF' }}>Resend a new code.</Text>
          </Text>
          <View style={{ width: '100%', marginTop: 30 }}>
            <ButtonStyle
              title={'VERIFY'}
              disabled={seconds > 0 ? false : true}
              loader={isLoading}
              borderColor={seconds > 0 ? '#2574FF' : '#D4D4D4'}
              bgColor={seconds > 0 ? '#2574FF' : '#D4D4D4'}
              onPress={() => {
                verifyHandler();
              }}
            />
          </View>
          <BottomView />
        </View>
        <View style={styles.smsBox}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 20, height: 20, marginLeft: 10, marginTop: 3 }}
              source={require('../images/info.png')}
            />
            <Text style={styles.smsText}>
              SMS was sent to your {`\n`}number
              <Text style={{ fontWeight: '700' }}> {route.params?.mobile}</Text> valid
              {`\n`}
              for
              <Text style={{ fontWeight: '700' }}> {countDown}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Otp2;
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
  },
  text: {
    fontFamily: 'Muli',
    fontSize: 19,
    fontWeight: '700',
    color: '#222B45',
    textAlign: 'center',
  },
  textLabel: {
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    fontSize: 17,
    color: '#8F9BB3',
    marginHorizontal: 25,
    marginTop: 30,
    marginBottom: 0,
  },
  otpInput: {
    height: 60,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#fff',
    borderRadius: 20,
    fontFamily: 'Muli-SemiBold',
    fontSize: 22,
    fontWeight: '700',
    color: '#100C08',
  },
  underlineStyleHighLighted: {
    width: 60,
    height: 60,
    borderRadius: 20,
    fontFamily: 'Muli',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#fff',
  },
  bottomText: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 14,
    color: '#222B45',
    textAlign: 'center',
  },
  bottomSubtext: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 14,
    color: '#222B45',
    textAlign: 'center',
    marginTop: 5,
  },
  smsBox: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#FFF6E1',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  smsText: {
    fontFamily: 'Muli',
    fontWeight: '400',
    fontSize: 16,
    color: '#222B45',
    lineHeight: 23,
    marginLeft: 10,
  },
});
