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
  ImageBackground,
  FlatList,
  Alert
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header3} from '../Custom/CustomView';
import { Api, LocalStorage } from '../services/Api';
import { _RemoveAuthToken } from '../services/ApiSauce';
import {BottomView, ButtonStyle} from '../Custom/CustomView';

const {height} = Dimensions.get('window');

const Approval = ({navigation}) => {
  const [data, setData] = useState([
    {
      keys: 1,
      title: 'Post a \n job',
      source: require('../images/Reruiting-agent-slice/project-exporter/background7.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/user.png'),
    },
    {
      keys: 2,
      title: 'My\nProfile',
      source: require('../images/Reruiting-agent-slice/project-exporter/background.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/user.png'),
    },
    {
      keys: 3,
      title: 'Posted\nJobs',
      source: require('../images/Reruiting-agent-slice/project-exporter/background1.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/post.png'),
    },
    {
      keys: 4,
      title: 'Candidate\nApplied',
      source: require('../images/Reruiting-agent-slice/project-exporter/background3.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/candidate.png'),
    },
    {
      keys: 5,
      title: 'Schedule\nInterview',
      source: require('../images/Reruiting-agent-slice/project-exporter/background4.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/schedule.png'),
    },
    {
      keys: 6,
      title: 'Help &\nSupport',
      source: require('../images/Reruiting-agent-slice/project-exporter/background5.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/support.png'),
    },
    {
      keys: 7,
      title: 'Faq ask\nQuestion',
      source: require('../images/Reruiting-agent-slice/project-exporter/background6.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/faq.png'),
    },
    {
      keys: 8,
      title: 'App\nSettings',
      source: require('../images/Reruiting-agent-slice/project-exporter/background7.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/setting.png'),
    },
    {
      keys: 9,
      title: 'App\nLogout',
      source: require('../images/Reruiting-agent-slice/project-exporter/background8.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/logout.png'),
    },
  ]);


  const onPressCategory = (item, index) => {
    const {keys} = item;
    switch (keys) {
      case 1:
        // navigation.navigate('PostJob')
        break;

      case 2:
        // navigation.navigate('Profile1', userProfile );
        break;

      case 3:
        // navigation.navigate('PostedJobs', userProfile);
        break;

      case 4:
        // navigation.navigate('Candidate', userProfile);
        break;

      case 5:
        // navigation.navigate('ScheduleInterview', userProfile);
        break;

      case 6:
        // navigation.navigate('Support');
        break;

      case 7:
        // navigation.navigate('Faq');
        break;

      case 8:
        // navigation.navigate('Setting');
        break;

      case 9:
        // navigation.navigate('Login');
        onLogoutHandler()
        break;
      default:
    }
  };

  const onLogoutHandler = () => {

    Alert.alert(
      'Logout',
      `Do you want to logout.`,
      [
        {
          text: 'No',
          onPress: navigation.closeDrawer,
          style: 'cancel',
        },
        { text: 'Yes', onPress: onLogOut },
      ],
      { cancelable: false },
    ); 
  };
  onLogOut=()=>{
      _RemoveAuthToken();
    LocalStorage.setToken('');
    // dispatch(actions.SetLogout());
    LocalStorage.clear()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <Header3 />
      <ScrollView>
        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image}
              source={require('../images/Reruiting-agent-slice/clock.png')}
            />
            <Text style={styles.ApprovalText}>Approval Pending !</Text>
          </View>
        </View>
        <View style={{marginTop: 60, justifyContent:'center', alignItems:'center', }}>
          <FlatList
            numColumns={3}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity style={{ margin:5}} onPress={() => onPressCategory(item, index)}>
                <ImageBackground
                  source={item.source}
                  style={{
                    width: 100,
                    height: 92,
                    resizeMode: 'contain',
                    margin: 10,
                  }}>
                  <Image
                    style={{
                      width: 23,
                      height: 23,
                      resizeMode: 'contain',
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                    source={item.image}
                  />
                  <Text style={styles.text}>{item.title}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* <View style={styles.subBox}>
          <Image
            style={styles.subImage}
            source={require('../images/Reruiting-agent-slice/post-job.png')}
          />
          <View style={{width: '100%', marginTop: 30}}>
            <ButtonStyle
              title={'POST A JOB'}
              onPress={() => {
                navigation.navigate('PostJob');
              }}
            />
          </View>
          <BottomView />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Approval;

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 5,
    marginTop: 2,
  },
  box: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F2AE2E',
    borderRadius: 6,
    marginTop: 30,
  },
  ApprovalText: {
    fontFamily: 'Muli-SemiBold',
    fontWeight: '700',
    fontSize: 16,
    color: '#39393C',
    marginLeft: 10,
  },
  subBox: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    marginTop: 50,
    marginBottom: 20,
  },
  subImage: {
    width: 280,
    height: 290,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 14,
    fontWeight: '700',
    color: '#010101',
    marginLeft: 10,
    marginTop: 10,
  },
});
