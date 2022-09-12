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
  TextInput,
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {DisableButton, Header, HeaderDark} from '../Custom/CustomView';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
import JobList from '../Custom/JobList';
import { Api } from '../services/Api';
const {height} = Dimensions.get('window');

const Search = ({navigation,route}) => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [userHome, setUserHome] = useState([])
  const [state, setState] = useState({
    key:'',
    location:'',
    count:'',
    isLoading: false
  })

  const toggleLoader = isLoading => setState({ ...state, isLoading })
  const getJobs = async() => {
    setClicked(true)
    toggleLoader(true)
        const body = {
            "key": state.key,
            "location": state.location,
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
        setClicked(false)
        if(status){
          setState({...state, count:job_list.length})
          state.count = job_list.length;
            setData(job_list)
            setUserHome(response1.home)
        }
  }

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Search'} />
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.boxText}>Search For?</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={state.key}
                onChangeText={key => setState({...state, key})}
              style={styles.textInput}
              placeholderTextColor={'gray'}
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
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={state.location}
                onChangeText={location => setState({...state, location})}
              style={styles.textInput}
              placeholderTextColor={'gray'}
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
        </View>
        {clicked ?
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
              <DisableButton title={'SEARCH'}
                height={50}
                fontSize={16}
                loader={state.isLoading}
                bgColor={'#cccccc'}
                txtcolor={'#fff'} />
            </View> :
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
              <ButtonStyle loader={state.isLoading} title={'SEARCH'} onPress={() => getJobs()} />
            </View>}
        {/* <View style={{width: '90%', marginTop: 30, alignSelf: 'center'}}>
          <ButtonStyle title={'SEARCH'} onPress={() => {getJobs()}} />
        </View> */}
        <Text style={styles.job}>{state.count} Jobs</Text>
        {state.isLoading ? <JobList /> : (
        <View>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={()=> {navigation.navigate('JobDetails1', { item, userHome })}} style={styles.subBox}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      marginTop: 15,
                    }}
                    source={require('../images/images.png')}
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
                      marginHorizontal: 10,
                      marginTop: 15,
                    }}
                    source={require('../images/star.png')}
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
          />
        </View>)}
      </ScrollView>
    </View>
  );
};

export default Search;

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
  box: {
    padding: 5,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
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
    width:'90%',
    fontSize: 14,
    fontFamily: 'Muli',
    fontFamily: '500',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    color:'black'
  },
  underLine: {
    height: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginHorizontal: 10,
    marginTop: -5,
  },
  job: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 20,
    marginTop: 20,
  },
});
