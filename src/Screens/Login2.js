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
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
import ProjectRagister from './ProjectRagister';
import RecruiterRagister from './RecruiterRagister';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const Login2 = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('Customer');
  const [selectJob, setSelectJob] = useState([
    {value: 'Customer'},
    {value: 'Project Exporter'},
    {value: 'Foreign Recruiting'},
    {value: 'Reruiting Agent'},
  ]);
  const onChangeDropdownUserType = (value, index, data) => {
    setUserType(data[index].value);
  };
  const ragistercheckout = () => {
    setTimeout(() => {
      navigation.navigate('ProjectOtp');
    }, 300);
  };
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <ScrollView>
        <TextLabel title={'Mobile Number'} />
        <TextInput
          // value={state.name}
          //   onChangeText={name => setState({...state, name})}
          style={styles.textInput}
          placeholder={'Mobile No.'}
          keyboardType={'number-pad'}
          maxLength={10}
        />
        <View style={{width: '100%', marginTop: 30}}>
          <ButtonStyle
            title={'SUBMIT'}
            onPress={() => {
              ragistercheckout();
            }}
          />
          <BottomView />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login2;
const TextLabel = ({title}) => <Text style={styles.textLabel}>{title}</Text>;
const styles = StyleSheet.create({
  image: {
    marginTop: 70,
    width: 100,
    height: 90,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    marginTop: 20,
  },
  text: {
    fontFamily: 'Muli',
    fontSize: 19,
    fontWeight: '700',
    color: '#222B45',
    textAlign: 'center',
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
  },
  textLabel: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 14,
    color: '#8F9BB3',
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 0,
  },
});
