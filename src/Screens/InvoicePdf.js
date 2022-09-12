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
  PermissionsAndroid
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark, HeaderDarkForDownload, MainView} from '../Custom/CustomView';
// const {height} = Dimensions.get('window');
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import AppHeader from '../Custom/CustomAppHeader';

const InvoicePdf = ({navigation,route}) => {

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
    let FILE_URL = route.params.appointment_letter;
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

  const source = { uri: route.params.appointment_letter, cache: true };
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      {/* <HeaderDarkForDownload onPress={() => navigation.goBack()} title={'#6842'} /> */}
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Letter'}
        shareOnClick={() => {checkPermission() }}
        share={require('../images/downloadicon.png')}
      />
      <View style={styles.container}>
        <Pdf
          source={source}
          trustAllCerts={false}
          onLoadComplete={(numberOfPages,filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
          }}
          // onPageChanged={(page,numberOfPages) => {
          //     console.log(`Current page: ${page}`);
          // }}
          onError={(error) => {
              console.log(error);
          }}
          // onPressLink={(uri) => {
          //     console.log(`Link pressed: ${uri}`);
          // }}
          style={styles.pdf}/>
        </View>
    </View>
  );
};

export default InvoicePdf;

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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
},
pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
}
});
