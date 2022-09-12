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
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';
import JobList from '../Custom/JobList';
const {height} = Dimensions.get('window');

const NewPostJobs = ({navigation, route}) => {
  // console.log("NewJobPost", JSON.stringify(route.params))
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [userHome, setUserHome] = useState([]);

  useEffect(()=>{
    getProfile()
    // startLoading()
    // setData(route.params)
  },[])

  const getProfile = async () => {
    setLoading(true)
    const response = await Api.getUserHome()
    const { status } = response;
    if (status) {
      // console.log("sch", response.home)
      setLoading(false)
      setUserHome(response.home)
      // setRecjob(response.recommended_job)
      setData(response.new_post_job)
      // setschduleInterview(response.schedule_interview)

    }
  }
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setData(route.params)
      setLoading(false);
    }, 500);
  };

  // const getProfile = async () => {
  //   // toggleLoader(true)
  //   const response = await Api.getUserHome()
  //   alert(JSON.stringify(response,null,2))
  //   const { status } = response;
  //   if (status) {
  //     // console.log("sch", response.home)
  //     // toggleLoader(false)
  //     // setUserHome(response.home)
  //     // setRecjob(response.recommended_job)
  //     // setNewpostjob(response.new_post_job)
  //     // setschduleInterview(response.schedule_interview)

  //   }
  // }
  const doTask = async(item) => {

    if(item.shortlist == 0 ){
      console.log("item", item)
      // alert(JSON.stringify(item,null,2))
      const body = {
        "user_id": userHome.id,
        "agency_id": item.agency_id,
        "job_id": item.id
      }
      // console.log(body)
      // alert(JSON.stringify(body,null,2))
      // return
      const response = await Api.jobShortListAdd(body)
      // alert(JSON.stringify(response,null,2))
      const { status } = response;
      if (status) {
        Toast.show(response.msg)
        getProfile()
      }

    }else{
      // alert(JSON.stringify(item,null,2))
        console.log("item", item)
        const body = {
          "user_id": userHome.id,
          "agency_id": item.agency_id,
          "job_id": item.id
        }
        // console.log(body)
        // alert(JSON.stringify(body,null,2))
        // return
        const response = await Api.jobShortListRemove(body)
        // alert(JSON.stringify(response,null,2))
        const { status } = response;
        if (status) {
          Toast.show(response.msg)
          getProfile()
        }
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
        title={'New Job Post'}
        searchOnClick={() => {
          navigation.navigate('Search');
        }}
        search={require('../images/search1.png')}
        filterOnClick={() => {
          navigation.navigate('Filter');
        }}
        filter={require('../images/filter.png')}
      />
      {loading ? <JobList/>: (
        <ScrollView>
        <View>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() => navigation.navigate('JobDetails1', {item,item})}
                >
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
                    <Text style={styles.inText}>{item.name}</Text>
                    <Text style={styles.insubText}>{item.job_location}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => doTask(item)}
                    style={{
                      marginLeft: 'auto',
                      height:'auto',
                      // marginHorizontal: 15,
                      // backgroundColor:'red'
                    }}>
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 'auto',
                        marginTop: 15,
                        marginHorizontal: 15,
                      }}
                      source={item.shortlist == 0 ? require('../images/star.png') : require('../images/fill-star.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.middleText}>
                  {item.job_description.slice(0,50)}…{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.redText}>{item.work_exp} Years</Text>
                  <Text style={styles.redText}>Posted on {item.post_job_date}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      )}  
    </View>
  );
};

export default NewPostJobs;

const styles = StyleSheet.create({
  image: {
    marginTop: height / 3,
    width: 219,
    height: 232,
    resizeMode: 'contain',
    alignSelf: 'center',
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
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  middleText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 15,
  },
});
