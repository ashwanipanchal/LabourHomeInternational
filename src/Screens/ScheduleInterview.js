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
import AppHeader from '../Custom/CustomAppHeader';
import { Api } from '../services/Api';
import {DisableButton, Header, HeaderDark, MainView} from '../Custom/CustomView';
import {BottomView, EndButton, HeaderLight} from '../Custom/CustomView';
import JobList from '../Custom/JobList';
import Toast from 'react-native-simple-toast';
const {height} = Dimensions.get('window');

const ScheduleInterview = ({navigation, route}) => {
  const [state, setState] = useState({
    isLoading: false
  })
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Deepak Kumar',
      title: 'New Delhi, India',
      subTitle: 'RA Name : Rahul Sharma',
      source: require('../images/Reruiting-agent-slice/images.png'),
    },
    {
      id: '2',
      name: 'Deepak Kumar',
      title: 'New Delhi, India',
      subTitle: 'RA Name : Rahul Sharma',
      source: require('../images/Reruiting-agent-slice/images.png'),
    },
  ]);

  const toggleLoader = isLoading => setState({ ...state, isLoading })
  useEffect(()=>{
    // alert(JSON.stringify(route.params,null,2))
    getList()
  },[])

  const getList = async()=> {
    toggleLoader(true)
    const body = {
      "agency_id" : route.params.id
    }
  
    const response = await Api.scheduleListAgent(body);
    const {status, data} = response;
    if(status){
      console.log("schdule interview list ==== ", data)
      toggleLoader(false)
      setData(data)
    }
  }

  const makeVideoCall = (item) => {
    // alert(JSON.stringify(item,null,2))
    let interviewTime = `${item.schedule_date} ${item.schedule_time}:00`
    console.log(interviewTime)
    let timeToActivate = (new Date(interviewTime)).getTime();
    let currTime = Date.now();
    if (currTime > timeToActivate) {
      // Write Code To Activate Button
      navigation.navigate('VideoCall',item)
    }else{
      Toast.show('You Cannot Join Before Interview Time')
    }
  }

  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Schedule Interview'}
        // shareOnClick={() => {}}
        // share={require('../images/Reruiting-agent-slice/support.png')}
      />
      {state.isLoading ? <JobList /> : (
      <ScrollView>
        <View>
          {/* <SafeAreaView style={styles.subBox}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 10,
                  marginTop: 15,
                }}
                source={require('../images/Reruiting-agent-slice/images.png')}
              />
              <View>
                <Text style={styles.inText}>Deepak Kumar</Text>
                <Text style={styles.insubText}>New Delhi, India</Text>
                <Text style={styles.insubText}>RA Name : Rahul Sharma</Text>
              </View>
              <Image
                style={{
                  width: 16,
                  height: 16,
                  marginLeft: 'auto',
                  marginTop: 15,
                  marginHorizontal: 15,
                }}
                source={require('../images/star.png')}
              />
            </View>
            <Text style={styles.middleText}>
              Hard Hat, Mason, Brick Layer, Maker…{' '}
            </Text>
            <View style={styles.Line} />
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  marginLeft: 10,
                  marginTop: 10,
                }}
                source={require('../images/Reruiting-agent-slice/user.png')}
              />
              <View>
                <Text style={styles.inText}>Gourav Sharma</Text>
                <Text style={styles.redText}>25 Dec 2021, 2:30 PM</Text>
              </View>
              <View
                style={{
                  width: '30%',
                  marginTop: 25,
                  marginLeft: 'auto',
                }}>
                <EndButton
                  bgColor={'lightgrey'}
                  title={'Interview Call'}
                  onPress={() => {
                    navigation.navigate('CandidateApplied');
                  }}
                />
              </View>
            </View>
          </SafeAreaView> */}
          <FlatList
            numColumns={1}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item, index}) => (
              <View style={styles.subBox}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      marginTop: 15,
                    }}
                    source={require('../images/Reruiting-agent-slice/images.png')}
                  />
                  <View>
                    <Text style={styles.inText}>{item.post_job_name}</Text>
                    <Text style={styles.insubText}>{item.post_job_location}</Text>
                    {route.params.user_type === 4 ? (<Text style={styles.insubText}>RA Name : {item.agent_name}</Text>) : null}
                  </View>
                  {/* <Image
                    style={{
                      width: 16,
                      height: 16,
                      marginLeft: 'auto',
                      marginTop: 15,
                      marginHorizontal: 15,
                    }}
                    source={require('../images/star.png')}
                  /> */}
                </View>
                <Text style={styles.middleText}>
                  Hard Hat, Mason, Brick Layer, Maker…{' '}
                </Text>
                <View style={styles.Line} />
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain',
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                    source={require('../images/Reruiting-agent-slice/user.png')}
                  />
                  <View>
                    <Text style={styles.inText}>{item.user_name}</Text>
                    <Text style={styles.redText}>{item.interview_call}</Text>
                  </View>
                  {/* <View
                    style={{
                      width: '30%',
                      marginTop: 25,
                      marginLeft: 'auto',
                    }}>
                    <EndButton
                      title={'Interview Call'}
                      onPress={() => {
                        // navigation.navigate('CandidateApplied');
                      }}
                    />
                  </View> */}
                  {item.schedule_interview === "1" ? (
                      <View
                        style={{
                          width: '30%',
                          marginTop: 25,
                          marginLeft: 'auto',
                        }}>
                        <EndButton title={'Interview Call'} onPress={() => { makeVideoCall(item)}} />
                      </View>
                    ) : (<View
                    style={{
                      width: '30%',
                      marginTop: 25,
                      marginLeft: 'auto',
                    }}>
                    <DisableButton title={'Interview Call'} onPress={() => { }} />
                  </View>)}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
      )}
    </View>
  );
};

export default ScheduleInterview;

const styles = StyleSheet.create({
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 15,
  },
  insubText: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },
  middleText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 15,
  },
  redText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 13,
    fontWeight: '700',
    color: '#FF0000',
    marginLeft: 15,
    marginTop: 5,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
  },
});
