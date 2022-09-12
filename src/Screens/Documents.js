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

const Documents = ({ navigation, route }) => {
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
        // alert(JSON.stringify(route.params,null,2))
    }, [])

    const getUserData = async (item) => {
        // alert(JSON.stringify(item,null,2))
        const body = {
            "job_id": JSON.stringify(item.job_id),
            "user_id": JSON.stringify(item.user_id)
        }
        toggleLoader(true)
        const response = await Api.getUserDocumentsForStatus(body)
        toggleLoader(false)
        // alert(JSON.stringify(response,null,2))
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

    const updatePassportStatus = async (item) => {
        const body = {
            "job_id": route.params.job_id,
            "status": item,
            "agency_id": route.params.agency_id,
            "user_id": route.params.user_id
        }
        // alert(JSON.stringify(body),null, 2)
        const response = await Api.passportDocUserStatus(body)
        console.log(response)
        const {status} = response
        if(status){
            getUserData(route.params)
        }
    }

    const checkPermission = async (item) => {
    
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
                title={'Documents'}
            />
            <ScrollView>
            <Loader status={state.isLoading} />
            {userDocuments ? (<View><View style={styles.subBox}>                
                <Text style={styles.text}>Aadhaar Card</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={()=> checkPermission(userDocuments.aadhaar_front)}>
                        {/* <Image style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: userDocuments.aadhaar_front }} /> */}
                        {(userDocuments.aadhaar_front.toString().split('.').pop() === 'pdf' ?
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
                                        uri: userDocuments.aadhaar_front
                                        // require('../images/folder.png')
                                    }}
                                />)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> checkPermission(userDocuments.aadhaar_back)}>
                        {/* <Image style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: userDocuments.aadhaar_back }} /> */}
                            {(userDocuments.aadhaar_back.toString().split('.').pop() === 'pdf' ?
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
                                        uri: userDocuments.aadhaar_back
                                        // require('../images/folder.png')
                                    }}
                                />)}
                    </TouchableOpacity>
                </View>
                {userDocuments.aadhaar_status === "pending" ? (
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
                                updateAadhaarStatus(1)
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
                                updateAadhaarStatus(2)
                            }
                        />
                    </View>
                    </View>
                ): (
                    <View
                    style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                    <View style={{ width: '50%', marginTop: 20 }}>
                        <DisableButton
                            title={userDocuments.aadhaar_status === "reject" ? 'REJECTED' : "APPROVED"}
                            height={45}
                            fontSize={16}
                            bgColor={'#cccccc'}
                            txtcolor={'#fff'}
                        />
                    </View>
                    <View style={{ width: '50%', marginTop: 20 }}>
                        <DisableButton
                            title={userDocuments.aadhaar_status === "reject" ? 'REJECTED' : "APPROVED"}
                            height={45}
                            fontSize={16}
                            bgColor={'#cccccc'}
                            txtcolor={'#fff'}
                        />
                    </View>
                    </View>
                )}
                
                
            </View>
                <View style={styles.subBox}>
                    <Text style={styles.text}>Pan Card</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity onPress={()=> checkPermission(userDocuments.pancard_front)}>
                            {/* <Image style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: userDocuments.pancard_front }} /> */}
                            {(userDocuments.pancard_front.toString().split('.').pop() === 'pdf' ?
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
                                        uri: userDocuments.pancard_front
                                        // require('../images/folder.png')
                                    }}
                                />)}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> checkPermission(userDocuments.pancard_back)}>
                            {/* <Image style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: userDocuments.pancard_back }} /> */}
                            {(userDocuments.pancard_back.toString().split('.').pop() === 'pdf' ?
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
                                        uri: userDocuments.pancard_back
                                        // require('../images/folder.png')
                                    }}
                                />)}
                        </TouchableOpacity>
                    </View>
                    {userDocuments.pancard_status === "pending" ? (
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
                                updatePancardStatus(1)
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
                            updatePancardStatus(2)
                        }
                        />
                    </View>
                    </View>
                ): (
                    <View
                    style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                    <View style={{ width: '50%', marginTop: 20 }}>
                        <DisableButton
                            title={userDocuments.pancard_status === "reject" ? 'REJECTED' : "APPROVED"}
                            height={45}
                            fontSize={16}
                            bgColor={'#cccccc'}
                            txtcolor={'#fff'}
                        />
                    </View>
                    <View style={{ width: '50%', marginTop: 20 }}>
                        <DisableButton
                            title={userDocuments.pancard_status === "reject" ? 'REJECTED' : "APPROVED"}
                            height={45}
                            fontSize={16}
                            bgColor={'#cccccc'}
                            txtcolor={'#fff'}
                        />
                    </View>
                    </View>
                )}
                </View>
                <View style={styles.subBox}>
                    <Text style={styles.text}>Passport</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity onPress={()=> checkPermission(userDocuments.passport_image)}>
                        {/* <Image style={{ width: 167, height: 94, resizeMode: 'contain', borderRadius: 5 }} source={{ uri: userDocuments.passport_image }} /> */}
                        {(userDocuments.passport_image.toString().split('.').pop() === 'pdf' ?
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
                                        uri: userDocuments.passport_image
                                        // require('../images/folder.png')
                                    }}
                                />)}
                        </TouchableOpacity>
                    </View>
                    {userDocuments.passport_status === "pending" ? (
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
                                updatePassportStatus(1)
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
                            updatePassportStatus(2)
                            // setModalOpen(true)
                        }
                        />
                    </View>
                    </View>
                ): (
                    <View
                    style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
                    <View style={{ width: '50%', marginTop: 20 }}>
                        <DisableButton
                            title={userDocuments.passport_status === "reject" ? 'REJECTED' : "APPROVED"}
                            height={45}
                            fontSize={16}
                            bgColor={'#cccccc'}
                            txtcolor={'#fff'}
                            
                        />
                    </View>
                    <View style={{ width: '50%', marginTop: 20 }}>
                        <DisableButton
                            title={userDocuments.passport_status === "reject" ? 'REJECTED' : "APPROVED"}
                            height={45}
                            fontSize={16}
                            bgColor={'#cccccc'}
                            txtcolor={'#fff'}
                        />
                    </View>
                    </View>
                )}
                </View></View>) : null}

                </ScrollView>
        </View>
    );
};

export default Documents;

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