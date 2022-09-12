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
  Modal,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackgroundBase,
  ImageBackground,
  FlatList,
} from 'react-native';
import moment from 'moment';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import { Header, HeaderDark, MainView } from '../Custom/CustomView';
import { BottomView, EndButton, HeaderLight, ButtonStyle, StartButton } from '../Custom/CustomView';
import { Calendar, CalendarList, Arrow } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import { LocaleConfig } from 'react-native-calendars';
import { Api, LocalStorage } from '../services/Api'
const { height, width } = Dimensions.get('window');

const ScheduleInterviewDate = ({ navigation, route }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [select, setSelect] = useState(0);
  const [state, setState] = useState({
    day: new Date().toISOString().split('T')[0],
    time: '09:00',
    isLoading: false,
    selectedDate: "",
    markedDates: {}
  });
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Deepak Kumar',
      title: 'New Delhi, India',
      subTitle: 'RA Name : Rahul Sharma',
      source: require('../images/Reruiting-agent-slice/images.png'),
    },
    {
      id: '2',
      name: 'Deepak Kumar',
      title: 'New Delhi, India',
      subTitle: 'RA Name : Rahul Sharma',
      source: require('../images/Reruiting-agent-slice/images.png'),
    },
  ]);
  const [time, setTime] = useState([
    {
      id: "1",
      time: "09:00 AM",
      value: "09:00"
    },
    {
      id: "2",
      time: "10:00 AM",
      value: "10:00"
    },
    {
      id: "3",
      time: "11:00 AM",
      value: "11:00"
    },
    {
      id: "4",
      time: "12:00 PM",
      value: "12:00"
    },
    {
      id: "5",
      time: "01:00 PM",
      value: "13:00"
    },
    {
      id: "6",
      time: "02:00 PM",
      value: "14:00"
    },
    {
      id: "7",
      time: "03:00 PM",
      value: "15:00"
    },
    {
      id: "8",
      time: "04:00 PM",
      value: "16:00"
    },
    {
      id: "9",
      time: "05:00 PM",
      value: "17:00"
    },
    {
      id: "10",
      time: "06:00 PM",
      value: "18:00"
    },
  ])

  useEffect(() => {
    console.log("route.params", route.params)
    // alert(JSON.stringify(route), null, 2)
    // landHome()
  }, [])

  const getSelectedDayEvents = date => {
    let markedDates = {};
    markedDates[date] = { selected: true, marked: true, color: '#00B0BF', textColor: '#FFFFFF' };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");
    console.log("serviceDate",serviceDate)
    console.log("markedDates",markedDates)
    setState({...state,
        selectedDate: serviceDate,
        markedDates: markedDates
    });
};

  const onSubmit = async () => {
    // console.log(route.params)
    const type = (await LocalStorage.getUserDetail()) || '{}';
    const type1 = JSON.parse(type)
    console.log("type==",type1.user_type)
    let sc = "2";
    
    //  if(route.params.schedule_interview === null){
    //   sc = "2"
    //  }
     if(route.params.schedule_interview === "3"){
      // alert(type1.user_type)
      if(type1.user_type === 1){
        sc = "3"
      } else {
        sc = "2"
      }
     }
    const body = {
      "job_id": route.params.job_id,
      "user_id": route.params.user_id,
      "agency_id": route.params.agency_id,
      "schedule_interview": sc,
      "schedule_date": state.day,
      "schedule_time": state.time
    }
    console.log("body", body)
    try {
      // console.log(body)
      const response = await Api.scheduleAnInterview(body)
      console.log("schedule interview response ==", response)
      const { status } = response;
      if (status) {
        setModalOpen(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const landHome = async () => {
    const type = (await LocalStorage.getUserDetail()) || '{}';
    const type1 = JSON.parse(type)
    console.log(type)
    if(type1.user_type === 1){
      navigation.navigate('DrawerNavigator');
    }else{
      navigation.navigate('ProjectorHome');
    }
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Schedule Interview'}
        shareOnClick={() => { }}
        share={require('../images/Reruiting-agent-slice/support.png')}
      />
      <ScrollView>
      <View style={{}}>
        <Calendar
          style={{ marginHorizontal: 10, marginTop: 10, fontFamily: 'Muli-SemiBold' }}
          enableSwipeMonths={true}
          // markedDates={{
          //   current : {selected: true, marked: true, selectedColor: 'blue'},
          //   // '2022-07-17': {marked: true},
          //   // '2022-07-18': {marked: true, dotColor: 'red', activeOpacity: 0},
          //   // '2022-07-19': {disabled: true, disableTouchEvent: true}
          // }}
          markedDates={state.markedDates}
          hideExtraDays={true}
          current={new Date()}
          minDate={new Date()}
          theme={{
            // backgroundColor: '#ffffff',
            // calendarBackground: '#ffffff',
            // textSectionTitleColor: '#b6c1cd',
            // textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: "#57B9BB",
            selectedDayTextColor: "white",
            todayTextColor: '#2574FF',
            // dayTextColor: '#2574FF',
            // textDisabledColor: '#d9e1e8',
            // dotColor: '#00adf5',
            // selectedDotColor: '#ffffff',
            arrowColor: '#2574FF',
            // disabledArrowColor: '#d9e1e8',
            // monthTextColor: 'black',
            // indicatorColor: 'blue',
            textDayFontFamily: 'Muli-SemiBold',
            textMonthFontFamily: 'Muli-SemiBold',
            textDayHeaderFontFamily: 'Muli-SemiBold',
            // textDayFontWeight: '300',
            // textMonthFontWeight: 'bold',
            // textDayHeaderFontWeight: '300',
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16
          }}
          // renderArrow={direction => <Arrow />}
          // hideArrows={fl}
          onDayPress={day => {
            console.log(day.dateString)
            // getSelectedDayEvents(day.dateString);
            setState({ ...state, day: day.dateString })
          }}
        />
      </View>
      <View>
        <Text style={styles.inText}>Time Slot</Text>
        <View style={{ justifyContent: "space-around", alignItems: 'center', marginTop: 30, }}>
          <FlatList
            numColumns={3}
            keyExtractor={item => item.id}
            data={time}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelect(index)
                  setState({ ...state, time: item.value })
                }}
                style={{
                  width: width / 3 - 25,
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderRadius: 5,
                  elevation: 5,
                  margin: 5,
                  marginLeft: 10,
                  backgroundColor: index == select ? '#2574FF' : '#fff',
                }}>

                <Text
                  style={{
                    fontFamily: 'Muli-SemiBold',
                    fontSize: 16,
                    fontWeight: '600',
                    color: index == select ? 'white' : 'black',
                    marginTop: 5,
                    textAlign: 'center',
                  }}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ width: '100%', marginTop: 30, }}>
          <ButtonStyle
            title={'SUBMIT'}
            loader={state.isLoading}
            onPress={() => {
              onSubmit();
            }}
          />
        </View>
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
                Interview Schedule{`\n`}
                Successfully
              </Text>
              <View style={{ width: '35%', alignSelf: 'center', marginTop: 20 }}>
                <StartButton
                  title={'OK'}
                  onPress={() => {
                    landHome()
                    // navigation.navigate('ProjectorHome');
                  }}
                />
              </View>
              <BottomView />
            </View>
          </View>
        </Modal>
      </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleInterviewDate;

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
    fontFamily: 'Muli-SemiBold',
    fontSize: 18,
    fontWeight: '500',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 25,
  },
  insubText: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },
  middleText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 15,
  },
  redText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 13,
    fontWeight: '700',
    color: '#FF0000',
    marginLeft: 15,
    marginTop: 5,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
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
});
