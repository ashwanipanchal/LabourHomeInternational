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
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import { BottomView, ButtonStyle, DisableButton } from '../Custom/CustomView';
// import  { Dropdown } from 'react-native-material-dropdown-v2-fixed';
// import CountryPicker from 'react-native-country-picker-modal';
import SelectList from 'react-native-dropdown-select-list'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-element-dropdown';
const { height } = Dimensions.get('window');

const Register1 = ({ navigation, route }) => {
  // const [userType, setUserType] = useState('Male');
  const [clicked, setClicked] = useState(false)
  const [value, setValue] = useState(null);
  const [selectJob, setSelectJob] = useState([
    {label: "Male", value: 'Male' },
    { label: "Female",  value: 'Female' },
  ]);
  const [language, setLanguage] = useState([
    {label: "English", value: 'English' },
    { label: "Hindi", value: 'Hindi' },
  ]);

  const [countryCode, setCountryCode] = useState([]);
  const [stateValue, setStateValue] = useState([]);
  const [cityValue, setCityValue] = useState([]);
  const [state, setState] = useState({
    user_id: route.params?.userDetail,
    age: '',
    gender: '',
    language: '',
    country: '',
    states: '',
    city: '',
    city_name:'',
    isLoading: false,
  });
  // console.log('----data: ', route.params?.userDetail.id);

  const onProjectHandler = async () => {
    Keyboard.dismiss()
    // if(state.city == 'other'){
      //   return setState({...state, city:otherCity})
      // }
      const {
        user_id = '',
        age = '',
        gender = '',
        language = '',
        country = '',
        states = '',
        city = '',
        city_name = '',
    } = state;
    // 

    if (!age) {
      Toast.show('Please enter your age')
      return;
    }

    if (!gender) {
      Toast.show('Please select your gender');
      return;
    }

    if (!language) {
      Toast.show('Please select your language');
      return;
    }
    
    if (!country) {
      Toast.show('Please select your country');
      return;
    }
    
    if (!states) {
      Toast.show('Please select your states');
      return;
    }

    if (!city) {
      Toast.show('Please select your city');
      return;
    }

      let body;
      if(city == 'other'){
        body = {
          user_id,
          age,
          gender,
          language,
          country,
          state: states,
          city:0,
          city_name
      }
    }else{
      body = {
        user_id,
        age,
        gender,
        language,
        country,
        state: states,
        city
      }
    }
    setClicked(true)
    // const body = {
    //   user_id,
    //   age,
    //   gender,
    //   language,
    //   country,
    //   state: states,
    //   city
    // };
    console.log('-----body: ', body);
    // alert(JSON.stringify(body,null,2))
    // return
    setState({ ...state, isLoading: true });
    const response = await Api.custmerRegisterStep2(body);
    const { status = false, msg, token = '', user_detail = {} } = response;
    console.log('-------------response: ', response);
    if (status) {
      navigation.replace('Register2', { userDetail: user_detail.id });
      setClicked(false)
      setState({ ...state, isLoading: false });
    } else {
      const {
        data: { msg = 'Something went wrong' },
      } = response;
      Toast.show(msg)
      setState({ ...state, isLoading: false });
      setClicked(false)
    }
  };

  //Get country list
  useEffect(() => {
    getCountryList();
  }, [])

  //Get state list
  useEffect(() => {
    if (state.country) {
      setState({ ...state, states: '', city: '' });
      getStateList();
    }
  }, [state.country]);

  //Get city list
  useEffect(() => {
    if (state.states) {
      setState({ ...state, city: '' });
      getCityList();
    }
  }, [state.states]);

  //Get country list api
  const getCountryList = async () => {
    const response = await Api.countrie();
    const { status, data } = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({label : value.name, value: value.id});
        // tempArray.push({ label: value.name, value: value.id });
      }
      // console.log(tempArray)
      setCountryCode(tempArray);
    }
  }

  //Get state list api
  const getStateList = async () => {
    const body = {
      country_id: state.country
    }
    const response = await Api.state(body);
    const { status, data } = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({ label: value.state_name, value: value.id });
      }
      setStateValue(tempArray);
    }
  }

  //Get city list api
  const getCityList = async () => {
    const body = {
      state_id: state.states
    }
    const response = await Api.city(body);
    const { status, data } = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({ label: value.city_name, value: value.id });
      }
      tempArray.push({label: 'Other', value : 'other'})
      setCityValue(tempArray);
    }
  }

  const onChangeDropdownGender = (value, index, data) => {
    if (data[index].value == 'Male') {
      setState({ ...state, gender: 'Male' })
    } else if (data[index].value == 'Female') {
      setState({ ...state, gender: 'Female' })
    }
  };

  const onChangeDropdownLanguage = (value, index, data) => {
    setState({ ...state, language: data[index].value })
  };
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
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
              style={{ marginTop: 8, marginLeft: 'auto', marginHorizontal: 10 }}>
              <AnimatedCircularProgress
                size={65}
                width={3}
                fill={50}
                rotation={10}
                tintColor="#2574FF">
                {fill => (
                  <TouchableOpacity style={{height:30,width:35,}} onPress={() => changehandler()}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#2574FF',
                        fontWeight: '700',
                        maxLength:2,
                        marginTop:5
                        // marginHorizontal: 20,
                      }}>
                      {'2/4'}
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <TextLabel title={'Age'} />
          <TextInput
            value={state.age}
            onChangeText={age => setState({ ...state, age:age.replace(/[`~!@#$%^&*()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi, '') })}
            style={styles.textInput}
            placeholder={'Age'}
            placeholderTextColor={'lightgray'}
            keyboardType={'number-pad'}
            maxLength={2}
          />
          <TextLabel title={'Select Gender'} />
          <View style={{ marginTop: 10 }}>
            {/* <Dropdown
              // label={'Select Gender'}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              placeholder={'Select Gender'}
              placeholderTextColor={'lightgray'}
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={selectJob}
              onChangeText={(value, index, data) => {
                onChangeDropdownGender(value, index, data);
              }}
            /> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={selectJob}
              search
              maxHeight={300}
              backgroundColor={'#FFFFFFAA'}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              placeholderTextColor="black"
              searchPlaceholder="Search..."
              value={state.gender}
              onChange={item => {
                console.log(item)
                setState({ ...state, gender: item.value });
              }}
              renderItem={renderItem}
            />
          </View>
          <TextLabel title={'Select Language'} />
          <View style={{ marginTop: 10 }}>
            {/* <Dropdown
              // value="English"
              // label={'Select Language'}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              placeholder={'Select Language'}
              placeholderTextColor={'lightgray'}
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={language}
              onChangeText={(value, index, data) => {
                onChangeDropdownLanguage(value, index, data);
              }}
            /> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={language}
              search
              maxHeight={300}
              backgroundColor={'#FFFFFFAA'}
              labelField="label"
              valueField="value"
              placeholder="Select Language"
              placeholderTextColor="black"
              searchPlaceholder="Search..."
              value={state.language}
              onChange={item => {
                console.log(item)
                setState({ ...state, language: item.value });
              }}
              renderItem={renderItem}
            />
          </View>
          <TextLabel title={'Select Country'} />
          <View style={{ marginTop: 10 }}>
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
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={countryCode}
              onChangeText={(value, index, data) => {
                setState({ ...state, country: data[index].value });
              }}
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
                setState({ ...state, country: item.value });
              }}
              renderItem={renderItem}
            />
          </View>
          <TextLabel title={'Select State'} />
          <View style={{ marginTop: 10 }}>
            {/* <Dropdown
              value={state.states}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select State'}
              // icon="cheveron-down"
              placeholder={'Select State'}
              placeholderTextColor={'lightgray'}
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={stateValue}
              onChangeText={(value, index, data) => {
                setState({ ...state, states: data[index].value });
              }}
            /> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={stateValue}
              search
              maxHeight={300}
              backgroundColor={'#FFFFFFAA'}
              labelField="label"
              valueField="value"
              placeholder="Select State"
              placeholderTextColor="black"
              searchPlaceholder="Search..."
              value={state.states}
              onChange={item => {
                console.log(item)
                setState({ ...state, states: item.value });
              }}
              renderItem={renderItem}
            />
          </View>
          <TextLabel title={'Select City'} />
          <View style={{ marginTop: 10 }}>
            {/* <Dropdown
              value={state.city}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select City'}
              // icon="cheveron-down"
              placeholder={'Select City'}
              placeholderTextColor={'lightgray'}
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '76%', left: '12%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={cityValue}
              onChangeText={(value, index, data) => {
                // onChangeDropdownCity(value, index, data);
                setState({ ...state, city: data[index].value });
              }}
            /> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              data={cityValue}
              search
              maxHeight={300}
              backgroundColor={'#FFFFFFAA'}
              labelField="label"
              valueField="value"
              placeholder="Select City"
              placeholderTextColor="black"
              searchPlaceholder="Search..."
              value={state.city}
              onChange={item => {
                console.log(item)
                setState({ ...state, city: item.value });
              }}
              renderItem={renderItem}
            />
          </View>
          {state.city == 'other' ? 
          <>
            <TextLabel title={'City Name'} />
            <TextInput
              value={state.city_name}
              onChangeText={input => setState({ ...state, city_name:input})}
              style={styles.textInput}
              placeholder={'Input City Name'}
              placeholderTextColor={'lightgray'}
            />
          </>
           : null}
          {clicked ? 
                  <View style={{ width: '100%', marginTop: 30 }}>
                  <DisableButton title={'SAVE & NEXT'}
                    height={50}
                    fontSize={16}
                    loader={state.isLoading}
                    bgColor={'#cccccc'}
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
    </KeyboardAvoidingView>
  );
};

export default Register1;
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
    color:'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color:'lightgray',
    fontFamily: 'Muli-SemiBold'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
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
