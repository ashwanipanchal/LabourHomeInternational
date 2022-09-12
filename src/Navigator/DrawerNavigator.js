import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../Screens/CustomDrawerContent';
import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();
const DrawerNavigator = ({route}) => (
  // console.log("====== DrawerNAvigation Page route ",route)
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="TabNavigator"
    drawerStyle={{width: '70%'}}
    drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="TabNavigator" component={TabNavigator}/>
  </Drawer.Navigator>
);
export default DrawerNavigator;
