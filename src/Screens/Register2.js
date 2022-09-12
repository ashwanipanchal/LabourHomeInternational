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
  TextInput,
  ImageBackground,
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import { BottomView, ButtonStyle, DisableButton } from '../Custom/CustomView';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Api } from '../services/Api';
import DocumentPicker, { types } from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';

const { height } = Dimensions.get('window');

const Register2 = ({ navigation, route }) => {
  const [clicked, setClicked] = useState(false)
  const [state, setState] = useState({
    user_id: route.params?.userDetail,
    // user_id: '214',
    modalVisible: false,
    isLoading: false,
  });
  const toggleModal = modalVisible => setState({ ...state, modalVisible });
  const [tenCertificate, setTenCertificate] = useState('');
  const [twelveCertificate, setTwelveCertificate] = useState('');
  const [graduationCertificate, setGraduationCertificate,] = useState('');

  const onProjectHandler = async () => {
    if (!tenCertificate) {
      Toast.show('Please select your 10th certificate');
      return;
    }
    if (!twelveCertificate) {
      Toast.show('Please select your 12th certificate');
      return;
    }
    if (!graduationCertificate) {
      Toast.show('Please select your graduation certificate');
      return;
    }
    setClicked(true)
    var formData = new FormData()
    formData.append("ten_certificate", {
      uri: tenCertificate.uri,
      type: tenCertificate.type,
      name: tenCertificate.name,
    })
    formData.append('user_id', state.user_id)
    formData.append("graduation_certificate", {
      uri: graduationCertificate.uri,
      type: graduationCertificate.type,
      name: graduationCertificate.name,
    })
    formData.append("twelve_certificate", {
      uri: twelveCertificate.uri,
      type: twelveCertificate.type,
      name: twelveCertificate.name,
    })

    // console.log('-----formData: ', JSON.stringify(formData));
    // alert(JSON.stringify(formData,null,2))
    // return
    setState({ ...state, isLoading: true });
    const response = await Api.custmerRegisterStep3(formData);
    console.log('-------------response: 71 ', response);
    const { status = false, msg, token = '', user_detail = {} } = response;
    setState({ ...state, isLoading: false });
    // alert(JSON.stringify(response,null,2))
    if (status) {
      navigation.replace('Register3', { userDetail: route.params?.userDetail });
      setState({ ...state, isLoading: false });
      setClicked(false)
    } else {
      Toast.show('Something went wrong')
      // const {
      //   data: { 'Something went wrong' },
      // } = response;
      setState({ ...state, isLoading: false });
      setClicked(false)
    }
  };

  const onImageOptionHandler = (type) => {
    toggleModal(false);
    const options = {
      title: 'Select and Take Profile Picture',
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const { uri } = response.assets[0];
        if (type === '10th') {
          setTenCertificate(uri);
        } else if (type === '12th') {
          setTwelveCertificate(uri);
        } else if (type === 'Graduation') {
          setGraduationCertificate(uri);
        }
      }
    });
  };

  const getPDF1 = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){
          console.log("document picker response ==", response)
          const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(destPath)
           setTenCertificate(response[0])
        }
    } catch (error) {
      console.log(error)
    }
  }
  const getPDF2 = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){
          console.log("document picker response ==", response)
          const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(destPath)
           setTwelveCertificate(response[0])
        }
    } catch (error) {
      console.log(error)
    }
  }
  const getPDF3 = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){
          console.log("document picker response ==", response)
          const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(destPath)
           setGraduationCertificate(response[0])
        }
    } catch (error) {
      console.log(error)
    }
  }

  const ifAvaileble = (item,i) => {
    // alert(JSON.stringify(item,null,2))
    // alert(JSON.stringify(i,null,2))
    if(item.type.split('/')[1] === 'pdf' ){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { i('') }}>
          <Image
            style={styles.crossImage}
            source={require('../images/close.png')}
          />
        </TouchableOpacity>
    </ImageBackground>)
    }else{
      return (
      <ImageBackground
          imageStyle={{ borderRadius: 5 }}
          style={styles.certificateImage}
          source={{ uri: item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { i('') }}>
            <Image
              style={styles.crossImage}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        </ImageBackground>)
    }
  }
  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarDark />
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.headerText}>
            Find the care{`\n`}job that’s right{`\n`}for you
          </Text>
          <ImageBackground
            style={styles.headerImage}
            source={require('../images/girl.png')}></ImageBackground>
        </View>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.hireText}>Register to hire!</Text>
            <View
              style={{ marginTop: 5, marginLeft: 'auto', marginHorizontal: 10 }}>
              <AnimatedCircularProgress
                size={65}
                width={3}
                fill={70}
                rotation={10}
                tintColor="#2574FF">
                {fill => (
                  <TouchableOpacity style={{height:30,width:35,}} onPress={() => changehandler()}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#2574FF',
                        fontWeight: '700',
                        marginLeft:2,
                        marginTop:5
                        // marginHorizontal: 20,
                      }}>
                      {'3/4'}
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <TextLabel title={'10th Certificate'} />
          {tenCertificate ?
            ifAvaileble(tenCertificate, setTenCertificate) 
            : 
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() =>
                  // onImageOptionHandler('10th')
                  getPDF1('10th')
                }>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>}
            {/* <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.certificateImage}
              source={{ uri: tenCertificate.uri }}>
              <TouchableOpacity
                style={styles.crossImageView}
                onPress={() => { setTenCertificate('') }}>
                <Image
                  style={styles.crossImage}
                  source={require('../images/close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            :
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => 
                // onImageOptionHandler('10th')
                getPDF1('10th')
                }>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          } */}
          <TextLabel title={'12th Certificate'} />
          {twelveCertificate ?
            // <ImageBackground
            //   imageStyle={{ borderRadius: 5 }}
            //   style={styles.certificateImage}
            //   source={{ uri: twelveCertificate.uri }}>
            //   <TouchableOpacity
            //     style={styles.crossImageView}
            //     onPress={() => { setTwelveCertificate('') }}>
            //     <Image
            //       style={styles.crossImage}
            //       source={require('../images/close.png')}
            //     />
            //   </TouchableOpacity>
            // </ImageBackground>
            ifAvaileble(twelveCertificate, setTwelveCertificate)
            :
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => 
                // onImageOptionHandler('12th')
                getPDF2('12th')
                }>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          }

          <TextLabel title={'Graduation Certificate'} />
          {graduationCertificate ?
            // <ImageBackground
            //   imageStyle={{ borderRadius: 5 }}
            //   style={styles.certificateImage}
            //   source={{ uri: graduationCertificate.uri }}>
            //   <TouchableOpacity
            //     style={styles.crossImageView}
            //     onPress={() => { setGraduationCertificate('') }}>
            //     <Image
            //       style={styles.crossImage}
            //       source={require('../images/close.png')}
            //     />
            //   </TouchableOpacity>
            // </ImageBackground>
            ifAvaileble(graduationCertificate, setGraduationCertificate)
            :
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => 
                // onImageOptionHandler('Graduation')
                getPDF3('Graduation')
                }>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          }

        {clicked ? 
            <View style={{ width: '100%', marginTop: 30 }}>
              <DisableButton title={'SAVE & NEXT'}
                height={50}
                fontSize={16}
                bgColor={'#cccccc'}
                loader={state.isLoading}
                txtcolor={'#fff'} />
            </View> : 
          <View style={{ width: '100%', marginTop: 30 }}>
            <ButtonStyle
              title={'SAVE & NEXT'}
              loader={state.isLoading}
              onPress={() => {
                onProjectHandler();
              }}
            />
          </View>}
          <BottomView />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register2;
