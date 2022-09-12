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
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import { BottomView, EndButton, HeaderLight } from '../Custom/CustomView';
import Toast from 'react-native-simple-toast';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Api, LocalStorage } from '../services/Api';
import Header from '../home/Header';
import { useIsFocused } from '@react-navigation/native';
import HomeList from '../Custom/HomeList';
import moment from 'moment'
import Loader from '../services/Loader';
const { height, width } = Dimensions.get('window');

const Home = ({ navigation, routes }) => {
  const isFocused = useIsFocused();
  const [token, setToken] = useState('')
  const [userHome, setUserHome] = useState({})
  const [recjob, setRecjob] = useState([])
  const [profileData, setProfileData] = useState({})
  const [start, setStar] = useState('')
  const [state, setState] = useState({
    key:'',
    location: '',
    isLoading: false,
  })
  const [newpostjob, setNewpostjob] = useState([])
  const [schduleInterview, setschduleInterview] = useState([])
  const toggleLoader = isLoading => setState({ ...state, isLoading })
  const getProfile = async () => {

    toggleLoader(true)

    const response = await Api.getUserHome()
    // const type = (await LocalStorage.getUserDetail()) || '{}';
    //   const user = JSON.parse(type)
    //   console.log("user is here =====", user)
    //   const body = {
    //     user_id: user?.id,
    //     user_type: user?.user_type
    //   }
    //   const response1 = await Api.getUserProfile(body);
    const { status } = response;
    if (status) {
      console.log("homeee-", response)
      toggleLoader(false)
      setUserHome(response.home)
      setRecjob(response.recommended_job)
      setNewpostjob(response.new_post_job)
      setschduleInterview(response.schedule_interview)
      // console.log('-----response1: ', response1);
      // setProfileData(response1)
    }
  }

  useEffect(() => {
    // const d = new Date('2022-07-15')
    // const date = moment(d).format("d MMM YYYY")
    // // alert(date)
    console.log("date ===",JSON.stringify(newSchData)) 
    getProfile()
  }, [isFocused]);


  // const netinfo = NetInfo.fetch().then(state => {
  //   console.log("Connection type", state.type);
  //   console.log("Is connected?", state.isConnected);
  // });

  const newSchData = schduleInterview.map((i) => {
    const d = new Date(i.schedule_date)
    const t = new Date(`${i.schedule_date} ${i.schedule_time}`)
    const dateFormatted = moment(d).format("DD MMM YYYY")
    const timeFormatted = moment(t).format("hh:mmA")
    return { ...i, dateFormatted, timeFormatted }
  })

  const addToShortlist = async (item) => {
    // setStar(item.shortlist)
    console.log("item", item)
    console.log(userHome)
    const body = {
      "user_id": userHome.id,
      "agency_id": item.user_id,
      "job_id": item.id
    }
    console.log(body)
    // return
    const response = await Api.jobShortListAdd(body)
    const { status } = response;
    if (status) {
      Toast.show(response.msg)
      getProfile()
    } else {

    }

  }

  const removeFromShortlist = async (item) => {
    setStar(item.shortlist)
    console.log("item", item)
    console.log(userHome)
    const body = {
      "user_id": userHome.id,
      "agency_id": item.user_id,
      "job_id": item.id
    }
    console.log(body)
    const response = await Api.jobShortListRemove(body)
    // alert(JSON.stringify(response,null,2))
    const { status } = response;
    if (status) {
      Toast.show(response.msg)
      getProfile()
    } else {

    }

  }

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
  // <View style={styles.loaderStyle}><ActivityIndicator size={'large'} color="#2574FF"/></View>
  return (
    <SafeAreaView style={{ backgroundColor: '#F8F8F8', flex: 1, }}>
      <StatusBarLight />
      <Header />
      <ScrollView>
       <Loader status={state.isLoading}/>
        <View style={{elevation:5}}>
      {/* <View style={{flexDirection: 'row', marginTop:25,}}>
        <View style={{marginTop: 85, marginLeft: 30}}>
          <AnimatedCircularProgress
            size={60}
            width={5}
            fill={70}
            rotation={10}
            tintColor="#fff"
            backgroundColor="#ffffff4d">
            {fill => (
              <TouchableOpacity onPress={() => changehandler()}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: '700',
                    // marginHorizontal: 20,
                  }}>
                  {'85%'}
                </Text>
              </TouchableOpacity>
            )}
          </AnimatedCircularProgress>
        </View>
        <View>
          <Text style={styles.name1}>{userHome.name}</Text>
          <Text style={styles.subName}>Labour Worker</Text>
          <Text style={styles.updated}>Last Updated 2 days ago</Text>
        </View>
        <Image
          style={styles.headerImage}
          source={require('../images/dp.png')}
        />
      </View> */}
      {/* {state.isLoading ? <HomeList/>: ( */}

      <>
        <View style={{ marginHorizontal: 20, elevation:5 }}>
          <ImageBackground imageStyle={{ borderRadius: 10, resizeMode: 'contain' }}
            style={{ width: width - 40, alignSelf: 'center', height: 250 }} source={require('../images/card_background.png')}>
            <View style={{ flexDirection: 'row', marginTop: 20, }}>
              <Image style={{ height: 210, width: 103, resizeMode: 'contain', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginLeft: 4, }} source={require('../images/profile.png')} />
              <View style={{ flexDirection: 'column', width: '71%' }}>
                <View style={{ width: '95%' }}>
                  <Text style={{ fontSize: 22, color: '#fff', fontFamily: 'Muli-Bold', alignSelf: 'flex-end' }}>{userHome.name}</Text>
                  <Text style={{ fontSize: 16, alignSelf: 'flex-end', color: '#fff', fontFamily: 'Muli-SemiBold' }}> {userHome.work_exp} Years Exp</Text>
                  <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Muli-SemiBold', alignSelf: 'flex-end' }}>{userHome.language}</Text>
                  <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Muli-SemiBold', alignSelf: 'flex-end' }}>{userHome.category_name}</Text>
                </View>
                <View style={{  width: '95%', position: 'absolute', bottom: 4 }}>
                  <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Muli-SemiBold', alignSelf: 'flex-end' }}>{userHome.city_name}</Text>
                  <Text style={{ fontSize: 22, color: '#fff', fontFamily: 'Muli-Bold', alignSelf: 'flex-end' }}>{userHome.state_name}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>


        <View style={styles.box}>
          <Text style={styles.boxText}>Search For?</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              value={state.key}
                onChangeText={key => setState({...state, key})}
              placeholderTextColor={'gray'}
              style={styles.textInput}
              placeholder={'Job Title, Company etc'}
            />
            <Image
              style={{
                width: 13,
                height: 13,
                marginTop: 20,
                marginLeft: 'auto',
                marginHorizontal: 20,
              }}
              source={require('../images/search.png')}
            />
          </View>
          <View style={styles.underLine} />
          <Text style={styles.boxText}>Where</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              value={state.location}
              // onFocus={showButton()}
              onChangeText={location => setState({...state, location})}
              placeholderTextColor={'gray'}
              style={styles.textInput}
              placeholder={'Enter Location'}
            />
            <Image
              style={{
                width: 12,
                height: 16,
                marginTop: 10,
                marginLeft: 'auto',
                marginHorizontal: 20,
              }}
              source={require('../images/location.png')}
            />
          </View>
          {state.key.length === 0 && state.location.length === 0 ? null : 
          <Pressable style={styles.button} onPress={()=>{navigation.navigate('SearchJob', state)}}>
          <Text style={styles.text}>Search</Text>
          </Pressable>
          }
        </View>
        <ScrollView decelerationRate={0.5}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.scheduleText}>Schedule Interview</Text>
            <Text style={styles.viewText} onPress={() => { navigation.navigate('ScheduleInterviewList', newSchData) }}>View All</Text>
          </View>
          <View>
            {/* <ScrollView decelerationRate={0.5} horizontal> */}
            <FlatList
              // numColumns={3}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={newSchData}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={{ flexDirection: 'row' }}activeOpacity={1}
                onPress={() => {
                  // console.log('clicked on perticuler inertview', item)
                  // alert("HI")
                  navigation.navigate('JobDetails', item);
                }}>
                <SafeAreaView style={styles.subBox}>
                  <View style={{ flexDirection: 'row' }}>
                    
                      
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          marginLeft: 10,
                          marginTop: 15,
                        }}
                        // source={item.source}
                        source={require('../images/Reruiting-agent-slice/images.png')}
                      />
                      <View>
                        <Text
                          style={styles.inText}>
                          {item.name}
                        </Text>
                        <Text style={styles.insubText}>{item.job_location}</Text>
                      </View>
                    
                    {/* <Image
                      style={{
                        width: 13,
                        height: 13,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                        marginTop: 15,
                      }}
                      source={require('../images/star.png')}
                    /> */}
                    {item.shortlist == 0 ? (
                      <TouchableOpacity
                        style={{ marginLeft: 'auto' }}
                        onPress={() => addToShortlist(item)}
                      >
                        <Image
                          style={{
                            width: 13,
                            height: 13,
                            marginLeft: 'auto',
                            marginHorizontal: 15,
                            marginTop: 15,
                          }}
                          source={require('../images/star.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ marginLeft: 'auto' }}
                        onPress={() => removeFromShortlist(item)}
                      >
                        <Image
                          style={{
                            width: 13,
                            height: 13,
                            marginLeft: 'auto',
                            marginHorizontal: 15,
                            marginTop: 15,
                          }}
                          source={require('../images/fill-star.png')}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.Line} />
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.redTextForSche}>{item.dateFormatted}, {item.timeFormatted}</Text>
                    {item.schedule_interview === "1" ? (
                      <View
                        style={{
                          width: '40%',
                          marginTop: 10,
                          marginLeft: 'auto',
                        }}>
                        <EndButton title={'Interview Call'} onPress={() => {makeVideoCall(item)}} />
                      </View>
                    ) : null}

                  </View>
                </SafeAreaView>
                </TouchableOpacity>
              )}
            />
            {/* </ScrollView> */}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.scheduleText}>Recommended Jobs</Text>
            <Text
              style={styles.viewText}
              onPress={() => {
                navigation.navigate('RecommendedJobs', recjob);
              }}>
              View All
            </Text>
          </View>
          <View>
            {/* <ScrollView decelerationRate={0.5} horizontal> */}
            <FlatList
              // numColumns={3}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={recjob}
              renderItem={({ item, index }) => (
                // <SafeAreaView style={styles.subBox}>
                <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('JobDetails1', { item, userHome })}>
                  <View style={styles.subBox}>
                    <View style={{ flexDirection: 'row' }}>

                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          marginLeft: 10,
                          marginTop: 15,
                        }}
                        source={require('../images/Reruiting-agent-slice/images.png')}
                      />
                      <View>
                        <Text
                          style={styles.inText}>
                          {item.name}
                        </Text>
                        <Text style={styles.insubText}>{item.job_location}</Text>
                      </View>


                      {/* <TouchableOpacity
                    style={{marginLeft:'auto'}}
                      onPress={()=>addToShortlist(item)}
                    >
                    <Image
                      style={{
                        width: 13,
                        height: 13,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                        marginTop: 15,
                      }}
                      source={item.shortlist ? require('../images/fill-star.png'): require('../images/star.png')}
                    />
                    </TouchableOpacity> */}

                      {item.shortlist == 0 ? (
                        <TouchableOpacity
                          style={{ marginLeft: 'auto' }}
                          onPress={() => addToShortlist(item)}
                        >
                          <Image
                            style={{
                              width: 13,
                              height: 13,
                              marginLeft: 'auto',
                              marginHorizontal: 15,
                              marginTop: 15,
                            }}
                            source={require('../images/star.png')}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{ marginLeft: 'auto' }}
                          onPress={() => removeFromShortlist(item)}
                        >
                          <Image
                            style={{
                              width: 13,
                              height: 13,
                              marginLeft: 'auto',
                              marginHorizontal: 15,
                              marginTop: 15,
                            }}
                            source={require('../images/fill-star.png')}
                          />
                        </TouchableOpacity>
                      )}

                    </View>
                    <View style={styles.Line} />
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                      <Text style={styles.redText}>{item.work_exp} Years</Text>
                      <View
                        style={{
                          width: '50%',
                          // marginTop: 10,
                          marginLeft: 'auto',
                          alignItems: 'center'
                        }}>
                        {/* <EndButton title={'Interview Call'} onPress={() => {}} /> */}
                        <Text style={styles.redText}>Posted on {item.post_job_date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                // </SafeAreaView>
              )}
            />
            {/* </ScrollView> */}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.scheduleText}>New Post Jobs</Text>
            <Text style={styles.viewText}
              onPress={() => {
                navigation.navigate('NewPostJobs');

              }}
            >View All</Text>
          </View>
          <View>
            {/* <ScrollView decelerationRate={0.5} horizontal> */}
            <FlatList
              // numColumns={3}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={newpostjob}
              renderItem={({ item, index }) => (
                // <SafeAreaView style={styles.subBox}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('JobDetails1', { item, userHome })}
                  style={{ flexDirection: 'row' }}>
                  <View style={styles.subBox}>
                    <View style={{ flexDirection: 'row' }}>

                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          marginLeft: 10,
                          marginTop: 15,
                        }}
                        source={require('../images/Reruiting-agent-slice/images.png')}
                      />
                      <View>
                        <Text
                          style={styles.inText}>
                          {item.name}
                        </Text>
                        <Text style={styles.insubText}>{item.job_location}</Text>
                      </View>

                      {item.shortlist == 0 ? (
                        <TouchableOpacity
                          style={{ marginLeft: 'auto' }}
                          onPress={() => addToShortlist(item)}
                        >
                          <Image
                            style={{
                              width: 13,
                              height: 13,
                              marginLeft: 'auto',
                              marginHorizontal: 15,
                              marginTop: 15,
                            }}
                            source={require('../images/star.png')}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{ marginLeft: 'auto' }}
                          onPress={() => removeFromShortlist(item)}
                        >
                          <Image
                            style={{
                              width: 13,
                              height: 13,
                              marginLeft: 'auto',
                              marginHorizontal: 15,
                              marginTop: 15,
                            }}
                            source={require('../images/fill-star.png')}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.Line} />
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                      <Text style={styles.redText}>{item.work_exp} Years</Text>
                      <View
                        style={{
                          width: '50%',
                          // marginTop: 10,
                          alignItems: 'center',
                          marginLeft: 'auto',
                        }}>
                        {/* <EndButton title={'Interview Call'} onPress={() => {}} /> */}
                        <Text style={styles.redText}>Posted on {item.post_job_date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                // </SafeAreaView>
              )}
            />
            {/* </ScrollView> */}
          </View>
        </ScrollView>
      </>

      {/* )
      } */}
      </View>
  </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  loaderStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '90%',
    zIndex: 10,
    elevation: 10,
  },
  roundCircle: {
    borderWidth: 5,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#fff',
    borderTopColor: 'grey',
    marginTop: '20%',
    marginLeft: 20,
  },
  roundText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
  },
  name1: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginTop: 80,
    marginLeft: 15,
  },
  subName: {
    fontFamily: 'Muli',
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginTop: 5,
    marginLeft: 15,
  },
  updated: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '600',
    color: 'lightgrey',
    marginTop: 7,
    marginLeft: 15,
  },
  headerImage: {
    width: 65,
    height: 63,
    borderRadius: 10,
    marginTop: 85,
    marginLeft: 'auto',
    marginHorizontal: 30,
  },
  box: {
    padding: 5,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  box2: {
    // padding: 5,
    // backgroundColor: '#fff',
    // elevation: 5,
    // borderRadius: 10,
    // marginHorizontal: 20,
    marginTop: 10,
  },
  boxText: {
    fontFamily: 'Muli',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 10,
    marginTop: 10,
  },
  textInput: {
    marginLeft: 5,
    fontSize: 14,
    width:'90%',
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    marginHorizontal: 15,
    // width: '55%',
    color: '#000'
  },
  underLine: {
    height: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginHorizontal: 10,
    marginTop: -5,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
  },
  scheduleText: {
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 20,
    marginTop: 20,
  },
  viewText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2473FD',
    marginLeft: 'auto',
    marginTop: 20,
    marginHorizontal: 30,
  },
  subBox: {
    width: 275,
    height: 120,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
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
  redText: {
    fontFamily: 'Muli',
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
    marginLeft: 15,
    marginTop: 15,
  },
  redTextForSche: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 12,
    fontWeight: '700',
    color: '#FF0000',
    marginLeft: 15,
    marginTop: 15,
  },
  recJobDate: {
    fontFamily: 'Muli',
    color: '#000',
    fontWeight: '600',
    fontSize: 10,
    marginRight: 5,
  },
  // container: {
  //   flex: 1
  // },
  // image: {
  //   top: 0,
  //   width: width,    
  //   height: 193,
  //   position: "absolute",
  //   left: 8
  // },
  // image_imageStyle: {},
  // textInput: {
  //   fontFamily: "roboto-regular",
  //   color: "rgba(255,255,255,1)",
  //   width: 134,
  //   height: 24,
  //   fontSize: 22,
  //   marginTop: 19,
  //   marginLeft: 177
  // },
  // loremIpsum: {
  //   fontFamily: "roboto-regular",
  //   color: "#121212",
  //   marginTop: 7,
  //   marginLeft: 221
  // },
  // rect: {
  //   width: 224,
  //   height: 58,
  //   backgroundColor: "rgba(189,16,224,1)",
  //   marginTop: 61,
  //   marginLeft: 96
  // },
  // loremIpsum3: {
  //   fontFamily: "roboto-regular",
  //   color: "#121212",
  //   height: 27,
  //   width: 96,
  //   marginTop: 14,
  //   marginLeft: 112
  // },
  // image2: {
  //   top: 8,
  //   left: 0,
  //   width: 113,
  //   height: 179,
  //   position: "absolute"
  // },
  // imageStack: {
  //   width: 332,
  //   height: 193,
  //   marginTop: -70,
  //   marginLeft: 18
  // }
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2574FF',
  },
  text: {
    fontSize: 16,
     fontFamily: 'Muli',
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
