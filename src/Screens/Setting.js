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
import {StatusBarDark, StatusBarLight} from '../Custom/CustomStatusBar';
import {HeaderDark, MainView} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const Setting = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Setting'} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.rowViewOffCss, {marginTop: 20}]}
        onPress={() => navigation.navigate('About')}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 33, height: 33, resizeMode: 'contain'}}
            source={require('../images/Reruiting-agent-slice/about.png')}
          />
          <Text style={[styles.userNumberTextOffCss, {marginLeft: 15}]}>
            About Us
          </Text>
        </View>
        <Image
          style={{width: 10, height: 15, resizeMode: 'contain'}}
          source={require('../images/right-icon.png')}
        />
      </TouchableOpacity>
      <View style={styles.Line} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.rowViewOffCss}
        onPress={() => navigation.navigate('Privacy')}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 33, height: 33, resizeMode: 'contain'}}
            source={require('../images/Reruiting-agent-slice/privacy.png')}
          />
          <Text style={[styles.userNumberTextOffCss, {marginLeft: 15}]}>
            Privacy Policy
          </Text>
        </View>
        <Image
          style={{width: 10, height: 15, resizeMode: 'contain'}}
          source={require('../images/right-icon.png')}
        />
      </TouchableOpacity>
      <View style={styles.Line} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.rowViewOffCss}
        onPress={() => navigation.navigate('Terms')}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 33, height: 33, resizeMode: 'contain'}}
            source={require('../images/Reruiting-agent-slice/terms.png')}
          />
          <Text style={[styles.userNumberTextOffCss, {marginLeft: 15}]}>
            Terms & Conditions
          </Text>
        </View>
        <Image
          style={{width: 10, height: 15, resizeMode: 'contain'}}
          source={require('../images/right-icon.png')}
        />
      </TouchableOpacity>
      <View style={styles.Line} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.rowViewOffCss}
        onPress={() => {}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 33, height: 33, resizeMode: 'contain'}}
            source={require('../images/Reruiting-agent-slice/app-version.png')}
          />
          <Text style={[styles.userNumberTextOffCss, {marginLeft: 15}]}>
            App Version
          </Text>
        </View>
        <Text style={styles.userNumberTextOffCss}>1.0</Text>
      </TouchableOpacity>
      <View style={styles.Line} />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  image: {
    width: 66,
    height: 66,
    resizeMode: 'contain',
    marginTop: 40,
    marginLeft: 20,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    color: '#121213',
    marginLeft: 10,
    marginTop: 45,
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Nunito',
    fontWeight: '600',
    color: '#7B87A5',
    marginLeft: '25%',
    marginTop: -30,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Nunito',
    fontWeight: '600',
    color: '#7B87A5',
    marginLeft: 'auto',
    marginTop: 43,
    marginRight: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 30,
    elevation: 5,
    marginBottom: 5,
  },
  rowViewOffCss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 15,
  },
  userNumberTextOffCss: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1E2C',
    marginTop: 2,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 30,
    // marginTop: 10,
  },
});
