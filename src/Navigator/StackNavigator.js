import React, {useRef} from 'react';
import {Image} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import OnBoarding from '../Screens/OnBoarding';
import Login from '../Screens/Login';
import Otp from '../Screens/Otp';
import Otp2 from '../Screens/Otp2';
import Register from '../Screens/Register';
import Register1 from '../Screens/Register1';
import Register2 from '../Screens/Register2';
import Register3 from '../Screens/Register3';
import Home from '../Screens/Home';
import JobDetails from '../Screens/JobDetails';
import JobDetailsUser from '../Screens/JobDetailsUser';
import TabNavigator from './TabNavigator';
import TabNavigator2 from './TabNavigator2';
import ShortList from '../Screens/ShortList';
import Profile from '../Screens/Profile';
import MyJobs from '../Screens/MyJobs';
import RecommendedJobs from '../Screens/RecommendedJobs';
import NewPostJobs from '../Screens/NewPostJobs';
import JobDetails1 from '../Screens/JobDetails1';
import Search from '../Screens/Search';
import SearchJob from '../Screens/SearchJob';
import Filter from '../Screens/Filter';
import DrawerNavigator from './DrawerNavigator';
import DrawerNavigator2 from './DrawerNavigator2';
import About from '../Screens/About';
import Invoice from '../Screens/Invoice';
import InvoicePdf from '../Screens/InvoicePdf';
import Reschedule from '../Screens/Reschedule';
import Support from '../Screens/Support';
import Privacy from '../Screens/Privacy';
import Terms from '../Screens/Terms';
import Faq from '../Screens/Faq';
import Payment from '../Screens/Payment';
import PaymentSuccess from '../Screens/PaymentSuccess';
import Appointment from '../Screens/Appointment';
import Notification from '../Screens/Notification';
import ProjectOtp from '../Screens/ProjectOtp';
import ProjectorHome from '../Screens/ProjectorHome';
import ProjectRagister from '../Screens/ProjectRagister';
import RecruiterRagister from '../Screens/RecruiterRagister';
import Approval from '../Screens/Approval';
import PostJob from '../Screens/PostJob';
import Profile1 from '../Screens/Profile1';
import PostedJobs from '../Screens/PostedJobs';
import JobDescription from '../Screens/JobDescription';
import CandidateApplied from '../Screens/CandidateApplied';
import Subscription from '../Screens/Subscription';
import PaymentSuccessfully from '../Screens/PaymentSuccessfully';
import Payment2 from '../Screens/Payment2';
import UserDetail from '../Screens/UserDetail';
import Documents from '../Screens/Documents';
import SkillDocument from '../Screens/SkillDocument';
import Candidate from '../Screens/Candidate';
import ScheduleInterview from '../Screens/ScheduleInterview';
import Setting from '../Screens/Setting';
import Login2 from '../Screens/Login2';
import VideoCall from '../Screens/VideoCall';
import NoInternet from '../Screens/NoInternet'
import EditProfile from '../Screens/EditProfile';
import EditProffessionalDetails from '../Screens/EditProffessionalDetails';
import EditDocumentsDetails from '../Screens/EditDocumentsDetails';
import ForiegnRagister from '../Screens/ForiegnRagister';
import WebViewScreen from '../Screens/WebViewScreen';
import ScheduleInterviewDate from '../Screens/ScheduleInterviewDate';
import ScheduleInterviewList from '../Screens/ScheduleInterviewList';
import JobList from '../Custom/JobList';
import TestPayment from '../Screens/TestPayment';
import AppointmentLetters from '../Screens/AppointmentLetters';
import FilterJobs from '../Screens/FilterJobs';

const Stack = createStackNavigator();
const StackNavigator = () => {
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const screenOptionStyle = {
    // headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
  };
  const navigationRef = useRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoInternet"
          component={NoInternet}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp2"
          component={Otp2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register1"
          component={Register1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register2"
          component={Register2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register3"
          component={Register3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDetails"
          component={JobDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDetailsUser"
          component={JobDetailsUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDetails1"
          component={JobDetails1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator2"
          component={TabNavigator2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShortList"
          component={ShortList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
          // options={{
          //   headerLeft:(<Image source={require('../images/back.png')}/>),
          //   title: 'Profile',
          //   headerStyle: {
          //     backgroundColor: '#2574FF',
          //   },
          //   headerTintColor: '#fff',
          //   headerTitleStyle: {
          //     fontWeight: 'bold',
          //   },
          // }}
        />
        <Stack.Screen
          name="MyJobs"
          component={MyJobs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecommendedJobs"
          component={RecommendedJobs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewPostJobs"
          component={NewPostJobs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchJob"
          component={SearchJob}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FilterJobs"
          component={FilterJobs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProffessionalDetails"
          component={EditProffessionalDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditDocumentsDetails"
          component={EditDocumentsDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigator2"
          component={DrawerNavigator2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Invoice"
          component={Invoice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppointmentLetters"
          component={AppointmentLetters}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InvoicePdf"
          component={InvoicePdf}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reschedule"
          component={Reschedule}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{headerShown: true,  headerStyle: { backgroundColor: '#2574FF'}, headerTintColor:'#FFF', headerTitleStyle: { color: '#FFF' }}}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProjectOtp"
          component={ProjectOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProjectorHome"
          component={ProjectorHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProjectRagister"
          component={ProjectRagister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecruiterRagister"
          component={RecruiterRagister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Approval"
          component={Approval}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostJob"
          component={PostJob}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile1"
          component={Profile1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostedJobs"
          component={PostedJobs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobDescription"
          component={JobDescription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CandidateApplied"
          component={CandidateApplied}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payment2"
          component={Payment2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentSuccessfully"
          component={PaymentSuccessfully}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Documents"
          component={Documents}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SkillDocument"
          component={SkillDocument}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Candidate"
          component={Candidate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScheduleInterview"
          component={ScheduleInterview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScheduleInterviewDate"
          component={ScheduleInterviewDate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScheduleInterviewList"
          component={ScheduleInterviewList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login2"
          component={Login2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForiegnRagister"
          component={ForiegnRagister}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JobList"
          component={JobList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TestPayment"
          component={TestPayment}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigator;
