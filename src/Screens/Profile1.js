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
  FlatList,
  ImageBackground,
} from 'react-native';
import AppHeader from '../Custom/CustomAppHeaderProfile';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {SubHeader} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const Profile1 = ({navigation, route}) => {
  const home = route.params;
  console.log("profile = profile1 ",home);
  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={home.name}
        shareOnClick={() => { }}
        // share={require('../images/notification1.png')}
      />
      {/* <SubHeader onPress={() => onPress.navigation.goBack()} title={home.name} /> */}
      <ImageBackground
            style={{ width: '100%', height: 270, resizeMode: 'contain' }}
            source={require('../images/background.png')}>
          </ImageBackground>
      <Image style={styles.image} source={require('../images/dp.png')} />
      <ScrollView decelerationRate={0.5}>
        <View style={styles.subBox}>
          <Text style={styles.inText}>Basic details</Text>

          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.userImage}
              source={require('../images/user1.png')}
            />
            <Text style={styles.userText}>{home.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.userImage}
              source={require('../images/email.png')}
            />
            <Text style={styles.userText}>{home.email}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.userImage}
              source={require('../images/phone-call.png')}
            />
            <Text style={styles.userText}>+91 {home.mobile}</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <Text style={styles.inText}>Document details</Text>

          <View>
            <Text style={styles.user2Text}>License Number</Text>
            <Text style={styles.userSubText}>{home.license_number}</Text>
          </View>
          <View>
            <Text style={styles.user2Text}>Date of Issue</Text>
            <Text style={styles.userSubText}>{home.date_issue}</Text>
          </View>
          <View>
            <Text style={styles.user2Text}>Expiry Date</Text>
            <Text style={styles.userSubText}>{home.expiry_date}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile1;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 60,
    marginTop: -100,
  },
  subBox: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  inText: {
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 10,
  },
  editImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginHorizontal: 15,
    marginTop: 2,
  },
  userImage: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 20,
  },
  userText: {
    fontFamily: 'Muli-Bold',
    fontSize: 13,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: 17,
    marginLeft: 10,
  },
  user2Text: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '400',
    color: '#8F9BB3',
    marginLeft: 10,
    marginTop: 20,
  },
  userSubText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1F20',
    marginLeft: 10,
    marginTop: 5,
    lineHeight: 20,
  },
  insubText: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },
  resumeText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 20,
  },
  resumeSubText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },
});
