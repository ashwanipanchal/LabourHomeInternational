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
  TextInput,
  Platform,
  Modal,
  Option,
  Keyboard,
} from 'react-native';
import SelectList from 'react-native-dropdown-select-list'
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {DisableButton, Header, HeaderDark} from '../Custom/CustomView';
// import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {Api, LocalStorage} from '../services/Api';
import CountryPicker from 'react-native-country-picker-modal';
import Toast from 'react-native-simple-toast';
import {BottomView, ButtonStyle, StartButton} from '../Custom/CustomView';
const {height, width} = Dimensions.get('window');
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PostJob = ({navigation}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false)
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [selectJob, setSelectJob] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [countryCode, setCountryCode] = useState([]);
  const [callingCode, setCallingCode] = useState('91');
  const [selected, setSelected] = useState();
  const [value, setValue] = useState(null);
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [state, setState] = useState({
    name: '',
    country: '',
    job_location: '',
    work_exp: '',
    qualification: '',
    labour_requird: '',
    categoryId: '',
    subCategoryId: '',
    job_description: '',
    contract_period: '',
    accommodation: '',
    food: '',
    working_hours: '',
    transportation: '',
    medical_insurance: '',
    annual_leave: '',
    air_ticket: '',
    isLoading:false
  });
  useEffect(() => {
    getCountryList();
    navigationHandler();
  }, []);

  const navigationHandler = async () => {
    const type = (await LocalStorage.getUserDetail()) || '{}';
    console.log('Line --- 63', type);
    const user = JSON.parse(type);
    console.log(user.id, ' === ', user.user_type);
    setUserId(user.id);
    setUserType(user.user_type);
  };

  // useEffect(() => {
  //   getCountryList();
  // }, []);

  // const getCountryList = async () => {
  //   const response = await Api.countrie();
  //   const {status, data} = response;
  //   if (status) {
  //     let tempArray = [];
  //     for (let value of data) {
  //       tempArray.push({label: value.name, value: value.id});
  //     }
  //     setCountryCode(tempArray);
  //   }
  // };
  const getCountryList = async () => {
    const response = await Api.countrie();
    const {status, data} = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({label : value.name, value: value.id});
      }
      setCountryCode(tempArray);
    }
  };
  //   const getCountryList = async () => {
  //   const response = await Api.countrie();
  //   const {status, data} = response;
  //   if (status) {
  //     // let tempArray = [];
  //     let newArray = response.data.map((item) => {
  //       return {key: item.id, value: item.name}
  //     })
  //     // console.log(tempArray)
  //     setCountryCode(newArray);
  //   }
  // };

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

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };
  const onProjectHandler = async () => {
    Keyboard.dismiss();
    const {
      name = '',
      country = '',
      job_location = '',
      work_exp = '',
      qualification = '',
      labour_requird = '',
      categoryId = '',
      subCategoryId = '',
      job_description = '',
      contract_period = '',
      accommodation = '',
      food = '',
      working_hours = '',
      transportation = '',
      medical_insurance = '',
      annual_leave = '',
      air_ticket = '',
    } = state;
    //

    if (!name) {
      Toast.show('Please enter your name');
      return;
    }

    if (!country) {
      Toast.show('Please select your country');
      return;
    }

    if (!job_location) {
      Toast.show('Please select your location');
      return;
    }

    if (!work_exp) {
      Toast.show('Please select your work experience');
      return;
    }

    if (!qualification) {
      Toast.show('Please select your qualification');
      return;
    }

    if (!labour_requird) {
      Toast.show('Please select your labour_requird');
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
    if (!job_description) {
      Toast.show('Please select your job description');
      return;
    }
    if (!contract_period) {
      Toast.show('Please select your contract period');
      return;
    }
    if (!accommodation) {
      Toast.show('Please select your accommodation');
      return;
    }
    if (!food) {
      Toast.show('Please select your food');
      return;
    }
    if (!working_hours) {
      Toast.show('Please select your working hours');
      return;
    }
    if (!transportation) {
      Toast.show('Please select your transportation');
      return;
    }
    if (!medical_insurance) {
      Toast.show('Please select your medical Insurance');
      return;
    }
    if (!annual_leave) {
      Toast.show('Please select your annual leava');
      return;
    }
    if (!air_ticket) {
      Toast.show('Please select your airticket');
      return;
    }
    
    setClicked(true)
    const body = {
      user_id: userId,
      user_type: userType,
      name,
      country,
      latitude: '12.25555',
      longitude: '52.5555',
      job_location,
      work_exp,
      qualification,
      labour_requird,
      category:categoryId,
      sub_category:subCategoryId,
      job_description,
      contract_period,
      accommodation,
      food,
      working_hours,
      transportation,
      medical_insurance,
      annual_leave,
      air_ticket,
    };
    // alert(JSON.stringify(body,null,2))
    // return
    console.log('-----body: ', body);
    setState({...state, isLoading: true});
    const token = (await LocalStorage.getToken()) || '';
    const btoken = `Bearer ${token}`;
    const response = await fetch(
      'http://139.59.67.166/Labour-Home-Job/public/api/post_job',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
          Authorization: btoken,
        },
        body: JSON.stringify(body),
      },
    );
    const postjobresultresponse = await response.json();
    // alert(JSON.stringify(postjobresultresponse,null,2))
    // return
    console.log('postjobresultresponse ==', postjobresultresponse);
    setState({...state, isLoading: false});
    const {status} = response
    if(status){
      setClicked(false)
      setModalOpen(true)
    }else{
        alert("Something Went Wrong")
      }
   
    // alert(JSON.stringify(body,null,2))
    // return
    // const response = await Api.postJob(body)
    // alert(JSON.stringify(response,null,2))
    // return
    // const {status} = response;
    // setState({...state, isLoading: true});
    // if(status){
    //   setModalOpen(true)
    // }else{
    //   alert("Something Went Wrong")
    // }
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Post Job'} />
      <ScrollView>
        <TextLabel title={'Employer Name'} />
        <TextInput
          value={state.name}
          onChangeText={name => setState({...state, name:name.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})}
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Employer Name'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Select Country'} />
        {/* <View
          style={{
            borderRadius: 6,
            borderWidth: 1,
            padding: 10,
            backgroundColor: '#ffffff',
            borderColor: 'lightgrey',
            marginTop: 10,
            flexDirection: 'row',
            width: '85%',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignSelf: 'center',
            // marginBottom: 20,
          }}>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCountryNameButton
            withAlphaFilter={false}
            withCallingCode
            onSelect={country => {
              console.log('country Line ==281', country);
              const {cca2, callingCode} = country;
              setCountryCode(cca2);
              setCallingCode(callingCode[0]);
            }}
            containerButtonStyle={{alignItems: 'center'}}
          />
          <Image
            style={{
              width: 25,
              height: 12,
              resizeMode: 'contain',
              marginTop: 10,
            }}
            source={require('../images/down-arrow.png')}
          />
        </View> */}
        
        <View style={{marginTop: 10}}>
          {/* <Dropdown
            value={state.country}
            style={styles.drops}
            itemColor={'rgba(0, 0, 0, .54)'}
            underlineColor="transparent"
            // label={'Select Country'}
            // icon="cheveron-down"
            placeholder={'Select Country'}
            placeholderTextColor={'lightgray'}
            iconColor="rgba(0, 0, 0, 1)"
            icon={require('../images/down-arrow.png')}
            dropdownOffset={{top: 32, left: 0}}
            dropdownMargins={{min: 8, max: 16}}
            pickerStyle={{width: '80%', left: '10%'}}
            dropdownPosition={-5.0}
            shadeOpacity={0.12}
            rippleOpacity={0.4}
            baseColor={'white'}
            data={countryCode}
            onChangeText={(value, index, data) => {
              setState({...state, country: data[index].value});
            }}
          /> */}
          {/* <SelectList 
            setSelected={(item)=>setSelected(item)}
            boxStyles={{marginHorizontal:30,borderRadius:5, borderColor:'lightgray'}}
            dropdownStyles={{marginHorizontal:30}}
            data={countryCode} 
            onSelect={()=> console.log('selected', selected)} 
          /> */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={countryCode}
            search
            maxHeight={300}
            backgroundColor={'#FFFFFFAA'}
            labelField="label"
            valueField="value"
            placeholder="Select Country"
            placeholderTextColor="black"
            searchPlaceholder="Search..."
            value={state.country}
            onChange={item => {
              console.log(item)
              setState({...state, country: item.value});
            }}
            renderItem={renderItem}
          />
        </View>
        <TextLabel title={'Job Location'} />
        <TextInput
          value={state.job_location}
          // onChangeText={job_location => setState({...state, job_location})}
          style={styles.textInput}
          placeholder={'Job Location'}
          placeholderTextColor={'lightgray'}
          onChangeText={job_location => setState({...state, job_location:job_location.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})}
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
        />
        <TextLabel title={'Work Experience'} />
        <TextInput
          value={state.work_exp}
          onChangeText={work_exp => setState({...state, work_exp:work_exp.replace(/[`~!@#$%^&*()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi, '')})}
          style={styles.textInput}
          // keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          placeholder={'Enter Experience'}
          maxLength={2}
          placeholderTextColor={'lightgray'}
          keyboardType={'number-pad'}
        />
        <TextLabel title={'Qualification'} />
        <TextInput
          value={state.qualification}
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          onChangeText={qualification => setState({...state, qualification: qualification.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})}
          style={styles.textInput}
          placeholder={'Enter Qualification'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Labour Required'} />
        <TextInput
          value={state.labour_requird}
          // keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          onChangeText={labour_requird => setState({...state, labour_requird:labour_requird.replace(/[`~!@#$%^&*()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi, '')})}
          style={styles.textInput}
          placeholder={'Labour Required Number'}
          keyboardType={'number-pad'}
          maxLength={5}
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
              console.log(item.value)
              setState({...state, subCategoryId: item.value});
            }}
            renderItem={renderItem}
          />
        </View>
        <TextLabel title={'Job Description'} />
        <TextInput
          value={state.job_description}
          onChangeText={job_description =>
            setState({...state, job_description:job_description})
          }
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Enter Job Description'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Contract Period'} />
        <TextInput
          value={state.contract_period}
          onChangeText={contract_period =>
            setState({...state, contract_period:contract_period.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})
          }
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Enter Contract Period'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Accommodation'} />
        <TextInput
          value={state.accommodation}
          onChangeText={accommodation => setState({...state, accommodation:accommodation.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})}
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Accommodation Provided'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Food'} />
        <TextInput
          value={state.food}
          onChangeText={food => setState({...state, food:food.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})}
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Food Provided'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Working Hours'} />
        <TextInput
          value={state.working_hours}
          onChangeText={working_hours => setState({...state, working_hours:working_hours.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi, '')})}
          // keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Working Hours Number'}
          maxLength={2}
          keyboardType={'number-pad'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Transportation'} />
        <TextInput
          value={state.transportation}
          onChangeText={transportation => setState({...state, transportation:transportation.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})}
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Transportation Provided'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Medical & Insurance'} />
        <TextInput
          value={state.medical_insurance}
          onChangeText={medical_insurance =>
            setState({...state, medical_insurance:medical_insurance.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})
          }
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Medical & Insurance Provided'}
          placeholderTextColor={'lightgray'}
        />
        <TextLabel title={'Annual Leave'} />
        <TextInput
          value={state.annual_leave}
          onChangeText={annual_leave => setState({...state, annual_leave:annual_leave.replace(/[`~!@#$%^&*()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi, '')})}
          // keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Annual Leave Number'}
          keyboardType={'number-pad'}
          placeholderTextColor={'lightgray'}
          maxLength={2}
        />
        <TextLabel title={'Air Ticket'} />
        <TextInput
          value={state.air_ticket}
          onChangeText={air_ticket => setState({...state, air_ticket:air_ticket.replace(/[`~!@#₹$%^&*✓™®©%€¥$¢^∆¶×÷π√•°()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')})}
          keyboardType={Platform.OS == 'ios' ? "ascii-capable": "visible-password"}
          style={styles.textInput}
          placeholder={'Air Ticket Provided'}
          placeholderTextColor={'lightgray'}
        />
        {clicked ? 
        <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
        <DisableButton title={'SUBMIT'} 
              height={50}
              fontSize={16}
              loader={state.isLoading}
              bgColor={'#cccccc'}
              txtcolor={'#fff'}  />
              {/* <ButtonStyle title={'SUBMIT'} disabled /> */}
      </View>:
        <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
          <ButtonStyle loader={state.isLoading} title={'SUBMIT'} onPress={() => onProjectHandler()} />
        </View>}
        <BottomView />
        <Modal
          visible={modalOpen}
          transparent={true}
          onRequestClose={() => setModalOpen(false)}>
          <View style={styles.modal_View}>
            <View activeOpacity={0.8} style={styles.mdtop}>
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
                Job Post{`\n`}
                Successfully
              </Text>
              <View style={{width: '35%', alignSelf: 'center', marginTop: 20}}>
                <StartButton
                  title={'OK'}
                  onPress={() => {
                    setModalOpen(false)
                    navigation.replace('ProjectorHome');
                  }}
                />
              </View>
              <BottomView />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default PostJob;
const TextLabel = ({title}) => <Text style={styles.textLabel}>{title}</Text>;
const styles = StyleSheet.create({
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 0,
    fontSize: 16,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    color: '#000',
  },
  textLabel: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 14,
    color: '#8F9BB3',
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 0,
  },
  drops: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 30,
    // elevation: 2,
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
    fontFamily: 'Muli-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },


  // dropdown: {
  //   margin: 16,
  //   height: 50,
  //   marginHorizontal:30,
  //   color:'black',
  //   backgroundColor: 'white',
  //   borderRadius: 12,
  //   // padding: 12,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 1.41,
  //   borderColor:'lightgray'
  //   // elevation: 2,
  // },
  dropdown:{
    borderWidth:1,
    borderColor:'lightgray',
    marginHorizontal:30,
    borderRadius:6,
    padding:8,
    fontFamily: 'Muli-SemiBold'
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
    color:'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color:'lightgray',
    fontFamily: 'Muli-SemiBold'
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
    color:"black",
    fontFamily: 'Muli-SemiBold'
  },
});
