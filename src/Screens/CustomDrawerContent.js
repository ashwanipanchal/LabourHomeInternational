import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  View,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import { Api, LocalStorage } from '../services/Api';
import { _RemoveAuthToken } from '../services/ApiSauce';
// import {useDispatch} from 'react-redux';
// import * as actions from '../redux/actions';
// import {LocalStorage} from '../services/Api';
// import {_RemoveAuthToken} from '../services/ApiSauce';
// import stringsoflanguages from '../language';
const CustomDrawerContent = ({ navigation, route}) => {
  // console.log("====routes from custom drawer page ===",route)
  //   const {_customdrawer} = stringsoflanguages;
  const [privacyTermsCondition, setPrivacyTermsCondition] = useState("");
  const [userName, setUserName] = useState();
  const Data = [
    {
      id: 0,
      title: 'Home',
      value: 'Home',
      source: require('../images/menu-home.png'),
    },
    {
      id: 1,
      title: 'About Us',
      value: 'About Us',
      source: require('../images/menu-info.png'),
    },
    {
      id: 2,
      title: 'My Invoice',
      value: 'My Invoice',
      source: require('../images/menu-invoice.png'),
    },
    {
      id: 3,
      title: 'Appointment Letters',
      value: 'Appointment Letters',
      source: require('../images/menu-invoice.png'),
    },
    {
      id: 4,
      title: 'Reschedule',
      value: 'Reschedule',
      source: require('../images/menu-clock.png'),
    },

    {
      id: 5,
      title: 'Help & Support',
      value: 'Help & Support',
      source: require('../images/menu-support.png'),
    },
    {
      id: 6,
      title: 'Faq’s',
      value: 'Faq’s',
      source: require('../images/menu-question.png'),
    },
    {
      id: 7,
      title: 'Privacy Policy',
      value: 'Privacy Policy',
      source: require('../images/menu-document.png'),
    },
    {
      id: 8,
      title: 'Terms & Condition',
      value: 'Terms & Condition',
      source: require('../images/menu-password.png'),
    },
    {
      id: 9,
      title: 'Logout',
      value: 'Logout',
      source: require('../images/menu-logout.png'),
    },
  ];
  //   const dispatch = useDispatch();
  //   const onLogoutHandler = () => {
  //     _RemoveAuthToken();
  //     LocalStorage.setToken('');
  //     dispatch(actions.SetLogout());
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: 'Login'}],
  //     });
  //   };

  useEffect(() => {

    
    profileName();
    driverSealApi();
    const profileUpdateEvent = DeviceEventEmitter.addListener("ProfileUpdate", (status) => {
      if (status) {
        // onGetProfile();
      }
    });
    return () => {
      profileUpdateEvent.remove();
    }
  },[])
  const profileName = async() => {
    const type = (await LocalStorage.getUserDetail()) || '';
    const type1 = JSON.parse(type)
    console.log("type from custom drawer===", type1)
    setUserName(type1.name)
    // console.log(type.name)

  }

  const driverSealApi = async () => {
    const response = await Api.fetchSettings();
    // alert(JSON.stringify(response,null,2))
    setPrivacyTermsCondition(response)
  }

  const onPressHandler = value => {
    
    console.log(value);
    navigation.closeDrawer();

    switch (value) {
      case 'Home':
        navigation.navigate('TabNavigator');
        break;
      case 'About Us':
        // navigation.navigate('About');
        gotoWebViewScreen('About Us')
        break;
      case 'My Invoice':
        navigation.navigate('Invoice');
        break;
      case 'Appointment Letters':
        navigation.navigate('AppointmentLetters');
        break;
      case 'Reschedule':
        navigation.navigate('Reschedule');
        break;
      case 'Help & Support':
        navigation.navigate('Support', { supportData: privacyTermsCondition });
        break;
      case 'Faq’s':
        navigation.navigate('Faq');
        break;
      case 'Privacy Policy':
        // navigation.navigate('Privacy');
        gotoWebViewScreen('Privacy Policy')
        break;
      case 'Terms & Condition':
        // navigation.navigate('Terms');
        gotoWebViewScreen('Terms & Condition')
        break;
      // case 'Logout':
      //   navigation.navigate('Login');
      //   break;
      case 'Logout':
        Alert.alert(
          'Logout',
          `Do you want to logout.`,
          [
            {
              text: 'No',
              onPress: navigation.closeDrawer,
              style: 'cancel',
            },
            { text: 'Yes', onPress: onLogoutHandler },
          ],
          { cancelable: false },
        );
        break;

      default:
    }
  };

  const onLogoutHandler = () => {
    _RemoveAuthToken();
    LocalStorage.setToken('');
    // dispatch(actions.SetLogout());
    LocalStorage.clear()
    navigation.closeDrawer,
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
  };

  const gotoWebViewScreen = (title) => {
    let url = "";
    if (title === "Privacy Policy") {
      url = privacyTermsCondition.private_police
    } else if (title === "Terms & Condition") {
      url = privacyTermsCondition.terms_conditions
    }else if (title === "About Us") {
      url = privacyTermsCondition.about_us
    }
    navigation.navigate('WebViewScreen', {
      title: title,
      url: url
    })
  }

  const optionView = ({ source, title, value }) => (
    <TouchableOpacity
      style={styles.controlView_2}
      onPress={() => onPressHandler(value)}>
      <Image source={source} style={styles.constrolViewImage} />
      <Text style={styles.controlViewText}>{title}</Text>
    </TouchableOpacity>
  );

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2574FF' }}>
      <DrawerContentScrollView>
        <View style={styles.controlView}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.image} source={require('../images/dp.png')} />
            {/* <Image style={styles.image} source={{ uri: userBasicDetails.profile }} /> */}
            <View>
              <Text style={styles.dnTopText}>{userName}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={[styles.dnTopText1, { marginBottom: 10 }]}>
                  View Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {Data.map(item => (
            <>{optionView(item)}</>
          ))}
          <Text style={styles.appVersion}>App version 1.0</Text>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  controlView: {
    flex: 1,
    backgroundColor: '#2574FF',
    width: '100%',
    paddingTop: 10,
  },
  image: {
    width: 74,
    height: 74,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 4,
    borderRadius: 37,
    marginLeft: '10%',
    marginBottom: 20,
    marginTop: 6,
  },
  appVersion: {
    marginTop: 60,
    marginBottom: 8,
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.5,
    alignSelf: 'center',
  },
  controlView_2: {
    marginHorizontal: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  constrolViewImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  controlViewText: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: '8%',
  },
  dnTopText: {
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
    marginLeft: 10,
    // marginHorizontal: 30,
  },
  dnTopText1: {
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 10,
    // marginHorizontal: 30,
    marginTop: 5,
  },
});
export default CustomDrawerContent;
