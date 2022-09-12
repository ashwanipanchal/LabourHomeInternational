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
  ImageBackground,
  Platform,
  PermissionsAndroid,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { StatusBarLight } from '../Custom/CustomStatusBar';
// import { Header,  } from '../Custom/CustomView';
import AppHeader from '../Custom/CustomAppHeaderProfile';
import { Api, LocalStorage } from '../services/Api';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

const { height } = Dimensions.get('window');
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';


const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState("");
  const [userBasicDetails, setUserBasicDetails] = useState("");
  const [userPersonalDetails, setUserPersonalDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      LocalStorage.getUserDetail('userdata').then((userdata) => {
        setUserData(JSON.parse(userdata))
        console.log('-----res: ', JSON.parse(userdata));
        getProfile(JSON.parse(userdata));
      })
    }, 1000);
  }, [])

  const getProfile = async (usersData) => {
    // setIsLoading(true);
    const body = {
      user_id: usersData?.id,
      user_type: usersData?.user_type
    }
    console.log('-----body: ', body);
    const response = await Api.getUserProfile(body);
    const { status = false, user = {}, user_details = {} } = response
    console.log("response in profile", response)
    if (status) {
      setUserBasicDetails(user);
      setUserPersonalDetails(user_details);
      setIsLoading(false);
      // console.log('-----response: ', response);
    }
  }

  const checkPermission = async () => {

    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };

  const downloadFile = () => {

    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = userPersonalDetails.resume_image;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };

  const checkPassportPtoto = (item)=> {
  

      var fileName = item.passport_image;
      console.log(fileName)
    
    // var extension = fileName.split('.').pop(); 

    // console.log(extension, extension === 'jpg');
  }

  return (
    <View style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={userBasicDetails.name ? userBasicDetails.name : "Profile"}
        shareOnClick={() => { }}
        // share={require('../images/notification1.png')}
      />
      {/* <HeaderRNE
      leftComponent={{
        icon: <Image source={require('../images/back.png')}/>,
        color: '#fff',
      }}
      centerComponent={{ text: userBasicDetails.name, style: styles.heading }}
    /> */}
      {isLoading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'small'} color={'#000'} />
        </View>
        :
        <ScrollView>
          <ImageBackground
            style={{ width: '100%', height: 270, resizeMode: 'contain' }}
            source={require('../images/background.png')}>
          </ImageBackground>
          <View>
          <Image style={styles.image} source={{ uri: userBasicDetails.profile }} />
          <View style={styles.subBox}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.inText}>Basic details</Text>
              {/* <Image
                style={styles.editImage}
                source={require('../images/edit.png')}
              /> */}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.userImage}
                source={require('../images/user1.png')}
              />
              <Text style={styles.userText}>{userBasicDetails.name}</Text>
              <Text style={styles.userText}>{userBasicDetails.middle_name}</Text>
              <Text style={styles.userText}>{userBasicDetails.last_name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.userImage}
                source={require('../images/email.png')}
              />
              <Text style={styles.userText}>{userBasicDetails.email}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.userImage}
                source={require('../images/phone-call.png')}
              />
              <Text style={styles.userText}>+91 {userBasicDetails.mobile}</Text>
            </View>
          </View>
          <View style={styles.subBox}>
            <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={styles.inText}>Personal details</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('EditProfile', {userBasicDetails, userPersonalDetails})}>
                <Image
                  style={styles.editImage}
                  source={require('../images/edit.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.user2Text}>Address</Text>
              <Text style={styles.userSubText}>
                {/* 1007, 10th Floor, Tower-1, Netaji Subhash{`\n`}Place, New Delhi,
                Delhi 110034 (IN) */}
                {userBasicDetails.city_name + ', ' + userBasicDetails.state_name + ', ' + userBasicDetails.countrie_name}
              </Text>
            </View>
            <View>
              <Text style={styles.user2Text}>Age</Text>
              <Text style={styles.userSubText}>{userBasicDetails.age}, {userBasicDetails.gender}</Text>
            </View>
            <View>
              <Text style={styles.user2Text}>Language</Text>
              <Text style={styles.userSubText}>{userBasicDetails.language}</Text>
            </View>
          </View>
          <View style={styles.subBox}>
            <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={styles.inText}>Professional details</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('EditProffessionalDetails', {userBasicDetails, userPersonalDetails})}>
                <Image
                  style={styles.editImage}
                  source={require('../images/edit.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.user2Text}>Current Department</Text>
              <Text style={styles.userSubText}>{userPersonalDetails.category_name}</Text>
            </View>
            <View>
              <Text style={styles.user2Text}>Current Role</Text>
              <Text style={styles.userSubText}>{userPersonalDetails.sub_category_name}</Text>
            </View>
            <View>
              <Text style={styles.user2Text}>Work Experience</Text>
              <Text style={styles.userSubText}>{userPersonalDetails.work_exp} Years</Text>
            </View>
            <View>
              <Text style={styles.user2Text}>Foreign Experience</Text>
              <Text style={styles.userSubText}>{userPersonalDetails.foreign_exp} Years</Text>
            </View>
          </View>
          <View style={styles.subBox}>
          <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={styles.inText}>Document details</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('EditDocumentsDetails', {userBasicDetails, userPersonalDetails})}>
                <Image
                  style={styles.editImage}
                  source={require('../images/edit.png')}
                />
              </TouchableOpacity>
              </View>
            <View>
              <Text style={styles.user2Text}>Passport Number</Text>
              <Text style={styles.userSubText}>{userPersonalDetails.passport_number}</Text>
            </View>
            <View>
              <Text style={styles.user2Text}>Passport Validity</Text>
              <Text style={styles.userSubText}>
                {moment(userPersonalDetails.passport_validity).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View>
              <Text style={styles.user2Text}>Passport Upload</Text>
              {(userPersonalDetails.passport_image.toString().split('.').pop() === 'pdf' ? 
              <Image
              style={{
                width: 50,
                height: 60,
                marginLeft: 10,
                marginTop: 10,
                borderRadius: 5,
                resizeMode:'contain'
              }}
              source={
                // uri: userPersonalDetails.passport_image
                require('../images/pdf.png')
              }
            /> : 
              <Image
                style={{
                  width: 120,
                  height: 88,
                  marginLeft: 10,
                  marginTop: 10,
                  borderRadius: 5,
                }}
                source={{
                  uri: userPersonalDetails.passport_image
                  // require('../images/Reruiting-agent-slice/passport.png')
                }}
              />)}
            </View>
          </View>
          <View style={styles.subBox}>
            <Text style={styles.inText}>Resume</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => checkPermission()}>
              {(userPersonalDetails.resume_image.toString().split('.').pop() === 'pdf' ?
                    <Image
                      style={{
                        width: 50,
                        height: 60,
                        marginLeft: 10,
                        marginTop: 10,
                        borderRadius: 5,
                        resizeMode: 'contain'
                      }}
                      source={
                        // uri: userPersonalDetails.passport_image
                        require('../images/pdf.png')
                      }
                    /> :
                    <Image
                      style={{ width: 45, height: 45, marginLeft: 10, marginTop: 20 }}
                      source={{
                        uri: userPersonalDetails.resume_image
                        // require('../images/folder.png')
                      }}
                    />)}
                <View>
                  <Text style={styles.resumeText}>Resume.pdf</Text>
                  <Text style={styles.resumeSubText}>
                    {moment(userPersonalDetails.created_at).format("MMMM DD YYYY, h:mm A")}
                    {/* May 19 2019, 10:33 AM */}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </ScrollView>
      }

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 60,
    marginTop: -100,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 10,
  },
  editImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginHorizontal: 15,
    marginTop: 2,
  },
  userImage: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 20,
  },
  userText: {
    fontFamily: 'Muli-Bold',
    fontSize: 13,
    fontWeight: '400',
    color: '#1E1F20',
    marginTop: 17,
    marginLeft: 10,
  },
  user2Text: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '400',
    color: '#8F9BB3',
    marginLeft: 10,
    marginTop: 20,
  },
  userSubText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1F20',
    marginLeft: 10,
    marginTop: 5,
    lineHeight: 20,
  },
  insubText: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },
  resumeText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 20,
  },
  resumeSubText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },


  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
