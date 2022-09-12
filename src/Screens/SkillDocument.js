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
    Platform,
    PermissionsAndroid,
    FlatList,
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import { Api } from '../services/Api'
import Loader from '../services/Loader';
import { Header, HeaderDark,  DisableButton, EndButton, BottomView, } from '../Custom/CustomView';
import RNFetchBlob from 'rn-fetch-blob';
const { height } = Dimensions.get('window');

const SkillDocument = ({ navigation, route }) => {
    const [userDocuments, setUserDocuments] = useState()
    const [state, setState] = useState({
        isLoading: false
    })
    const [data, setData] = useState(
        {
            title: 'Aadhaar Card',
            source: require('../images/Reruiting-agent-slice/pan-card.png')
        },
        {
            title: 'Pan Card',
            source: require('../images/Reruiting-agent-slice/pan-card.png')
        },
        {
            title: 'Passport',
            source: require('../images/Reruiting-agent-slice/pan-card.png')
        },
    )

    const toggleLoader = isLoading => setState({ ...state, isLoading })

    useEffect(() => {
        getUserData(route.params)

    }, [])

    const getUserData = async (item) => {
        // alert(JSON.stringify(item,null,2))
        const body = {
            "job_id": JSON.stringify(item.job_id),
            "user_id": JSON.stringify(item.user_id)
        }
        toggleLoader(true)
        const response = await Api.getUserDocumentsForStatus(body)
        // alert(JSON.stringify(response,null,2))
        toggleLoader(false)
        const { status, user_details } = response;
        console.log(user_details)
        if (status) {
            setUserDocuments(user_details)
        }

    }

    const updateAadhaarStatus = async (item) => {
        const body = {
            "job_id": route.params.job_id,
            "status": item,
            "agency_id": route.params.agency_id,
            "user_id": route.params.user_id
        }
        // alert(JSON.stringify(body),null, 2)
        console.log(body)
        const response = await Api.aadhaarDocUserStatus(body)
        console.log(response)
        const {status} = response
        if(status){
            getUserData(route.params)
        }
    }

    const updatePancardStatus = async (item) => {
        const body = {
            "job_id": route.params.job_id,
            "status": item,
            "agency_id": route.params.agency_id,
            "user_id": route.params.user_id
        }
        // alert(JSON.stringify(body),null, 2)
        const response = await Api.pancardDocUserStatus(body)
        console.log(response)
        const {status} = response
        if(status){
            getUserData(route.params)
        }
    }

    const updateSkillStatus = async (item) => {

        const body = {
            "job_id": route.params.job_id,
            "status": item,
            "agency_id": route.params.agency_id,
            "user_id": route.params.user_id
        }
        // alert(JSON.stringify(body),null, 2)
        const response = await Api.updateSkillStatus(body)
        console.log(response)
        const {status} = response
        if(status){
            getUserData(route.params)
        }
    }

    const checkPermission = async (item) => {
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
              downloadFile(item);
              console.log('Storage Permission Granted.');
            } else {
              // If permission denied then show alert
              Alert.alert('Error','Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.log("++++"+err);
          }
        }
      };
    
      const downloadFile = (item) => {
       
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = item;    
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
              RootDir+
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

    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <StatusBarLight />
            <HeaderDark
                onPress={() => navigation.goBack()}
                title={'Skill Document'}
            />
            <ScrollView>
            <Loader status={state.isLoading} />
                {userDocuments ?
                    <View>
                        <View style={styles.subBox}>
                            <Text style={styles.text}>Skill Certificate</Text>
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => checkPermission(userDocuments.skill_certificate_image)}>
                                    {/* <Image style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: userDocuments.skill_certificate_image }} /> */}
                                    {(userDocuments.skill_certificate_image.toString().split('.').pop() === 'pdf' ?
                                        <Image
                                            style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }}
                                            source={
                                                // uri: userPersonalDetails.passport_image
                                                require('../images/pdf.png')
                                            }
                                        /> :
                                        <Image
                                            style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }}
                                            source={{
                                                uri: userDocuments.skill_certificate_image
                                                // require('../images/folder.png')
                                            }}
                                        />)}
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => checkPermission(userDocuments.pancard_back)}>
                                    <Image style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: userDocuments.pancard_back }} />
                                </TouchableOpacity> */}
                            </View>
                            {userDocuments.skill_certificate_status === "pending" ? (
                                <View
                                    style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                                    <View style={{ width: '50%', marginTop: 20 }}>
                                        <EndButton
                                            title={'APPROVE'}
                                            height={45}
                                            fontSize={16}
                                            bgColor={'#2574FF'}
                                            txtcolor={'#fff'}
                                            onPress={() => {
                                                // navigation.navigate('CandidateApplied', route.params.item);
                                                updateSkillStatus(1)
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '50%', marginTop: 20 }}>
                                        <EndButton
                                            title={'REJECT'}
                                            height={45}
                                            fontSize={16}
                                            bgColor={'#DA274D'}
                                            txtcolor={'#fff'}
                                            onPress={() =>
                                                updateSkillStatus(2)
                                            }
                                        />
                                    </View>
                                </View>
                            ) : (
                                <View
                                    style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                                    <View style={{ width: '50%', marginTop: 20 }}>
                                        <DisableButton
                                            title={userDocuments.skill_certificate_status === "reject" ? 'REJECTED' : "APPROVED"}
                                            height={45}
                                            fontSize={16}
                                            bgColor={'#cccccc'}
                                            txtcolor={'#fff'}
                                        />
                                    </View>
                                    <View style={{ width: '50%', marginTop: 20 }}>
                                        <DisableButton
                                            title={userDocuments.skill_certificate_status === "reject" ? 'REJECTED' : "APPROVED"}
                                            height={45}
                                            fontSize={16}
                                            bgColor={'#cccccc'}
                                            txtcolor={'#fff'}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View> : null}

                </ScrollView>
        </View>
    );
};

export default SkillDocument;

const styles = StyleSheet.create({
    subBox: {
        padding: 10,
        marginHorizontal: 30,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 14,
        elevation: 5,
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontFamily: 'Muli-Bold',
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginLeft: 5,
        marginTop: 5,
    },
})