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
  Modal,
  Share
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import Timeline from 'react-native-timeline-flatlist';
import AppHeader from '../Custom/CustomAppHeader';
import {BottomView, EndButton, ButtonStyle, DisableButton} from '../Custom/CustomView';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {LocalStorage, Api} from '../services/Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
const {height} = Dimensions.get('window');

const JOBDETAILS = ({data}) => {
  const [state, setState] = useState({
    isLoading:false
  })
  const [clicked, setClicked] = useState(false);
  const route = useRoute();
  // alert(JSON.stringify(route.params,null,2))
  console.log("cehckinggggggg routeee", route.params.item)
  const [jobAppliedStatus, setJobAppliedStatus] = useState(route.params.item.job_appled)
  const [dummyData, setDummyData] = useState([
    {
      title: route.params.item.work_exp,
      source: require('../images/portfolio.png'),
    },
    {
      title: route.params.item.labour_requird,
      source: require('../images/filter-manager.png'),
    },
    {
      title: route.params.item.job_location,
      source: require('../images/location1.png'),
    },
    // {
    //   title: 'Not disclosed',
    //   source: require('../images/book.png'),
    // },
    // {
    //   title: 'Hard Hat, Mason, Brick Layer, Maker',
    //   source: require('../images/pen-tool.png'),
    // },
    {
      title: `${route.params.item.contract_period} Contract Period`,
      source: require('../images/book.png'),
    },
    {
      title: route.params.item.accommodation,
      source: require('../images/home.png'),
    },
    {
      title: route.params.item.food,
      source: require('../images/salad.png'),
    },
    {
      title: `${route.params.item.working_hours} Hours Per Day `,
      source: require('../images/clock.png'),
    },
    {
      title: route.params.item.transportation,
      source: require('../images/bus.png'),
    },
    {
      title: route.params.item.medical_insurance,
      source: require('../images/first-aid-kit.png'),
    },
    {
      title: route.params.item.air_ticket,
      source: require('../images/airplane.png'),
    },
  ]);
useEffect(()=>{
  // alert(JSON.stringify(route.params,null,2))
  // console.log("route.params from details1", route.params)
},[])
  // var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
  // console.log('Detail PAge data ++++', route.params);
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigation();

  // console.log('Route====', route.params);
  const ff = route.params;
  // console.log('ff.name', ff);
  //  var result = Object.keys(ff.item).map((key) => [String(key), ff.item[key]]);
  //  console.log("objj result", result)
  // console.log("Route PArams====", route.params)
  // // console.log("job====", route.params.job)

  const applyJob = async() =>{
    // console.log("102====",route.params.userHome)
    setClicked(true)
    const value = (await LocalStorage.getUserDetail() || '')
    const user = JSON.parse(value)
    setState({ ...state, isLoading: true });
    const body = {
      "user_id": user.id,
      "agency_id": route.params.item.user_id,
      "job_id": route.params.item.id
    }
    // alert(JSON.stringify(body,null,2))
    // return
    // console.log("102====",body)
    const response = await Api.jobApply(body);
    // alert(JSON.stringify(response))
    // return
    const {status , data} = response;
    // const resposeAfterApply = await response.json()
    // // console.log(resposeAfterAddToShortList)
    if(status){
    setJobAppliedStatus(response.data.status)
    setClicked(false)
    setState({ ...state, isLoading: false });
      Toast.show("Job Applied")
      navigation.navigate('MyJobs', data);
    }  
  }

  const declineJob = async() => {
    const value = (await LocalStorage.getUserDetail() || '')
    const user = JSON.parse(value)
    const body = {
      "user_id": user.id,
      "agency_id": route.params.item.user_id,
      "job_id": route.params.item.id
    }
    console.log(body)
    const response = await Api.jobDecline(body)
    // return
    const {status, data} = response;
    console.log(status)
    if(status){
      setModalOpen(true)
    }
  }


  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
      <ScrollView>
        <View style={styles.subBox}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 50,
                height: 50,
                marginLeft: 5,
                marginTop: 15,
              }}
              source={require('../images/images.png')}
            />
            <View>
              <Text style={styles.inText}>{route.params.item.name}</Text>
              <Text style={styles.insubText}>
                {route.params.item.job_location}
              </Text>
            </View>
            {/* <Image
              style={{
                width: 16,
                height: 16,
                marginLeft: 'auto',
                marginHorizontal: 15,
                marginTop: 15,
              }}
              source={require('../images/star.png')}
            /> */}
          </View>
          <Text style={styles.middleText}>
          {route.params.item.job_description.slice(0,50)}…{' '}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.redText}>
              Exp: {route.params.item.work_exp} Years
            </Text>
            <Text style={styles.redText}>Posted on {route.params.item.post_job_date.slice(0,6)}</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <FlatList
            numColumns={1}
            data={dummyData}
            renderItem={({item, index}) => (
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    width: 17,
                    height: 17,
                    resizeMode: 'contain',
                    marginTop: 15,
                    marginLeft: 5,
                  }}
                  source={item.source}
                />
                <Text style={styles.boxText}>{item.title}</Text>
              </View>
            )}
          />
        </View>
        <Text style={styles.job}>Job Description</Text>
        <View style={styles.subBox}>
          <Text style={styles.aboutHeading}>What you’ll do</Text>
          <Text style={styles.about}>{route.params.item.job_description}</Text>
        </View>
        <View style={styles.subBox}>
          <Text style={styles.text}>Industry type</Text>
          <Text style={styles.subText}>{route.params.item.category_name}</Text>
          <Text style={styles.text}>Functional Area</Text>
          <Text style={styles.subText}>{route.params.item.sub_category_name}</Text>
          <Text style={styles.text}>Employment Type</Text>
          <Text style={styles.subText}>Full Time</Text>
          <Text style={styles.text}>Education</Text>
          <Text style={styles.subText}>{route.params.item.qualification}</Text>
        </View>
        {jobAppliedStatus == 0 ? (
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <View style={{width: '45%', marginTop: 20}}>
            {clicked ? 
                <EndButton
                title={'APPLY NOW'}
                height={40}
                txtcolor={'#fff'}
                loader={state.isLoading}
                />:
              <EndButton
                title={'APPLY NOW'}
                height={40}
                txtcolor={'#fff'}
                loader={state.isLoading}
                onPress={() => {
                  applyJob()
                  
                }}
              />}
          </View>
          <View style={{width: '45%', marginTop: 20}}>
            <EndButton
              title={'DECLINE'}
              height={40}
              bgColor={'#DA274D'}
              txtcolor={'#fff'}
              onPress={() => 
                // setModalOpen(true)
                declineJob()
              }
            />
          </View>
        </View>
        ): (
          <View style={{width: '100%', marginTop: 20}}>
           <DisableButton
              title={'JOB APPLIED ALREADY'}
              height={45}
              fontSize={16}
              bgColor={'#cccccc'}
              txtcolor={'#fff'}
            />
          </View>
        )}
        
        <BottomView />
        <Modal
          visible={modalOpen}
          transparent={true}
          onRequestClose={() => setModalOpen(false)}>
          <View style={styles.modal_View}>
            <View
              activeOpacity={0.8}
              style={styles.mdtop}
              onPress={() => {
                navigation.navigate('TabNavigator');
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
                source={require('../images/close.png')}
              />
              <Text style={styles.modaltext}>Decline Job</Text>

              <Text style={styles.modalsubText}>
                are you sure you want to{`\n`}decline this job ?
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={styles.yes}
                  onPress={() => {
                    navigation.navigate('MyJobs', { screen: 'JOBDECLINE' });
                  }}>
                  YES
                </Text>
                <Text style={styles.no}>NO</Text>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const ABOUTCOMPANY = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = [
    {
      title: (
        <Text>
          {' '}
          Job Applied <Text style={{color: '#8F9BB3'}}>by Thu, 05 Oct</Text>
        </Text>
      ),
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick.png')}
        />
      ),
    },
    {
      title: (
        <Text>
          Approved <Text style={{color: '#8F9BB3'}}>today</Text>
        </Text>
      ),
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick.png')}
        />
      ),
    },
    {
      title: (
        <Text>
          Document Submit <Text style={{color: '#8F9BB3'}}>by Sat, 09 Oct</Text>
        </Text>
      ),
      icon: require('../images/tick1.png'),
    },
    {
      title: (
        <Text>
          Interview Call <Text style={{color: '#8F9BB3'}}>on Fri, 15 Oct</Text>
        </Text>
      ),
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick.png')}
        />
      ),
      description: '(Location: C-9/21 Rohini Sector-7 2nd Floor)',
    },
    {
      title: (
        <Text>
          Interview Done <Text style={{color: '#8F9BB3'}}>on Mon, 18 Oct</Text>
        </Text>
      ),
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick.png')}
        />
      ),
    },
    {
      title: 'Upload Skill Certificate',
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick.png')}
        />
      ),
      imageUrl: require('../images/Reruiting-agent-slice/skill.png'),
    },
    {
      title: 'Status Approved',
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick.png')}
        />
      ),
    },
    {
      title: 'Certificate Verified',
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick.png')}
        />
      ),
    },
    {
      title: (
        <Text style={{color: '#8F9BB3'}}>
          Make Payment (min amount ₹5000/-)
        </Text>
      ),
      icon: (
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={require('../images/tick2.png')}
        />
      ),
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <ScrollView>
        <View style={styles.sub2Box}>
          <Text style={styles.viewJob}>Job Status</Text>
          <View style={styles.Line} />
          <Timeline
            data={data}
            circleColor={'#00AA83'}
            lineColor={'#00AA83'}
            listViewStyle={{marginLeft: -25}}
            innerCircle={'icon'}
            iconStyle={{
              height: 9,
              width: 9,
              resizeMode: 'contain',
            }}
            titleStyle={{
              color: '#00AA83',
              fontSize: 14,
              marginBottom: 30,
              marginTop: -13,
            }}
            descriptionStyle={{
              color: '#8F9BB3',
              fontSize: 12,
              marginTop: -10,
              marginBottom: 10,
            }}
          />
          <View style={{width: '50%', marginLeft: 30}}>
            <ButtonStyle
              title={'PAYMENT NOW'}
              height={40}
              onPress={() => {
                navigation.navigate('Payment');
              }}
            />
          </View>
          <BottomView />
        </View>
      </ScrollView> */}
      <Text style={styles.job}>About Company</Text>
        <View style={styles.subBox}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 50,
                height: 50,
                marginLeft: 5,
                marginTop: 15,
              }}
              source={require('../images/images.png')}
            />
            <View>
              <Text style={styles.in2Text}>{route.params.item.name}</Text>
              <Text style={styles.insub2Text}>
                {route.params.item.job_location}
              </Text>
              {/* <Text style={styles.insub2Text}>Above 500</Text> */}
            </View>
          </View>
          <Text style={styles.about2Heading}>Overview</Text>
          <Text style={styles.about}>
            {route.params.item.job_description}
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took */}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
              paddingRight: 20,
              marginBottom: 20,
            }}>
            <Image
              style={{
                width: 92,
                height: 92,
                borderRadius: 15,
              }}
              source={require('../images/image.png')}
            />
            <Image
              style={{
                width: 92,
                height: 92,
                borderRadius: 15,
              }}
              source={require('../images/Reruiting-agent-slice/images.png')}
            />
            <Image
              style={{
                width: 92,
                height: 92,
                borderRadius: 15,
              }}
              source={require('../images/image.png')}
            />
          </View>
        </View>
    </View>
  );
};

