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
  ImageBackground,
} from 'react-native';
import {StatusBarDark} from '../Custom/CustomStatusBar';
import Swiper from 'react-native-swiper';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {height} = Dimensions.get('window');

const data = [
  {
    source: require('../images/how-1.png'),
    title: '1000+ Jobs Listen Daily',
    titleHeader:
      'Jocy listen a lot of job vacancies daily, find\nyour dream job with many choices now.',
  },
  {
    source: require('../images/how-2.png'),
    title: 'Direct Online Interview',
    titleHeader:
      'Online interview with HR using only mobile\nphone? yeah, we got it cover.',
  },
  {
    source: require('../images/how-1.png'),
    title: '1000+ Jobs Listen Daily',
    titleHeader:
      'Jocy listen a lot of job vacancies daily, find\nyour dream job with many choices now.',
  },
];

const OnBoarding = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarDark bg={'#FFFFFF'} />
      <Swiper
        onMomentumScrollEnd={(e, state, context) => {
          // console.log('index:', state.index)
        }}
        // ref="swiper"
        showsButtons={false}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={{resizeMode: 'contain'}}
        showsPagination={true}>
        {data.map(item => {
          const {source, title, titleHeader} = item;
          return (
            <View>
              <Image style={styles.sub2image} source={source} />
              <Text style={styles.titletxt}>{title}</Text>
              <Text style={styles.titleHeadertext}>{titleHeader}</Text>
            </View>
          );
        })}
      </Swiper>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <View
          style={{
            width: '45%',
          }}>
          <ButtonStyle
            title={'LOG IN'}
            bgColor={'white'}
            txtcolor={'#6CBDFF'}
            onPress={() => {
              navigation.replace('Login');
            }}
          />
        </View>
        <View style={{width: '45%'}}>
          <ButtonStyle
            title={'SIGN UP'}
            onPress={() => {
              navigation.replace('Register');
            }}
          />
        </View>
      </View>
      <BottomView />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  sub2image: {
    marginTop: height / 6,
    resizeMode: 'contain',
    height: 282,
    width: '100%',
  },
  dot: {
    backgroundColor: '#D8D8D8',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#0095FF',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 3,
    marginBottom: 3,
  },
  titletxt: {
    fontFamily: 'Muli-SemiBld',
    fontSize: 26,
    fontWeight: '600',
    color: '#222B45',
    textAlign: 'center',
    marginTop: hp(9),
  },
  titleHeadertext: {
    fontFamily: 'Muli-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: '#ADADAD',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 26,
  },
});
