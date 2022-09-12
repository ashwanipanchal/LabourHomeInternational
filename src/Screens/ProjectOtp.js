import React, {useEffect, useState} from 'react';
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
import {StatusBarDark} from '../Custom/CustomStatusBar';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('window');

const ProjectOtp = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const [userType, setUserType] = useState('');
  const [selectJob, setSelectJob] = useState([
    {value: 'Customer'},
    {value: 'Project Exporter'},
    {value: 'Foreign Recruiting'},
    {value: 'Reruiting Agent'},
  ]);

  const onChangeDropdownUserType = (value, index, data) => {
    setUserType(data[index].value);
    console.log('-----setUserType: ', JSON.stringify(data[index].value));
  };
  const ragistercheckout = () => {
    setTimeout(() => {
      navigation.navigate('ProjectorHome');
    }, 300);
  };
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
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
            <Text style={{color: '#2574FF'}}>Resend a new code.</Text>
          </Text>
          <View style={{width: '100%', marginTop: 30}}>
            <ButtonStyle title={'VERIFY'} onPress={() => ragistercheckout()} />
          </View>
          <BottomView />
        </View>
        <View style={styles.smsBox}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 20, marginLeft: 10, marginTop: 3}}
              source={require('../images/info.png')}
            />
            <Text style={styles.smsText}>
              SMS was sent to your {`\n`}number
              <Text style={{fontWeight: '700'}}> +971 44475 70</Text> valid
              {`\n`}
              for
              <Text style={{fontWeight: '700'}}> 01:25</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectOtp;
const TextLabel = ({title}) => <Text style={styles.textLabel}>{title}</Text>;
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
    fontFamily: 'Muli',
    fontWeight: '900',
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
    fontSize: 18,
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
