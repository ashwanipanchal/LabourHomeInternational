import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import { Api } from '../services/Api';
import JobList from '../Custom/JobList';
const {height} = Dimensions.get('window');

const SearchJob = ({navigation,route}) => {
    const [jobs, setJobs] = useState([])
    const [userHome, setUserHome] = useState([])
    const [state, setState] = useState({
        isLoading: false
      })
    useEffect(()=>{
        // alert("Hi")
        // alert(JSON.stringify(route.params,null,2))
        getJob()
    },[])
    const toggleLoader = isLoading => setState({ ...state, isLoading })
    const getJob = async() => {
      // alert(JSON.stringify(route.params,null,2))
        // setState.isLoading(true)
        toggleLoader(true)
        const body = {
            "key": route.params.key,
            "location": route.params.location,
            "offset":"0",
            "limit":"10"
        }
        // alert(JSON.stringify(body,null,2))
        // return
        const response = await Api.searchKeyJob(body);
        const response1 = await Api.getUserHome()
        // alert(JSON.stringify(response,null,2))
        // return
        // setState.isLoading(false)
        toggleLoader(false)
        const {status, job_list} = response
        if(status){
            setJobs(job_list)
            setUserHome(response1.home)
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
        title={'Search Results'}
        // searchOnClick={() => {
        //   navigation.navigate('Search');
        // }}
        // search={require('../images/search1.png')}
        filterOnClick={() => {
          navigation.navigate('Filter');
        }}
        filter={require('../images/filter.png')}
      />
      {state.isLoading ? <JobList /> : (
      <FlatList
            numColumns={1}
            data={jobs}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() =>{navigation.navigate('JobDetails1', { item, userHome })}}
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
                  <Text style={styles.redText}>{item.work_exp} Years</Text>
                  <Text style={styles.redText}>Posted on {item.post_job_date.slice(0,6)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />)}
      </View>
  )
}

export default SearchJob

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
        fontWeight: '600',
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