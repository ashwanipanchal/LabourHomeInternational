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
import { BottomView, ButtonStyle, DisableButton } from '../Custom/CustomView';
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../services/Api';
import { _SetAuthToken } from '../services/ApiSauce';
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';
// import { useRoute } from '@react-navigation/native';
// import Approval from './Approval';

const STATIC_TIME = 60 * 2;
const { height } = Dimensions.get('window');

const Otp = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [clicked, setClicked] = useState(false)
  const [veriryOtp, setVeriryOtp] = useState(route.params?.getDetails.otp);
  const [token, setToken] = useState(route.params?.getDetails.token);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(STATIC_TIME);
  const [user, setUser] = useState()
  // const [approval, setApproval] = useState();

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
  let btoken;
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
    setClicked(true)
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
      console.log("user is here on otp page ===== ",user)
      setUser(user)
      console.log("user is here ===== ",token)
      // LocalStorage.setToken(token,user)
      console.log("Before API HIT ===",token)
      btoken = `Bearer ${token}`;
      const response = await fetch('http://139.59.67.166/Labour-Home-Job/public/api/homepage_agent',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
        "Authorization": btoken,
      }
    })
    console.log("After API HIT ===",token)
    const userApprovedData = await response.json()
    const {status, msg} = userApprovedData;
    console.log("After API HIT ===",msg)
    LocalStorage.setApproval(msg);
    if(status){
      navigation.replace(user.user_type === 1 ? 'DrawerNavigator': 'ProjectorHome', {
        user:user,
        token
      });
      setClicked(false)
    }else{
      navigation.replace('Approval')
      setClicked(false)
    }



    console.log("user Approved Data--=====++++ ",userApprovedData)
      // navigation.replace(user.user_type === 1 ? 'DrawerNavigator': 'DrawerNavigator2', {
      //   user:user,
      //   token
      // });
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'DrawerNavigator' }],
      // });
      setIsLoading({ isLoading: false });
    }
  }

  const resendHandler = async () => {
    // const route = useRoute();
    const number = route.params.mobile
    console.log(number)
    btoken = `Bearer ${token}`;
    const body = {
      mobile : number
    }
    const response = await fetch('http://139.59.67.166/Labour-Home-Job/public/api/resend_otp_signup',{
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
        "Authorization": btoken,
      },
      body:JSON.stringify(body)
    })

    const data = await response.json()
    console.log("otp resend response === ", data)
    setVeriryOtp(data.otp)
    alert(data.otp)
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
            code={otp}
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
          {clicked ? 
            <View style={{ width: '100%', marginTop: 30 }}>
            <DisableButton title={'VERIFY'}
              height={50}
              fontSize={16}
              loader={isLoading}
              bgColor={'#cccccc'}
              txtcolor={'#fff'} />
          </View>:
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
          </View>}
          <BottomView />
        </View>
        <View style={styles.smsBox}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 20, height: 20, marginLeft: 10, marginTop: 3 }}
              source={require('../images/info.png')}
            />
            <Text style={styles.smsText}>
              SMS was sent to your Email/Number
              <Text style={{ fontWeight: '700' }}> {route.params?.mobile}</Text> valid
              
              for
              <Text style={{ fontWeight: '700' }}> {countDown}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Otp;
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
