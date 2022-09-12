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
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import { Api, LocalStorage } from '../services/Api';
import { Header, HeaderDark } from '../Custom/CustomView';
import JobList from '../Custom/JobList';
const { height } = Dimensions.get('window');

const PostedJobs = ({ navigation, route }) => {
  const home = route.params
  const [state, setState] = useState({
    isLoading: false
  })
  const [user, setUser] = useState()
  const [data, setData] = useState([]);
  const toggleLoader = isLoading => setState({ ...state, isLoading })
  useEffect(() => {
    getPostedJobList()
  }, [])

  const getPostedJobList = async () => {
    // const type = (await LocalStorage.getUserDetail()) || '';
    const token = (await LocalStorage.getToken()) || '';

    const body = {
      'user_id': home.id,
      'user_type': home.user_type
    }
    console.log("checking body", body)
    // const btoken = `Bearer ${token}`
    // const response = await fetch('http://139.59.67.166/Labour-Home-Job/public/api/posted_job_list',{
    //   method:"POST",
    //   headers:{
    //     "Accept" : "application/json",
    //     "Content-Type": "application/json",
    //     "x-api-key" : "e2cfe1ebab87981db56aa5aea4448701",
    //     "Authorization" : btoken
    //   },
    //   body:JSON.stringify(body)
    // })
    // const postedJobResponse = await response.json();
    toggleLoader(true)
    const response = await Api.postedJobList(body)
    console.log(response)
    setData(response.data)
    toggleLoader(false)
  }

  return (
    <View style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Posted Jobs'}
        // shareOnClick={() => { }}
        // share={require('../images/Reruiting-agent-slice/support.png')}
      />
      {state.isLoading ? <JobList /> : (
        <ScrollView>
          <View>
            <FlatList
              numColumns={1}
              data={data}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.subBox}
                  onPress={() => navigation.navigate('JobDescription', { item: item })}>
                  <View style={{ flexDirection: 'row' }}>
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
                      {/* <Text style={styles.insubText}>{item.job_description}</Text> */}
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
                    {item.job_description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.redText}>{item.work_exp} Years</Text>
                    <Text style={styles.redText}>{item.post_job_date}</Text>
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

export default PostedJobs;

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
