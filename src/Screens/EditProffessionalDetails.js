import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import { StatusBarLight } from '../Custom/CustomStatusBar'
import {Api} from '../services/Api'
import { ButtonStyle, DisableButton, HeaderDark } from '../Custom/CustomView'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import Toast from 'react-native-simple-toast';

const EditProffessionalDetails = ({navigation,route}) => {
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [state, setState] = useState({
      work_exp: route.params.userPersonalDetails.work_exp,
      foreign_exp: route.params.userPersonalDetails.foreign_exp,
      category_name: route.params.userPersonalDetails.category_name,
      sub_category_name: route.params.userPersonalDetails.sub_category_name,
      category: route.params.userPersonalDetails.category,
      sub_category: route.params.userPersonalDetails.sub_category,
      // work_exp:"",
      // foreign_exp: '',
      // category:"",
      // sub_category:"",
      isLoading: false,
      });
      useEffect(() => {
        // alert(JSON.stringify(route.params,null,2))
        getCategoryList();
        // getSubCategoryList()
      }, []);
    
      // Get sub Category  list
      useEffect(() => {
        // 
        if (state.category) {
          setState({...state, sub_category: route.params.userPersonalDetails.sub_category});
          getSubCategoryList();
        }
      }, [state.category||state.category_name]);
    
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
          cat_id: state.category,
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
      const updateProfile = async() => {
        const {
          work_exp = '',
          foreign_exp = '',
          category = '',
          sub_category = '',  
        } = state;

        if (!work_exp) {
          Toast.show('Please enter your work experience');
          return;
        }
        if (!foreign_exp) {
          Toast.show('Please enter your foreign experience');
          return;
        }
        if (!category) {
          Toast.show('Please select your category');
          return;
        }
        if (!sub_category) {
          Toast.show('Please select your sub category');
          return;
        }
        setClicked(true)
        const body = {
          user_id: route.params.userBasicDetails.id,
          work_exp,
          foreign_exp,
          category,
          sub_category
        }
        // alert(JSON.stringify(body, null, 2))
        // return
        setState({...state, isLoading: true});
        const response = await Api.professionalProfileEdit(body)
        console.log(response)
        // alert(JSON.stringify(response))
        const {status} = response;
        if(status){
          setState({ ...state, isLoading: false });
          navigation.replace('DrawerNavigator')
          setClicked(false)
        }
      }
  return (
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
          <StatusBarLight />
          <HeaderDark onPress={() => navigation.goBack()} title={'Edit Profile'} />
          <ScrollView>
          <View style={styles.subBox}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.inText}>Professional details</Text>
              </View>
              <TextLabel title={'Select Category'} />
              <View style={{ marginTop: 10 }}>
                  <Dropdown
                      value={state.category_name}
                      style={styles.drops}
                      itemColor={'rgba(0, 0, 0, .54)'}
                      underlineColor="transparent"
                      // label={'Select User Type'}
                      // icon="cheveron-down"
                      iconColor="rgba(0, 0, 0, 1)"
                      icon={require('../images/down-arrow.png')}
                      dropdownOffset={{ top: 32, left: 0 }}
                      dropdownMargins={{ min: 8, max: 16 }}
                      pickerStyle={{ width: '80%', left: '10%' }}
                      dropdownPosition={-1.9}
                      shadeOpacity={0.12}
                      rippleOpacity={0.4}
                      baseColor={'white'}
                      data={category}
                      onChangeText={(value, index, data) => {
                          console.log('-------res data: ', data[index].value);
                          setState({ ...state, category: data[index].value, sub_category_name:'', sub_category:'' });
                          // getSubCategoryList(data[index].value)
                          // onChangeDropdownUserType(value, index, data);
                      }}
                  />
              </View>
              <TextLabel title={'Select Sub Category'} />
              <View style={{ marginTop: 10 }}>
                  <Dropdown
                      value={state.sub_category_name}
                      style={styles.drops}
                      itemColor={'rgba(0, 0, 0, .54)'}
                      underlineColor="transparent"
                      // label={'Select User Type'}
                      // icon="cheveron-down"
                      iconColor="rgba(0, 0, 0, 1)"
                      icon={require('../images/down-arrow.png')}
                      dropdownOffset={{ top: 32, left: 0 }}
                      dropdownMargins={{ min: 8, max: 16 }}
                      pickerStyle={{ width: '76%', left: '12%' }}
                      dropdownPosition={-1.9}
                      shadeOpacity={0.12}
                      rippleOpacity={0.4}
                      baseColor={'white'}
                      data={subCategory}
                      onChangeText={(value, index, data) => {
                        console.log('-------res data: ', data[index].value);
                        setState({ ...state, sub_category: data[index].value });
                        // onChangeDropdownUserType(value, index, data);
                      }}
                  />
                      <TextLabel title={'Work Experience'} />
                      <TextInput
                          value={state.work_exp}
                          onChangeText={text =>
                              setState({ ...state, work_exp: text.replace(/[^0-9]/g, '') })
                          }
                          style={styles.textInput}
                          placeholder={'Enter Experience'}
                          maxLength={2}
                          keyboardType={'numeric'}
                          placeholderTextColor={'lightgray'}
                      />
                      <TextLabel title={'Foreign Experience'} />
                      <TextInput
                          value={state.foreign_exp}
                          onChangeText={text =>
                              setState({
                                  ...state,
                                  foreign_exp: text.replace(/[^0-9]/g, ''),
                              })
                          }
                          style={styles.textInput}
                          maxLength={2}
                          keyboardType={'numeric'}
                          placeholder={'Enter Foreign Experience'}
                          placeholderTextColor={'lightgray'}
                      />
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
              {/* <View style={{width: '90%', alignSelf: 'center', marginTop: 30, }}>
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
export default EditProffessionalDetails

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
})