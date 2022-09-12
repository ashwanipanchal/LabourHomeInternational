import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import { Header, HeaderDark, MainView } from '../Custom/CustomView';
const { height } = Dimensions.get('window');

const Support = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params,null,2))
  const callFunction = (phone) => {
    let phoneNumber = phone;
    // console.log('-----phoneNumber: ', phoneNumber);
    // if (Platform.OS !== 'android') {
    //   phoneNumber = `telprompt:${phone}`;
    // }
    // else {
    //   phoneNumber = `tel:${phone}`;
    // }
    // Linking.canOpenURL(phoneNumber)
    Linking.openURL(`tel:${phoneNumber}`)
  }

  const mailFunction = (email) => {
    let emailAddress = email;
    Linking.openURL(`mailto:${emailAddress}`)
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarLight />
      {/* <HeaderDark onPress={() => navigation.goBack()} title={'Support'} /> */}
      <ScrollView>
        <Image
          style={styles.topImage}
          source={require('../images/support.png')}
        />
        <Text style={styles.text}>Get Support</Text>
        <Text style={styles.subText}>
          For any support request regards your{`\n`}orders please feel free to
          speak{`\n`}with us at below.
        </Text>
        <View style={{ marginVertical: 60 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            // style={styles.touch}
            onPress={() => { callFunction(route.params?.supportData.helpline_number); }}>
              {route.params && <Text style={styles.about}>CALL us - +91 {route.params?.supportData.helpline_number}</Text>}
            
          </TouchableOpacity>
          <TouchableOpacity
           activeOpacity={0.7}
           // style={styles.touch}
           onPress={() => { mailFunction(route.params?.supportData.support_email); }}> 
            <Text style={[styles.about,{marginTop: 10}]}>
              Mail us - {route.params?.supportData.support_email}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  topImage: {
    width: 165,
    height: 173,
    alignSelf: 'center',
    marginTop: 60,
  },
  text: {
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    fontSize: 24,
    color: '#000',
    alignSelf: 'center',
    marginTop: 40,
  },
  subText: {
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#747A8D',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 28,
  },
  about: {
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
    // marginTop: 80,
    lineHeight: 30,
    textAlign: 'center',
  },
});
