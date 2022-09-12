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
import moment from 'moment'
import Toast from 'react-native-simple-toast';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import JobList from '../Custom/JobList';
import { Api } from '../services/Api';
import { EndButton } from '../Custom/CustomView';
const {height} = Dimensions.get('window');


const ScheduleInterviewList = ({navigation, route}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(()=>{
        // startLoading()
        // setData(route.params)
        getProfile()
      },[])

      const getProfile = async () => {
        setLoading(true)
        const response = await Api.getUserHome()
        // alert(JSON.stringify(response,null,2))
        const { status } = response;
        if (status) {
          // console.log("sch", response.home)
          setLoading(false)
          // setUserHome(response.home)
          // setRecjob(response.recommended_job)
          setData(response.schedule_interview)
          // setschduleInterview(response.schedule_interview)
    
        }
      }
      const newSchData = data.map((i) => {
        const d = new Date(i.schedule_date)
        const t = new Date(`${i.schedule_date} ${i.schedule_time}`)
        const dateFormatted = moment(d).format("DD MMM YYYY")
        const timeFormatted = moment(t).format("hh:mmA")
        return { ...i, dateFormatted, timeFormatted }
      })
    
      const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
          setData(route.params)
          setLoading(false);
        }, 500);
      };

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
        <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Scheduled Interview'}
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
            data={newSchData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() => navigation.navigate('JobDetails', item)}
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
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      marginLeft: 'auto',
                      marginTop: 15,
                      marginHorizontal: 15,
                    }}
                    source={item.shortlist == 0 ? require('../images/star.png'): require('../images/fill-star.png')}
                  />
                </View>
                <Text style={styles.middleText}>
                {item.job_description.slice(0,50)}…{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.redTextForSche}>{item.dateFormatted}, {item.timeFormatted}</Text>
                  {item.schedule_interview === "1" ? (
                      <View
                        style={{
                          width: '40%',
                          marginTop: 10,
                          marginLeft: 'auto',
                        }}>
                        <EndButton title={'Interview Call'} onPress={() => { makeVideoCall(item)}} />
                      </View>
                    ) : null}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      )}  
    </View>
    )
}

export default ScheduleInterviewList

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
      redTextForSche: {
        fontFamily: 'Muli',
        fontSize: 11,
        fontWeight: '700',
        color: '#FF0000',
        marginLeft: 15,
        marginTop: 15,
      },
      middleText: {
        fontFamily: 'Muli',
        fontSize: 14,
        fontWeight: '700',
        color: '#8F9BB3',
        marginLeft: 15,
        marginTop: 15,
      },
})