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
  TextInput,
  ImageBackground,
  Modal,
} from 'react-native';
import {StatusBarDark} from '../Custom/CustomStatusBar';
import {BottomView, ButtonStyle, DisableButton} from '../Custom/CustomView';
import {launchImageLibrary} from 'react-native-image-picker';
// import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import DocumentPicker, { types } from 'react-native-document-picker';
import moment from 'moment';
import { Api, LocalStorage } from '../services/Api';
import { _SetAuthToken } from '../services/ApiSauce';
import * as actions from '../redux/actions';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
import {RotateInUpLeft} from 'react-native-reanimated';
import { Dropdown } from 'react-native-element-dropdown';
const {height} = Dimensions.get('window');

const Register3 = ({navigation, route}) => {
  // alert(JSON.stringify(route.params,null,2))
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState({modalVisible: false});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userType, setUserType] = useState('');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [value, setValue] = useState(null);
  const [state, setState] = useState({
    user_id: route.params?.userDetail,
    // user_id: '214',
    work_Experience: '',
    passport_Number: '',
    passport_ValidityDate: '',
    foreign_Experience: '',
    categoryId: '',
    subCategoryId: '',
    isLoading: false,
    aadhaar_front: '',
    aadhaar_back: '',
    pancard_front: '',
    pancard_back: '',
    exp_crefiticate_front: '',
    exp_crefiticate_back: '',
    passport_image: '',
    resume_image: '',
  });

  useEffect(() => {
    getCategoryList();
  }, []);

  //Get sub Category  list
  useEffect(() => {
    if (state.categoryId) {
      setState({...state, subCategoryId: ''});
      getSubCategoryList();
    }
  }, [state.categoryId]);

  const getCategoryList = async () => {
    const response = await Api.category();
    const {status, data} = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({label: value.name, value: value.id});
      }
      setCategory(tempArray);
    }
  };

  const getSubCategoryList = async () => {
    const body = {
      cat_id: state.categoryId,
    };
    const response = await Api.sub_category(body);
    console.log('-----res: ', response);
    const {status, data} = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({label: value.name, value: value.id});
      }
      setSubCategory(tempArray);
    }
  };

  const onProjectHandlerSubmit = async () => {
    const {
      user_id = '',
      work_Experience = '',
      passport_Number = '',
      passport_ValidityDate = '',
      foreign_Experience = '',
      categoryId = '',
      subCategoryId = '',
      aadhaar_front = '',
      aadhaar_back = '',
      pancard_front = '',
      pancard_back = '',
      exp_crefiticate_front = '',
      exp_crefiticate_back = '',
      passport_image = '',
      resume_image = '',
    } = state;

    if (!work_Experience) {
      Toast.show('Please enter your work experience');
      return;
    }
    if (!passport_Number) {
      Toast.show('Please enter your passport number');
      return;
    }
    if (!passport_ValidityDate) {
      Toast.show('Please enter your passport validity');
      return;
    }
    if (!foreign_Experience) {
      Toast.show('Please enter your foreign experience');
      return;
    }
    if (!categoryId) {
      Toast.show('Please select your category');
      return;
    }
    if (!subCategoryId) {
      Toast.show('Please select your sub category');
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
    formData.append('user_id', user_id);
    formData.append('work_exp', work_Experience);
    formData.append('passport_number', passport_Number);
    formData.append('foreign_exp', foreign_Experience);
    formData.append('category', categoryId);
    formData.append('sub_category', subCategoryId);
    formData.append('passport_validity', passport_ValidityDate+" ");
    formData.append('aadhaar_front', {
      uri: aadhaar_front.uri,
      type: aadhaar_front.type,
      name: aadhaar_front.name,
    });
    formData.append('aadhaar_back', {
      uri: aadhaar_back.uri,
      type: aadhaar_back.type,
      name: aadhaar_back.name,
    });
    formData.append('pancard_front', {
      uri: pancard_front.uri,
      type: pancard_front.type,
      name: pancard_front.name,
    });
    formData.append('pancard_back', {
      uri: pancard_back.uri,
      type: pancard_back.type,
      name: pancard_back.name,
    });
    formData.append('passport_image', {
      uri: passport_image.uri,
      type: passport_image.type,
      name: passport_image.name,
    });
    
    formData.append('exp_crefiticate', {
      uri: exp_crefiticate_front.uri,
      type: exp_crefiticate_front.type,
      name: exp_crefiticate_front.name,
    });

    formData.append('resume_image', 
    {
      uri: resume_image.uri,
      type: resume_image.type,
      name: resume_image.name,
      // uri: resume_image,
      // type: 'image/jpeg',
      // name: 'image.jpg',
    }
    );
    // alert(JSON)
    console.log('-----formData: ', JSON.stringify(formData));
    // alert(JSON.stringify(formData,null,2))
    // return
    console.log(state)
    setState({...state, isLoading: true});
    // LocalStorage.setFormData(formData)

    const response = await Api.custmerRegisterStep4(formData);
    // alert(JSON.stringify(response,null,2))
    const {status, msg, token, user = {} } = response;
    console.log('-------------register response: ', response);
    //////================
  //   const token = (await LocalStorage.getToken()) || '';
  //   const btoken = `Bearer ${token}`;
  //   // console.log(btoken)
  //   const responseNew = await fetch('http://139.59.67.166/Labour-Home-Job/public/api/custmerRegister_step4',{
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     "Content-Type": "multipart/form-data",
  //     'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
  //     "Authorization": btoken,
  //   },
  //   body: formData

  // })
  // const res = await responseNew.json()
    // alert(JSON.stringify(response,null,2))
    // return
    setState({...state, isLoading: false});
    if (status) {
      // setModalOpen(true);
      LocalStorage.setToken(token);
      _SetAuthToken(token);
      dispatch(actions.SetUserDetail(user));
      LocalStorage.setUserDetail(JSON.stringify(user));
      Toast.show("Register Successfully");
      navigation.replace('DrawerNavigator');
      setClicked(false)
      
    } else {
      // naviga
      // const {
      //   data: { msg = 'Something went wrong' },
      // } = response;
      Toast.show(msg);
      navigation.replace('OnBoarding');
      setClicked(false)
      console.log('------err: ', msg);
      // setState({...state, isLoading: false});
    }
  };

  const formatPassportNumber = (text) => {
    let newText = text.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    let tt = newText.toUpperCase()
    return tt
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setState({...state, passport_ValidityDate: date});
    hideDatePicker();
  };

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

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  
  const ifAvailebleForAadhaarFront = (item,) => {
    // alert(JSON.stringify(item,null,2))
    if(item.type.split('/')[1] === 'pdf' ){
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
          source={{ uri: item.uri }}>
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
    if(item.type.split('/')[1] === 'pdf' ){
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
          source={{ uri: item.uri }}>
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
    if(item.type.split('/')[1] === 'pdf' ){
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
          source={{ uri: item.uri }}>
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
    if(item.type.split('/')[1] === 'pdf' ){
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
          source={{ uri: item.uri }}>
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
    if(item.type.split('/')[1] === 'pdf' ){
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
          source={{ uri: item.uri }}>
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
    if(item.type.split('/')[1] === 'pdf' ){
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
          source={{ uri: item.uri }}>
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
    if(item.type.split('/')[1] === 'pdf' ){
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
          source={{ uri: item.uri }}>
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
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarDark />
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>
            Find the care{`\n`}job that’s right{`\n`}for you
          </Text>
          <ImageBackground
            style={styles.headerImage}
            source={require('../images/girl.png')}></ImageBackground>
        </View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.hireText}>Register to hire!</Text>
            <View
              style={{marginTop: 5, marginLeft: 'auto', marginHorizontal: 10}}>
              <AnimatedCircularProgress
                size={65}
                width={3}
                fill={100}
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
                      {'4/4'}
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <TextLabel title={'Work Experience'} />
          <TextInput
            value={state.work_Experience}
            onChangeText={text =>
              setState({...state, work_Experience: text.replace(/[^0-9]/g, '')})
            }
            style={styles.textInput}
            placeholder={'Enter Experience'}
            keyboardType={'numeric'}
            maxLength={2}
            placeholderTextColor={'lightgray'}
          />
          <TextLabel title={'Passport Number'} />
          <TextInput
            value={state.passport_Number}
            onChangeText={text =>
              setState({...state, passport_Number: formatPassportNumber(text)})
            }
            style={styles.textInput}
            keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
            placeholder={'Enter Passport Number'}
            // autoCapitalize = "characters"
            placeholderTextColor={'lightgray'}
            maxLength={20}
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
                style={[styles.textInput, {padding: 14, color: 'lightgray'}]}>
                Enter Passport Validity
              </Text>
            ) : (
              <Text style={styles.textInput}>
                {moment(state.passport_ValidityDate).format('DD/MM/YYYY')}
              </Text>
            )}
          </TouchableOpacity>
          <TextLabel title={'Foreign Experience'} />
          <TextInput
            value={state.foreign_Experience}
            onChangeText={text =>
              setState({
                ...state,
                foreign_Experience: text.replace(/[^0-9]/g, ''),
              })
            }
            style={styles.textInput}
            maxLength={2}
            keyboardType={'numeric'}
            placeholder={'Enter Foreign Experience'}
            placeholderTextColor={'lightgray'}
          />
          <TextLabel title={'Select Category'} />
          <View style={{marginTop: 10}}>
            {/* <Dropdown
              value={state.categoryId}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              placeholder={'Select Category'}
              placeholderTextColor={'lightgray'}
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{top: 32, left: 0}}
              dropdownMargins={{min: 8, max: 16}}
              pickerStyle={{width: '80%', left: '10%'}}
              dropdownPosition={-1.9}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={category}
              onChangeText={(value, index, data) => {
                console.log('-------res data: ', data[index].value);
                setState({...state, categoryId: data[index].value});
                // getSubCategoryList(data[index].value)
                // onChangeDropdownUserType(value, index, data);
              }}
            /> */}
            <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={category}
            search
            maxHeight={300}
            backgroundColor={'#FFFFFFAA'}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            placeholderTextColor="black"
            searchPlaceholder="Search..."
            value={state.categoryId}
            onChange={item => {
              console.log(item)
              setState({...state, categoryId: item.value});
            }}
            renderItem={renderItem}
          />
          </View>
          <TextLabel title={'Select Sub Category'} />
          <View style={{marginTop: 10}}>
            {/* <Dropdown
              value={state.subCategoryId}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              placeholder={'Select Sub Category'}
              placeholderTextColor={'lightgray'}
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{top: 32, left: 0}}
              dropdownMargins={{min: 8, max: 16}}
              pickerStyle={{width: '76%', left: '12%'}}
              dropdownPosition={-1.9}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={subCategory}
              onChangeText={(value, index, data) => {
                console.log('-------res data: ', data[index].value);
                setState({...state, subCategoryId: data[index].value});
                // onChangeDropdownUserType(value, index, data);
              }}
            /> */}
            <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={subCategory}
            search
            maxHeight={300}
            backgroundColor={'#FFFFFFAA'}
            labelField="label"
            valueField="value"
            placeholder="Select Sub Category"
            placeholderTextColor="black"
            searchPlaceholder="Search..."
            value={state.subCategoryId}
            onChange={item => {
              console.log(item)
              setState({...state, subCategoryId: item.value});
            }}
            renderItem={renderItem}
          />
          </View>
          <TextLabel title={'Upload Aadhar Card'} />
          <View style={{flexDirection: 'row'}}>
            {state.aadhaar_front ? ifAvailebleForAadhaarFront(state.aadhaar_front)
            // (<ImageBackground
            //     imageStyle={{borderRadius: 5}}
            //     style={styles.certificateImage}
            //     source={{uri: state.aadhaar_front.uri}}>
            //     <TouchableOpacity
            //       style={styles.crossImageView}
            //       onPress={() => {
            //         setState({...state, aadhaar_front: ''});
            //       }}>
            //       <Image
            //         style={styles.crossImage}, 
            //         source={require('../images/close.png')}
            //       />
            //     </TouchableOpacity>
            //   </ImageBackground>
            // ) 
            : (
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
              //   source={{uri: state.aadhaar_back.uri}}>
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
              //   source={{uri: state.pancard_front.uri}}>
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
                  // onImageOptionHandler('pancardFront')
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
              //   source={{uri: state.pancard_back.uri}}>
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
              //   source={{uri: state.exp_crefiticate_front.uri}}>
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
            //   source={{uri: state.passport_image.uri}}>
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
                //  onImageOptionHandler('passportImage')
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
            //   source={{uri: state.resume_image.uri}}>
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
            //   source={{uri : state.resume_image.uri}}>
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
            </ImageBackground>
          )}

          {clicked ? 
            <View style={{ width: '100%', marginTop: 30 }}>
              <DisableButton title={'SUBMIT'}
                height={50}
                loader={state.isLoading}
                fontSize={16}
                bgColor={'#cccccc'}
                txtcolor={'#fff'} />
            </View> : 
          <View style={{ width: '100%', marginTop: 30 }}>
            <ButtonStyle
              title={'SUBMIT'}
              loader={state.isLoading}
              onPress={() => {
                onProjectHandlerSubmit();
              }}
            />
          </View>}
          <BottomView />
        </View>
        {/* <Modal
          visible={modalOpen}
          transparent={true}
          onRequestClose={() => {
            setModalOpen(false);
            navigation.replace('Login');
          }}>
          <View style={styles.modal_View}>
            <View
              // activeOpacity={0.8}
              style={styles.mdtop}
              // onPress={() => {
              //   setModalOpen(false);
              //   navigation.replace('DrawerNavigator');
              // }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
                source={require('../images/tick.png')}
              />
              <Text style={styles.text}>
                Registration submitted for{`\n`}approval.
              </Text>

              <Text style={styles.subText}>
                After approval from admin you{`\n`}can use the app.
              </Text>
            </View>
          </View>
        </Modal> */}
      </ScrollView>
    </View>
  );
};

export default Register3;
const TextLabel = ({title}) => <Text style={styles.textLabel}>{title}</Text>;
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
  ///
  dropdown:{
    borderWidth:1,
    borderColor:'lightgray',
    marginHorizontal:16,
    borderRadius:6,
    padding:8
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color:'black'
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color:'black',
    fontFamily:'Muli-SemiBold'
  },
  placeholderStyle: {
    fontSize: 16,
    color:'lightgray',
    fontFamily:'Muli-SemiBold'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black',
    fontFamily:'Muli-SemiBold'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:"black"
  },
});
