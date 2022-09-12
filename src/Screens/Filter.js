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
  ToastAndroid,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark} from '../Custom/CustomView';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';
const {height, width} = Dimensions.get('window');

const Filter = ({navigation}) => {
  const [select, setSelect] = useState(0);
  const [countryCode, setCountryCode] = useState([]);
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState(null);
  const [state, setState] = useState({
    country: '',
    categoryId:'',
    isLoading: false
  });
  const [data, setData] = useState([
    {id: '1', title: 'Industry', source: require('../images/filter-icon.png')},
    {
      id: '2',
      title: 'Construction',
      source: require('../images/filter-hook.png'),
    },
    {
      id: '3',
      title: 'Oil & Gas',
      source: require('../images/filter-oil-tank.png'),
    },
    {
      id: '4',
      title: 'Finance',
      source: require('../images/filter-money.png'),
    },
    {
      id: '5',
      title: 'Banking',
      source: require('../images/filter-bank.png'),
    },
    {
      id: '6',
      title: 'Management',
      source: require('../images/filter-manager.png'),
    },
    {
      id: '7',
      title: 'Medical',
      source: require('../images/filter-first-aid-kit.png'),
    },
    {
      id: '8',
      title: 'IT',
      source: require('../images/filter-it.png'),
    },
  ]);
  const [select1, setSelect1] = useState(0);
  const [item, setItem] = useState([
    {id: '1', title: ' India'},
    {id: '2', title: ' South Africa'},
    {id: '3', title: ' Dubai'},
    {id: '4', title: ' United States'},
    {id: '5', title: ' Australia'},
    {id: '6', title: ' kuwait'},
    {id: '7', title: ' Canada'},
    {id: '8', title: ' Egypt'},
  ]);
  const [select2, setSelect2] = useState(0);
  const [num, setNum] = useState([
    {id: '1', title: 'Any Experience'},
    {id: '2', title: ' 1-3 yrs'},
    {id: '3', title: '  4-6 yrs'},
    {id: '4', title: '  6-7 yrs'},
    {id: '5', title: '  7-10 yrs'},
  ]);
  const [select3, setSelect3] = useState(0);
  const [rate, setRate] = useState([
    {id: '1', title: 'All Ratings'},
    {id: '2', title: ' 3 Star and above'},
    {id: '3', title: ' Only 5 star'},
  ]);

  useEffect(()=>{
    getCategoryList()
    getCountryList()
  },[])

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
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  const applyFilter= async() => {
    if(!state.categoryId){
      Toast.show("Please Select Category")
      return
    }
    if(!state.country){
      Toast.show("Please Select Country")
      return
    }
    setState({...state, isLoading : true})
    let exp;
    if(select2 === 0){
      exp = 0
    }else if(select2 === 1){
      exp = ['1','3']
    }else if(select2 === 2){
      exp = ['4','6']
    }else if(select2 === 3){
      exp = ['7','8']
    }else if(select2 === 4){
      exp = ['9','10']
    }
    const body = {
      category_id: state.categoryId,
      country_id: state.country,
      experience_id : exp
    }
    // alert(JSON.stringify(body,null,2))
    // return
    const response = await Api.filter(body)
    const {status, job_list} = response;
    if(status){
      setState({...state, isLoading : false})
      navigation.navigate('FilterJobs', job_list)
    }
    // alert(JSON.stringify(response,null,2))

  }
  return (
    <View style={{backgroundColor: '#F0F1F3', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Filter'} />
      <ScrollView>
        <View style={styles.subBox}>
          <Text style={styles.text}>Category</Text>
          <View>
            {/* <FlatList
              numColumns={3}
              keyExtractor={item => item.id}
              data={data}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setSelect(index)}
                  style={{
                    width: width / 3 - 25,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    elevation: 5,
                    margin: 5,
                    marginLeft: 10,
                    backgroundColor: index == select ? '#2574FF' : '#fff',
                  }}>
                  <Image
                    style={{
                      width: 26,
                      height: 26,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                    source={item.source}
                  />
                  <Text
                    style={{
                      fontFamily: 'Muli-SemiBold',
                      fontSize: 13,
                      fontWeight: '700',
                      color: index == select ? 'white' : 'black',
                      marginTop: 5,
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
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
        </View>
        <View style={styles.subBox}>
          <Text style={styles.text}>Country</Text>
          <View>
            {/* <FlatList
              numColumns={3}
              keyExtractor={item => item.id}
              data={item}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setSelect1(index)}
                  style={{
                    width: width / 3 - 25,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    elevation: 5,
                    margin: 5,
                    marginLeft: 10,
                    backgroundColor: index == select1 ? '#2574FF' : '#fff',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Muli-SemiBold',
                      fontSize: 13,
                      fontWeight: '700',
                      color: index == select1 ? 'white' : 'black',
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
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
        </View>
        <View style={styles.subBox}>
          <Text style={styles.text}>Experience</Text>
          <View>
            <FlatList
              numColumns={3}
              keyExtractor={item => item.id}
              data={num}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setSelect2(index)}
                  style={{
                    width: width / 3 - 25,
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginTop: 5,
                    elevation: 5,
                    margin: 5,
                    marginLeft: 10,
                    backgroundColor: index == select2 ? '#2574FF' : '#fff',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Muli-SemiBold',
                      fontSize: 13,
                      fontWeight: '700',
                      color: index == select2 ? 'white' : 'black',
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        {/* <View style={styles.subBox}>
          <Text style={styles.text}>Rating</Text>
          <View>
            <FlatList
              numColumns={3}
              keyExtractor={item => item.id}
              data={rate}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setSelect3(index)}
                  style={{
                    width: width / 3 - 25,
                    // paddingHorizontal: 5,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginTop: 5,
                    elevation: 5,
                    margin: 5,
                    marginLeft: 10,
                    backgroundColor: index == select3 ? '#2574FF' : '#fff',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Muli-SemiBold',
                      fontSize: 13,
                      fontWeight: '700',
                      color: index == select3 ? 'white' : 'black',
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View> */}
        <View style={{width: '90%', marginTop: 30, alignSelf: 'center'}}>
          <ButtonStyle
            title={'APPLY NOW'}
            loader={state.isLoading}
            onPress={() => {
              applyFilter()
              // navigation.navigate('RecommendedJobs');
            }}
          />
        </View>
        <BottomView />
      </ScrollView>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  image: {
    marginTop: height / 3,
    width: 219,
    height: 232,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  subBox: {
    padding: 10,
    // marginHorizontal: 15,
    backgroundColor: '#fff',
    // elevation: 5,
    // borderRadius: 10,
    marginTop: 20,
    // marginLeft: 20,
    // marginBottom: 5,
  },
  text: {
    fontFamily: 'Muli',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1E2C',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
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
