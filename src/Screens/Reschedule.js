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
  ImageBackgroundBase,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Api, LocalStorage} from '../services/Api';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {DisableButton, Header, HeaderDark, MainView} from '../Custom/CustomView';
import {BottomView, EndButton, HeaderLight} from '../Custom/CustomView';
import JobList from '../Custom/JobList';
const {height} = Dimensions.get('window');

const Reschedule = ({navigation}) => {
  const [state, setState] = useState({
    isLoading: false
  })
  const [data, setData] = useState([]);

  const toggleLoader = isLoading => setState({ ...state, isLoading })
  useEffect(()=>{
    getProfile()
  },[]);

  const getProfile = async ()=>{
    // toggleLoader(true)
    const type = (await LocalStorage.getUserDetail()) || '{}';
    const user = JSON.parse(type)
    const body = {
      "user_id" : user.id
    }
    const response = await Api.rescheduleListUser(body)
    const {status, data} = response;
    if(status){
      console.log("data data",data)
      setData(data)
      // toggleLoader(false)
    }    
  }
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Reschedule'} />
      <View>
      {/* {(data.length == 0 && alert("hi"))}
      <Image style={{resizeMode:'contain',width:'100%', justifyContent:'center', alignItems:'center', flex:1}} source={require('../images/no-data.png')}/> */}
      {state.isLoading ? <JobList /> : (
        <FlatList
          numColumns={1}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.subBox} onPress={()=>{navigation.navigate('JobDetails', item)}}>
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
                  <Text style={styles.inText}>{item.post_job_name}</Text>
                  <Text style={styles.insubText}>{item.post_job_location}</Text>
                </View>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 'auto',
                    marginTop: 15,
                    marginHorizontal: 15,
                  }}
                  source={require('../images/star.png')}
                />
              </View>
              <View style={styles.Line} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.redText}>{item.interview_call}</Text>
                <View
                  style={{
                    width: '30%',
                    marginTop: 10,
                    marginLeft: 'auto',
                  }}>
                  <DisableButton title={'Interview Call'} bgColor={'#cccccc'}
                    txtcolor={'#fff'} onPress={() => {}} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        )}
      </View>
    </View>
  );
};

export default Reschedule;

const styles = StyleSheet.create({
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
    fontFamily: 'Muli-SemiBold',
    fontSize: 13,
    fontWeight: '700',
    color: '#FF0000',
    marginLeft: 15,
    marginTop: 15,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
  },
});
