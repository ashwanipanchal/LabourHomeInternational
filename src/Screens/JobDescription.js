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
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import {
  BottomView,
  EndButton,
  ButtonStyle,
  StartButton,
} from '../Custom/CustomView';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { Api } from '../services/Api';
const {height} = Dimensions.get('window');

const JobDescription = ({navigation, route}) => {
  // alert(JSON.stringify(route.params,null,2))
  const [dummyData, setDummyData] = useState()
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([
    {
      title: `${route.params.item.work_exp} Years`,
      source: require('../images/portfolio.png'),
    },
    {
      title: `${route.params.item.labour_requird} Labour Require`,
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
    {
      title: route.params.item.job_description,
      source: require('../images/pen-tool.png'),
    },
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
      title: `${route.params.item.working_hours} Hours Per Day`,
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

  const closeJob = async() => {
    const body = {
      "job_id": route.params.item.id
    }
    const response = await Api.postJobClose(body)
    const {status} = response;
    if(status){
      setModalOpen(true)
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
        // shareOnClick={() => {}}
        // share={require('../images/Reruiting-agent-slice/support.png')}
      />
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
              <Text style={styles.insubText}>{route.params.item.job_location}</Text>
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
          {/* {route.params.item.job_description} */}
          {route.params.item.job_description.slice(0,50)}…{' '}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.redText}>{route.params.item.work_exp} Years</Text>
            <Text style={styles.redText}>Posted on {route.params.item.post_job_date}</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <FlatList
            numColumns={1}
            data={data}
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
          <Text style={styles.about}>
            {route.params.item.job_description}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          <View style={{width: '46%', marginTop: 20}}>
            <EndButton
              title={'VIEW APPLICANTS'}
              height={45}
              fontSize={16}
              bgColor={'#2574FF'}
              txtcolor={'#fff'}
              onPress={() => {
                navigation.navigate('CandidateApplied',route.params.item);
              }}
            />
          </View>
          <View style={{width: '46%', marginTop: 20}}>
            <EndButton
              title={'CLOSE JOB'}
              height={45}
              fontSize={16}
              bgColor={'#DA274D'}
              txtcolor={'#fff'}
              onPress={() => 
                closeJob()
              }
            />
          </View>
        </View>
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
                source={require('../images/tick.png')}
              />
              <Text style={styles.text}>
                Job Deleted{`\n`}
                Successfully
              </Text>
              <View style={{width: '35%', alignSelf: 'center', marginTop: 20}}>
                <StartButton
                  title={'OK'}
                  onPress={() => {
                    navigation.navigate('ProjectorHome');
                  }}
                />
              </View>
              <BottomView />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default JobDescription;

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
    fontFamily: 'Muli-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
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
