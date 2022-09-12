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
  useWindowDimensions,
  FlatList,
  Modal,
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import {
  BottomView,
  EndButton,
  ButtonStyle,
  StartButton,
  DisableButton,
} from '../Custom/CustomView';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../services/Api';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Loader from '../services/Loader';
const { height } = Dimensions.get('window');

const APPLY = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [click, setClick] = useState(false)
  const [state, setState] = useState({
    term: false,
    isLoading: false
  });
  const [userItem, setUserItem] = useState()
  const [data, setData] = useState([]);

  const toggleLoader = isLoading => setState({ ...state, isLoading })
  useFocusEffect(
    React.useCallback(() => {
      console.log(" routee chceck== ", route)
      getAppliedList();
    }, []),
  );

  const getAppliedList = async () => {
    const id = JSON.stringify(route.params.id);
    //  alert(JSON.stringify(id))
    const body = {
      job_id: route.params.id,
    };
    toggleLoader(true)
    const response = await Api.jobAppliedList(body);
    // console.log(response);
    // alert(JSON.stringify(response,null,2))
    setData(response.data);
    toggleLoader(false)
    // alert(JSON.stringify(response));
    console.log("Applied response==", response);
    console.log('Applied response stringfy==', JSON.stringify(response.data));
  };

  const makeVideoCall = (item) => {
    // alert(JSON.stringify(item,null,2))
    // navigation.navigate('VideoCall',item)
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

  const approveUser = async (item) => {
    // alert(JSON.stringify(item), null, 2)
    console.log("term check", state.term)
    if (state.term === false) {
      Toast.show("Please Check Interview Done")
    } else {
      setClick(true)
      const body = {
        "job_id": item.job_id,
        "user_id": item.user_id,
        "agency_id": item.agency_id
      }
      // alert(JSON.stringify(body),null,2)
      // return
      toggleLoader(true)
      const response = await Api.approveUser(body)
      console.log("api response", response)
      toggleLoader(false)
      const { status, message } = response;
      setClick(false)
      if (status) {
        Toast.show(message)
        // getApproveList()
        getAppliedList()
        getApproveList()
      }
    }
  };
  const rejectUser = async (item) => {
    // alert(JSON.stringify(item), null, 2)
    console.log("term check", state.term)
    if (state.term === false) {
      Toast.show("Please Check Interview Done")
    } else {
      const body = {
        "job_id": item.job_id,
        "user_id": item.user_id,
        "agency_id": item.agency_id
      }
      // alert(JSON.stringify(body),null,2)
      // return
      toggleLoader(true)
      const response = await Api.rejectUser(body)
      console.log("api response", response)
      toggleLoader(false)
      const { status, message } = response;
      if (status) {
        Toast.show(message)
        getAppliedList()
        getRejectedList()
      }
    }
  };

  const acceptJobInterview = async (item) => {
    toggleLoader(true)
    const body = {
      "job_id": item.job_id,
      "user_id": item.user_id,
      "agency_id": item.agency_id,
      "schedule_interview": "1"
    }
    // alert(JSON.stringify(body,null,2))
    const response = await Api.acceptInterview(body);
    toggleLoader(false)
    const { status, message } = response;
    if (status) {
      getAppliedList();
      // navigation.navigate('CandidateApplied')
    }
  }
  const schedule = async (item) => {
    // const type = (await LocalStorage.getUserDetail()) || '';
    // alert(JSON.stringify(type),null, 2)
    console.log("item from candidate applied", item)
    setUserItem(item)

    // console.log("params",route.params)

    if (item.document_approve == '0') {
      Toast.show(`Cannot Schedule Interview Untill Document Approved`)
    } else {
      const body = {
        user_id: route.params.user_id,
      }
      console.log(body)
      const response = await Api.remainingPlan(body)
      // alert(JSON.stringify(response))
      const { status, message, data } = response;
      if (status) {
        if (data.interview > 0) {
          navigation.navigate('ScheduleInterviewDate', item )
        } else {
          navigation.navigate('Subscription',item);
          // navigation.navigate('ScheduleInterviewDate', item)
        }
      }

    }
    // const body = {
    //   user_id : route.params.user_id,
    // }
    // console.log(body)
    // const response = await Api.remainingPlan(body)
    // // alert(JSON.stringify(response))
    // const {status , message, data} = response;
    // if(status){
    //   if(data > 0){
    //     navigation.navigate('ScheduleInterviewDate', {item:item})
    //   }else{
    //     // navigation.navigate('Subscription');
    //     navigation.navigate('ScheduleInterviewDate', item)
    //   }
    // }
  }
  function beforeSchedule(item){
    // alert(JSON.stringify(item,null,2))
    
    if(item.schedule_interview === null) {
      return (
        <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
          <EndButton
            title={'Schedule Interview'}
            height={30}
            fontSize={12}
            bgColor={'#2574FF'}
            txtcolor={'#fff'}
            onPress={() => {
              schedule(item)
              // navigation.navigate('UserDetail', item);
            }}
          />
        </View>
      )
    } else if(item.schedule_interview === '1') {
      return (
        <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
        <EndButton
          title={'Start interview'}
          height={30}
          fontSize={12}
          // bgColor={'#2574FF'}
          bgColor={'#32CD32'}
          txtcolor={'#fff'}
          onPress={() => {
            // schedule(item)
            // navigation.navigate('VideoCall', item);
            makeVideoCall(item)
          }}
        />
      </View>
      )
    } else if (item.schedule_interview === '2') {
      return (
        <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
        <DisableButton
          title={'Start interview'}
          height={30}
          fontSize={12}
          bgColor={'#cccccc'}
          txtcolor={'#fff'}
        // onPress={() => {
        //   // schedule(item)
        //   navigation.navigate('UserDetail', item);
        // }}
        />
      </View>
      )
    }else if (item.schedule_interview === '3') {
      return (
        <>
        <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
          <EndButton
            title={'Accept Interview'}
            height={30}
            fontSize={12}
            bgColor={'#2574FF'}
            txtcolor={'#fff'}
            onPress={() => {
              // schedule(item)
              acceptJobInterview(item)
              // navigation.navigate('UserDetail', item);
            }}
          />
        </View>
        <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
          <EndButton
            title={'Reschedule Interview'}
            height={30}
            fontSize={12}
            bgColor={'#2574FF'}
            txtcolor={'#fff'}
            onPress={() => {
              schedule(item)
              // navigation.navigate('UserDetail', item);
            }}
          />
        </View>
      </>
      )}
    // {item.schedule_interview === null && (
    //   <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
    //     <EndButton
    //       title={'Schedule Interview'}
    //       height={30}
    //       fontSize={12}
    //       bgColor={'#2574FF'}
    //       txtcolor={'#fff'}
    //       onPress={() => {
    //         schedule(item)
    //         // navigation.navigate('UserDetail', item);
    //       }}
    //     />
    //   </View>
    // )}
    // {item.schedule_interview === '1' && (
    //   <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
    //     <EndButton
    //       title={'Start interview'}
    //       height={30}
    //       fontSize={12}
    //       // bgColor={'#2574FF'}
    //       bgColor={'#32CD32'}
    //       txtcolor={'#fff'}
    //       onPress={() => {
    //         // schedule(item)
    //         // navigation.navigate('UserDetail', item);
    //       }}
    //     />
    //   </View>
    // )}

    // {item.schedule_interview === '2' && (
    //   <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
    //     <DisableButton
    //       title={'Start interview'}
    //       height={30}
    //       fontSize={12}
    //       bgColor={'#cccccc'}
    //       txtcolor={'#fff'}
    //     // onPress={() => {
    //     //   // schedule(item)
    //     //   navigation.navigate('UserDetail', item);
    //     // }}
    //     />
    //   </View>
    // )}

    // {item.schedule_interview === '3' && (
    //   <>
    //     <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
    //       <EndButton
    //         title={'Accept Interview'}
    //         height={30}
    //         fontSize={12}
    //         bgColor={'#2574FF'}
    //         txtcolor={'#fff'}
    //         onPress={() => {
    //           // schedule(item)
    //           acceptJobInterview(item)
    //           // navigation.navigate('UserDetail', item);
    //         }}
    //       />
    //     </View>
    //     <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
    //       <EndButton
    //         title={'Reschedule Interview'}
    //         height={30}
    //         fontSize={12}
    //         bgColor={'#2574FF'}
    //         txtcolor={'#fff'}
    //         onPress={() => {
    //           schedule(item)
    //           // navigation.navigate('UserDetail', item);
    //         }}
    //       />
    //     </View>
    //   </>

    // )}
  }

  const afterSchedule = (item) =>(
    // alert(JSON.stringify(item,null,2))
    
    <>
    <View style={{marginLeft: 55, marginTop: 10, flexDirection: 'row'}}>
            <CheckBox
              // style={{width: 20, height: 20}}
              disabled={false}
              value={state.term}
              onValueChange={term => setState({...state, term})}
              tintColors={{true: '#00C327', false: 'grey'}}
            />
            <Text style={styles.interviewText}>Interview Done</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 5,
            }}>
            <View style={{width: '35%', marginLeft: 15}}>
              {click ? 
              <EndButton
                title={'Approve'}
                height={30}
                fontSize={12}
                bgColor={'gray'}
                txtcolor={'#fff'}
              />:
              <EndButton
                title={'Approve'}
                height={30}
                fontSize={12}
                bgColor={'#00C327'}
                txtcolor={'#fff'}
                onPress={() => {approveUser(item)}}
              />}
              {/* <EndButton
                title={'Approve'}
                height={30}
                fontSize={12}
                bgColor={'#00C327'}
                txtcolor={'#fff'}
                onPress={() => {approveUser(item)}}
              /> */}
            </View>
            <View style={{width: '35%'}}>
              <EndButton
                title={'Reject'}
                height={30}
                fontSize={12}
                bgColor={'#DA274D'}
                txtcolor={'#fff'}
                onPress={()=>{rejectUser(item)}}
              />
            </View>
          </View>
    </>
    
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Loader status={state.isLoading} />
      <ScrollView>
        {/* <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image}
              source={require('../images/Reruiting-agent-slice/user1.png')}
            />
            <Text style={styles.name}>Deepak Kumar</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.userImage}
              source={require('../images/Reruiting-agent-slice/portfolio.png')}
            />
            <Text style={styles.userText}>28 * 6 yrs experience</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.user2Image}
              source={require('../images/Reruiting-agent-slice/language.png')}
            />
            <Text style={styles.user2Text}>English, Hindi</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.user2Image}
              source={require('../images/Reruiting-agent-slice/email.png')}
            />
            <Text style={styles.user3Text}>deepak@gmail.com</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.user2Image}
              source={require('../images/Reruiting-agent-slice/iphone.png')}
            />
            <Text style={styles.user3Text}>+91 9599499793</Text>
          </View>
          <View style={{marginLeft: 55, marginTop: 10, flexDirection: 'row'}}>
            <CheckBox
              // style={{width: 20, height: 20}}
              disabled={false}
              value={state.term}
              onValueChange={term => setState({...state, term})}
              tintColors={{true: '#00C327', false: 'grey'}}
            />
            <Text style={styles.interviewText}>Interview Done</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 5,
            }}>
            <View style={{width: '35%', marginLeft: 25}}>
              <EndButton
                title={'Approve'}
                height={30}
                fontSize={12}
                bgColor={'#00C327'}
                txtcolor={'#fff'}
                onPress={() => {}}
              />
            </View>
            <View style={{width: '35%'}}>
              <EndButton
                title={'Reject'}
                height={30}
                fontSize={12}
                bgColor={'#DA274D'}
                txtcolor={'#fff'}
              />
            </View>
          </View>
        </View> */}

        {/* <FlatList
          numColumns={1}
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.box}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.image}
                  source={require('../images/Reruiting-agent-slice/user1.png')}
                />
                <Text style={styles.name}>{item.user_name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.userImage}
                  source={require('../images/Reruiting-agent-slice/portfolio.png')}
                />
                <Text style={styles.userText}>{item.work_exp}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/language.png')}
                />
                <Text style={styles.user2Text}>{item.user_language}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/email.png')}
                />
                <Text style={styles.user3Text}>{item.email}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/iphone.png')}
                />
                <Text style={styles.user3Text}>{item.user_mobile}</Text>
              </View>
               <View style={{width: '50%', marginLeft: 55, marginTop: 10}}>
                <EndButton
                  title={'Schedule Interview'}
                  height={30}
                  fontSize={12}
                  bgColor={'#2574FF'}
                  txtcolor={'#fff'}
                  onPress={() => {
                    navigation.navigate('Subscription');
                  }}
                />
              </View> 
         <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                <View style={{width: '35%', marginLeft: 25}}>
                  <EndButton
                    title={'Approve'}
                    height={30}
                    fontSize={12}
                    bgColor={'#00C327'}
                    txtcolor={'#fff'}
                    onPress={() => {
                      approveUser();
                    }}
                  />
                </View>
                <View style={{width: '35%'}}>
                  <EndButton
                    title={'Reject'}
                    height={30}
                    fontSize={12}
                    bgColor={'#DA274D'}
                    txtcolor={'#fff'}
                  />
                </View>
              </View>
            </View> 
        )} 
         /> */}

        <FlatList
          numColumns={1}
          data={data}
          renderItem={({ item, index }) => (
            <View style={styles.box}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.image}
                  source={require('../images/Reruiting-agent-slice/user1.png')}
                />
                <Text style={styles.name}>{item.user_name}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.userImage}
                  source={require('../images/Reruiting-agent-slice/portfolio.png')}
                />
                <Text style={styles.userText}>{item.work_exp} Years</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/language.png')}
                />
                <Text style={styles.user2Text}>{item.user_language}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/email.png')}
                />
                <Text style={styles.user3Text}>{item.email}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/iphone.png')}
                />
                <Text style={styles.user3Text}>{item.user_mobile}</Text>
              </View>
              {/* <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
                <EndButton
                  title={'Schedule Interview'}
                  height={30}
                  fontSize={12}
                  bgColor={'#2574FF'}
                  txtcolor={'#fff'}
                  onPress={() => {
                    schedule(item)
                    // navigation.navigate('Subscription', {item: item});
                  }}
                />
              </View> */}
              {item.interview_status === null ? beforeSchedule(item): afterSchedule(item)}

              {/* {item.schedule_interview === null && (
                <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
                  <EndButton
                    title={'Schedule Interview'}
                    height={30}
                    fontSize={12}
                    bgColor={'#2574FF'}
                    txtcolor={'#fff'}
                    onPress={() => {
                      schedule(item)
                      // navigation.navigate('UserDetail', item);
                    }}
                  />
                </View>
              )}
              {item.schedule_interview === '1' && (
                <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
                  <EndButton
                    title={'Start interview'}
                    height={30}
                    fontSize={12}
                    // bgColor={'#2574FF'}
                    bgColor={'#32CD32'}
                    txtcolor={'#fff'}
                    onPress={() => {
                      // schedule(item)
                      navigation.navigate('VideoCall', item);
                    }}
                  />
                </View>
              )}

              {item.schedule_interview === '2' && (
                <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
                  <DisableButton
                    title={'Start interview'}
                    height={30}
                    fontSize={12}
                    bgColor={'#cccccc'}
                    txtcolor={'#fff'}
                  // onPress={() => {
                  //   // schedule(item)
                  //   navigation.navigate('UserDetail', item);
                  // }}
                  />
                </View>
              )}

              {item.schedule_interview === '3' && (
                <>
                  <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
                    <EndButton
                      title={'Accept Interview'}
                      height={30}
                      fontSize={12}
                      bgColor={'#2574FF'}
                      txtcolor={'#fff'}
                      onPress={() => {
                        // schedule(item)
                        acceptJobInterview(item)
                        // navigation.navigate('UserDetail', item);
                      }}
                    />
                  </View>
                  <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
                    <EndButton
                      title={'Reschedule Interview'}
                      height={30}
                      fontSize={12}
                      bgColor={'#2574FF'}
                      txtcolor={'#fff'}
                      onPress={() => {
                        schedule(item)
                        // navigation.navigate('UserDetail', item);
                      }}
                    />
                  </View>
                </>

              )} */}

              <View style={{ width: '50%', marginLeft: 55, marginTop: 10 }}>
                <EndButton
                  title={'View Profile'}
                  height={30}
                  fontSize={12}
                  bgColor={'#2574FF'}
                  txtcolor={'#fff'}
                  onPress={() => {
                    // schedule(item)
                    navigation.navigate('UserDetail', item);
                  }}
                />
              </View>
              {/* {item.job_status == 1 ? (
                <View style={{width: '50%', marginLeft: 55, marginTop: 10}}>
                  <EndButton
                    title={'Schedule Interview'}
                    height={30}
                    fontSize={12}
                    bgColor={'#2574FF'}
                    txtcolor={'#fff'}
                    onPress={() => {
                      navigation.navigate('Subscription');
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 5,
                  }}>
                  <View style={{width: '35%', marginLeft: 25}}>
                    <EndButton
                      title={'Approve'}
                      height={30}
                      fontSize={12}
                      bgColor={'#00C327'}
                      txtcolor={'#fff'}
                      onPress={() => {
                        approveUser(item);
                      }}
                    />
                  </View>
                  <View style={{width: '35%'}}>
                    <EndButton
                      title={'Reject'}
                      height={30}
                      fontSize={12}
                      bgColor={'#DA274D'}
                      txtcolor={'#fff'}
                    />
                  </View>
                </View>
              )} */}
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};
const APPROVE = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([
    // {
    //   id: '1',
    //   title: 'Deepak Kumar',
    //   language: 'English, Hindi',
    //   source: require('../images/Reruiting-agent-slice/user1.png'),
    //   year: '28 * 6 yrs experience',
    //   email: 'deepak@gmail.com',
    //   phone: '+91 9599499793',
    // },
    // {
    //   id: '2',
    //   title: 'Gourav Sharma',
    //   language: 'English, Hindi',
    //   source: require('../images/Reruiting-agent-slice/user2.png'),
    //   year: '28 * 6 yrs experience',
    //   email: 'deepak@gmail.com',
    //   phone: '+91 9599499793',
    // },
    // {
    //   id: '3',
    //   title: 'Deepak Kumar',
    //   language: 'English, Hindi',
    //   source: require('../images/Reruiting-agent-slice/user1.png'),
    //   year: '28 * 6 yrs experience',
    //   email: 'deepak@gmail.com',
    //   phone: '+91 9599499793',
    // },
  ]);
  useEffect(() => {
    // alert(JSON.stringify(route.params));
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getApproveList();
    }, []),
  );

  const getApproveList = async () => {
    const id = JSON.stringify(route.params.id);
    const body = {
      job_id: id,
    };
    const response = await Api.jobApprovedList(body);
    // console.log(response.data)
    setData(response.data);
    //  alert(JSON.stringify(response.data))
    console.log("approved response==", JSON.stringify(response.data))
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <FlatList
          numColumns={1}
          data={data}
          renderItem={({ item, index }) => (
            <View style={styles.box}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.image} source={require('../images/Reruiting-agent-slice/user1.png')} />
                <Text style={styles.name}>{item.user_name}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.userImage}
                  source={require('../images/Reruiting-agent-slice/portfolio.png')}
                />
                <Text style={styles.userText}>{item.work_exp} Years</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/language.png')}
                />
                <Text style={styles.user2Text}>{item.user_language}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/email.png')}
                />
                <Text style={styles.user3Text}>{item.user_email}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/iphone.png')}
                />
                <Text style={styles.user3Text}>{item.user_mobile}</Text>
              </View>
              <View style={{ width: '45%', marginLeft: 55, marginTop: 10 }}>
                <EndButton
                  title={'View Details'}
                  height={30}
                  fontSize={12}
                  bgColor={'#2574FF'}
                  txtcolor={'#fff'}
                  onPress={() => {
                    navigation.navigate('UserDetail', item );
                  }}
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};
const REJECT = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getRejectedList();
    }, []),
  );

  const getRejectedList = async () => {
    const id = JSON.stringify(route.params.id);
    console.log(id)
    const body = {
      job_id: id,
    };
    const response = await Api.jobRejectedList(body);
    console.log("rejected list", response)
    setData(response.data);
    // alert(JSON.stringify(response.data))
    // console.log("Applied response==",JSON.stringify(response.data))
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <FlatList
          numColumns={1}
          data={data}
          renderItem={({ item, index }) => (
            <View style={styles.box}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.image} source={require('../images/Reruiting-agent-slice/user1.png')} />
                <Text style={styles.name}>{item.user_name}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.userImage}
                  source={require('../images/Reruiting-agent-slice/portfolio.png')}
                />
                <Text style={styles.userText}>{item.work_exp} Years</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/language.png')}
                />
                <Text style={styles.user2Text}>{item.user_language}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/email.png')}
                />
                <Text style={styles.user3Text}>{item.user_email}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.user2Image}
                  source={require('../images/Reruiting-agent-slice/iphone.png')}
                />
                <Text style={styles.user3Text}>{item.user_mobile}</Text>
              </View>
              <View style={{ width: '30%', marginLeft: 55, marginTop: 10 }}>
                <EndButton
                  title={'Rejected'}
                  height={30}
                  fontSize={12}
                  bgColor={'#DA274D'}
                  txtcolor={'#fff'}
                  onPress={() => { }}
                />
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const renderScene = SceneMap({
  first: APPLY,
  second: APPROVE,
  third: REJECT,
});

