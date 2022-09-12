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
  useWindowDimensions,
  ImageBackgroundBase,
  ImageBackground,
  FlatList,
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark, MainView} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const PaymentSuccessfully = ({navigation,route}) => {
  return (
    <View style={{backgroundColor: '#2574FF', flex: 1}}>
      <StatusBarLight />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CandidateApplied');
        }}>
        <Image style={styles.image} source={require('../images/check.png')} />
        <Text style={styles.text}>Ref Id: {route.params}</Text>
        <Text style={styles.subtext}>Payment Successful !</Text>
        <Text style={styles.sub2text}>
          We are delighted to inform you that{`\n`}
          we received your payments
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccessfully;

const styles = StyleSheet.create({
  image: {
    marginTop: height / 3,
    alignSelf: 'center',
    height: 100,
    width: 100,
  },
  text: {
    fontFamily: 'Muli-Bold',
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
  },
  subtext: {
    fontFamily: 'Muli-Bold',
    fontSize: 24,
    color: '#ffffff4d',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
  },
  sub2text: {
    fontFamily: 'Muli-Bold',
    fontSize: 16,
    color: '#ffffff4d',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
  },
});
