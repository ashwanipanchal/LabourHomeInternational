import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ImageBackground, Image,ScrollView, Modal, Platform } from 'react-native'
import React,{useEffect, useState} from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ButtonStyle, DisableButton, HeaderDark } from '../Custom/CustomView'
import DocumentPicker, { types } from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import { Api, LocalStorage } from '../services/Api';
const {height} = Dimensions.get('window');
import Toast from 'react-native-simple-toast';

const EditDocumentsDetails = ({navigation, route}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [modal, setModal] = useState({modalVisible: false});
  const [state, setState] = useState({
    passport_Number: route.params.userPersonalDetails.passport_number,
    passport_ValidityDate: route.params.userPersonalDetails.passport_validity,
    isLoading: false,
    aadhaar_front:{url : route.params.userPersonalDetails.aadhaar_front, type: route.params.userPersonalDetails.aadhaar_front_type},
    aadhaar_back: {url : route.params.userPersonalDetails.aadhaar_back, type: route.params.userPersonalDetails.aadhaar_back_type},
    pancard_front: {url : route.params.userPersonalDetails.pancard_front, type: route.params.userPersonalDetails.pancard_front_type},
    pancard_back: {url : route.params.userPersonalDetails.pancard_back, type: route.params.userPersonalDetails.pancard_back_type},
    exp_crefiticate_front: {url : route.params.userPersonalDetails.exp_crefiticate_front, type: route.params.userPersonalDetails.exp_crefiticate_type},
    exp_crefiticate_back: '',
    passport_image: {url : route.params.userPersonalDetails.passport_image, type: route.params.userPersonalDetails.passport_image_type},
    resume_image:{url : route.params.userPersonalDetails.resume_image, type: route.params.userPersonalDetails.resume_image_type},

    // passport_Number: "",
    // passport_ValidityDate:"",
    // isLoading: false,
    // aadhaar_front:"",
    // aadhaar_back: "",
    // pancard_front: "",
    // pancard_back: "",
    // exp_crefiticate_front: "",
    // exp_crefiticate_back: '',
    // passport_image: "",
    // resume_image: "",
  });
  useEffect(()=>{
    // console.log(route.params.userPersonalDetails)
    // alert(JSON.stringify(route.params, null,2))
    // return
    // getData()
  },[])


  const toggleModal = modalVisible => setModal({...modal, modalVisible});
  const onImageOptionHandler = type => {
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
        const {uri} = response.assets[0];
        if (type === 'aadhaarFront') {
          setState({...state, aadhaar_front: uri});
        } else if (type === 'aadhaarBack') {
          setState({...state, aadhaar_back: uri});
        } else if (type === 'pancardFront') {
          setState({...state, pancard_front: uri});
        } else if (type === 'pancardBack') {
          setState({...state, pancard_back: uri});
        } else if (type === 'expCrefiticateFront') {
          setState({...state, exp_crefiticate_front: uri});
        } else if (type === 'expCrefiticateBack') {
          setState({...state, exp_crefiticate_back: uri});
        } else if (type === 'passportImage') {
          setState({...state, passport_image: uri});
        } else if (type === 'resumeImage') {
          setState({...state, resume_image: uri});
        }
      }
    });
  };
  const handleConfirm = date => {
    setState({...state, passport_ValidityDate: date});
    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const updateProfile = async () => {
    setState({...state, isLoading: true});
    const {
      passport_Number = '',
      passport_ValidityDate = '',
      aadhaar_front = '',
      aadhaar_back = '',
      pancard_front = '',
      pancard_back = '',
      exp_crefiticate_front = '',
      exp_crefiticate_back = '',
      passport_image = '',
      resume_image = '',
    } = state;

    if (!passport_Number) {
      Toast.show('Please enter your passport number');
      return;
    }
    if (!passport_ValidityDate) {
      Toast.show('Please enter your passport validity');
      return;
    }
    if (!aadhaar_front) {
      Toast.show('Please select your aadhaar front');
      return;
    }
    if (!aadhaar_back) {
      Toast.show('Please select your aadhaar back');
      return;
    }
    if (!pancard_front) {
      Toast.show('Please select your pancard front');
      return;
    }
    if (!pancard_back) {
      Toast.show('Please select your pancard back');
      return;
    }
    if (!passport_image) {
      Toast.show('Please select your passport upload');
      return;
    }
    if (!resume_image) {
      Toast.show('Please select your resume upload');
      return;
    }
    if (!exp_crefiticate_front) {
      Toast.show('Please select your experience crefiticate');
      return;
    }

    setClicked(true)
    var formData = new FormData();
    formData.append('user_id', route.params.userBasicDetails.id);
    formData.append('passport_number', passport_Number);
    formData.append('passport_validity', passport_ValidityDate+" ");
    if("uri" in aadhaar_front) {
      formData.append('aadhaar_front', {
        uri: aadhaar_front.uri,
        type: aadhaar_front.type,
        name: aadhaar_front.name,
      });
    }
    if("uri" in aadhaar_back) {
    formData.append('aadhaar_back', {
      uri: aadhaar_back.uri,
      type: aadhaar_back.type,
      name: aadhaar_back.name,
    });
  }

  if("uri" in pancard_front) {
    formData.append('pancard_front', {
      uri: pancard_front.uri,
      type: pancard_front.type,
      name: pancard_front.name,
    });
  }

  if("uri" in pancard_back) {
    formData.append('pancard_back', {
      uri: pancard_back.uri,
      type: pancard_back.type,
      name: pancard_back.name,
    });
  }

  if("uri" in passport_image) {
    formData.append('passport_image', {
      uri: passport_image.uri,
      type: passport_image.type,
      name: passport_image.name,
    });
  }

  if("uri" in exp_crefiticate_front) {
    formData.append('exp_crefiticate', {
      uri: exp_crefiticate_front.uri,
      type: exp_crefiticate_front.type,
      name: exp_crefiticate_front.name,
    });
  }
  if("uri" in resume_image) {
    formData.append('resume_image', 
    {
      // uri: resume_image+" ",
      // type: 'application/pdf',
      // name: 'file.pdf',
      uri: resume_image.uri,
      type: resume_image.type,
      name: resume_image.name,
    });
  }
    
    // console.log('-----formData: ', JSON.stringify(formData));
    // console.log(state)
    // alert(JSON.stringify(formData,null,2))
    // return
    const response = await Api.documentProfileEdit(formData);
    console.log('-------------response: ', response);
    const {status} = response;
    if (status) {
      setState({ ...state, isLoading: false });
      navigation.replace('DrawerNavigator')
      setClicked(false)
    }
    //   setModalOpen(true);
    //   navigation.replace('Login');
    //   setState({...state, isLoading: false});
      
    // } else {
    //   // const {
    //   //   data: { msg = 'Something went wrong' },
    //   // } = response;
    //   Toast.show(msg);
    //   console.log('------err: ', msg);
    //   setState({...state, isLoading: false});
    // }
  };
  const getPDF = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){

          console.log("document picker response ==", response)
          const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(destPath)
           setState({...state, resume_image: response[0]})
        }

    } catch (error) {
      console.log(error)
    }
  }

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
           setState({...state, passport_image: response[0]})
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
           setState({...state, exp_crefiticate_front: response[0]})
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
           setState({...state, pancard_back: response[0]})
        }

    } catch (error) {
      console.log(error)
    }
  }
  const getPDF4 = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){

          console.log("document picker response ==", response)
          const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(destPath)
           setState({...state, pancard_front: response[0]})
        }

    } catch (error) {
      console.log(error)
    }
  }
  const getPDF5 = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){

          console.log("document picker response ==", response)
          const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(destPath)
           setState({...state, aadhaar_back: response[0]})
        }

    } catch (error) {
      console.log(error)
    }
  }
  const getPDF6 = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){

          console.log("document picker response ==", response)
          const res=  response[0].uri.replace('content://', 'file:///data/user/0/')
         console.log(res)
          // alert(destPath)
           setState({...state, aadhaar_front: response[0]})
        }

    } catch (error) {
      console.log(error)
    }
  }
 
  const ifAvailebleForAadhaarFront = (item) => {
    // alert(JSON.stringify(item,null,2))
    // return
    if(item.type.includes("pdf")){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { setState({...state, aadhaar_front:''})}}>
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
          source={{ uri: item.url || item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { setState({...state, aadhaar_front:''})}}>
            <Image
              style={styles.crossImage}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        </ImageBackground>)
    }
  }
  const ifAvailebleForAadhaarBack= (item,) => {
    // alert(JSON.stringify(item,null,2))
    if(item.type.includes("pdf")){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { setState({...state, aadhaar_back:''})}}>
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
          source={{ uri: item.url || item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { setState({...state, aadhaar_back:''})}}>
            <Image
              style={styles.crossImage}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        </ImageBackground>)
    }
  }
  const ifAvailebleForPancardFront = (item,) => {
    // alert(JSON.stringify(item,null,2))
    if(item.type.includes("pdf")){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { setState({...state, pancard_front:''})}}>
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
          source={{ uri: item.url || item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { setState({...state, pancard_front:''})}}>
            <Image
              style={styles.crossImage}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        </ImageBackground>)
    }
  }
  const ifAvailebleForPancardBack = (item,) => {
    // alert(JSON.stringify(item,null,2))
    if(item.type.includes("pdf")){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { setState({...state, pancard_back:''})}}>
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
          source={{ uri: item.url || item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { setState({...state, pancard_back:''})}}>
            <Image
              style={styles.crossImage}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        </ImageBackground>)
    }
  }
  const ifAvailebleForExpCert = (item,) => {
    // alert(JSON.stringify(item,null,2))
    // return
    if(item.type.includes("pdf")){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { setState({...state, exp_crefiticate_front:''})}}>
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
          source={{ uri: item.url || item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { setState({...state, exp_crefiticate_front:''})}}>
            <Image
              style={styles.crossImage}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        </ImageBackground>)
    }
  }
  const ifAvailebleForPassport = (item,) => {
    // alert(JSON.stringify(item,null,2))
    if(item.type.includes("pdf")){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { setState({...state, passport_image:''})}}>
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
          source={{ uri: item.url || item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { setState({...state, passport_image:''})}}>
            <Image
              style={styles.crossImage}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        </ImageBackground>)
    }
  }
  const ifAvailebleForResume = (item,) => {
    // alert(JSON.stringify(item,null,2))
    if(item.type.includes("pdf")){
      return (
      <ImageBackground
        imageStyle={{ borderRadius: 5 }}
        style={styles.certificateImageForPDF}
        source={require('../images/pdf.png')}>
        <TouchableOpacity
          style={styles.crossImageView}
          onPress={() => { setState({...state, resume_image:''})}}>
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
          source={{ uri: item.url || item.uri }}>
          <TouchableOpacity
            style={styles.crossImageView}
            onPress={() => { setState({...state, resume_image:''})}}>
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
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Edit Profile'} />
      <ScrollView>
      <View style={styles.subBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.inText}>Document details</Text>
        </View>
        {/* <ScrollView> */}
        <TextLabel title={'Passport Number'} />
          <TextInput
            value={state.passport_Number}
            onChangeText={text =>
              setState({...state, passport_Number: text.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})
            }
            style={styles.textInput}
            keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
            placeholder={'Enter Passport Number'}
            placeholderTextColor={'gray'}
          />
          <TextLabel title={'Passport Validity'} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker}>
            {state.passport_ValidityDate == '' ? (
              <Text
                style={[styles.textInput, {padding: 14, color: '#00000050'}]}>
                Enter Passport Validity
              </Text>
            ) : (
              <Text style={styles.textInput}>
                {moment(state.passport_ValidityDate).format('DD/MM/YYYY')}
              </Text>
            )}
          </TouchableOpacity>
          <TextLabel title={'Upload Aadhar Card'} />
          <View style={{flexDirection: 'row'}}>
            {state.aadhaar_front ? (
              ifAvailebleForAadhaarFront(state.aadhaar_front)
              // <ImageBackground
              //   imageStyle={{borderRadius: 5}}
              //   style={styles.certificateImage}
              //   source={{uri: state.aadhaar_front}}>
              //   <TouchableOpacity
              //     style={styles.crossImageView}
              //     onPress={() => {
              //       setState({...state, aadhaar_front: ''});
              //     }}>
              //     <Image
              //       style={styles.crossImage}
              //       source={require('../images/close.png')}
              //     />
              //   </TouchableOpacity>
              // </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => 
                  // onImageOptionHandler('aadhaarFront')
                  getPDF6()
                  }>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
            {state.aadhaar_back ? (
              ifAvailebleForAadhaarBack(state.aadhaar_back)
              // <ImageBackground
              //   imageStyle={{borderRadius: 5}}
              //   style={styles.certificateImage}
              //   source={{uri: state.aadhaar_back}}>
              //   <TouchableOpacity
              //     style={styles.crossImageView}
              //     onPress={() => {
              //       setState({...state, aadhaar_back: ''});
              //     }}>
              //     <Image
              //       style={styles.crossImage}
              //       source={require('../images/close.png')}
              //     />
              //   </TouchableOpacity>
              // </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => 
                  // onImageOptionHandler('aadhaarBack')
                  getPDF5()
                  }>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>
          <TextLabel title={'Upload Pan Card'} />
          <View style={{flexDirection: 'row'}}>
            {state.pancard_front ? (
              ifAvailebleForPancardFront(state.pancard_front)
              // <ImageBackground
              //   imageStyle={{borderRadius: 5}}
              //   style={styles.certificateImage}
              //   source={{uri: state.pancard_front}}>
              //   <TouchableOpacity
              //     style={styles.crossImageView}
              //     onPress={() => {
              //       setState({...state, pancard_front: ''});
              //     }}>
              //     <Image
              //       style={styles.crossImage}
              //       source={require('../images/close.png')}
              //     />
              //   </TouchableOpacity>
              // </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() =>
                  //  onImageOptionHandler('pancardFront')
                  getPDF4()
                   }>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
            {state.pancard_back ? (
              ifAvailebleForPancardBack(state.pancard_back)
              // <ImageBackground
              //   imageStyle={{borderRadius: 5}}
              //   style={styles.certificateImage}
              //   source={{uri: state.pancard_back}}>
              //   <TouchableOpacity
              //     style={styles.crossImageView}
              //     onPress={() => {
              //       setState({...state, pancard_back: ''});
              //     }}>
              //     <Image
              //       style={styles.crossImage}
              //       source={require('../images/close.png')}
              //     />
              //   </TouchableOpacity>
              // </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => 
                  // onImageOptionHandler('pancardBack')
                  getPDF3()
                  }>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>
          <TextLabel title={'Experience Certificate'} />
          <View style={{flexDirection: 'row'}}>
            {state.exp_crefiticate_front ? (
              ifAvailebleForExpCert(state.exp_crefiticate_front)
              // <ImageBackground
              //   imageStyle={{borderRadius: 5}}
              //   style={styles.certificateImage}
              //   source={{uri: state.exp_crefiticate_front}}>
              //   <TouchableOpacity
              //     style={styles.crossImageView}
              //     onPress={() => {
              //       setState({...state, exp_crefiticate_front: ''});
              //     }}>
              //     <Image
              //       style={styles.crossImage}
              //       source={require('../images/close.png')}
              //     />
              //   </TouchableOpacity>
              // </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => 
                  // onImageOptionHandler('expCrefiticateFront')
                  getPDF2()
                  }>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
            {/* {state.exp_crefiticate_back ? (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.certificateImage}
                source={{uri: state.exp_crefiticate_back}}>
                <TouchableOpacity
                  style={styles.crossImageView}
                  onPress={() => {
                    setState({...state, exp_crefiticate_back: ''});
                  }}>
                  <Image
                    style={styles.crossImage}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => onImageOptionHandler('expCrefiticateBack')}>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )} */}
          </View>
          <TextLabel title={'Passport Upload'} />
          {state.passport_image ? (
            ifAvailebleForPassport(state.passport_image)
            // <ImageBackground
            //   imageStyle={{borderRadius: 5}}
            //   style={styles.certificateImage}
            //   source={{uri: state.passport_image}}>
            //   <TouchableOpacity
            //     style={styles.crossImageView}
            //     onPress={() => {
            //       setState({...state, passport_image: ''});
            //     }}>
            //     <Image
            //       style={styles.crossImage}
            //       source={require('../images/close.png')}
            //     />
            //   </TouchableOpacity>
            // </ImageBackground>
          ) : (
            <ImageBackground
              imageStyle={{borderRadius: 5}}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => 
                // onImageOptionHandler('passportImage')
                getPDF1()
                }>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <TextLabel title={'Resume Upload'} />
          {state.resume_image ? (
            // <ImageBackground
            //   imageStyle={{borderRadius: 5}}
            //   style={styles.certificateImage}
            //   source={{uri: state.resume_image}}>
            //   <TouchableOpacity
            //     style={styles.crossImageView}
            //     onPress={() => {
            //       setState({...state, resume_image: ''});
            //     }}>
            //     <Image
            //       style={styles.crossImage}
            //       source={require('../images/close.png')}
            //     />
            //   </TouchableOpacity>
            // </ImageBackground>

            ifAvailebleForResume(state.resume_image)
            // <View style={{ flexDirection:'row', alignItems:'center'}}>
            // <ImageBackground
            //   imageStyle={{borderRadius: 5}}
            //   style={styles.boxImage}
            //   source={require('../images/box.png')}>
            //   <TouchableOpacity
            //     // style={styles.crossImageView}
            //     onPress={() => {
            //       setState({...state, resume_image: ''});
            //     }}>
            //     <Image
            //       style={styles.uploadImage}
            //       source={require('../images/upload.png')}
            //     />
            //     <Text style={styles.uploadText}>Upload</Text>
            //   </TouchableOpacity>
            // </ImageBackground>
            // <Text style={{color:'black', marginLeft:10}}>Resume Uploaded Succesfully</Text>
            // </View>
          ) : (
            <ImageBackground
              imageStyle={{borderRadius: 5}}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => 
                // onImageOptionHandler('resumeImage')
                getPDF()
                }>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
              
            </ImageBackground>)}
            
            {clicked ?
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
              <DisableButton title={'UPDATE'}
                height={50}
                fontSize={16}
                loader={state.isLoading}
                bgColor={'#cccccc'}
                txtcolor={'#fff'} />
            </View> :
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 30 }}>
              <ButtonStyle loader={state.isLoading} title={'UPDATE'} onPress={() => updateProfile()} />
            </View>}
            {/* <View style={{width: '90%', alignSelf: 'center', marginTop: 30,}}>
              <ButtonStyle
                  title={'UPDATE'}
                  loader={state.isLoading}
                  onPress={() => {
                      updateProfile()
                  }}
              />
          </View> */}
            {/* </ScrollView> */}   
      </View>
      </ScrollView>
    </View>
  )
}
const TextLabel = ({title}) => <Text style={styles.textLabel}>{title}</Text>;

export default EditDocumentsDetails

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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 10,
  },
  drops: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 15,
    // elevation: 2,
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 0,
    fontSize: 16,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    color:'#000'
  },
  textLabel: {
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#8F9BB3',
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 0,
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
  modal_View: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  mdtop: {
    backgroundColor: '#FFFFFF',
    marginTop: height / 3,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 18,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },
  subText: {
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 15,
    color: '#6F6F7B',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 22,
  },
  certificateImage: {
    width: 110,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'cover',
  },
  certificateImageForPDF: {
    width: 60,
    height: 50,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'contain'
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
})