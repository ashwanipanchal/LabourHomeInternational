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
import {HeaderDark} from '../Custom/CustomView';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Api} from '../services/Api'
import JobList from '../Custom/JobList';
const {height} = Dimensions.get('window');

const JOBAPPLIES = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isLoading: false
  })
  useFocusEffect(
    React.useCallback(()=>{
      getData()
    },[])
  )

  const toggleLoader = isLoading => setState({ ...state, isLoading })
  const getData =async()=>{
    toggleLoader(true)
    const response = await Api.appliedJob()
    toggleLoader(false)
    // console.log("response goin on jobdetails", response)
    // console.log(response.data)
    const {status, data} = response;
    if(status){
      setData(data)
    }
    
  }

  
  if(!state.isLoading && data.length == 0){
    // alert("come here")
    return (
    <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff',flex:1}}>
      <Image style={{resizeMode:'contain', width:'50%', height:'50%'}} source={require('../images/no-data.png')}/>
    </View>
  )}
  
  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
      <ScrollView>
      {state.isLoading ? <JobList /> : (
        <View>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() => {
                  navigation.navigate('JobDetails', item);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      marginTop: 15,
                    }}
                    source={ require('../images/Reruiting-agent-slice/images.png')}
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
                      marginHorizontal: 15,
                      marginTop: 15,
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
          />
        </View>)}
        </ScrollView>
    </View>
  );
};

const JOBDECLINE = () => {
  const navigation = useNavigation();
  const [item, setItem] = useState([]);
  const [state, setState] = useState({
    isLoading: false
  })

  useFocusEffect(
    React.useCallback(()=>{
      getData()
    },[])
  )
  const toggleLoader = isLoading => setState({ ...state, isLoading })
  const getData =async()=>{
    toggleLoader(true)
     const response = await Api.declinedJob()
    console.log(response.data)
    toggleLoader(false)
    setItem(response.data)
  }


  if(!state.isLoading && item.length == 0){
    // alert("come here")
    return (
    <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff',flex:1}}>
      <Image style={{resizeMode:'contain', width:'50%', height:'50%'}} source={require('../images/no-data.png')}/>
    </View>
  )}
  return (
    <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
      <ScrollView>
      {state.isLoading ? <JobList /> : (
        <View>
          <FlatList
            numColumns={1}
            data={item}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() => {
                  navigation.navigate('JobDetailsUser', {item:item});
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      marginTop: 15,
                    }}
                    source={ require('../images/Reruiting-agent-slice/images.png')}
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
                      marginHorizontal: 15,
                      marginTop: 15,
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
                  <Text style={styles.redText}>{item.work_exp}</Text>
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

const renderScene = SceneMap({
  first: JOBAPPLIES,
  second: JOBDECLINE,
});

const MyJobs = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'JOB APPLIES'},
    {key: 'second', title: 'JOB DECLINE'},
  ]);
  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'My Jobs'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
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

export default MyJobs;

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
    marginLeft: 15,
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
});