const CandidateApplied = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [state, setState] = useState({
    isLoading: false
  })
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'APPLY' },
    { key: 'second', title: 'APPROVE' },
    { key: 'third', title: 'REJECT' },
  ]);
  return (
    <View style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Candidates Applied'}
        // shareOnClick={() => { }}
        // share={require('../images/Reruiting-agent-slice/support.png')}
      />
      <Loader status={state.isLoading} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            style={styles.style}
            labelStyle={styles.labelStyle}
            scrollEnabled={false}
            activeColor={'#2574FF'}
            inactiveColor={'#000000'}
            inactiveOpacity={0.5}
            {...props}
            indicatorStyle={styles.indicatorStyle}
          />
        )}
      />
    </View>
  );
};

export default CandidateApplied;

const styles = StyleSheet.create({
  style: { backgroundColor: 'white', elevation: 5 },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'Muli',
    fontWeight: 'bold',
    color: '#ACB1C0',
  },
  indicatorStyle: {
    backgroundColor: '#2574FF',
    height: 3,
  },
  box: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 14,
    elevation: 5,
    marginTop: 40,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginLeft: -30,
    marginTop: -30,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 15,
  },
  userImage: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 65,
    marginTop: -15,
  },
  userText: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: -19,
    marginLeft: 10,
  },
  user2Image: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 65,
    marginTop: 10,
  },
  user2Text: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: 7,
    marginLeft: 10,
  },
  user3Text: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: 7,
    marginLeft: 10,
    
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 10,
  
    
  },
  interviewText: {
    fontFamily: 'Muli-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: 5,
  },
});
