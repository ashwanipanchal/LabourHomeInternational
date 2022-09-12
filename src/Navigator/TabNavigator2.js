import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Home from '../Screens/Home';
import MyJobs from '../Screens/MyJobs';
import ShortList from '../Screens/ShortList';
import Profile from '../Screens/Profile';
import ProjectorHome from '../Screens/ProjectorHome';

const iconPath = {
  h: require('../images/footer-home.png'),
  ha: require('../images/footer-home1.png'),
  s: require('../images/footer-job1.png'),
  sa: require('../images/footer-job.png'),
  f: require('../images/footer-shortlist1.png'),
  fa: require('../images/footer-shortlist.png'),
  a: require('../images/footer-profile1.png'),
  Aa: require('../images/footer-profile.png'),
};

const Tab = createBottomTabNavigator();
const TabIcon = source => <Image source={source} style={styles.tabIcon} />;

const TabNavigator2 = ({route}) => {
  console.log("props from TABNAVIGATOr SCreen", route)
  return (
    <Tab.Navigator
      initialRouteName="ProjectorHome"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        labelStyle: {
          paddingBottom: 2,
          fontSize: 10,
          fontFamily: 'Muli-Semibold',
          fontWeight: '600',
        },
        activeTintColor: '#2574FF',
        activeBackgroundColor: '#FFFFFF',
        inactiveBackgroundColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name="ProjectorHome"
        component={ProjectorHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.h : iconPath.ha),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="MyJobs"
        component={MyJobs}
        options={{
          tabBarLabel: 'My Jobs',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.s : iconPath.sa),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="ShortList"
        component={ShortList}
        options={{
          tabBarLabel: 'ShortList',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.f : iconPath.fa),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.a : iconPath.Aa),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator2;

const styles = StyleSheet.create({
  tabIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  tabPlus: {
    height: 60,
    width: 60,
    marginTop: -30,
    resizeMode: 'contain',
  },
});
