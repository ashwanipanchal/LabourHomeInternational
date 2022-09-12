import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../Screens/CustomDrawerContent';
import TabNavigator2 from './TabNavigator2';
import ProjectorHome from '../Screens/ProjectorHome';
const Drawer = createDrawerNavigator();
const DrawerNavigator2 = ({route}) => (
  // console.log("====== DrawerNAvigation Page route ",route)
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="TabNavigator"
    drawerStyle={{width: '70%'}}
    drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="TabNavigator2" component={ProjectorHome}/>
  </Drawer.Navigator>
);
export default DrawerNavigator2;