let renderScene = SceneMap({
  first: JOBDETAILS,
  second: ABOUTCOMPANY,
});

const JobDetails1 = ({navigation, route}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [newData, setNewData] = React.useState();
  const [routes] = React.useState([
    {key: 'first', title: 'JOB DETAILS'},
    {key: 'second', title: 'ABOUT COMPANY'},
  ]);

  useEffect(() => {
    const data = JSON.stringify(route.params);
    console.log(JSON.stringify(route.params));
    setNewData(data);
  }, []);

  const shareJob = async() => {
    try {
      const result = await Share.share({
        message:
          'Labour Home Job',
          url: 'https:google.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
    
  }

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Job Details'}
        shareOnClick={() => {shareJob()}}
        share={require('../images/share.png')}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene ? renderScene : () => {}}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
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

export default JobDetails1;

const styles = StyleSheet.create({
  image: {
    marginTop: height / 3,
    width: 219,
    height: 232,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  style: {backgroundColor: 'white', elevation: 5},
  labelStyle: {
    fontSize: 16,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    color: '#ACB1C0',
  },
  indicatorStyle: {
    backgroundColor: '#2574FF',
    height: 3,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 15,
  },
  in2Text: {
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: '700',
    color: '#2574FF',
    marginLeft: 15,
    marginTop: 10,
  },
  insubText: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },
  insub2Text: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    // marginTop: 5,
  },
  redText: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 10,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
  },
  middleText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#8F9BB3',
    marginLeft: 5,
    marginTop: 15,
  },
  boxText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 13,
  },
  job: {
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 20,
    marginTop: 20,
  },
  aboutHeading: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 5,
  },
  about2Heading: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 5,
    marginTop: 20,
  },
  about: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1F20',
    marginLeft: 5,
    marginTop: 5,
    lineHeight: 22,
    textAlign: 'justify',
    marginHorizontal: 20,
  },
  text: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 5,
    marginTop: 5,
  },
  subText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 5,
    marginTop: 5,
  },
  modal_View: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  mdtop: {
    backgroundColor: '#FFFFFF',
    marginTop: height / 3,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  modaltext: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 18,
    color: '#F72C57',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },
  modalsubText: {
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 15,
    color: '#6F6F7B',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 22,
  },
  sub2Box: {
    width: 335,
    height: 575,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 20,
    // marginLeft: 25,
    marginBottom: 5,
    alignSelf: 'center',
  },
  yes: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 15,
    color: '#2574FF',
    marginLeft: 'auto',
  },
  no: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 15,
    color: '#F72C57',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
