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
  ImageBackground,
  Alert
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header2, Header3} from '../Custom/CustomView';
import { Api, LocalStorage } from '../services/Api';
import { _RemoveAuthToken } from '../services/ApiSauce';
import Banner from '../home/Banner';
import Approval from '../Screens/Approval';
import banner from '../home/Banner';
const {height} = Dimensions.get('window');

const ProjectorHome = ({navigation}) => {
  
  const [approval,setApproval]=useState('')
  const [userProfile, setUserProfile] = useState();
  const [supportInfo, setSupportInfo] = useState();
  const [banner,setBanner]=useState([])
  const [data, setData] = useState([
    {
      keys: 1,
      title: 'Post a \n job',
      source: require('../images/Reruiting-agent-slice/project-exporter/background7.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/user.png'),
    },
    {
      keys: 2,
      title: 'My\nProfile',
      source: require('../images/Reruiting-agent-slice/project-exporter/background.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/user.png'),
    },
    {
      keys: 3,
      title: 'Posted\nJobs',
      source: require('../images/Reruiting-agent-slice/project-exporter/background1.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/post.png'),
    },
    {
      keys: 4,
      title: 'Candidate\nApplied',
      source: require('../images/Reruiting-agent-slice/project-exporter/background3.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/candidate.png'),
    },
    {
      keys: 5,
      title: 'Schedule\nInterview',
      source: require('../images/Reruiting-agent-slice/project-exporter/background4.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/schedule.png'),
    },
    {
      keys: 6,
      title: 'Help &\nSupport',
      source: require('../images/Reruiting-agent-slice/project-exporter/background5.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/support.png'),
    },
    {
      keys: 7,
      title: 'Faq ask\nQuestion',
      source: require('../images/Reruiting-agent-slice/project-exporter/background6.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/faq.png'),
    },
    {
      keys: 8,
      title: 'App\nSettings',
      source: require('../images/Reruiting-agent-slice/project-exporter/background7.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/setting.png'),
    },
    {
      keys: 9,
      title: 'App\nLogout',
      source: require('../images/Reruiting-agent-slice/project-exporter/background8.png'),
      image: require('../images/Reruiting-agent-slice/project-exporter/logout.png'),
    },
  ]);

  useEffect(()=>{
    checkIfUserIsApproved()
    supportDetails()
  },[])

  const supportDetails =async()=> {
    const response = await Api.fetchSettings()
    setSupportInfo(response)
  }

  const checkIfUserIsApproved = async() =>{
    
    const ntoken = await LocalStorage.getToken()
    const btoken = `Bearer ${ntoken}`;
    const response = await fetch('http://139.59.67.166/Labour-Home-Job/public/api/homepage_agent',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
        "Authorization": btoken,
      }
    })
    const userApprovedData = await response.json()
    // alert(JSON.stringify(userApprovedData.banner),null,2)
    // console.log(JSON.stringify(userApprovedData,null,2))
    setUserProfile(userApprovedData.home)
    // const {home} = userApprovedData;
    // console.log(home)
    // console.log(JSON.stringify(userApprovedData))
    // alert(JSON.stringify(userApprovedData.banner),null,2)
    const {banner}=userApprovedData;
    setBanner(banner)
  }
  const onPressCategory = (item, index) => {
    const {keys} = item;
    switch (keys) {
      case 1:
        navigation.navigate('PostJob')
        break;

      case 2:
        navigation.navigate('Profile1', userProfile );
        break;

      case 3:
        navigation.navigate('PostedJobs', userProfile);
        break;

      case 4:
        navigation.navigate('Candidate', userProfile);
        break;

      case 5:
        navigation.navigate('ScheduleInterview', userProfile);
        break;

      case 6:
        navigation.navigate('Support', { supportData: supportInfo });
        break;

      case 7:
        navigation.navigate('Faq');
        break;

      case 8:
        navigation.navigate('Setting');
        break;

      case 9:
        // navigation.navigate('Login');
        onLogoutHandler()
        break;
      default:
    }
  };

  const onLogoutHandler = () => {

    Alert.alert(
      'Logout',
      `Do you want to logout.`,
      [
        {
          text: 'No',
          onPress: navigation.closeDrawer,
          style: 'cancel',
        },
        { text: 'Yes', onPress: onLogOut },
      ],
      { cancelable: false },
    ); 
  };
  onLogOut=()=>{
      _RemoveAuthToken();
    LocalStorage.setToken('');
    // dispatch(actions.SetLogout());
    LocalStorage.clear()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }


  // const checkFunc =()=>{
  //   if(!userApprovedData.msg === Approved){
  //     <Approval/>
  //   }else{
  //     <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
  //     <StatusBarLight />
  //     <Header2 onPress={() => navigation.goBack()} />
  //     <ScrollView>
  //       <Banner bn={banner} />
  //       <View style={{marginTop: 40, marginHorizontal: 20}}>
  //         <FlatList
  //           numColumns={3}
  //           keyExtractor={item => item.id}
  //           data={data}
  //           renderItem={({item, index}) => (
  //             <TouchableOpacity onPress={() => onPressCategory(item, index)}>
  //               <ImageBackground
  //                 source={item.source}
  //                 style={{
  //                   width: 100,
  //                   height: 92,
  //                   resizeMode: 'contain',
  //                   margin: 10,
  //                 }}>
  //                 <Image
  //                   style={{
  //                     width: 23,
  //                     height: 23,
  //                     resizeMode: 'contain',
  //                     marginTop: 10,
  //                     marginLeft: 10,
  //                   }}
  //                   source={item.image}
  //                 />
  //                 <Text style={styles.text}>{item.title}</Text>
  //               </ImageBackground>
  //             </TouchableOpacity>
  //           )}
  //         />
  //       </View>
  //     </ScrollView>
  //   </View>
  //   }
    
  // }
  
  return (    
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <Header2 onPress={() => navigation.goBack()} />
      <ScrollView>
        {/* <Banner bn={banner} /> */}
        <FlatList 
        data={banner}
        horizontal
        // pagingEnabled
        renderItem={({item})=> (
          <View style={{marginTop:40}}>
            <Image source={{uri: item.image_url}} style={{ width: 340,
                height: 167,
                marginLeft:20,
                // marginHorizontal: 30,
                resizeMode: 'contain',}}/>
          </View>
        )}/>
        <View style={{marginTop: 60, justifyContent:'center', alignItems:'center', }}>
          <FlatList
            numColumns={3}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity style={{ margin:5}} onPress={() => onPressCategory(item, index)}>
                <ImageBackground
                  source={item.source}
                  style={{
                    width: 100,
                    height: 92,
                    resizeMode: 'contain',
                    margin: 10,
                  }}>
                  <Image
                    style={{
                      width: 23,
                      height: 23,
                      resizeMode: 'contain',
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                    source={item.image}
                  />
                  <Text style={styles.text}>{item.title}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
    
  );
  
};



export default ProjectorHome;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 14,
    fontWeight: '700',
    color: '#010101',
    marginLeft: 10,
    marginTop: 10,
  },
});
