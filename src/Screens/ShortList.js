import { useFocusEffect } from '@react-navigation/native';
import React, {useEffect, useState, useMemo} from 'react';
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
import {Header, HeaderDark} from '../Custom/CustomView';
import Toast from 'react-native-simple-toast';
import {Api, LocalStorage} from '../services/Api';
import JobList from '../Custom/JobList';
const {height} = Dimensions.get('window');

const ShortList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [userHome, setUserHome] = useState([])
  const [state, setState] = useState({
    isLoading:false
  })

  useFocusEffect(React.useCallback(()=>{
    shortList()
  },[]))
  // useEffect(()=>{
  //   ShortList()
  // },[memoizedVal])

  // const memoizedVal = useMemo(() => shortList(), []);
  const toggleLoader = isLoading => setState({ ...state, isLoading })
  const shortList = async() => {
    toggleLoader(true)
    const response = await Api.shortListPage()
    const response1 = await Api.getUserHome()
    const {status, data} = response;
    // console.log("shortlist response", response)
    // alert(JSON.stringify(data,null,2))
    if(status){
      toggleLoader(false)
      setData(data)
      setUserHome(response1.home)
    }
  }

  const removeFromShortlist = async (item) => {

    console.log("item", item)
    console.log(userHome)
    const body = {
      "user_id": item.user_id,
      "agency_id": item.agency_id,
      "job_id": item.job_id
    }
    console.log(body)
    // return
    const response = await Api.jobShortListRemove(body)
    // alert(JSON.stringify(response,null,2))
    // return
    const { status } = response;
    if (status) {
      Toast.show(response.msg)
      shortList()
    } else {
      Toast.show("Something Went Wrong")
    }

  }

  if(data.length == 0){
    return (
      <View style={{backgroundColor: '#FFF', flex: 1}}>
        <StatusBarLight />
        <HeaderDark onPress={() => navigation.goBack()} title={'Shortlist'} />
        <Image style={{resizeMode:'contain', width:'100%', height:'100%'}} source={require('../images/no-data.png')}/>
      </View>
    )
  }

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Shortlist'} />
      {(data.length>0 &&
      <ScrollView>
      {state.isLoading ? <JobList /> : (
        <View>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={()=>{navigation.navigate('JobDetails1', { item, userHome })}} style={styles.subBox}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      marginTop: 15,
                    }}
                    source ={require('../images/Reruiting-agent-slice/images.png')}
                  />
                  <View>
                    <Text style={styles.inText}>{item.name}</Text>
                    <Text style={styles.insubText}>{item.job_location}</Text>
                  </View>
                  <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => removeFromShortlist(item)}>
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 'auto',
                        marginHorizontal: 15,
                        marginTop: 15,
                      }}
                      source={require('../images/fill-star.png')}
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
                  <Text style={styles.redText}>Posted on {item.post_job_date.slice(0,6)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>)}
      </ScrollView>)}
      {/* {(data.length == 0 && 
      <View style={{backgroundColor:'red', flex:1}}>
        <Image style={{resizeMode:'contain', width:'100%', height:'100%'}} source={require('../images/no-data.png')}/>
      </View>
      )} */}
    </View>
  );
};

export default ShortList;

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
