import { StyleSheet, Text, View, TextInput, ScrollView, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar'
import { ButtonStyle, DisableButton, HeaderDark } from '../Custom/CustomView'
import { Api } from '../services/Api'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
// import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';

const EditProfile = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params,null,2))
  const [value, setValue] = useState(null);
  const [selectJob, setSelectJob] = useState([
    {label: "Male", value: 'Male' },
    { label: "Female",  value: 'Female' },
  ]);
  const [language, setLanguage] = useState([
    {label: "English", value: 'English' },
    { label: "Hindi", value: 'Hindi' },
  ]);
  const [clicked, setClicked] = useState(false);
  const [countryCode, setCountryCode] = useState([]);
  const [stateValue, setStateValue] = useState([]);
  const [cityValue, setCityValue] = useState([]);
  const [state, setState] = useState({
    age: route.params.userBasicDetails.age,
    gender: route.params.userBasicDetails.gender,
    language: route.params.userBasicDetails.language,
    // country: '',
    // states: '',
    // city: '',
    country: route.params.userBasicDetails.country.toString(),
    country_name: route.params.userBasicDetails.countrie_name,
    states: route.params.userBasicDetails.state.toString(),
    states_name: route.params.userBasicDetails.state_name,
    city: route.params.userBasicDetails.city.toString(),
    city_name: route.params.userBasicDetails.city_name,
    isLoading: false,
  });
  //Get country list
  useEffect(() => {
    // alert(JSON.stringify(route.params,null,2))
    getCountryList();
  }, [])

  //Get state list
  useEffect(() => {
    if (state.country) {
      setState({ ...state, states: route.params.userBasicDetails.states,  });
      getStateList();
    }
  }, [state.country]);

  //Get city list
  useEffect(() => {
    if (state.states) {
      setState({ ...state, city: route.params.userBasicDetails.city });
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
        tempArray.push({ label: value.name, value: value.id });
      }
      // alert(JSON.stringify(tempArray,null,2))
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
    // alert(JSON.stringify(state.states,null,2))
    const response = await Api.city(body);
    // alert(JSON.stringify(response,null,2))
    const { status, data } = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({ label: value.city_name, value: value.id });
      }
      setCityValue(tempArray);
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

  const updateProfile = async () => {
    Keyboard.dismiss()
    const {
      age = '',
      gender = '',
      language = '',
      country = '',
      states = '',
      city = '',
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

    // let cc = country === "India" ? 101: country

    setClicked(true)
    const body = {
      user_id: route.params.userBasicDetails.id,
      age,
      gender,
      language,
      country,
      state:states,
      city,
    };
    // console.log(JSON.stringify(body,null,2))
    // alert(JSON.stringify(body,null,2))
    // return
    setState({ ...state, isLoading: true });
    const response = await Api.personalProfileEdit(body)
    console.log("response", response)
    const { status } = response;
    if (status) {
      setState({ ...state, isLoading: false });
      setClicked(false)
      navigation.replace('DrawerNavigator')
    }
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Edit Profile'} />
      <ScrollView>
        <View style={styles.subBox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.inText}>Personal details</Text>
          </View>
          <TextLabel title={'Age'} />
          <TextInput
            value={state.age}
            onChangeText={age => setState({ ...state, age:age.replace(/[`~!@#$%^&*()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi, '')})}
            style={styles.textInput}
            placeholder={'Age'}
            placeholderTextColor={'lightgray'}
            keyboardType={'number-pad'}
            maxLength={2}
          />
          <TextLabel title={'Select Gender'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              // label={'Select Gender'}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              value={state.gender}
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
            />
            {/* <Dropdown
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
              setState({...state, gender: item.value});
            }}
            renderItem={renderItem}
          /> */}
          </View>
          <TextLabel title={'Select Language'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              // value="English"
              // label={'Select Language'}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              value={state.language}
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
            />
            {/* <Dropdown
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
            placeholder="Select Country"
            placeholderTextColor="black"
            searchPlaceholder="Search..."
            value={state.language}
            onChange={item => {
              console.log(item)
              setState({...state, language: item.value});
            }}
            renderItem={renderItem}
          /> */}
          </View>
          <TextLabel title={'Select Country'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value={state.country_name}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select Country'}
              // icon="cheveron-down"
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
                setState({ ...state, country:data[index].value, states_name:'', city_name:'' });
                
              }}
            />
            {/* <Dropdown
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
            value={state.country_name}
            onChange={item => {
              console.log(item)
              setState({...state, country: item.value});
            }}
            renderItem={renderItem}
          /> */}
          </View>
          <TextLabel title={'Select State'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value={state.states_name}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select State'}
              // icon="cheveron-down"
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
                setState({ ...state, states: data[index].value, city:'' });
              }}
            />
            {/* <Dropdown
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
              setState({...state, states: item.value});
            }}
            renderItem={renderItem}
          /> */}
          </View>
          <TextLabel title={'Select City'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value={state.city_name}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select City'}
              // icon="cheveron-down"
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
            />
            {/* <Dropdown
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
              setState({...state, city: item.value});
            }}
            renderItem={renderItem}
          /> */}
          </View>
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
          {/* <View style={{ width: '90%', alignSelf: 'center', marginTop: 30, }}>
            <ButtonStyle
              title={'UPDATE'}
              loader={state.isLoading}
              onPress={() => {
                updateProfile()
              }}
            />
          </View> */}
        </View>
      </ScrollView>
    </View>
  )
}
const TextLabel = ({ title }) => <Text style={styles.textLabel}>{title}</Text>;

export default EditProfile

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
    color: '#000'
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

  ////
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
    color:"black",
    fontFamily:'Muli-SemiBold'
  },
})