const TextLabel = ({ title }) => <Text style={styles.textLabel}>{title}</Text>;
const styles = StyleSheet.create({
  headerImage: {
    marginTop: height / 9,
    width: 175,
    height: 327,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Muli',
    fontSize: 24,
    fontWeight: '700',
    color: '#222B45',
    marginTop: height / 6,
    marginLeft: 35,
    lineHeight: 32,
  },
  container: {
    padding: 10,
    marginHorizontal: 25,
    backgroundColor: '#fff',
    elevation: 5,
    marginTop: -170,
    borderRadius: 12,
    marginBottom: 20,
  },
  hireText: {
    fontFamily: 'Muli',
    fontSize: 20,
    fontWeight: '700',
    color: '#222B45',
    marginLeft: 20,
    marginTop: 15,
  },
  certificateImage: {
    width: 110,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'cover'
    // width: 88,
    // height: 88,
    // resizeMode: 'contain',
    // marginLeft: 20,
    // marginTop: 10,
  },
  certificateImageForPDF: {
    width: 60,
    height: 50,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'contain'
    // width: 88,
    // height: 88,
    // resizeMode: 'contain',
    // marginLeft: 20,
    // marginTop: 10,
  },
  textLabel: {
    fontFamily: 'Muli',
    fontWeight: '400',
    fontSize: 16,
    color: '#8F9BB3',
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 0,
  },
  crossImageView: {
    marginLeft: 'auto',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  crossImage: {
    width: 16,
    height: 16,
  },
  boxImage: {
    width: 110,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
  },
  uploadImage: {
    width: 24,
    height: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
  uploadText: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 14,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 5,
  },
});
